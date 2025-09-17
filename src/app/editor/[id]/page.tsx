"use client";

import { useParams } from "next/navigation";

export default function EditorPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-2xl font-semibold mb-4">Clip Editor (stub)</h1>
        <p className="text-sm text-gray-400 mb-6">Project ID: {id}</p>

        <div className="grid gap-6 md:grid-cols-[360px,1fr]">
          <div className="rounded-2xl bg-[#0F172A] p-4">
            <h2 className="text-sm font-medium mb-3">Clips</h2>
            <p className="text-xs text-gray-400">No clips yet.</p>
          </div>

          <div className="rounded-2xl bg-[#0F172A] p-4">
            <div className="aspect-[9/16] w-full rounded-xl bg-black/60 flex items-center justify-center">
              <span className="text-xs text-gray-500">Preview 9:16</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="rounded-xl bg-[#2A6CF6] px-4 py-2 text-sm hover:opacity-90">
                Generate Captions
              </button>
              <button className="rounded-xl bg-[#111827] px-4 py-2 text-sm text-gray-200 hover:opacity-80">
                Export 1080x1920
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href="/dashboard"
            className="rounded-2xl bg-[#111827] px-4 py-2 text-sm text-gray-200 hover:opacity-80"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
