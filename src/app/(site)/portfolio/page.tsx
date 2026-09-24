import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import { PORTFOLIO_CAPABILITY_AREAS } from "@/lib/company-data";

export const metadata = {
  title: "Portfolio & Capabilities | Landscape Solution PLC",
  description:
    "Explore Landscape Solution PLC's areas of capability in landscape design, urban greening, nursery development, botanical gardens, and environmental restoration in Ethiopia."
};

export default async function PortfolioPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/service_construction.jpg"
            alt="Landscape architecture and urban greening environment"
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
              {locale === "am" ? "የስራ መስኮችና አቅም" : "Project Capabilities & Areas of Work"}
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {locale === "am"
                ? "የመልክአ ምድር እና የተፈጥሮ አካባቢ ልማት ስራዎቻችን"
                : "Our Scope of Work & Project Specializations"}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "በመኖሪያ፣ በንግድ እና በመንግስታዊ ተቋማት ዘላቂና ውብ የመልክአ ምድር ፕሮጀክቶችን ለመተግበር የሚያስችሉ ዋና ዋና የስራ መስኮች።"
                : "Explore our documented areas of specialization across master landscape design, living botanical gardens, urban green corridors, and environmental restoration."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. AREAS OF WORK / CAPABILITY MATRIX */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የልህቀት ዘርፎች" : "Areas of Specialization"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "የምንሰራባቸው ዋና ዋና ዘርፎች" : "Documented Project Capabilities"}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              {locale === "am"
                ? "እነዚህ ዘርፎች ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር በከፍተኛ የሙያ ደረጃ ለመስራት የተደራጀባቸው ዋና ዋና የስራ መስኮች ናቸው።"
                : "Landscape Solution PLC provides end-to-end technical execution across seven primary environmental and landscape disciplines, engineered to client specifications."}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_CAPABILITY_AREAS.map((area, idx) => (
              <Reveal key={area.id} delay={idx * 60}>
                <div className="card group hover-lift flex flex-col h-full bg-white border border-brand-100 overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden img-zoom">
                    <Image
                      src={area.image}
                      alt={t(area.title, locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-mono font-bold text-sprout-400">
                      AREA #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-brand-950 group-hover:text-brand-800 transition">
                        {t(area.title, locale)}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {t(area.desc, locale)}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Link
                        href="/contact"
                        className="text-xs font-semibold text-brand-800 hover:text-brand-600 flex items-center gap-1.5"
                      >
                        <span>Inquire for Project Scope</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR PORTFOLIO IS GROWING — CORPORATE NOTICE */}
      <section className="py-20 bg-brand-50/70 border-y border-brand-100/80">
        <div className="container-page max-w-4xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
              {locale === "am" ? "የፕሮጀክት ካታሎግ" : "Institutional Portfolio Development"}
            </div>

            <h3 className="mt-5 font-serif text-2xl sm:text-4xl font-normal text-brand-950">
              {locale === "am"
                ? "የፕሮጀክት ካታሎጋችን እያደገ ይገኛል"
                : "Our Project Portfolio is Growing"}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {locale === "am"
                ? "በ2026 የተመሰረተው ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር፣ በመኖሪያ፣ በንግድና በመንግስታዊ ተቋማት ዘርፍ የመልክአ ምድር ፕላን፣ የችግኝ ማፍራትና የተከላ ፕሮጀክቶችን እያከናወነ ይገኛል። ዝርዝር የፎቶግራፍ ካታሎጎች በየደረጃው ይታተማሉ።"
                : "Established in 2026, Landscape Solution PLC is actively undertaking master planning, seedling propagation, and environmental greening initiatives across Addis Ababa and regional centers. Detailed case studies, site photography, and client highlights will be added following project sign-offs."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider">
                Request a Capability Briefing
              </Link>
              <Link href="/consultation" className="btn-secondary text-xs uppercase tracking-wider">
                Book a Site Consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
