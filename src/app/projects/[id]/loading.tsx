export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-6">
      <div className="mb-6">
        <div className="h-6 w-48 bg-gray-800 rounded mb-2 animate-pulse" />
        <div className="h-4 w-72 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Actions bar */}
      <div className="flex gap-2 mb-4">
        <div className="h-9 w-20 bg-gray-800 rounded animate-pulse" />
        <div className="h-9 w-28 bg-gray-800 rounded animate-pulse" />
        <div className="h-9 w-40 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Tabs row */}
      <div className="h-10 w-64 bg-gray-800 rounded animate-pulse mb-4" />

      {/* Panel */}
      <div className="h-48 rounded-lg bg-gray-900 animate-pulse border border-gray-800" />
    </div>
  );
}
