"use client";

import { createBrowserClient } from "@supabase/ssr";

const DEFAULT_URL = "https://mbyuestjedfvdvsaqfho.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieXVlc3RqZWRmdmR2c2FxZmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NzYzMDUsImV4cCI6MjEwNjI1MjMwNX0.7J7CU6nGRidSmbigMRld8HT0Vlj9WPzShGGry48-tvw";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY
  );
}

