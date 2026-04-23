"use client";

import {createClient} from "@supabase/supabase-js";

import {getSupabaseAnonKey, getSupabaseUrl, hasSupabaseBrowserEnv} from "./env";

let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!hasSupabaseBrowserEnv()) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(getSupabaseUrl(), getSupabaseAnonKey());
  }

  return browserClient;
}
