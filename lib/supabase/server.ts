import {createClient} from "@supabase/supabase-js";

import {getSupabaseAnonKey, getSupabaseUrl, hasSupabaseBrowserEnv} from "./env";

export function getSupabaseServerClient() {
  if (!hasSupabaseBrowserEnv()) {
    return null;
  }

  return createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
