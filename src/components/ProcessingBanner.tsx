"use client";

import { useEffect, useState } from "react";

export default function ProcessingBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("processing") === "1") {
      setShow(true);
      url.searchParams.delete("processing");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  if (!show) return null;

  return (
    <div className="mb-4 rounded-2xl border border-[#1E3A8A] bg-[#0F172A] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">Your upload is processing.</p>
          <p className="text-xs text-gray-400">
            You can keep working — we’ll update the Dashboard when clips are ready.
          </p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="rounded-xl bg-[#111827] px-3 py-1 text-sm text-gray-300 hover:opacity-80"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
