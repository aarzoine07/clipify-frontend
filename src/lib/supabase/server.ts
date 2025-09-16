// Simple server-side Supabase client (no auth session needed for now)
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export async function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const supabase = createClient<Database>(url, anon);

  // TEMP user shim so the rest of the code has a workspace_id to use.
  // Replace with real auth later.
  const user = { id: "dev-workspace" } as { id: string };

  return { supabase, user };
}
