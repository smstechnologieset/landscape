import { createClient } from "@/lib/supabase/server";
import CompanyProfileForm from "@/components/admin/CompanyProfileForm";

export default async function AdminCompanyProfilePage() {
  const supabase = createClient();
  const { data } = await supabase.from("company_profile").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Company Profile</h1>
      <div className="card p-6">
        <CompanyProfileForm data={(data ?? {}) as never} />
      </div>
    </div>
  );
}
