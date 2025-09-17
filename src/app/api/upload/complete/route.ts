import { NextResponse } from "next/server";
import { z } from "zod";
import supabase from "@/lib/supabase/admin";

const BodySchema = z.object({
  projectId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = BodySchema.parse(json);

    const { data, error } = await supabase
      .from("projects")
      .update({ status: "processing" })
      .eq("id", parsed.projectId)
      .select("id, status")
      .single();

    if (error) {
      return new NextResponse(error.message, { status: 400 });
    }

    return NextResponse.json({ projectId: data.id, status: data.status });
  } catch (err: any) {
    const msg = err?.message || "Invalid request";
    return new NextResponse(msg, { status: 400 });
  }
}
