import { createAdminClient } from "@/lib/supabase/admin";
import {
  DEFAULT_SUSTAINABILITY_CONTENT,
  SustainabilityPageContent
} from "@/lib/sustainability-defaults";
import SustainabilityPageManager from "@/components/admin/SustainabilityPageManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "Sustainability Page Management — All Visual Sections | Admin Portal" };

export default async function AdminSustainabilityPage() {
  const supabase = createAdminClient();

  const [sustainabilityRes, settingsRes] = await Promise.all([
    supabase.from("sustainability_content").select("*").eq("id", 1).maybeSingle(),
    supabase.from("site_settings").select("sustainability_image").eq("id", 1).maybeSingle()
  ]);

  const sData = (sustainabilityRes.data || {}) as Record<string, any>;
  const settingsData = (settingsRes.data || {}) as Record<string, any>;

  // Resolve saved full sustainability content
  const savedFull =
    sData.introduction?.full_content ||
    (typeof sData.statistics === "object" && !Array.isArray(sData.statistics) ? sData.statistics?.full_content : null) ||
    {};

  const initialContent: SustainabilityPageContent = {
    hero: {
      badge: savedFull.hero?.badge || DEFAULT_SUSTAINABILITY_CONTENT.hero.badge,
      title: savedFull.hero?.title || (sData.title?.en ? sData.title : DEFAULT_SUSTAINABILITY_CONTENT.hero.title),
      description: savedFull.hero?.description || DEFAULT_SUSTAINABILITY_CONTENT.hero.description,
      image: settingsData.sustainability_image || savedFull.hero?.image || DEFAULT_SUSTAINABILITY_CONTENT.hero.image
    },
    national_context: {
      eyebrow: savedFull.national_context?.eyebrow || DEFAULT_SUSTAINABILITY_CONTENT.national_context.eyebrow,
      headline: savedFull.national_context?.headline || DEFAULT_SUSTAINABILITY_CONTENT.national_context.headline,
      p1:
        savedFull.national_context?.p1 ||
        (sData.introduction?.p1
          ? sData.introduction.p1
          : sData.introduction?.en
          ? { en: sData.introduction.en, am: sData.introduction.am }
          : DEFAULT_SUSTAINABILITY_CONTENT.national_context.p1),
      p2:
        savedFull.national_context?.p2 ||
        (sData.introduction?.p2 ? sData.introduction.p2 : DEFAULT_SUSTAINABILITY_CONTENT.national_context.p2),
      statistics:
        Array.isArray(sData.statistics) && sData.statistics.length > 0
          ? sData.statistics
          : savedFull.national_context?.statistics || DEFAULT_SUSTAINABILITY_CONTENT.national_context.statistics
    },
    pillars_section: {
      eyebrow: savedFull.pillars_section?.eyebrow || DEFAULT_SUSTAINABILITY_CONTENT.pillars_section.eyebrow,
      headline: savedFull.pillars_section?.headline || DEFAULT_SUSTAINABILITY_CONTENT.pillars_section.headline,
      subtitle: savedFull.pillars_section?.subtitle || DEFAULT_SUSTAINABILITY_CONTENT.pillars_section.subtitle,
      pillars: savedFull.pillars_section?.pillars || DEFAULT_SUSTAINABILITY_CONTENT.pillars_section.pillars
    },
    initiatives_section: {
      eyebrow: savedFull.initiatives_section?.eyebrow || DEFAULT_SUSTAINABILITY_CONTENT.initiatives_section.eyebrow,
      headline: savedFull.initiatives_section?.headline || DEFAULT_SUSTAINABILITY_CONTENT.initiatives_section.headline,
      items:
        Array.isArray(sData.initiatives) && sData.initiatives.length > 0
          ? sData.initiatives
          : savedFull.initiatives_section?.items || DEFAULT_SUSTAINABILITY_CONTENT.initiatives_section.items
    },
    cta: {
      headline: savedFull.cta?.headline || DEFAULT_SUSTAINABILITY_CONTENT.cta.headline,
      subtitle: savedFull.cta?.subtitle || DEFAULT_SUSTAINABILITY_CONTENT.cta.subtitle,
      primary_btn_text: savedFull.cta?.primary_btn_text || DEFAULT_SUSTAINABILITY_CONTENT.cta.primary_btn_text,
      primary_btn_url: savedFull.cta?.primary_btn_url || DEFAULT_SUSTAINABILITY_CONTENT.cta.primary_btn_url,
      secondary_btn_text: savedFull.cta?.secondary_btn_text || DEFAULT_SUSTAINABILITY_CONTENT.cta.secondary_btn_text,
      secondary_btn_url: savedFull.cta?.secondary_btn_url || DEFAULT_SUSTAINABILITY_CONTENT.cta.secondary_btn_url
    }
  };

  return <SustainabilityPageManager initialContent={initialContent} />;
}
