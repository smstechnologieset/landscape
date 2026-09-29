import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = { title: "Admin Portal | Landscape Solution PLC", robots: { index: false, follow: false } };

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("ls_admin_session");

  let isAuthenticated = false;
  let userName = "admin@landscapesolution.et";
  let role: "admin" | "editor" = "admin";

  if (sessionCookie?.value) {
    isAuthenticated = true;
    userName = sessionCookie.value;
    role = "admin";
  }

  // If session cookie is not found, check Supabase as fallback
  if (!isAuthenticated && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        isAuthenticated = true;
        userName = user.email || "Admin";
        const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).maybeSingle();
        if (profile?.role) role = profile.role as "admin" | "editor";
        if (profile?.full_name) userName = profile.full_name;
      }
    } catch {
      // Ignored
    }
  }

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader userName={userName} role={role} />
        <main className="flex-1 overflow-x-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
