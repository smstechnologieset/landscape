import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_ABOUT_CONTENT, AboutPageContent } from "@/lib/about-defaults";
import { DEFAULT_PARTNERS } from "@/lib/queries";
import AboutPageManager from "@/components/admin/AboutPageManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "About Us Page Editor — All Visual Sections | Admin Portal" };

export default async function AdminAboutPage() {
  const supabase = createAdminClient();

  const [profileRes, settingsRes, partnersRes] = await Promise.all([
    supabase.from("company_profile").select("*").eq("id", 1).maybeSingle(),
    supabase.from("site_settings").select("about_image, hero_slide_2, brochure_url").eq("id", 1).maybeSingle(),
    supabase.from("partners").select("id, name, website_url, description, is_published").order("sort_order")
  ]);

  const pData = (profileRes.data || {}) as Record<string, any>;
  const sData = (settingsRes.data || {}) as Record<string, any>;
  const partners = partnersRes.data && partnersRes.data.length > 0 ? partnersRes.data : DEFAULT_PARTNERS;

  // Resolve saved about page structured content
  const savedAbout = pData.about?.full_about_content || pData.company_story?.about_content || {};

  const initialContent: AboutPageContent = {
    hero: {
      badge: savedAbout.hero?.badge || DEFAULT_ABOUT_CONTENT.hero.badge,
      title: savedAbout.hero?.title || (pData.hero_title?.en ? pData.hero_title : DEFAULT_ABOUT_CONTENT.hero.title),
      description: savedAbout.hero?.description || (pData.hero_description?.en ? pData.hero_description : DEFAULT_ABOUT_CONTENT.hero.description),
      image: sData.hero_slide_2 || savedAbout.hero?.image || DEFAULT_ABOUT_CONTENT.hero.image
    },
    background_context: {
      eyebrow: savedAbout.background_context?.eyebrow || DEFAULT_ABOUT_CONTENT.background_context.eyebrow,
      headline: savedAbout.background_context?.headline || DEFAULT_ABOUT_CONTENT.background_context.headline,
      p1: savedAbout.background_context?.p1 || (pData.about?.p1 ? pData.about.p1 : DEFAULT_ABOUT_CONTENT.background_context.p1),
      p2: savedAbout.background_context?.p2 || (pData.about?.p2 ? pData.about.p2 : DEFAULT_ABOUT_CONTENT.background_context.p2),
      p3: savedAbout.background_context?.p3 || DEFAULT_ABOUT_CONTENT.background_context.p3,
      quote: savedAbout.background_context?.quote || (pData.company_story?.en ? pData.company_story : DEFAULT_ABOUT_CONTENT.background_context.quote),
      image: sData.about_image || savedAbout.background_context?.image || DEFAULT_ABOUT_CONTENT.background_context.image,
      city_tag: savedAbout.background_context?.city_tag || DEFAULT_ABOUT_CONTENT.background_context.city_tag,
      brand_title: savedAbout.background_context?.brand_title || DEFAULT_ABOUT_CONTENT.background_context.brand_title,
      established_year: savedAbout.background_context?.established_year || DEFAULT_ABOUT_CONTENT.background_context.established_year,
      headquarters: savedAbout.background_context?.headquarters || DEFAULT_ABOUT_CONTENT.background_context.headquarters,
      brochure_url: sData.brochure_url || pData.brochure_url || savedAbout.background_context?.brochure_url || DEFAULT_ABOUT_CONTENT.background_context.brochure_url,
      brochure_btn_label: savedAbout.background_context?.brochure_btn_label || DEFAULT_ABOUT_CONTENT.background_context.brochure_btn_label
    },
    vision_mission: {
      vision_badge: savedAbout.vision_mission?.vision_badge || DEFAULT_ABOUT_CONTENT.vision_mission.vision_badge,
      vision: savedAbout.vision_mission?.vision || (pData.vision?.en ? pData.vision : DEFAULT_ABOUT_CONTENT.vision_mission.vision),
      mission_badge: savedAbout.vision_mission?.mission_badge || DEFAULT_ABOUT_CONTENT.vision_mission.mission_badge,
      mission: savedAbout.vision_mission?.mission || (pData.mission?.en ? pData.mission : DEFAULT_ABOUT_CONTENT.vision_mission.mission),
      mission_subtitle: savedAbout.vision_mission?.mission_subtitle || DEFAULT_ABOUT_CONTENT.vision_mission.mission_subtitle
    },
    objectives: {
      eyebrow: savedAbout.objectives?.eyebrow || DEFAULT_ABOUT_CONTENT.objectives.eyebrow,
      headline: savedAbout.objectives?.headline || DEFAULT_ABOUT_CONTENT.objectives.headline,
      general_badge: savedAbout.objectives?.general_badge || DEFAULT_ABOUT_CONTENT.objectives.general_badge,
      general_objective: savedAbout.objectives?.general_objective || DEFAULT_ABOUT_CONTENT.objectives.general_objective,
      specific: savedAbout.objectives?.specific || DEFAULT_ABOUT_CONTENT.objectives.specific
    },
    values_section: {
      eyebrow: savedAbout.values_section?.eyebrow || DEFAULT_ABOUT_CONTENT.values_section.eyebrow,
      headline: savedAbout.values_section?.headline || DEFAULT_ABOUT_CONTENT.values_section.headline,
      items: Array.isArray(pData.values) && pData.values.length > 0
        ? pData.values
        : (savedAbout.values_section?.items || DEFAULT_ABOUT_CONTENT.values_section.items)
    },
    strategic_engagement: {
      eyebrow: savedAbout.strategic_engagement?.eyebrow || DEFAULT_ABOUT_CONTENT.strategic_engagement.eyebrow,
      headline: savedAbout.strategic_engagement?.headline || DEFAULT_ABOUT_CONTENT.strategic_engagement.headline,
      description: savedAbout.strategic_engagement?.description || DEFAULT_ABOUT_CONTENT.strategic_engagement.description
    }
  };

  return <AboutPageManager initialContent={initialContent} partners={partners as any} />;
}
