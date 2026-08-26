import { createClient } from "@/lib/supabase/server";
import SustainabilityForm from "@/components/admin/SustainabilityForm";

export default async function AdminSustainabilityPage() {
  const supabase = createClient();
  const { data } = await supabase.from("sustainability_content").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Sustainability Content</h1>
      <div className="card p-6">
        <SustainabilityForm data={(data ?? {}) as Record<string, unknown>} />
      </div>
    </div>
  );
}
