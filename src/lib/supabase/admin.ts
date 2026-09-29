import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const DEFAULT_URL = "https://mbyuestjedfvdvsaqfho.supabase.co";
const DEFAULT_SERVICE_ROLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieXVlc3RqZWRmdmR2c2FxZmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDY3NjMwNSwiZXhwIjoyMTA2MjUyMzA1fQ.lGCPUkypRVx8qzqMHf4fXbeX6moWoXfPw0IcuXfzDxk";

/**
 * Server-only client using the service role key.
 * NEVER import this file from a client component.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SERVICE_ROLE,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
