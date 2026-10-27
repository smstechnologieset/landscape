import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import { COMPANY_INFO } from "@/lib/company-data";
import { getCompanyProfile, getPartners, getSiteSettings } from "@/lib/queries";
import { DEFAULT_ABOUT_CONTENT } from "@/lib/about-defaults";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "About Us | Landscape Solution PLC",
  description:
    "Learn about Landscape Solution PLC, established in 2026 in Addis Ababa, dedicated to professional landscaping, urban greening, and environmental restoration in Ethiopia."
};

export default async function AboutPage() {
  const [locale, profile, partners, settings] = await Promise.all([
    getLocale(),
    getCompanyProfile(),
    getPartners(),
    getSiteSettings()
  ]);
  const dict = getDictionary(locale);

  // Structured about page content with fallbacks
  const savedAbout = (profile as any)?.about?.full_about_content || (profile as any)?.company_story?.about_content || {};

  const hero = {
    ...DEFAULT_ABOUT_CONTENT.hero,
    ...(savedAbout.hero || {}),
    title: savedAbout.hero?.title || (profile?.hero_title?.en ? profile.hero_title : DEFAULT_ABOUT_CONTENT.hero.title),
    description: savedAbout.hero?.description || (profile?.hero_description?.en ? profile.hero_description : DEFAULT_ABOUT_CONTENT.hero.description),
    image: settings?.hero_slide_2 || savedAbout.hero?.image || DEFAULT_ABOUT_CONTENT.hero.image
  };

  const bg = {
    ...DEFAULT_ABOUT_CONTENT.background_context,
    ...(savedAbout.background_context || {}),
    image: settings?.about_image || savedAbout.background_context?.image || DEFAULT_ABOUT_CONTENT.background_context.image,
    brochure_url: settings?.brochure_url || profile?.brochure_url || savedAbout.background_context?.brochure_url || DEFAULT_ABOUT_CONTENT.background_context.brochure_url
  };

  const visionMission = {
    ...DEFAULT_ABOUT_CONTENT.vision_mission,
    ...(savedAbout.vision_mission || {}),
    vision: savedAbout.vision_mission?.vision || (profile?.vision?.en ? profile.vision : DEFAULT_ABOUT_CONTENT.vision_mission.vision),
    mission: savedAbout.vision_mission?.mission || (profile?.mission?.en ? profile.mission : DEFAULT_ABOUT_CONTENT.vision_mission.mission)
  };

  const objectives = {
    ...DEFAULT_ABOUT_CONTENT.objectives,
    ...(savedAbout.objectives || {})
  };

  const valuesItems = (Array.isArray(profile?.values) && profile.values.length > 0)
    ? profile.values
    : (savedAbout.values_section?.items || DEFAULT_ABOUT_CONTENT.values_section.items);

  const strategicEngagement = {
    ...DEFAULT_ABOUT_CONTENT.strategic_engagement,
    ...(savedAbout.strategic_engagement || {})
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.image || "/images/hero_landscape.jpg"}
            alt="Ethiopian highland green landscape and sustainable architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-transparent" />
        </div>

        <div className="container-page relative z-10 py-20">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2 mb-6 shadow-xl border border-brand-800/30">
              <div className="relative h-7 w-24">
                <Image src={settings?.logo_url || "/images/logo.png"} alt="Landscape Solution PLC" fill sizes="96px" className="object-contain" priority />
              </div>
              <span className="h-4 w-px bg-gray-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-950">
                {hero.badge[locale] || hero.badge.en}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {hero.title[locale] || hero.title.en}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {hero.description[locale] || hero.description.en}
            </p>
          </div>
        </div>
      </section>

      {/* 2. COMPANY BACKGROUND & NARRATIVE */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Quick Highlights & Image */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-brand-100 img-zoom">
                  <Image
                    src={bg.image || "/images/who_we_are.jpg"}
                    alt="Landscape Solution PLC team of landscape architects in Addis Ababa"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-mono text-xs uppercase tracking-wider text-sprout-400">
                      {bg.city_tag[locale] || bg.city_tag.en}
                    </p>
                    <p className="mt-1 font-serif text-xl font-medium">
                      {bg.brand_title || "Landscape Solution PLC"}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                {/* Official Brand Identity Card */}
                <div className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm flex items-center gap-4 mb-4">
                  <div className="relative h-12 w-28 shrink-0 bg-brand-950 p-2 rounded-lg flex items-center justify-center">
                    <Image src={settings?.logo_url || "/images/logo.png"} alt="Landscape Solution PLC Logo" fill sizes="112px" className="object-contain p-1" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-brand-950 leading-tight">Landscape Solution PLC</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{COMPANY_INFO.building}, {COMPANY_INFO.floor}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800">
                    {locale === "am" ? "ቁልፍ መረጃዎች" : "Company Fundamentals"}
                  </h4>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-brand-100 pb-2">
                      <dt className="text-gray-500">{locale === "am" ? "የተመሰረተበት ዓመት" : "Established"}</dt>
                      <dd className="font-semibold text-brand-950">{bg.established_year}</dd>
                    </div>
                    <div className="flex justify-between border-b border-brand-100 pb-2">
                      <dt className="text-gray-500">{locale === "am" ? "ዋና መሥሪያ ቤት" : "Headquarters"}</dt>
                      <dd className="font-semibold text-brand-950 text-right max-w-[200px] text-xs sm:text-sm">
                        {bg.headquarters}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-brand-100 pb-2">
                      <dt className="text-gray-500">{locale === "am" ? "የስፔሻላይዜሽን ዘርፎች" : "Core Disciplines"}</dt>
                      <dd className="font-semibold text-brand-950">11 Services</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">{locale === "am" ? "ዋነኛ እሴቶች" : "Core Values"}</dt>
                      <dd className="font-semibold text-brand-950">6 Pillars</dd>
                    </div>
                  </dl>

                  {bg.brochure_url && (
                    <div className="pt-2 border-t border-brand-100">
                      <a
                        href={bg.brochure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-center text-xs py-2.5 flex items-center justify-center gap-2 shadow-sm"
                      >
                        <span>📄</span> {bg.brochure_btn_label[locale] || bg.brochure_btn_label.en}
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Right Column: Full Official Narrative broken into editorial sections */}
            <div className="lg:col-span-7 lg:pl-6 space-y-8">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                  {bg.eyebrow[locale] || bg.eyebrow.en}
                </span>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-brand-950 leading-tight">
                  {bg.headline[locale] || bg.headline.en}
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <div className="prose-content space-y-4 text-gray-700 leading-relaxed whitespace-pre-line">
                  {bg.p1 && (
                    <p className="text-base text-gray-800 leading-relaxed font-normal">
                      {bg.p1[locale] || bg.p1.en}
                    </p>
                  )}
                  {bg.p2 && (
                    <p className="text-base text-gray-800 leading-relaxed font-normal">
                      {bg.p2[locale] || bg.p2.en}
                    </p>
                  )}
                  {bg.p3 && (
                    <p className="text-base text-gray-800 leading-relaxed font-normal">
                      {bg.p3[locale] || bg.p3.en}
                    </p>
                  )}
                  {bg.quote && (
                    <p className="border-l-4 border-brand-600 pl-4 italic text-brand-900 bg-brand-50/50 py-3 rounded-r-lg font-serif">
                      &ldquo;{bg.quote[locale] || bg.quote.en}&rdquo;
                    </p>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-20 sm:py-24 bg-brand-50/50 border-y border-brand-100/70">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-brand-900 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sprout-400">
                    {visionMission.vision_badge[locale] || visionMission.vision_badge.en}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-normal leading-relaxed text-white">
                    &ldquo;{visionMission.vision[locale] || visionMission.vision.en}&rdquo;
                  </h3>
                </div>
                <div className="mt-8 pt-6 border-t border-brand-800 text-xs text-brand-200">
                  Landscape Solution PLC
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-2xl bg-white border border-brand-100 text-brand-950 p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    {visionMission.mission_badge[locale] || visionMission.mission_badge.en}
                  </span>
                  <p className="mt-4 font-serif text-xl sm:text-2xl text-brand-900 leading-relaxed font-light">
                    &ldquo;{visionMission.mission[locale] || visionMission.mission.en}&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
                  {visionMission.mission_subtitle[locale] || visionMission.mission_subtitle.en}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. OBJECTIVES SECTION */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {objectives.eyebrow[locale] || objectives.eyebrow.en}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {objectives.headline[locale] || objectives.headline.en}
            </h2>

            {/* General Objective */}
            <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/70 p-6 sm:p-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
                {objectives.general_badge[locale] || objectives.general_badge.en}
              </h3>
              <p className="mt-3 font-serif text-lg sm:text-xl text-brand-950 font-normal leading-relaxed">
                &ldquo;{objectives.general_objective[locale] || objectives.general_objective.en}&rdquo;
              </p>
            </div>
          </div>

          {/* 12 Specific Objectives Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(objectives.specific || []).map((obj: any, idx: number) => (
              <Reveal key={obj.id || idx} delay={((obj.id || idx) % 6) * 40}>
                <div className="card p-6 h-full flex flex-col justify-between border-brand-100/90 hover-lift bg-white">
                  <div>
                    <span className="font-mono text-xs font-bold text-sprout-600 bg-sprout-50 rounded px-2 py-0.5 border border-sprout-200">
                      #{String(obj.id || idx + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mt-3 font-serif text-base font-semibold text-brand-950">
                      {obj.title?.[locale] || obj.title?.en}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {obj.desc?.[locale] || obj.desc?.en}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES */}
      <section className="py-20 sm:py-24 bg-brand-950 text-white">
        <div className="container-page">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sprout-400">
              {locale === "am" ? "እሴቶቻችን" : "Core Values"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-white">
              {locale === "am" ? "የምንመራባቸው 6 እሴቶቻችን" : "Our Foundational Values"}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valuesItems.map((v: any, i: number) => (
              <Reveal key={v.number || i} delay={i * 50}>
                <div className="rounded-xl border border-brand-800 bg-brand-900/60 p-6">
                  <span className="font-mono text-xl font-bold text-sprout-400">{v.number || String(i + 1).padStart(2, "0")}</span>
                  <h4 className="mt-3 font-serif text-lg font-medium text-white">
                    {v.title?.[locale] || v.title?.en || t(v.title, locale)}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-brand-200 leading-relaxed font-light">
                    {v.desc?.[locale] || v.desc?.en || t(v.desc, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STRATEGIC ENGAGEMENT & COLLABORATORS */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {strategicEngagement.eyebrow[locale] || strategicEngagement.eyebrow.en}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-brand-950">
              {strategicEngagement.headline[locale] || strategicEngagement.headline.en}
            </h2>
            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              {strategicEngagement.description[locale] || strategicEngagement.description.en}
            </p>
          </div>

          {/* Corporate Partners & Registered Institutional Clients */}
          {partners.length > 0 && (
            <div className="mb-14">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800 mb-6">
                {locale === "am" ? "ተባባሪ አጋር ድርጅቶችና ተቋማት" : "Corporate Partners & Institutional Clients"}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((p) => (
                  <div key={p.id} className="card p-6 bg-brand-50/50 border border-brand-100 rounded-xl flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-brand-950">{p.name}</h4>
                      {p.description && (
                        <p className="mt-2 text-xs text-gray-600 leading-relaxed">{p.description}</p>
                      )}
                    </div>
                    {p.website_url && (
                      <div className="mt-4 pt-3 border-t border-brand-100">
                        <a
                          href={p.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-brand-700 hover:text-brand-900 hover:underline inline-flex items-center gap-1"
                        >
                          Visit Website ↗
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Identified Institutional Target Sectors */}
          <div className="rounded-2xl bg-brand-50/60 border border-brand-100 p-8 sm:p-10">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-950 mb-4">
              {locale === "am" ? "ስትራቴጂካዊ የትብብር መስኮች" : "Collaborative Institutional Sectors"}
            </h3>
            <p className="text-sm text-gray-600 mb-8 max-w-2xl">
              {locale === "am"
                ? "በድርጅቱ ቻርተር መሰረት አገልግሎታችን የሚደርስባቸውና በትብብር ለመስራት የተለዩ ዋና ዋና ተቋማዊ ዘርፎች።"
                : "Priority sectors identified for nationwide environmental engineering, civic parks, botanical curation, and nursery development."}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {COMPANY_INFO.targetSectors.map((sector, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-brand-100/80 shadow-sm flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-sprout-50 border border-sprout-200 flex items-center justify-center text-sprout-800 font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs text-brand-950">
                      {sector.title[locale] || sector.title.en}
                    </h5>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">
                      {sector.desc[locale] || sector.desc.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
