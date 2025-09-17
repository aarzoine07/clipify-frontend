import { notFound } from "next/navigation";
import supabase from "@/lib/supabase/server";

type Props = {
  params: { id: string };
};

export default async function ProjectPage({ params }: Props) {
  const { id } = params;

  const { data: project, error } = await supabase
    .from("projects")
    .select("id, title, status, created_at, options, clip_count")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {project.title ?? "Untitled Project"}
          </h1>
          <p className="text-xs text-gray-400">
            Created {new Date(project.created_at as string).toLocaleString()}
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs ${
              project.status === "ready"
                ? "bg-green-600/20 text-green-400"
                : "bg-yellow-600/20 text-yellow-400"
            }`}
          >
            {project.status}
          </span>
          <span className="text-xs text-gray-400">
            {(project as any).clip_count ?? 0} clips
          </span>
        </div>

        <div className="rounded-2xl bg-[#0F172A] p-6">
          <h2 className="mb-3 text-lg font-medium">Options</h2>
          <pre className="whitespace-pre-wrap break-words text-xs text-gray-300">
            {JSON.stringify(project.options, null, 2)}
          </pre>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={`/editor/${project.id}`}
            className="rounded-2xl bg-[#2A6CF6] px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Open Editor (stub)
          </a>
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
