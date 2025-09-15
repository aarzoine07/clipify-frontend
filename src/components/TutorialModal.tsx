"use client";

import { useEffect, useRef } from "react";

type TutorialModalProps = {
  open: boolean;
  onClose: () => void;
};

const TOPICS = [
  "Welcome & Layout Tour",
  "Connect TikTok",
  "Upload a File or Link",
  "Auto-Generate Clips",
  "Understanding Hook Score v1",
  "Review Your Clips",
  "Edit a Clip",
  "Generate a Trailer",
  "Create a Theme Compilation",
  "Schedule & Calendar",
  "Publish to TikTok",
  "Analytics Basics",
  "Brand Presets & Settings",
  "Troubleshooting & Retries",
];

export default function TutorialModal({ open, onClose }: TutorialModalProps) {
  // --- early return so nothing mounts when closed ---
  if (!open) return null;

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstFocusRef = useRef<HTMLInputElement | null>(null);
  const lastFocusRef = useRef<HTMLButtonElement | null>(null);

  // focus the search input on open
  useEffect(() => {
    firstFocusRef.current?.focus();
  }, []);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // very small focus trap
  const onTrapKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      (last as HTMLElement).focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      (first as HTMLElement).focus();
    }
  };

  return (
    <div
      aria-hidden={!open}
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorials-title"
    >
      {/* backdrop */}
      <button
        aria-label="Close tutorials"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div
        ref={dialogRef}
        onKeyDown={onTrapKeyDown}
        className="relative mx-auto mt-24 w-[min(900px,92vw)] rounded-xl border border-slate-700 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
          <h2 id="tutorials-title" className="text-lg font-semibold text-white">
            Tutorials
          </h2>
          <button
            ref={lastFocusRef}
            onClick={onClose}
            className="rounded-md px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>

        <div className="px-5 py-4">
          {/* search (no real filtering yet) */}
          <label htmlFor="tutorial-search" className="sr-only">
            Search tutorials
          </label>
          <input
            ref={firstFocusRef}
            id="tutorial-search"
            placeholder="Search (placeholder)"
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* list */}
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {TOPICS.map((title) => (
              <li
                key={title}
                className="rounded-lg border border-slate-800 bg-slate-950/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-200">{title}</span>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Placeholder content.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
