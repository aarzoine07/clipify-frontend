// Server-only Supabase client (uses service role)
// Never import this from the browser.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
