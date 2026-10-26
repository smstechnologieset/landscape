import { createAdminClient } from "@/lib/supabase/admin";
import CompanyBrandManager, {
  type CompanyBrandTab,
  type PartnerItem,
  type TestimonialItem
} from "@/components/admin/CompanyBrandManager";
import {
  DEFAULT_PROFILE,
  DEFAULT_SUSTAINABILITY,
  DEFAULT_PARTNERS,
  DEFAULT_TESTIMONIALS
} from "@/lib/queries";

export const dynamic = "force-dynamic";
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

  const pData = profileRes.data || {};
  const profileData = {
    ...DEFAULT_PROFILE,
    ...pData,
    hero_title: { ...DEFAULT_PROFILE.hero_title, ...(pData.hero_title || {}) },
    hero_description: { ...DEFAULT_PROFILE.hero_description, ...(pData.hero_description || {}) },
    company_description: { ...DEFAULT_PROFILE.company_description, ...(pData.company_description || {}) },
    about: { ...DEFAULT_PROFILE.about, ...(pData.about || {}) },
    mission: { ...DEFAULT_PROFILE.mission, ...(pData.mission || {}) },
    vision: { ...DEFAULT_PROFILE.vision, ...(pData.vision || {}) },
    values: { ...DEFAULT_PROFILE.values, ...(pData.values || {}) },
    company_story: { ...DEFAULT_PROFILE.company_story, ...(pData.company_story || {}) }
  };

  const sData = sustainabilityRes.data || {};
  const sustainabilityData = {
    ...DEFAULT_SUSTAINABILITY,
    ...sData,
    title: { ...DEFAULT_SUSTAINABILITY.title, ...(sData.title || {}) },
    introduction: { ...DEFAULT_SUSTAINABILITY.introduction, ...(sData.introduction || {}) },
    water_conservation: { ...DEFAULT_SUSTAINABILITY.water_conservation, ...(sData.water_conservation || {}) },
    native_plants: { ...DEFAULT_SUSTAINABILITY.native_plants, ...(sData.native_plants || {}) },
    environmental_responsibility: { ...DEFAULT_SUSTAINABILITY.environmental_responsibility, ...(sData.environmental_responsibility || {}) },
    eco_friendly_practices: { ...DEFAULT_SUSTAINABILITY.eco_friendly_practices, ...(sData.eco_friendly_practices || {}) },
    waste_reduction: { ...DEFAULT_SUSTAINABILITY.waste_reduction, ...(sData.waste_reduction || {}) },
    sustainable_design: { ...DEFAULT_SUSTAINABILITY.sustainable_design, ...(sData.sustainable_design || {}) }
  };

  const rawPartners = partnersRes.data && partnersRes.data.length > 0 ? partnersRes.data : DEFAULT_PARTNERS;
  const partners: PartnerItem[] = rawPartners.map((p: any) => ({
    id: p.id,
    name: p.name,
    sort_order: p.sort_order ?? 0,
    is_published: Boolean(p.is_published)
  }));

  const rawTestimonials = testimonialsRes.data && testimonialsRes.data.length > 0 ? testimonialsRes.data : DEFAULT_TESTIMONIALS;
  const testimonials: TestimonialItem[] = rawTestimonials.map((t: any) => ({
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
        profileData={profileData}
        sustainabilityData={sustainabilityData}
        partners={partners}
        testimonials={testimonials}
        defaultTab={defaultTab}
      />
    </div>
  );
}
