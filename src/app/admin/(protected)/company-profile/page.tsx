import { createAdminClient } from "@/lib/supabase/admin";
import CompanyBrandManager, {
  type CompanyBrandTab,
  type PartnerItem,
  type TestimonialItem
} from "@/components/admin/CompanyBrandManager";

export const metadata = { title: "Company & Brand | Admin Portal" };

interface PageProps {
  searchParams?: {
    tab?: CompanyBrandTab;
  };
}

export default async function AdminCompanyProfilePage({ searchParams }: PageProps) {
  const supabase = createAdminClient();

  const [profileRes, sustainabilityRes, partnersRes, testimonialsRes] = await Promise.all([
    supabase.from("company_profile").select("*").eq("id", 1).maybeSingle(),
    supabase.from("sustainability_content").select("*").eq("id", 1).maybeSingle(),
    supabase.from("partners").select("id, name, sort_order, is_published").order("sort_order"),
    supabase.from("testimonials").select("id, customer_name, company, rating, is_published").order("created_at", { ascending: false })
  ]);

  const partners: PartnerItem[] = (partnersRes.data || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    sort_order: p.sort_order ?? 0,
    is_published: Boolean(p.is_published)
  }));

  const testimonials: TestimonialItem[] = (testimonialsRes.data || []).map((t: any) => ({
    id: t.id,
    customer_name: t.customer_name,
    company: t.company || "",
    rating: Number(t.rating) || 5,
    is_published: Boolean(t.is_published)
  }));

  const defaultTab = searchParams?.tab || "profile";

  return (
    <div className="py-2">
      <CompanyBrandManager
        profileData={profileRes.data ?? {}}
        sustainabilityData={sustainabilityRes.data ?? {}}
        partners={partners}
        testimonials={testimonials}
        defaultTab={defaultTab}
      />
    </div>
  );
}
