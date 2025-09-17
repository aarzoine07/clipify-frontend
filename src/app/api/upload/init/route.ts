import { NextResponse } from "next/server";
import { z } from "zod";
import supabase from "@/lib/supabase/admin";

// Input schema
const BodySchema = z.object({
  sourceType: z.enum(["file", "youtube", "twitch", "rumble"]),
  url: z.string().url().optional(),
  options: z.object({
    language: z.string(),
    clipCount: z.number().int().min(1).max(20),
    subtitleStyle: z.string(),
    exportSize: z.enum(["1080x1920", "720x1280"]),
    generateTrailer: z.boolean(),
    indexForCompilations: z.boolean(),
  }),
});

// Helpers
function twoHoursAgoISO() {
  return new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = BodySchema.parse(json);

    // idempotency check
    if (parsed.url) {
      const { data: existing } = await supabase
        .from("projects")
        .select("id, created_at")
        .eq("source_url", parsed.url)
        .gte("created_at", twoHoursAgoISO())
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ projectId: existing.id });
      }
    }

    // insert project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        source_type: parsed.sourceType,
        source_url: parsed.url ?? null,
        status: parsed.sourceType === "file" ? "uploading" : "processing",
        options: parsed.options,
        workspace_id: "mock-workspace", // TODO: replace with session
      })
      .select("id")
      .single();

    if (projectError) {
      return new NextResponse(projectError.message, { status: 400 });
    }

    // insert jobs
    const jobs = [
      { project_id: project.id, type: "transcribe" },
      { project_id: project.id, type: "detect_highlights" },
    ];
    if (parsed.options.generateTrailer) {
      jobs.push({ project_id: project.id, type: "render_trailer" });
    }

    const { error: jobsError } = await supabase.from("jobs").insert(jobs);
    if (jobsError) {
      return new NextResponse(jobsError.message, { status: 400 });
    }

    if (parsed.sourceType === "file") {
      const storagePath = `projects/${project.id}/source`;
      return NextResponse.json({ projectId: project.id, storagePath });
    } else {
      return NextResponse.json({ projectId: project.id });
    }
  } catch (err: any) {
    return new NextResponse(err.message || "Invalid request", { status: 400 });
  }
}
