import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://coksxzifntucyotsarvs.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNva3N4emlmbnR1Y3lvdHNhcnZzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MzA4MjcwMiwiZXhwIjoyMTA4NjU4NzAyfQ.nNLSJMnJTG9b3gQlALB0OexUIENXdXK5Od-WGZYM05g";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  console.log("==> Initializing Supabase Project Setup...");

  // 1. Create or Update Storage Buckets
  const buckets = [
    "site-assets",
    "general-media",
    "service-images",
    "project-images",
    "blog-images",
    "documents"
  ];

  console.log("==> Checking and creating storage buckets...");
  for (const bucket of buckets) {
    const { data: existing, error: getErr } = await supabase.storage.getBucket(bucket);
    if (!existing || getErr) {
      const { error: createErr } = await supabase.storage.createBucket(bucket, {
        public: true,
        fileSizeLimit: 15 * 1024 * 1024 // 15MB
      });
      if (createErr) {
        console.warn(`  [bucket] Could not create '${bucket}':`, createErr.message);
      } else {
        console.log(`  [bucket] Created bucket '${bucket}' (public)`);
      }
    } else {
      console.log(`  [bucket] Bucket '${bucket}' already exists`);
    }
  }

  // 2. Provision Admin User in auth.users
  const adminEmail = "admin@pinnaclelandscapesolution.com";
  const adminPassword = "admin@pinnacle678";

  console.log(`==> Provisioning Admin User (${adminEmail})...`);
  const { data: userList, error: listErr } = await supabase.auth.admin.listUsers();
  if (listErr) {
    console.error("  [auth] Could not list users:", listErr.message);
  } else {
    const existingAdmin = userList.users.find(
      (u) => u.email?.toLowerCase() === adminEmail.toLowerCase()
    );

    if (existingAdmin) {
      console.log(`  [auth] Admin user exists (ID: ${existingAdmin.id}). Updating password and metadata...`);
      const { error: updateErr } = await supabase.auth.admin.updateUserById(existingAdmin.id, {
        password: adminPassword,
        email_confirm: true,
        user_metadata: { role: "admin", full_name: "Pinnacle Admin" }
      });
      if (updateErr) {
        console.error("  [auth] Failed to update admin user:", updateErr.message);
      } else {
        console.log("  [auth] Admin user password and metadata updated successfully!");
      }
    } else {
      console.log(`  [auth] Creating new admin user: ${adminEmail}...`);
      const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
        user_metadata: { role: "admin", full_name: "Pinnacle Admin" }
      });
      if (createErr) {
        console.error("  [auth] Failed to create admin user:", createErr.message);
      } else {
        console.log(`  [auth] Admin user created successfully! (ID: ${newUser.user?.id})`);
      }
    }
  }

  console.log("==> Setup script completed.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
