"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Upload as TusUpload } from "tus-js-client";
import { ulid } from "ulid";

type Row = {
  id: string;
  file: File;
  name: string;
  sizeMB: string;
  progress: number; // 0..100
  state: "queued" | "uploading" | "paused" | "done" | "error" | "canceled";
  error?: string;
  tus?: TusUpload;
  path?: string; // storage object path
};

const MAX_SIZE_BYTES = 2 * 1024 * 1024 * 1024; // 2GB
const BUCKET = "videos";
const listVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, duration: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function TusUploader({ projectId }: { projectId: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [drag, setDrag] = useState(false);

  // ── NEW: existing uploads list + fetcher ─────────────────────────────────────
  const [existing, setExisting] = useState<
    Array<{
      id: string;
      storage_path: string;
      size_bytes: number | null;
      created_at: string;
    }>
  >([]);

  const refreshExisting = async () => {
    try {
      const res = await fetch(`/api/uploads/list?projectId=${projectId}`);
      const json = await res.json();
      setExisting(json.rows ?? []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshExisting();
  }, [projectId]);
  // ────────────────────────────────────────────────────────────────────────────
  const openPreview = async (storagePath: string) => {
    try {
      const res = await fetch(
        `/api/storage/signed-url?path=${encodeURIComponent(storagePath)}`
      );
      const json = await res.json();
      if (json.url) {
        window.open(json.url, "_blank", "noopener,noreferrer");
      } else {
        alert(json.error ?? "Failed to get signed URL");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to get signed URL");
    }
  };
  // TEMP: ensure we have a user session (anonymous) so TUS works.
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        await supabase.auth.signInAnonymously(); // replace with real auth later
      }
    })();
  }, []);

  const onFiles = (files: FileList | null) => {
    if (!files || !files.length) return;
    const next: Row[] = [];
    Array.from(files).forEach((f) => {
      if (f.size > MAX_SIZE_BYTES) {
        next.push({
          id: ulid(),
          file: f,
          name: f.name,
          sizeMB: (f.size / 1_000_000).toFixed(1),
          progress: 0,
          state: "error",
          error: "File too large (max 2 GB).",
        });
      } else if (!f.type.startsWith("video/")) {
        next.push({
          id: ulid(),
          file: f,
          name: f.name,
          sizeMB: (f.size / 1_000_000).toFixed(1),
          progress: 0,
          state: "error",
          error: "Only video files are allowed.",
        });
      } else {
        next.push({
          id: ulid(),
          file: f,
          name: f.name,
          sizeMB: (f.size / 1_000_000).toFixed(1),
          progress: 0,
          state: "queued",
        });
      }
    });
    setRows((r) => [...next, ...r]);
  };

  const startUpload = async (rowId: string) => {
    const row = rows.find((r) => r.id === rowId);
    if (!row || row.state === "uploading" || row.state === "done") return;

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    if (!token) {
      setRows((r) =>
        r.map((x) =>
          x.id === rowId
            ? { ...x, state: "error", error: "No session token." }
            : x
        )
      );
      return;
    }

    // Build a unique storage path: videos/{workspace}/{projectId}/{ulid}-{sanitized}
    const safeName = row.file.name.replace(/[^\w.\-]+/g, "_");
    const workspaceId = "dev"; // TODO: replace with real workspace id after auth
    const objectName = `${workspaceId}/${projectId}/${ulid()}-${safeName}`;
    const projectIdStr =
      process.env.NEXT_PUBLIC_SUPABASE_URL?.split("https://")[1]?.split(
        ".supabase.co"
      )[0] || "";
    const endpoint = `https://${projectIdStr}.storage.supabase.co/storage/v1/upload/resumable`;

    const tus = new TusUpload(row.file, {
      endpoint,
      chunkSize: 6 * 1024 * 1024, // 6MB
      retryDelays: [0, 3000, 5000, 10000, 20000],
      removeFingerprintOnSuccess: true,
      uploadDataDuringCreation: true,
      metadata: {
        bucketName: BUCKET,
        objectName,
        contentType: row.file.type || "application/octet-stream",
        cacheControl: "3600",
        metadata: JSON.stringify({ projectId }),
      },
      headers: {
        authorization: `Bearer ${token}`,
        "x-upsert": "false",
      },
      onError: (error: unknown) => {
        setRows((r) =>
          r.map((x) =>
            x.id === rowId ? { ...x, state: "error", error: String(error) } : x
          )
        );
      },
      onProgress: (bytesUploaded: number, bytesTotal: number) => {
        const pct = Math.round((bytesUploaded / bytesTotal) * 100);
        setRows((r) =>
          r.map((x) =>
            x.id === rowId ? { ...x, progress: pct, state: "uploading" } : x
          )
        );
      },
      onSuccess: async () => {
        setRows((r) =>
          r.map((x) =>
            x.id === rowId
              ? { ...x, progress: 100, state: "done", path: `${objectName}` }
              : x
          )
        );

        try {
          await fetch("/api/uploads/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              projectId,
              workspaceId, // "dev" for now
              path: `${BUCKET}/${objectName}`,
              sizeBytes: row.file.size,
              contentType: row.file.type,
            }),
          });
          await refreshExisting(); // update the list below
        } catch (e) {
          console.error("Failed to record upload row", e);
        }
      },
    });

    setRows((r) =>
      r.map((x) => (x.id === rowId ? { ...x, tus, state: "uploading" } : x))
    );
    tus.start();
  };

  const cancel = (rowId: string) => {
    const row = rows.find((r) => r.id === rowId);
    row?.tus?.abort();
    setRows((r) =>
      r.map((x) => (x.id === rowId ? { ...x, state: "canceled" } : x))
    );
  };

  const retry = (rowId: string) => {
    setRows((r) =>
      r.map((x) =>
        x.id === rowId
          ? { ...x, progress: 0, state: "queued", error: undefined }
          : x
      )
    );
    setTimeout(() => startUpload(rowId), 50);
  };

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDrag(false);
          onFiles(e.dataTransfer.files);
        }}
        className={`grid place-items-center rounded-2xl border border-dashed border-white/15 p-10 text-center ${
          drag ? "ring-2 ring-purple-500/50 bg-purple-500/5" : "bg-white/5"
        }`}
      >
        <Upload className="h-7 w-7 opacity-80" />
        <div className="mt-2 text-sm text-zinc-300">
          Drag & drop video files here
        </div>
        <div className="text-xs text-zinc-400">MP4 / MOV up to 2 GB</div>
        <label className="mt-3 inline-block cursor-pointer rounded-md bg-purple-600 px-3 py-1.5 text-sm hover:bg-purple-700">
          Select files
          <input
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />
        </label>
      </div>

      {/* Queue */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 text-sm font-medium">Queue</div>
        <div className="space-y-2">
          {rows.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-400">
              No files yet.
            </div>
          )}

          {rows.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
            >
              <div className="min-w-0">
                <div className="truncate">{r.name}</div>
                <div className="text-xs text-zinc-400">{r.sizeMB} MB</div>
                <div className="mt-2 h-1.5 w-52 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      r.state === "error" ? "bg-red-500/70" : "bg-purple-500"
                    }`}
                    style={{ width: `${r.progress}%` }}
                  />
                </div>
                {r.error && (
                  <div className="mt-1 text-xs text-red-400">{r.error}</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {r.state === "queued" && (
                  <button
                    className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                    onClick={() => startUpload(r.id)}
                  >
                    Start
                  </button>
                )}
                {r.state === "uploading" && (
                  <>
                    <button
                      className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                      onClick={() => {
                        r.tus?.abort(true);
                        setRows((rows) =>
                          rows.map((x) =>
                            x.id === r.id ? { ...x, state: "paused" } : x
                          )
                        );
                      }}
                    >
                      Pause
                    </button>
                    <button
                      className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                      onClick={() => cancel(r.id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {r.state === "paused" && (
                  <button
                    className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                    onClick={() => startUpload(r.id)}
                  >
                    Resume
                  </button>
                )}
                {r.state === "error" && (
                  <button
                    className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                    onClick={() => retry(r.id)}
                  >
                    Retry
                  </button>
                )}
                {r.state === "done" && (
                  <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-green-400">
                    Done
                  </span>
                )}
                {r.state === "canceled" && (
                  <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400">
                    Canceled
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Existing uploads */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 text-sm font-medium">Existing uploads</div>
        {existing.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-400">
            None yet.
          </div>
        ) : (
          <div className="space-y-2">
            {existing.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
              >
                <div className="min-w-0">
                  <div className="truncate">{row.storage_path}</div>
                  <div className="text-xs text-zinc-400">
                    {(row.size_bytes ? row.size_bytes / 1_000_000 : 0).toFixed(
                      1
                    )}{" "}
                    MB • {new Date(row.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="rounded-md border border-white/10 px-2 py-1 text-xs hover:bg-white/10"
                    onClick={() => openPreview(row.storage_path)}
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Existing uploads */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 text-sm font-medium">Existing uploads</div>
        {existing.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-400">
            None yet.
          </div>
        ) : (
          <div className="space-y-2">
            {existing.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-sm"
              >
                <div className="min-w-0">
                  <div className="truncate">{row.storage_path}</div>
                  <div className="text-xs text-zinc-400">
                    {(row.size_bytes ? row.size_bytes / 1_000_000 : 0).toFixed(
                      1
                    )}{" "}
                    MB • {new Date(row.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}