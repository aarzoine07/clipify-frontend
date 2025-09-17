import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { projectId, workspaceId, path, sizeBytes, contentType } = body;

    if (!projectId || !workspaceId || !path) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only key
    );

    const { error } = await supabase.from("uploads").insert({
      project_id: String(projectId),
      workspace_id: String(workspaceId),
      storage_path: String(path),
      size_bytes: sizeBytes ?? null,
      content_type: contentType ?? null,
      status: "done",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
