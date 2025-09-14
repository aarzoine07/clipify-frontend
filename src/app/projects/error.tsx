"use client";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-6">
      <h1 className="text-2xl font-bold mb-2">Projects</h1>
      <p className="text-sm text-red-300 mb-4">
        Something went wrong loading projects.
      </p>
      <div className="rounded-lg border border-red-800 bg-red-900/10 p-4 text-sm">
        {error?.message || "Unknown error"}
      </div>
      <button
        onClick={reset}
        className="mt-4 px-3 py-1.5 rounded-lg bg-[#2A6CF6] hover:bg-[#1E5BB8]"
      >
        Try again
      </button>
    </div>
  );
}
