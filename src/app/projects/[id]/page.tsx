"use client";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FadeIn, Stagger, Item, LiftHover } from "../../components/anim";
import dynamic from "next/dynamic";
const TusUploader = dynamic(() => import("./TusUploader"), { ssr: false });
import {
  MOCK_PROJECT,
  MOCK_UPLOADS,
  MOCK_TRANSCRIPT,
  MOCK_HIGHLIGHTS,
  MOCK_CLIPS,
} from "../_mock";
import {
  CalendarClock,
  CheckCircle2,
  Loader2,
  UploadCloud,
} from "lucide-react";

type TabKey =
  | "overview"
  | "upload"
  | "transcript"
  | "highlights"
  | "clips"
  | "publish";
const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "upload", label: "Upload" },
  { key: "transcript", label: "Transcript" },
  { key: "highlights", label: "Highlights" },
  { key: "clips", label: "Clips" },
  { key: "publish", label: "Publish" },
];

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const sp = useSearchParams();

  // --- URL ↔ state sync ---
  const initial = (sp.get("tab") as TabKey) || "overview";
  const [tab, setTab] = useState<TabKey>(initial);

  // If user hits back/forward, keep state in sync
  useEffect(() => {
    const t = (sp.get("tab") as TabKey) || "overview";
    setTab(t);
  }, [sp]);

  const setTabAndPush = useCallback(
    (next: TabKey) => {
      const search = new URLSearchParams(Array.from(sp.entries()));
      search.set("tab", next);
      router.replace(`?${search.toString()}`, { scroll: false });
      setTab(next);
    },
    [router, sp]
  );

  // keyboard left/right to switch tabs
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      const idx = TABS.findIndex((t) => t.key === tab);
      if (idx < 0) return;
      const nextIdx =
        e.key === "ArrowRight"
          ? Math.min(TABS.length - 1, idx + 1)
          : Math.max(0, idx - 1);
      setTabAndPush(TABS[nextIdx].key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, setTabAndPush]);

  // pretend fetch by id
  const project = useMemo(
    () => ({ ...MOCK_PROJECT, id: params.id ?? "1" }),
    [params.id]
  );

  const currentIndex = TABS.findIndex((t) => t.key === tab);
  const progressPct = ((currentIndex + 1) / TABS.length) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div>
            <div className="text-sm text-zinc-400">Project</div>
            <div className="text-lg font-semibold">{project.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 px-2 py-1 text-xs capitalize opacity-90">
              {project.status}
            </span>
            <Button variant="secondary">New upload</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">More</Button>
          </div>
        </div>
      </FadeIn>

      {/* Sticky steps bar + tabs */}
      <div className="sticky top-[7.75rem] z-10 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
        {/* progress line */}
        <div className="relative mb-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {/* tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setTabAndPush(t.key)}
              className={[
                "rounded-xl px-3 py-1.5 text-sm transition-all",
                tab === t.key
                  ? "bg-purple-600/20 text-zinc-100 ring-1 ring-purple-500/40"
                  : "hover:bg-white/10 text-zinc-300",
              ].join(" ")}
              title={`Step ${i + 1} of ${TABS.length}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      {tab === "overview" && <OverviewPanel />}
      {tab === "upload" && <UploadPanel />}
      {tab === "transcript" && <TranscriptPanel />}
      {tab === "highlights" && <HighlightsPanel />}
      {tab === "clips" && <ClipsPanel />}
      {tab === "publish" && <PublishPanel />}
    </div>
  );
}

/* ------------------------ Panels (unchanged) ------------------------ */

function OverviewPanel() {
  return (
    <Stagger>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Item>
          <LiftHover>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">Created</div>
              <div className="mt-1 text-base font-medium">Just now</div>
            </div>
          </LiftHover>
        </Item>
        <Item>
          <LiftHover>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">Uploads</div>
              <div className="mt-1 text-base font-medium">
                {MOCK_UPLOADS.length}
              </div>
            </div>
          </LiftHover>
        </Item>
        <Item>
          <LiftHover>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-zinc-400">Clips</div>
              <div className="mt-1 text-base font-medium">
                {MOCK_CLIPS.length}
              </div>
            </div>
          </LiftHover>
        </Item>
      </div>
    </Stagger>
  );
}

function UploadPanel() {
  // Get the project id from the URL: /projects/:id
  const projectId =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[2]
      : "1";

  return (
    <div className="space-y-3">
      <TusUploader projectId={projectId} />
    </div>
  );
}

function TranscriptPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium">
          Transcript ({MOCK_TRANSCRIPT.language})
        </div>
        <input
          placeholder="Search transcript…"
          className="h-8 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
        />
      </div>
      <div className="space-y-2 text-sm leading-6 text-zinc-200">
        {MOCK_TRANSCRIPT.segments.map((s, i) => (
          <div
            key={i}
            className="rounded-lg border border-white/10 bg-white/5 p-3"
          >
            <span className="mr-2 rounded-md bg-white/5 px-1.5 py-0.5 text-xs text-zinc-400">
              {s.start.toString().padStart(2, "0")}s
            </span>
            {s.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function HighlightsPanel() {
  return (
    <div className="space-y-2">
      {MOCK_HIGHLIGHTS.map((h) => (
        <div
          key={h.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="font-medium">Highlight {h.id.toUpperCase()}</div>
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs opacity-80">
              Score {(h.score * 100).toFixed(0)}%
            </span>
          </div>
          <div className="mt-1 text-xs text-zinc-400">
            {h.start}s → {h.end}s • {h.reason}
          </div>
        </div>
      ))}
    </div>
  );
}

function ClipsPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {MOCK_CLIPS.map((c) => (
        <div
          key={c.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="h-28 rounded-lg bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10" />
          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="font-medium">Clip {c.id.toUpperCase()}</div>
            <div className="text-xs text-zinc-400">{c.duration}</div>
          </div>
          <div className="text-xs capitalize opacity-80">
            {c.status === "rendering" ? "Rendering…" : c.status}
          </div>
        </div>
      ))}
    </div>
  );
}

function PublishPanel() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">TikTok</div>
            <div className="text-xs text-zinc-400">Not connected</div>
          </div>
          <Button variant="secondary">Connect</Button>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 text-sm font-medium">Schedule</div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="datetime-local"
            className="h-9 rounded-md border border-white/10 bg-white/5 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
          />
          <Button className="bg-purple-600 hover:bg-purple-700">
            <CalendarClock className="mr-2 h-4 w-4" /> Queue
          </Button>
        </div>
      </div>
    </div>
  );
}
