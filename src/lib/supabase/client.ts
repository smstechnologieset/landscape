"use client";

import { createBrowserClient } from "@supabase/ssr";

const DEFAULT_URL = "https://coksxzifntucyotsarvs.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNva3N4emlmbnR1Y3lvdHNhcnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwODI3MDIsImV4cCI6MjEwODY1ODcwMn0.vsqiJ7DXEDIlYE8VvcKxs4IKOJJo574QOzZ4GXlegOo";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY
  );
}

