import {createClient} from "@supabase/supabase-js";

import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  hasSupabaseServiceEnv
} from "./env";

export function getSupabaseAdminClient() {
  if (!hasSupabaseServiceEnv()) {
    return null;
  }

  return createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
