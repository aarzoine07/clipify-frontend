"use client";

import { useState } from "react";
import Link from "next/link";
import HelpButton from "@/components/HelpButton";
import TutorialModal from "@/components/TutorialModal";

type TopbarProps = {
  title?: string;
};

export default function Topbar({ title = "" }: TopbarProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 backdrop-blur">
        {/* Left: Workspace switcher */}
        <div className="flex items-center gap-2">
          <label htmlFor="workspace" className="sr-only">
            Workspace
          </label>
          <select
            id="workspace"
            className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue="Personal"
          >
            <option>Personal</option>
            <option>Team</option>
          </select>
        </div>

        {/* Center: Title */}
        <div className="text-sm font-medium text-slate-300">{title}</div>

        {/* Right: Help + status + upload */}
        <div className="flex items-center gap-3">
          <HelpButton onClick={() => setHelpOpen(true)} />

          <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
            Disconnected
          </span>

          <Link
            href="/upload"
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            New Upload
          </Link>
        </div>
      </header>

      {helpOpen && <TutorialModal onClose={() => setHelpOpen(false)} open={false} />}
    </>
  );
}
