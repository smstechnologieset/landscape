import { createAdminClient } from "@/lib/supabase/admin";
import { DEFAULT_TESTIMONIALS } from "@/lib/queries";
import { DEFAULT_HOME_CONTENT, HomePageContent } from "@/lib/home-defaults";
import HomePageManager from "@/components/admin/HomePageManager";

export const dynamic = "force-dynamic";
export const metadata = { title: "Home Page Management | Admin Portal" };

export default async function AdminHomePage() {
  const supabase = createAdminClient();

  const [profileRes, settingsRes, testimonialsRes] = await Promise.all([
    supabase.from("company_profile").select("*").eq("id", 1).maybeSingle(),
    supabase.from("site_settings").select("hero_slide_1, about_image").eq("id", 1).maybeSingle(),
    supabase
      .from("testimonials")
      .select("id, customer_name, company, rating, is_published")
      .order("created_at", { ascending: false })
  ]);

  const pData = (profileRes.data || {}) as Record<string, any>;
  const sData = (settingsRes.data || {}) as Record<string, any>;
  const rawTestimonials =
    testimonialsRes.data && testimonialsRes.data.length > 0
      ? testimonialsRes.data
      : DEFAULT_TESTIMONIALS;

  // Resolve saved home content, falling back to charter defaults
  const savedHome = pData.company_story?.home_content || pData.home_content || {};

  const initialContent: HomePageContent = {
    hero: {
      badge_date: savedHome.hero?.badge_date || DEFAULT_HOME_CONTENT.hero.badge_date,
      badge_subtitle: savedHome.hero?.badge_subtitle || DEFAULT_HOME_CONTENT.hero.badge_subtitle,
      headline: savedHome.hero?.headline || (pData.hero_title?.en ? pData.hero_title : DEFAULT_HOME_CONTENT.hero.headline),
      description: savedHome.hero?.description || (pData.hero_description?.en ? pData.hero_description : DEFAULT_HOME_CONTENT.hero.description),
      primary_btn: savedHome.hero?.primary_btn || DEFAULT_HOME_CONTENT.hero.primary_btn,
      secondary_btn: savedHome.hero?.secondary_btn || DEFAULT_HOME_CONTENT.hero.secondary_btn,
      metrics: savedHome.hero?.metrics || DEFAULT_HOME_CONTENT.hero.metrics,
      visual_card: savedHome.hero?.visual_card || DEFAULT_HOME_CONTENT.hero.visual_card,
      hero_image: sData.hero_slide_1 || savedHome.hero?.hero_image || DEFAULT_HOME_CONTENT.hero.hero_image
    },
    who_we_are: {
      eyebrow: savedHome.who_we_are?.eyebrow || DEFAULT_HOME_CONTENT.who_we_are.eyebrow,
      headline: savedHome.who_we_are?.headline || DEFAULT_HOME_CONTENT.who_we_are.headline,
      p1: savedHome.who_we_are?.p1 || DEFAULT_HOME_CONTENT.who_we_are.p1,
      p2: savedHome.who_we_are?.p2 || DEFAULT_HOME_CONTENT.who_we_are.p2,
      fact_badge: savedHome.who_we_are?.fact_badge || DEFAULT_HOME_CONTENT.who_we_are.fact_badge,
      pillar_specialization: savedHome.who_we_are?.pillar_specialization || DEFAULT_HOME_CONTENT.who_we_are.pillar_specialization,
      pillar_focus: savedHome.who_we_are?.pillar_focus || DEFAULT_HOME_CONTENT.who_we_are.pillar_focus,
      cta_btn: savedHome.who_we_are?.cta_btn || DEFAULT_HOME_CONTENT.who_we_are.cta_btn,
      image: sData.about_image || savedHome.who_we_are?.image || DEFAULT_HOME_CONTENT.who_we_are.image
    },
    why_choose_us: {
      eyebrow: savedHome.why_choose_us?.eyebrow || DEFAULT_HOME_CONTENT.why_choose_us.eyebrow,
      headline: savedHome.why_choose_us?.headline || DEFAULT_HOME_CONTENT.why_choose_us.headline,
      description: savedHome.why_choose_us?.description || DEFAULT_HOME_CONTENT.why_choose_us.description,
      team_image: savedHome.why_choose_us?.team_image || DEFAULT_HOME_CONTENT.why_choose_us.team_image,
      strengths: savedHome.why_choose_us?.strengths || DEFAULT_HOME_CONTENT.why_choose_us.strengths
    },
    cta_banner: {
      badge: savedHome.cta_banner?.badge || DEFAULT_HOME_CONTENT.cta_banner.badge,
      headline: savedHome.cta_banner?.headline || DEFAULT_HOME_CONTENT.cta_banner.headline,
      description: savedHome.cta_banner?.description || DEFAULT_HOME_CONTENT.cta_banner.description,
      primary_btn: savedHome.cta_banner?.primary_btn || DEFAULT_HOME_CONTENT.cta_banner.primary_btn,
      secondary_btn: savedHome.cta_banner?.secondary_btn || DEFAULT_HOME_CONTENT.cta_banner.secondary_btn
    }
  };

  return (
    <HomePageManager
      initialContent={initialContent}
      testimonials={rawTestimonials}
    />
  );
}
