import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics • Cliply",
};

export default async function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-6">
      {/* Page Heading */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-gray-400">
          High-level publishing performance and queue health (placeholders).
        </p>
      </header>

      {/* KPI Row (no boxes) */}
      <section
        aria-label="Key metrics"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
      >
        <div>
          <p className="text-sm text-gray-400 mb-1">Total Clips</p>
          <h2 className="text-3xl font-semibold">—</h2>
          <p className="text-xs text-gray-500 mt-1">
            Clips processed across all projects
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Success Rate</p>
          <h2 className="text-3xl font-semibold">—%</h2>
          <p className="text-xs text-gray-500 mt-1">
            Posted / attempted (7d rolling)
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Avg Time to Post</p>
          <h2 className="text-3xl font-semibold">—</h2>
          <p className="text-xs text-gray-500 mt-1">
            From ready → published (median)
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Failures (24h)</p>
          <h2 className="text-3xl font-semibold">—</h2>
          <p className="text-xs text-gray-500 mt-1">Posting errors</p>
        </div>
      </section>

      {/* Tabs (UI only) */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-xl border border-gray-800 bg-[#0F172A] p-1">
          <button
            type="button"
            className="px-3 py-1.5 text-sm rounded-lg bg-[#2A6CF6] text-white"
            aria-current="page"
          >
            Clips
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-sm rounded-lg text-gray-300 hover:bg-gray-800"
          >
            Compilations
          </button>
        </div>
      </div>

      {/* Main Content Split (no boxes) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Publishing Outcomes */}
        <section className="xl:col-span-2">
          <h2 className="text-base font-semibold mb-2">Publishing Outcomes</h2>
          <p className="text-sm text-gray-400 mb-4">
            Placeholder area reserved for a chart
          </p>
          <div
            aria-label="Chart placeholder"
            className="h-72 w-full rounded-lg border border-dashed border-gray-700 bg-[#0B0F1A] flex items-center justify-center text-gray-500"
          >
            (Chart goes here)
          </div>
          <div className="flex gap-4 mt-3 text-[11px] text-gray-300">
            <span className="inline-flex items-center gap-1">
              <i className="w-2 h-2 rounded-full bg-green-500 inline-block" />{" "}
              Posted
            </span>
            <span className="inline-flex items-center gap-1">
              <i className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />{" "}
              Scheduled
            </span>
            <span className="inline-flex items-center gap-1">
              <i className="w-2 h-2 rounded-full bg-red-500 inline-block" />{" "}
              Failed
            </span>
          </div>
        </section>

        {/* Right Column */}
        <div className="space-y-10">
          <section>
            <h2 className="text-base font-semibold mb-2">Queue Health</h2>
            <p className="text-sm text-gray-400 mb-4">Static placeholders</p>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-300">Last 24h Attempts</span>
              <span className="text-sm font-semibold text-white">—</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-gray-300">Last Error</span>
              <span className="text-sm font-semibold text-white">—</span>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">Recent Activity</h2>
            <p className="text-sm text-gray-400 mb-4">
              Latest publish attempts (placeholder table)
            </p>
            <div className="rounded-md border border-dashed border-gray-700">
              <div className="grid grid-cols-3 text-xs text-gray-400">
                <div className="px-3 py-2">Clip</div>
                <div className="px-3 py-2">Status</div>
                <div className="px-3 py-2">Time</div>
              </div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="grid grid-cols-3 text-sm text-gray-300">
                  <div className="px-3 py-2 border-t border-gray-800">—</div>
                  <div className="px-3 py-2 border-t border-gray-800">—</div>
                  <div className="px-3 py-2 border-t border-gray-800">—</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">Platform Breakdown</h2>
            <p className="text-sm text-gray-400 mb-4">
              Placeholder legend grid
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2A6CF6]"></span>{" "}
                TikTok
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>{" "}
                YouTube
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>{" "}
                Instagram
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                Other
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
