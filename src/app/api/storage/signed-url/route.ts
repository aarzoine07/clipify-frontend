import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

/**
 * GET /api/storage/signed-url?path=videos/dev/PROJECT/ulid-filename.mp4
 * - "path" may be "bucket/remaining/object/path"
 * - We split the first segment as bucket, join the rest as object key.
 * - Returns { url } or { error }
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path")?.trim();
    if (!path) {
      return NextResponse.json(
        { error: "Missing 'path' query param" },
        { status: 400 }
      );
    }

    // Expect "bucket/objectKey..."
    const parts = path.split("/").filter(Boolean);
    if (parts.length < 2) {
      return NextResponse.json(
        { error: "Invalid path format" },
        { status: 400 }
      );
    }
    const bucket = parts[0];
    const object = parts.slice(1).join("/");

    // Sign for 10 minutes (600 seconds)
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .createSignedUrl(object, 600);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ url: data?.signedUrl ?? null });
  } catch (e: any) {
    return NextResponse.json(
      { error: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
