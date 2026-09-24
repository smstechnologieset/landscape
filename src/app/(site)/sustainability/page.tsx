import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import { SUSTAINABILITY_PILLARS, COMPANY_INFO } from "@/lib/company-data";

export const metadata = {
  title: "Sustainability & Environmental Responsibility | Landscape Solution PLC",
  description:
    "Discover Landscape Solution PLC's commitments to green development, biodiversity conservation, urban greening, water management, and reforestation in Ethiopia."
};

export default async function SustainabilityPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/service_restoration.jpg"
            alt="Ethiopian lush green forest and ecological restoration landscape"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.38] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-transparent" />
        </div>

        <div className="container-page relative z-10 py-20">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block rounded-full border border-sprout-400/50 bg-brand-900/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sprout-400 backdrop-blur-sm">
              {locale === "am" ? "የአካባቢ ጥበቃና ዘላቂ ልማት" : "Sustainability & Ecological Stewardship"}
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {locale === "am"
                ? "ለተፈጥሮ ተስማሚ አሰራር፣ ለዘላቂ አረንጓዴ ልማት"
                : "Building Green Infrastructure & Climate Resilience"}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "የአየር ንብረት ለውጥን ለመቋቋም፣ የደን መጨፍጨፍን ለመከላከል እና ብዝሃ-ሕይወትን ለመጠበቅ ሳይንሳዊ የመልክአ ምድር መፍትሄዎችን እንተገብራለን።"
                : "Founded directly in response to deforestation, land degradation, and climate change in Ethiopia, our mission integrates ecological restoration, water conservation, and native flora propagation into every project."}
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
                {locale === "am" ? "አገራዊ ጥሪ" : "The National Context"}
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-brand-950 leading-tight">
                {locale === "am"
                  ? "የአካባቢ ጥበቃ ተግዳሮቶችን በሙያዊ መፍትሄዎች መመለስ"
                  : "Addressing Climate Challenges Through Professional Action"}
              </h2>
              <p className="mt-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                Ethiopia is actively implementing a range of development initiatives, including green development, to address the impacts of trans-boundary climate change, deforestation, and environmental degradation associated with population growth and increasing demand for natural resources.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                Landscape Solution PLC was founded to be an active institutional force in this transformation. By replacing chemical-heavy practices with organic composting, establishing water-saving drip networks, propagating native seedlings, and restoring degraded terrains, we translate environmental policy into living, thriving green realities.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. SIX SUSTAINABILITY PILLARS */}
      <section className="py-20 sm:py-28 bg-brand-50/50 border-y border-brand-100/70">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የዘላቂነት ምሰሶዎች" : "Core Environmental Pillars"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "የስነ-ምህዳር ጥበቃ መርሆዎቻችን" : "Our Six Sustainability Principles"}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Every landscape design, nursery propagation schedule, and construction methodology adheres to these six environmental standards.
            </p>
          </div>

          <div className="space-y-16">
            {SUSTAINABILITY_PILLARS.map((pillar, idx) => (
              <Reveal key={pillar.number}>
                <div className={`rounded-2xl border border-brand-100 bg-white p-6 sm:p-10 shadow-sm grid lg:grid-cols-12 gap-8 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}>
                  <div className={`relative aspect-[16/10] rounded-xl overflow-hidden shadow-md lg:col-span-6 img-zoom ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}>
                    <Image
                      src={pillar.image}
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
              {locale === "am" ? "ተግባራዊ ተነሳሽነቶች" : "On-the-Ground Initiatives"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-brand-950">
              {locale === "am" ? "የምንተገብራቸው የአካባቢ ጥበቃ ስራዎች" : "Actionable Environmental Commitments"}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card p-6 border-brand-100 bg-brand-50/40">
              <span className="text-2xl">🌱</span>
              <h4 className="mt-3 font-serif font-semibold text-brand-950">Native Seedling Cultivation</h4>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                Propagating indigenous Ethiopian trees, shrubs, and medicinal flora in our controlled nurseries to restore local genetic diversity.
              </p>
            </div>

            <div className="card p-6 border-brand-100 bg-brand-50/40">
              <span className="text-2xl">💧</span>
              <h4 className="mt-3 font-serif font-semibold text-brand-950">Precision Drip Irrigation</h4>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                Cutting landscape water waste by up to 50% through micro-drip networks, soil moisture monitoring, and automated smart timing.
              </p>
            </div>

            <div className="card p-6 border-brand-100 bg-brand-50/40">
              <span className="text-2xl">♻️</span>
              <h4 className="mt-3 font-serif font-semibold text-brand-950">100% Organic Composting</h4>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                Recycling vegetative landscape biomass into pathogen-free organic compost, eliminating harmful chemical fertilizer dependency.
              </p>
            </div>

            <div className="card p-6 border-brand-100 bg-brand-50/40">
              <span className="text-2xl">👥</span>
              <h4 className="mt-3 font-serif font-semibold text-brand-950">Capacity Building & Training</h4>
              <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                Conducting vocational horticultural and environmental training for groundskeepers, youth, and communities across Addis Ababa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 bg-brand-950 text-white text-center">
        <div className="container-page max-w-2xl">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Partner With Us for a Greener Tomorrow
            </h2>
            <p className="mt-4 text-brand-200 text-sm sm:text-base font-light">
              Whether you are an institution, government authority, or private developer, let us help you plan and execute sustainable green spaces.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/contact" className="btn-accent px-8 py-3 text-xs uppercase tracking-wider font-semibold">
                {dict.cta.contactUs}
              </Link>
              <Link href="/services" className="btn border border-brand-700 bg-brand-900/60 px-7 py-3 text-xs uppercase tracking-wider font-medium text-white hover:bg-brand-800">
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
