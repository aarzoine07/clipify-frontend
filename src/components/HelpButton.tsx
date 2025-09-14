"use client";

import { useEffect, useRef, useState } from "react";

const TOPICS = [
  "Intro to Cliply",
  "Uploading videos",
  "Library & search",
  "Projects overview",
  "Light clip editor",
  "Captions & presets",
  "Narrative Trailer",
  "Theme Compilations",
  "Scheduling calendar",
  "Analytics basics",
  "Queue health",
  "TikTok connect",
  "Brand presets",
  "Workspace & billing",
];

export default function HelpButton() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Open: remember previous focus, move focus into modal. Close: restore focus.
  useEffect(() => {
    if (!open) return;

    prevFocusRef.current = document.activeElement as HTMLElement;

    const root = dialogRef.current;
    if (!root) return;

    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));

    (focusables[0] ?? root).focus();

    // Handle Esc + Tab cycle
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Restore focus when closing
  useEffect(() => {
    if (!open && prevFocusRef.current) {
      prevFocusRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open Help"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-800/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Help
      </button>

      {open && (
        <div
          aria-modal="true"
          role="dialog"
          aria-labelledby="help-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="w-full max-w-2xl rounded-2xl border border-slate-800/60 bg-[#0F172A] p-4 outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 id="help-title" className="text-base font-semibold text-slate-200">
                Help / Tutorials (14 topics)
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800/50"
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <ul className="mt-4 grid gap-2 md:grid-cols-2">
              {TOPICS.map((t) => (
                <li
                  key={t}
                  className="rounded-xl border border-slate-800/60 px-3 py-2 text-sm text-slate-200"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-4 text-xs text-slate-400">
              Press <kbd>Esc</kbd> or click outside to close. Videos coming soon.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
