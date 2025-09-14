import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

/**
 * Static mock data to make the page feel full.
 * You can trim or expand later; this is server-only.
 */
const MOCK_ITEMS: {
  id: string;
  title: string;
  status: "Draft" | "Ready" | "Posted";
  hook: number;
  kind: "clip" | "project";
}[] = [
  {
    id: "1",
    title: "Podcast Ep. 12 — Cold Open",
    status: "Ready",
    hook: 78,
    kind: "clip",
  },
  {
    id: "2",
    title: "Webinar Q&A — Part 1",
    status: "Draft",
    hook: 61,
    kind: "clip",
  },
  {
    id: "3",
    title: "How to Grow on TikTok",
    status: "Posted",
    hook: 86,
    kind: "project",
  },
  {
    id: "4",
    title: "Founder AMA — Best Moments",
    status: "Ready",
    hook: 74,
    kind: "clip",
  },
  {
    id: "5",
    title: "Weekly Standup Highlights",
    status: "Draft",
    hook: 58,
    kind: "project",
  },
  {
    id: "6",
    title: "Podcast Ep. 11 — Trailer",
    status: "Posted",
    hook: 91,
    kind: "clip",
  },
  {
    id: "7",
    title: "Customer Stories Montage",
    status: "Ready",
    hook: 82,
    kind: "project",
  },
  {
    id: "8",
    title: "Livestream Recap — Top Hooks",
    status: "Posted",
    hook: 88,
    kind: "clip",
  },
];

export default async function LibraryPage() {
  const count = MOCK_ITEMS.length;
  const posted = MOCK_ITEMS.filter((x) => x.status === "Posted").length;
  const ready = MOCK_ITEMS.filter((x) => x.status === "Ready").length;
  const draft = MOCK_ITEMS.filter((x) => x.status === "Draft").length;

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-[-0.01em]">Library</h1>
        <p className="text-sm text-gray-400">
          All clips and projects in one place (placeholders).
        </p>
      </header>

      {/* Slim divider for structure */}
      <div className="h-px w-full bg-gray-900 mb-6" />

      {/* Filters — borderless, minimal */}
      <section aria-label="Filters" className="mb-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col">
            <label htmlFor="search" className="text-sm text-gray-400 mb-1">
              Search
            </label>
            <Input
              id="search"
              placeholder="Search library…"
              className="bg-[#0F172A] border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#2A6CF6]"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="status" className="text-sm text-gray-400 mb-1">
              Status
            </label>
            <Select defaultValue="all">
              <SelectTrigger
                id="status"
                className="bg-[#0F172A] border-gray-800 text-white focus:ring-0"
              >
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F172A] border-gray-800">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="posted">Posted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="hook" className="text-sm text-gray-400 mb-1">
              Hook Score
            </label>
            <Select defaultValue="any">
              <SelectTrigger
                id="hook"
                className="bg-[#0F172A] border-gray-800 text-white focus:ring-0"
              >
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F172A] border-gray-800">
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="60+">60+</SelectItem>
                <SelectItem value="70+">70+</SelectItem>
                <SelectItem value="80+">80+</SelectItem>
                <SelectItem value="90+">90+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results meta */}
        <div className="mt-2 text-xs text-gray-500" aria-live="polite">
          {count === 0 ? "No results" : `${count} item${count > 1 ? "s" : ""}`}
        </div>
      </section>

      {/* Quick stats row (borderless KPIs to fill space nicely) */}
      <section
        aria-label="Stats"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
      >
        <div>
          <p className="text-sm text-gray-400 mb-1">Total Items</p>
          <h2 className="text-3xl font-semibold">{count}</h2>
          <p className="text-xs text-gray-500 mt-1">
            Clips & projects combined
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Posted</p>
          <h2 className="text-3xl font-semibold">{posted}</h2>
          <p className="text-xs text-gray-500 mt-1">Live on platforms</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Ready</p>
          <h2 className="text-3xl font-semibold">{ready}</h2>
          <p className="text-xs text-gray-500 mt-1">Ready to schedule/post</p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Draft</p>
          <h2 className="text-3xl font-semibold">{draft}</h2>
          <p className="text-xs text-gray-500 mt-1">Work-in-progress</p>
        </div>
      </section>

      {/* Saved searches (chips) */}
      <section aria-label="Saved searches" className="mb-6">
        <div className="flex flex-wrap gap-2">
          {["Hook 80+", "Ready this week", "Posted last 30d", "Draft only"].map(
            (label) => (
              <span
                key={label}
                className="text-xs px-3 py-1 rounded-full bg-[#0F172A] border border-gray-900 text-gray-300"
                aria-label={`Saved search: ${label}`}
              >
                {label}
              </span>
            )
          )}
        </div>
      </section>

      {/* Results grid */}
      <section
        aria-label="Results"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {count === 0 ? (
          <div className="col-span-full max-w-3xl mx-auto text-center">
            <div className="rounded-xl border border-dashed border-gray-800/80 p-10">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gray-900 text-gray-300">
                📁
              </div>
              <h2 className="text-sm font-medium text-gray-200">
                Your library is empty
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Upload a video to generate clips and start building your
                library.
              </p>
              <Link
                href="/upload"
                className="inline-block mt-4 px-4 py-2 rounded-lg bg-[#2A6CF6] hover:bg-[#1E5BB8] text-white text-sm"
              >
                Upload a video
              </Link>
            </div>
          </div>
        ) : (
          MOCK_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-transparent transition-all hover:bg-gray-900/30 hover:-translate-y-[1px]"
            >
              <div className="aspect-video rounded-xl bg-[#0F172A] grid place-items-center text-gray-500 text-xs relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-transparent to-[#1E293B] opacity-80" />
                <span className="relative z-10">({item.kind} thumbnail)</span>
              </div>
              <div className="px-2.5 py-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-medium truncate">{item.title}</h3>
                  <span
                    className={[
                      "text-[10px] px-2 py-0.5 rounded-full",
                      item.status === "Posted"
                        ? "text-emerald-300 bg-emerald-900/15"
                        : item.status === "Ready"
                        ? "text-yellow-300 bg-yellow-900/15"
                        : "text-gray-300 bg-gray-800/40",
                    ].join(" ")}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  Hook Score {item.hook}
                </p>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Recently viewed (secondary section to fill page) */}
      <section aria-label="Recently viewed" className="mt-10">
        <h2 className="text-base font-semibold mb-3">Recently viewed</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {MOCK_ITEMS.slice(0, 6).map((item) => (
            <div
              key={`recent-${item.id}`}
              className="rounded-xl bg-[#0F172A] h-24 grid place-items-center text-[11px] text-gray-400"
            >
              {item.title.length > 28
                ? item.title.slice(0, 28) + "…"
                : item.title}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
