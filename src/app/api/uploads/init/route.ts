import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerSupabase } from "../../../../lib/supabase/server";
import { supabaseAdmin } from "../../../../lib/supabase/admin";
import type { Database } from "../../../../types/supabase";

// Validate the incoming body
const bodySchema = z.object({
  sourceType: z.enum(["file", "youtube", "twitch", "rumble"]),
  url: z.string().url().optional(),
  options: z.object({
    language: z.string(),
    clipCount: z.number(),
    subtitleStyle: z.string(),
    exportSize: z.enum(["1080x1920", "720x1280"]),
    generateTrailer: z.boolean(),
    indexForCompilations: z.boolean(),
  }),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = bodySchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.format() },
        { status: 400 }
      );
    }
    const body = parsed.data;

    // Get a signed-in server client (stub workspace from user for now)
    const { supabase, user } = await createServerSupabase();
    const workspaceId = user?.id ?? "anon-workspace"; // TODO: replace with real workspace

    // If link source, check last 2 hours for a matching project to dedupe
    if (body.sourceType !== "file" && body.url) {
      const since = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

      const { data: recent } = await supabase
        .from("project") // ✅ correct table name
        .select("id, created_at")
        .eq("workspace_id", workspaceId)
        .eq("source_url", body.url)
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(1);

      if (recent?.length) {
        return NextResponse.json({ projectId: recent[0].id });
      }
    }

    // Create the project
    const insertPayload: Database["public"]["Tables"]["project"]["Insert"] = {
      workspace_id: workspaceId,
      status: "uploading",
      source_type: body.sourceType,
      source_url: body.sourceType === "file" ? null : body.url ?? null,
      storage_path: null,
    };

    const { data: created, error: createErr } = await supabase
      .from("project") // ✅ correct table name
      .insert(insertPayload)
      .select("id")
      .single();

    if (createErr || !created) {
      return NextResponse.json(
        { error: createErr?.message ?? "Failed to create project" },
        { status: 500 }
      );
    }

    const projectId = created.id;

    // For file uploads, set storage_path and return it
    if (body.sourceType === "file") {
      const storagePath = `videos/private/${projectId}/source.bin`;

      const updatePayload: Database["public"]["Tables"]["project"]["Update"] = {
        storage_path: storagePath,
      };

      const { error: updErr } = await supabaseAdmin
        .from("project") // ✅ correct table name
        .update(updatePayload)
        .eq("id", projectId);

      if (updErr) {
        return NextResponse.json(
          { error: `Failed to set storage_path: ${updErr.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({ projectId, storagePath });
    }

    // Link sources just return projectId
    return NextResponse.json({ projectId });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Init failed" },
      { status: 500 }
    );
  }
}
