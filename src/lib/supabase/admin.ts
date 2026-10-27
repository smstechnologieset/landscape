import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const DEFAULT_URL = "https://coksxzifntucyotsarvs.supabase.co";
const DEFAULT_SERVICE_ROLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNva3N4emlmbnR1Y3lvdHNhcnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzA4MjcwMiwiZXhwIjoyMTA4NjU4NzAyfQ.nNLSJMnJTG9b3gQlALB0OexUIENXdXK5Od-WGZYM05g";

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
