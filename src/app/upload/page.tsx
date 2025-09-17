"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import supabase from "@/lib/supabase/client";

// Zod schemas for client-side validation
const InitLinkSchema = z.object({
  sourceType: z.enum(["youtube", "twitch", "rumble"]),
  url: z.string().url(),
  options: z.object({
    language: z.string().default("en"),
    clipCount: z.number().int().min(1).max(20).default(5),
    subtitleStyle: z.string().default("clean"),
    exportSize: z.enum(["1080x1920", "720x1280"]).default("1080x1920"),
    generateTrailer: z.boolean().default(false),
    indexForCompilations: z.boolean().default(false),
  }),
});

const InitFileSchema = z.object({
  sourceType: z.literal("file"),
  options: z.object({
    language: z.string().default("en"),
    clipCount: z.number().int().min(1).max(20).default(5),
    subtitleStyle: z.string().default("clean"),
    exportSize: z.enum(["1080x1920", "720x1280"]).default("1080x1920"),
    generateTrailer: z.boolean().default(false),
    indexForCompilations: z.boolean().default(false),
  }),
});

type InitLinkBody = z.infer<typeof InitLinkSchema>;
type InitFileBody = z.infer<typeof InitFileSchema>;

export default function UploadPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"link" | "file">("link");

  // Shared options
  const [language, setLanguage] = useState("en");
  const [clipCount, setClipCount] = useState(5);
  const [subtitleStyle, setSubtitleStyle] = useState("clean");
  const [exportSize, setExportSize] = useState<"1080x1920" | "720x1280">("1080x1920");
  const [generateTrailer, setGenerateTrailer] = useState(false);
  const [indexForCompilations, setIndexForCompilations] = useState(false);

  // Link state
  const [sourceType, setSourceType] = useState<"youtube" | "twitch" | "rumble">("youtube");
  const [url, setUrl] = useState("");
  const [submittingLink, setSubmittingLink] = useState(false);

  // File state
  const [fileObj, setFileObj] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [submittingFile, setSubmittingFile] = useState(false);

  const handleSubmitLink = async (e: React.FormEvent) => {
    e.preventDefault();

    const parse = InitLinkSchema.safeParse({
      sourceType,
      url,
      options: {
        language,
        clipCount,
        subtitleStyle,
        exportSize,
        generateTrailer,
        indexForCompilations,
      },
    } as InitLinkBody);

    if (!parse.success) {
      toast.error("Invalid link/options.");
      return;
    }

    try {
      setSubmittingLink(true);
      const res = await fetch("/api/upload/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parse.data),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to start processing");
      }

      toast.success("Processing started. Redirecting…");
      setTimeout(() => router.push("/dashboard?processing=1"), 900);
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong.");
    } finally {
      setSubmittingLink(false);
    }
  };

  const handleSubmitFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileObj) {
      toast.error("Pick a file first.");
      return;
    }

    const parse = InitFileSchema.safeParse({
      sourceType: "file",
      options: {
        language,
        clipCount,
        subtitleStyle,
        exportSize,
        generateTrailer,
        indexForCompilations,
      },
    } as InitFileBody);

    if (!parse.success) {
      toast.error("Invalid options.");
      return;
    }

    try {
      setSubmittingFile(true);

      // 1) INIT (server creates project + returns storagePath)
      const initRes = await fetch("/api/upload/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parse.data),
      });

      if (!initRes.ok) {
        const msg = await initRes.text();
        throw new Error(msg || "Init failed");
      }

      const initJson = (await initRes.json()) as { projectId: string; storagePath: string };
      const { projectId, storagePath } = initJson;

      if (!projectId || !storagePath) {
        throw new Error("Missing projectId or storagePath from init.");
      }

      // 2) UPLOAD to Supabase Storage ("videos" bucket)
      const { error: upErr } = await supabase.storage
        .from("videos")
        .upload(storagePath, fileObj, {
          upsert: true,
          contentType: fileObj.type || "application/octet-stream",
        });

      if (upErr) {
        throw new Error(upErr.message || "Upload failed");
      }

      // 3) COMPLETE (flip project to processing)
      const completeRes = await fetch("/api/upload/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      if (!completeRes.ok) {
        const msg = await completeRes.text();
        throw new Error(msg || "Complete failed");
      }

      toast.success("Upload complete. Redirecting…");
      setTimeout(() => router.push("/dashboard?processing=1"), 900);
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong.");
    } finally {
      setSubmittingFile(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <ToastContainer theme="dark" position="top-right" />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold mb-6">Upload</h1>

        {/* Mode tabs */}
        <div className="mb-6 inline-flex rounded-2xl bg-[#0F172A] p-1">
          <button
            className={`px-4 py-2 rounded-2xl transition ${
              mode === "link" ? "bg-[#2A6CF6]" : "hover:bg-[#111827]"
            }`}
            onClick={() => setMode("link")}
          >
            Link
          </button>
          <button
            className={`px-4 py-2 rounded-2xl transition ${
              mode === "file" ? "bg-[#2A6CF6]" : "hover:bg-[#111827]"
            }`}
            onClick={() => setMode("file")}
          >
            File
          </button>
        </div>

        {mode === "link" && (
          <form onSubmit={handleSubmitLink} className="space-y-6 rounded-2xl bg-[#0F172A] p-6">
            {/* Source type */}
            <div className="grid gap-2">
              <label className="text-sm text-gray-300">Source</label>
              <select
                className="rounded-xl bg-[#0B0F1A] px-3 py-2 outline-none focus:ring-2 focus:ring-[#2A6CF6]"
                value={sourceType}
                onChange={(e) =>
                  setSourceType(e.target.value as "youtube" | "twitch" | "rumble")
                }
              >
                <option value="youtube">YouTube</option>
                <option value="twitch">Twitch</option>
                <option value="rumble">Rumble</option>
              </select>
            </div>

            {/* URL */}
            <div className="grid gap-2">
              <label className="text-sm text-gray-300">Video URL</label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                className="rounded-xl bg-[#0B0F1A] px-3 py-2 outline-none focus:ring-2 focus:ring-[#2A6CF6]"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* Options */}
            <OptionsPanel
              language={language}
              setLanguage={setLanguage}
              clipCount={clipCount}
              setClipCount={setClipCount}
              subtitleStyle={subtitleStyle}
              setSubtitleStyle={setSubtitleStyle}
              exportSize={exportSize}
              setExportSize={setExportSize}
              generateTrailer={generateTrailer}
              setGenerateTrailer={setGenerateTrailer}
              indexForCompilations={indexForCompilations}
              setIndexForCompilations={setIndexForCompilations}
            />

            <button
              type="submit"
              disabled={submittingLink}
              className="rounded-2xl bg-[#2A6CF6] px-4 py-2 font-medium transition hover:opacity-90 disabled:opacity-50"
            >
              {submittingLink ? "Starting…" : "Start Processing"}
            </button>
          </form>
        )}

        {mode === "file" && (
          <form onSubmit={handleSubmitFile} className="space-y-6 rounded-2xl bg-[#0F172A] p-6">
            {/* File input */}
            <div className="grid gap-2">
              <label className="text-sm text-gray-300">Video File</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setFileObj(f);
                }}
                className="rounded-xl bg-[#0B0F1A] px-3 py-2 outline-none focus:ring-2 focus:ring-[#2A6CF6]"
              />
              <p className="text-xs text-gray-500">Common video formats are supported.</p>
            </div>

            {/* Options */}
            <OptionsPanel
              language={language}
              setLanguage={setLanguage}
              clipCount={clipCount}
              setClipCount={setClipCount}
              subtitleStyle={subtitleStyle}
              setSubtitleStyle={setSubtitleStyle}
              exportSize={exportSize}
              setExportSize={setExportSize}
              generateTrailer={generateTrailer}
              setGenerateTrailer={setGenerateTrailer}
              indexForCompilations={indexForCompilations}
              setIndexForCompilations={setIndexForCompilations}
            />

            <button
              type="submit"
              disabled={submittingFile || !fileObj}
              className="rounded-2xl bg-[#2A6CF6] px-4 py-2 font-medium transition hover:opacity-90 disabled:opacity-50"
            >
              {submittingFile ? "Uploading…" : "Upload & Process"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function OptionsPanel(props: {
  language: string;
  setLanguage: (v: string) => void;
  clipCount: number;
  setClipCount: (v: number) => void;
  subtitleStyle: string;
  setSubtitleStyle: (v: string) => void;
  exportSize: "1080x1920" | "720x1280";
  setExportSize: (v: "1080x1920" | "720x1280") => void;
  generateTrailer: boolean;
  setGenerateTrailer: (v: boolean) => void;
  indexForCompilations: boolean;
  setIndexForCompilations: (v: boolean) => void;
}) {
  const {
    language,
    setLanguage,
    clipCount,
    setClipCount,
    subtitleStyle,
    setSubtitleStyle,
    exportSize,
    setExportSize,
    generateTrailer,
    setGenerateTrailer,
    indexForCompilations,
    setIndexForCompilations,
  } = props;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm text-gray-300">Language</label>
          <input
            type="text"
            className="rounded-xl bg-[#0B0F1A] px-3 py-2 outline-none focus:ring-2 focus:ring-[#2A6CF6]"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-gray-300">Clip count</label>
          <input
            type="number"
            min={1}
            max={20}
            className="rounded-xl bg-[#0B0F1A] px-3 py-2 outline-none focus:ring-2 focus:ring-[#2A6CF6]"
            value={clipCount}
            onChange={(e) => setClipCount(Number(e.target.value))}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-gray-300">Subtitles</label>
          <select
            className="rounded-xl bg-[#0B0F1A] px-3 py-2 outline-none focus:ring-2 focus:ring-[#2A6CF6]"
            value={subtitleStyle}
            onChange={(e) => setSubtitleStyle(e.target.value)}
          >
            <option value="clean">Clean</option>
            <option value="bold">Bold</option>
            <option value="karaoke">Karaoke</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-gray-300">Export size</label>
          <select
            className="rounded-xl bg-[#0B0F1A] px-3 py-2 outline-none focus:ring-2 focus:ring-[#2A6CF6]"
            value={exportSize}
            onChange={(e) =>
              setExportSize(e.target.value as "1080x1920" | "720x1280")
            }
          >
            <option value="1080x1920">1080x1920</option>
            <option value="720x1280">720x1280</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="inline-flex items-center gap-3">
          <input
            type="checkbox"
            checked={generateTrailer}
            onChange={(e) => setGenerateTrailer(e.target.checked)}
          />
          <span>Generate narrative trailer</span>
        </label>

        <label className="inline-flex items-center gap-3">
          <input
            type="checkbox"
            checked={indexForCompilations}
            onChange={(e) => setIndexForCompilations(e.target.checked)}
          />
          <span>Index for theme compilations</span>
        </label>
      </div>
    </>
  );
}
