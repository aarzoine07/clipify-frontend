import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabaseServer";

const BodySchema = z.object({
  sourceType: z.enum(["file", "youtube", "twitch", "rumble"]),
  url: z.string().url().optional(),
  options: z.object({
    language: z.string().min(2),
    clipCount: z.number().int().min(1).max(50),
    subtitleStyle: z.string(),
    exportSize: z.enum(["1080x1920", "720x1280"]),
    generateTrailer: z.boolean(),
    indexForCompilations: z.boolean(),
  }),
});

type Body = z.infer<typeof BodySchema>;

function err(code: string, message: string, status = 400) {
  return NextResponse.json({ ok: false, error: { code, message } }, { status });
}

export async function POST(req: NextRequest) {
  try {
    const { supabase, user } = await createServerSupabase();
    if (!user) return err("UNAUTHENTICATED", "You must be signed in.", 401);

    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("workspace_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileErr) return err("PROFILE_LOOKUP_FAILED", profileErr.message, 500);
    if (!profile?.workspace_id) return err("NO_WORKSPACE", "No workspace linked.", 403);
    const workspaceId = profile.workspace_id;

    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return err("BAD_REQUEST", parsed.error.flatten().formErrors.join("; "));
    }
    const body = parsed.data as Body;

    if (body.sourceType === "file" && body.url !== undefined) {
      return err("BAD_REQUEST", "`url` not allowed for file uploads");
    }
    if (body.sourceType !== "file" && !body.url) {
      return err("BAD_REQUEST", "`url` required for link uploads");
    }

    // Idempotency for link uploads
    if (body.sourceType !== "file" && body.url) {
      const { data: recent } = await supabase
        .from("projects")
        .select("id, created_at")
        .eq("workspace_id", workspaceId)
        .eq("source_url", body.url)
        .gte("created_at", new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString())
        .order("created_at", { ascending: false })
        .limit(1);

      if (recent?.length) {
        return NextResponse.json({ ok: true, projectId: recent[0].id });
      }
    }

    // Create new project
    const { data: newProject, error: createErr } = await supabase
      .from("projects")
      .insert({
        workspace_id: workspaceId,
        status: "uploading",
        source_type: body.sourceType,
        source_url: body.sourceType === "file" ? null : body.url ?? null,
        storage_path: null,
      })
      .select("id")
      .single();

    if (createErr || !newProject) {
      return err("PROJECT_CREATE_FAILED", createErr?.message || "Could not create project", 500);
    }

    const projectId = newProject.id;
    let storagePath: string | undefined;

    if (body.sourceType === "file") {
      storagePath = `projects/${workspaceId}/${projectId}/source.bin`;
      const { error: updateErr } = await supabase
        .from("projects")
        .update({ storage_path: storagePath })
        .eq("id", projectId)
        .eq("workspace_id", workspaceId);

      if (updateErr) return err("PROJECT_UPDATE_FAILED", updateErr.message, 500);
    }

    // Create jobs
    const jobs = [
      { type: "transcribe" },
      { type: "detect_highlights" },
      ...(body.options.generateTrailer ? [{ type: "render_trailer" }] : []),
      ...(body.options.indexForCompilations ? [{ type: "index_for_compilations" }] : []),
    ].map((j) => ({
      project_id: projectId,
      type: j.type,
      status: "queued",
    }));

    const { error: jobsErr } = await supabase.from("jobs").insert(jobs);
    if (jobsErr) {
      await supabase.from("projects").delete().eq("id", projectId).eq("workspace_id", workspaceId);
      return err("JOBS_CREATE_FAILED", jobsErr.message, 500);
    }

    return NextResponse.json(
      body.sourceType === "file"
        ? { ok: true, projectId, storagePath }
        : { ok: true, projectId }
    );
  } catch (e: any) {
    return err("UNEXPECTED", e?.message || "Something went wrong", 500);
  }
}
