"use client";
import Link from "next/link";
import Image from "next/image";
import { Item, LiftHover, Shimmer, Stagger } from "../components/anim";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  status: "draft" | "processing" | "ready";
  duration: string;
};

const MOCK: Project[] = [
  {
    id: "1",
    title: "Podcast Ep. 12",
    status: "processing",
    duration: "01:20:33",
  },
  { id: "2", title: "Livestream AMA", status: "draft", duration: "00:48:05" },
  {
    id: "3",
    title: "Tutorial – React Hooks",
    status: "ready",
    duration: "00:32:11",
  },
];

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Project[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setRows(MOCK);
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Shimmer key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <Stagger>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((p) => (
          <Item key={p.id}>
            <LiftHover>
              <Link
                href={`/projects/${p.id}`}
                className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{p.title}</div>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs capitalize opacity-90">
                    {p.status}
                  </span>
                </div>
                <div className="mt-2 text-xs text-zinc-400">
                  Duration: {p.duration}
                </div>
                <div className="mt-3 h-24 rounded-lg bg-white/5" />
              </Link>
            </LiftHover>
          </Item>
        ))}
      </div>
    </Stagger>
  );
}
