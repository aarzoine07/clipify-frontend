import { NextResponse } from "next/server";
import supabase from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, status, created_at, clip_count")
      .order("created_at", { ascending: false })
      .limit(25);

    if (error) return new NextResponse(error.message, { status: 400 });

    const items = (data ?? []).map((p) => ({
      id: p.id,
      title: p.title ?? "Untitled",
      status: p.status as string,
      createdAt: p.created_at as string,
      clipCount: (p as any).clip_count ?? 0,
    }));

    return NextResponse.json({ items });
  } catch (e: any) {
    return new NextResponse(e?.message || "Failed", { status: 400 });
  }
}
