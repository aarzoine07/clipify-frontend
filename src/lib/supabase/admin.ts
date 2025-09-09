// server-only Supabase client (uses service_role; do NOT import in client code)
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // same URL as anon client
  process.env.SUPABASE_SERVICE_ROLE!, // server-only key
  {
    auth: { persistSession: false },
  }
);
