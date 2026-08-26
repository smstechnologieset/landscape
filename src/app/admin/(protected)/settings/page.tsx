import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  if (!data || data.role !== "admin") {
    return (
      <div className="card mx-auto max-w-lg p-8 text-center">
        <h1 className="text-xl font-bold text-red-700">Access denied</h1>
        <p className="mt-2 text-sm text-gray-600">Only administrators can edit site settings.</p>
      </div>
    );
  }

  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Site Settings</h1>
      <div className="card p-6">
        <SettingsForm data={(settings ?? {}) as Record<string, string>} />
      </div>
    </div>
  );
}
