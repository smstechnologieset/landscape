import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import { getSustainability, getSiteSettings } from "@/lib/queries";
import {
  DEFAULT_SUSTAINABILITY_CONTENT,
  SustainabilityPageContent
} from "@/lib/sustainability-defaults";

export const metadata = {
  title: "Sustainability & Environmental Responsibility | Landscape Solution PLC",
  description:
    "Discover Landscape Solution PLC's commitments to green development, biodiversity conservation, urban greening, water management, and reforestation in Ethiopia."
};

export default async function SustainabilityPage() {
  const [locale, sustainability, settings] = await Promise.all([
    getLocale(),
    getSustainability(),
    getSiteSettings()
  ]);
  const dict = getDictionary(locale);

  // Resolve saved structured content or fallback
  const rawIntro = sustainability?.introduction as any;
  const savedFull =
    rawIntro?.full_content ||
    (typeof sustainability?.statistics === "object" && !Array.isArray(sustainability?.statistics)
      ? (sustainability?.statistics as any)?.full_content
      : null) ||
    {};

  const heroBadge = savedFull.hero?.badge || DEFAULT_SUSTAINABILITY_CONTENT.hero.badge;
  const heroTitle = savedFull.hero?.title || (sustainability?.title?.en ? sustainability.title : DEFAULT_SUSTAINABILITY_CONTENT.hero.title);
  const heroDescription = savedFull.hero?.description || DEFAULT_SUSTAINABILITY_CONTENT.hero.description;
  const heroImage = settings?.sustainability_image || savedFull.hero?.image || DEFAULT_SUSTAINABILITY_CONTENT.hero.image;

  const contextEyebrow = savedFull.national_context?.eyebrow || DEFAULT_SUSTAINABILITY_CONTENT.national_context.eyebrow;
  const contextHeadline = savedFull.national_context?.headline || DEFAULT_SUSTAINABILITY_CONTENT.national_context.headline;
  const contextP1 = savedFull.national_context?.p1 || (rawIntro?.p1 ? rawIntro.p1 : rawIntro?.en ? { en: rawIntro.en, am: rawIntro.am } : DEFAULT_SUSTAINABILITY_CONTENT.national_context.p1);
  const contextP2 = savedFull.national_context?.p2 || (rawIntro?.p2 ? rawIntro.p2 : DEFAULT_SUSTAINABILITY_CONTENT.national_context.p2);
  const statistics =
    Array.isArray(sustainability?.statistics) && sustainability.statistics.length > 0
      ? sustainability.statistics
      : savedFull.national_context?.statistics || DEFAULT_SUSTAINABILITY_CONTENT.national_context.statistics;

  const pillarsEyebrow = savedFull.pillars_section?.eyebrow || DEFAULT_SUSTAINABILITY_CONTENT.pillars_section.eyebrow;
  const pillarsHeadline = savedFull.pillars_section?.headline || DEFAULT_SUSTAINABILITY_CONTENT.pillars_section.headline;
  const pillarsSubtitle = savedFull.pillars_section?.subtitle || DEFAULT_SUSTAINABILITY_CONTENT.pillars_section.subtitle;
  const pillars = savedFull.pillars_section?.pillars || DEFAULT_SUSTAINABILITY_CONTENT.pillars_section.pillars;

  const initiativesEyebrow = savedFull.initiatives_section?.eyebrow || DEFAULT_SUSTAINABILITY_CONTENT.initiatives_section.eyebrow;
  const initiativesHeadline = savedFull.initiatives_section?.headline || DEFAULT_SUSTAINABILITY_CONTENT.initiatives_section.headline;
  const initiatives =
    Array.isArray(sustainability?.initiatives) && sustainability.initiatives.length > 0
      ? sustainability.initiatives
      : savedFull.initiatives_section?.items || DEFAULT_SUSTAINABILITY_CONTENT.initiatives_section.items;

  const ctaHeadline = savedFull.cta?.headline || DEFAULT_SUSTAINABILITY_CONTENT.cta.headline;
  const ctaSubtitle = savedFull.cta?.subtitle || DEFAULT_SUSTAINABILITY_CONTENT.cta.subtitle;
  const ctaPrimaryText = savedFull.cta?.primary_btn_text || DEFAULT_SUSTAINABILITY_CONTENT.cta.primary_btn_text;
  const ctaPrimaryUrl = savedFull.cta?.primary_btn_url || DEFAULT_SUSTAINABILITY_CONTENT.cta.primary_btn_url;
  const ctaSecondaryText = savedFull.cta?.secondary_btn_text || DEFAULT_SUSTAINABILITY_CONTENT.cta.secondary_btn_text;
  const ctaSecondaryUrl = savedFull.cta?.secondary_btn_url || DEFAULT_SUSTAINABILITY_CONTENT.cta.secondary_btn_url;

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Ethiopian ecological restoration and sustainable landscaping"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.38] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-transparent" />
        </div>

        <div className="container-page relative z-10 py-20">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-2 mb-6 shadow-xl border border-brand-800/30">
              <div className="relative h-7 w-24">
                <Image
                  src={settings?.logo_url || "/images/logo.png"}
                  alt="Landscape Solution PLC"
                  fill
                  sizes="96px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="h-4 w-px bg-gray-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-950">
                {t(heroBadge, locale)}
              </span>
            </div>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {t(heroTitle, locale)}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {t(heroDescription, locale)}
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE GREEN DEVELOPMENT IMPERATIVE */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                {t(contextEyebrow, locale)}
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-brand-950 leading-tight">
                {t(contextHeadline, locale)}
              </h2>
              <div className="mt-6 text-gray-700 leading-relaxed text-base sm:text-lg space-y-4 text-left sm:text-center">
                <p>{t(contextP1, locale)}</p>
                {contextP2 && <p className="text-gray-600 text-sm sm:text-base">{t(contextP2, locale)}</p>}
              </div>
            </Reveal>
          </div>

          {/* Impact Statistics */}
          {statistics && statistics.length > 0 && (
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-brand-100">
              {statistics.map((stat: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl bg-brand-50/60 border border-brand-100 text-center">
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-sprout-800">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-xs text-brand-900 font-medium">
                    {t(stat.label, locale)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. SIX SUSTAINABILITY PILLARS */}
      <section className="py-20 sm:py-28 bg-brand-50/50 border-y border-brand-100/70">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {t(pillarsEyebrow, locale)}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {t(pillarsHeadline, locale)}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t(pillarsSubtitle, locale)}
            </p>
          </div>

          <div className="space-y-16">
            {pillars.map((pillar: any, idx: number) => (
              <Reveal key={pillar.number || idx}>
                <div
                  className={`rounded-2xl border border-brand-100 bg-white p-6 sm:p-10 shadow-sm grid lg:grid-cols-12 gap-8 items-center ${
                    idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden shadow-md lg:col-span-6 img-zoom ${
                      idx % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={pillar.image || "/images/hero_landscape.jpg"}
                      alt={t(pillar.title, locale)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 rounded bg-brand-950/80 px-2.5 py-1 text-xs font-mono font-bold text-sprout-400">
                      PILLAR {pillar.number}
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-sprout-600">
                      Pillar {pillar.number}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-brand-950">
                      {t(pillar.title, locale)}
                    </h3>
                    <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                      {t(pillar.desc, locale)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ACTIONS & INITIATIVES */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {t(initiativesEyebrow, locale)}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-brand-950">
              {t(initiativesHeadline, locale)}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {initiatives.map((item: any, idx: number) => (
              <div key={idx} className="card p-6 border-brand-100 bg-brand-50/40">
                <span className="text-2xl">{item.icon || "🌱"}</span>
                <h4 className="mt-3 font-serif font-semibold text-brand-950">
                  {t(item.title, locale)}
                </h4>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  {t(item.desc, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 bg-brand-950 text-white text-center">
        <div className="container-page max-w-2xl">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              {t(ctaHeadline, locale)}
            </h2>
            <p className="mt-4 text-brand-200 text-sm sm:text-base font-light">
              {t(ctaSubtitle, locale)}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href={ctaPrimaryUrl}
                className="btn-accent px-8 py-3 text-xs uppercase tracking-wider font-semibold"
              >
                {t(ctaPrimaryText, locale)}
              </Link>
              <Link
                href={ctaSecondaryUrl}
                className="btn border border-brand-700 bg-brand-900/60 px-7 py-3 text-xs uppercase tracking-wider font-medium text-white hover:bg-brand-800"
              >
                {t(ctaSecondaryText, locale)}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
