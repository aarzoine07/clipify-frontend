"use client";

import { CircleHelp } from "lucide-react";

type HelpButtonProps = {
  onClick: () => void;
};

export default function HelpButton({ onClick }: HelpButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open tutorials"
      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <CircleHelp size={16} className="opacity-80" />
      Help
    </button>
  );
}
