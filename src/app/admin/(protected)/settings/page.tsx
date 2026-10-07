import { createClient } from "@/lib/supabase/server";
import SettingsTeamManager, { type UserProfileItem } from "@/components/admin/SettingsTeamManager";

export const metadata = { title: "Settings & Administration | Admin Portal" };

interface PageProps {
  searchParams?: {
    tab?: "settings" | "users";
  };
}

export default async function AdminSettingsPage({ searchParams }: PageProps) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  if (!me || me.role !== "admin") {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center bg-white shadow-sm border border-gray-200">
        <h1 className="text-xl font-bold text-red-700">Access Restricted</h1>
        <p className="mt-2 text-sm text-gray-600">Only administrators have permission to manage site settings and user roles.</p>
      </div>
    );
  }

  const [settingsRes, profilesRes] = await Promise.all([
    supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("profiles").select("id, full_name, email, role, created_at").order("created_at")
  ]);

  const profiles: UserProfileItem[] = (profilesRes.data || []).map((p: any) => ({
    id: p.id,
    full_name: p.full_name,
    email: p.email,
    role: p.role,
    created_at: p.created_at
  }));

  const defaultTab = searchParams?.tab === "users" ? "users" : "settings";

  return (
    <div className="py-2">
      <SettingsTeamManager
        settingsData={(settingsRes.data ?? {}) as Record<string, string>}
        profiles={profiles}
        currentUserId={user?.id ?? ""}
        defaultTab={defaultTab}
      />
    </div>
  );
}
