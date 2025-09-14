import ProjectCard from "@/components/ProjectCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const MOCK_IDS = ["1", "2", "3", "4", "5", "6"];

export default async function ProjectsIndexPage() {
  const count = MOCK_IDS.length;

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-6">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold tracking-[-0.01em]">Projects</h1>
        <p className="text-sm text-gray-400">
          Search and filter your projects (placeholders).
        </p>
      </header>

      {/* Slim divider for structure */}
      <div className="h-px w-full bg-gray-900 mb-6" />

      {/* Filters row */}
      <section aria-label="Filters" className="mb-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder="Search projects…"
            className="w-full md:max-w-sm bg-[#0F172A] border-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-[#2A6CF6]"
          />
          <div className="flex items-center gap-3">
            <label htmlFor="status" className="text-sm text-gray-400">
              Status
            </label>
            <Select defaultValue="all">
              <SelectTrigger
                id="status"
                className="w-40 bg-[#0F172A] border-gray-800 text-white focus:ring-0"
              >
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F172A] border-gray-800">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="posted">Posted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results meta */}
        <div className="mt-2 text-xs text-gray-500" aria-live="polite">
          {count === 0
            ? "No results"
            : `${count} result${count > 1 ? "s" : ""}`}
        </div>
      </section>

      {/* Grid / Empty state */}
      <section
        aria-label="Projects grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {MOCK_IDS.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-gray-800 bg-[#0F172A] p-10 text-center">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gray-900 text-gray-400">
              📁
            </div>
            <h2 className="text-sm font-medium text-gray-200">
              No projects yet
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Upload a video from the Dashboard to create your first project.
            </p>
          </div>
        ) : (
          MOCK_IDS.map((id, i) => (
            <ProjectCard
              key={id}
              id={id}
              title={`Project ${id}`}
              status={i % 3 === 0 ? "Posted" : i % 3 === 1 ? "Ready" : "Draft"}
            />
          ))
        )}
      </section>
    </div>
  );
}
