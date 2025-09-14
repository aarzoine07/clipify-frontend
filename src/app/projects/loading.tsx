export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-6">
      <div className="mb-6">
        <div className="h-6 w-40 bg-gray-800 rounded mb-2 animate-pulse" />
        <div className="h-4 w-72 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Search+Filter skeleton */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-6">
        <div className="h-10 w-full md:max-w-sm bg-gray-800 rounded animate-pulse" />
        <div className="h-10 w-40 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-800">
            <div className="aspect-video bg-gray-900 animate-pulse rounded-t-xl" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/5 bg-gray-800 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-800 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
