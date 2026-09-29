import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://mbyuestjedfvdvsaqfho.supabase.co";
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ieXVlc3RqZWRmdmR2c2FxZmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDY3NjMwNSwiZXhwIjoyMTA2MjUyMzA1fQ.lGCPUkypRVx8qzqMHf4fXbeX6moWoXfPw0IcuXfzDxk";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function main() {
  console.log("Checking Supabase connection to:", SUPABASE_URL);

  // 1. Check if tables exist
  const { data: services, error: servicesErr } = await supabase.from("services").select("id, slug, title").limit(5);
  if (servicesErr) {
    console.log("Tables not yet found in Supabase:", servicesErr.message);
    console.log("Please run the SQL file 'supabase/complete_setup.sql' in your Supabase SQL Editor:");
    console.log("-> https://supabase.com/dashboard/project/mbyuestjedfvdvsaqfho/sql/new");
    return;
  }

  console.log("Found services table! Count:", services?.length);

  // 2. Check admin user
  const { data: usersData } = await supabase.auth.admin.listUsers();
  console.log("Total auth users:", usersData?.users?.length);
  const adminUser = usersData?.users?.find(u => u.email === "admin@landscapesolution.et");
  if (adminUser) {
    console.log("Admin user confirmed:", adminUser.id, adminUser.email);
    // Ensure profile row exists with admin role
    const { error: profileErr } = await supabase.from("profiles").upsert({
      id: adminUser.id,
      full_name: "System Administrator",
      email: adminUser.email,
      role: "admin"
    });
    if (!profileErr) {
      console.log("Admin profile confirmed with role 'admin'");
    }
  }

  // 3. Count records
  const [
    { count: sCount },
    { count: pCount },
    { count: bCount },
    { count: jCount },
    { count: iCount }
  ] = await Promise.all([
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }),
    supabase.from("contact_inquiries").select("*", { count: "exact", head: true })
  ]);

  console.log("Supabase Database Status:");
  console.log("- Services:", sCount);
  console.log("- Projects:", pCount);
  console.log("- Blog Posts:", bCount);
  console.log("- Jobs:", jCount);
  console.log("- Contact Inquiries:", iCount);
}

main().catch(console.error);
