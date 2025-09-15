import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// validate request body
const bodySchema = z.object({
  projectId: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid body", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { projectId } = parsed.data;

    // ✅ connect directly with anon key (no auth session required)
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

const { error } = await (supabase as any)
  .from("projects")
  .update({ status: "processing" })
  .eq("id", projectId);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Upload complete failed" },
      { status: 500 }
    );
  }
}
