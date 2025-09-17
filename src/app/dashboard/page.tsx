"use client";

import { useEffect, useState } from "react";
import ProcessingBanner from "@/components/ProcessingBanner";

type Item = {
  id: string;
  title: string;
  status: "uploading" | "processing" | "ready" | string;
  createdAt: string;
  clipCount?: number;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "processing" | "ready">("all");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const r = await fetch("/api/upload/list", { cache: "no-store" });
        if (!r.ok) throw new Error(await r.text());
        const j = (await r.json()) as { items: Item[] };
        if (mounted) setItems(j.items || []);
      } catch (e: any) {
        if (mounted) setErr(e?.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    const t = setInterval(load, 5000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  const filtered =
    activeTab === "all"
      ? items
      : items.filter((i) =>
          activeTab === "processing" ? i.status !== "ready" : i.status === "ready"
        );

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>

        <ProcessingBanner />

        <div className="mb-6 inline-flex rounded-2xl bg-[#0F172A] p-1">
          <button
            className={`px-4 py-2 rounded-2xl transition ${
              activeTab === "all" ? "bg-[#2A6CF6]" : "hover:bg-[#111827]"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-2xl transition ${
              activeTab === "processing" ? "bg-[#2A6CF6]" : "hover:bg-[#111827]"
            }`}
            onClick={() => setActiveTab("processing")}
          >
            Processing
          </button>
          <button
            className={`px-4 py-2 rounded-2xl transition ${
              activeTab === "ready" ? "bg-[#2A6CF6]" : "hover:bg-[#111827]"
            }`}
            onClick={() => setActiveTab("ready")}
          >
            Ready
          </button>
        </div>

        <div className="rounded-2xl bg-[#0F172A] p-6">
          {loading && <p className="text-sm text-gray-400">Loading…</p>}
          {!loading && err && <p className="text-sm text-red-400">{err}</p>}
          {!loading && !err && filtered.length === 0 && (
            <p className="text-sm text-gray-400">No projects yet.</p>
          )}
          {!loading && !err && filtered.length > 0 && (
            <ul className="divide-y divide-gray-800">
              {filtered.map((p) => (
                <li key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <a href={`/projects/${p.id}`} className="font-medium hover:underline">
                      {p.title}
                    </a>
                    <p className="text-xs text-gray-400">
                      {new Date(p.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        p.status === "ready"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {p.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {p.clipCount ?? 0} clips
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
