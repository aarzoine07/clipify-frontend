"use client";

import { useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Range = "7d" | "30d" | "90d";

type Metric = {
  label: string;
  value: number | string;
  sublabel?: string;
};

const METRICS_7D: Metric[] = [
  { label: "Total views", value: 12840, sublabel: "+12% vs prior" },
  { label: "Avg. watch time", value: "01:42", sublabel: "+6%" },
  { label: "Clips published", value: 18, sublabel: "3 drafts" },
  { label: "Engagement rate", value: "4.7%", sublabel: "+0.4pp" },
];

const METRICS_30D: Metric[] = [
  { label: "Total views", value: 50312, sublabel: "+9% vs prior" },
  { label: "Avg. watch time", value: "01:38", sublabel: "+3%" },
  { label: "Clips published", value: 61, sublabel: "9 drafts" },
  { label: "Engagement rate", value: "4.4%", sublabel: "+0.2pp" },
];

const METRICS_90D: Metric[] = [
  { label: "Total views", value: 152304, sublabel: "+14% vs prior" },
  { label: "Avg. watch time", value: "01:36", sublabel: "+5%" },
  { label: "Clips published", value: 182, sublabel: "22 drafts" },
  { label: "Engagement rate", value: "4.5%", sublabel: "+0.3pp" },
];

const TOP_CLIPS = [
  { title: "Podcast Ep. 12 — teaser", views: 8421, ctr: 5.2, completion: 68 },
  { title: "Livestream AMA — highlight", views: 6114, ctr: 4.6, completion: 59 },
  { title: "Hooks tutorial — tip #3", views: 4980, ctr: 6.1, completion: 72 },
  { title: "Theme compilations — vol. 2", views: 4212, ctr: 4.1, completion: 55 },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("7d");

  const metrics = useMemo<Metric[]>(() => {
    switch (range) {
      case "30d":
        return METRICS_30D;
      case "90d":
        return METRICS_90D;
      default:
        return METRICS_7D;
    }
  }, [range]);

  return (
    <div className="p-8 text-white">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Analytics</h1>

        <div className="w-40">
          <Select value={range} onValueChange={(v: Range) => setRange(v)}>
            <SelectTrigger className="bg-slate-900 border-slate-700">
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card
            key={m.label}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
          >
            <div className="text-sm text-slate-400">{m.label}</div>
            <div className="mt-1 text-2xl font-semibold">
              {typeof m.value === "number"
                ? m.value.toLocaleString()
                : m.value}
            </div>
            {m.sublabel ? (
              <div className="mt-1 text-xs text-slate-500">{m.sublabel}</div>
            ) : null}
          </Card>
        ))}
      </div>

      {/* Chart placeholder */}
      <Card className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-3 text-sm font-medium text-slate-300">
          Views over time
        </div>
        <div
          className="h-56 w-full rounded-lg border border-dashed border-slate-700 bg-slate-950/40"
          aria-label="Chart placeholder"
        />
        <div className="mt-2 text-xs text-slate-500">
          (Chart coming soon — this box is a placeholder.)
        </div>
      </Card>

      {/* Top clips */}
      <Card className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-3 text-sm font-medium text-slate-300">
          Top clips
        </div>
        <div className="grid gap-3">
          {TOP_CLIPS.map((c) => (
            <div
              key={c.title}
              className="rounded-lg border border-slate-800 bg-slate-950/40 p-3"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-slate-400">
                  {c.views.toLocaleString()} views
                </div>
              </div>
              <div className="mt-2 grid gap-2 md:grid-cols-3">
                <div className="text-xs text-slate-400">
                  CTR: <span className="text-slate-200">{c.ctr}%</span>
                </div>
                <div className="text-xs text-slate-400 md:text-center">
                  Completion:{" "}
                  <span className="text-slate-200">{c.completion}%</span>
                </div>
                <div className="md:text-right">
                  <Progress value={c.completion} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
