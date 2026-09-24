import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import { BLOG_THEMATIC_TOPICS } from "@/lib/company-data";

export const metadata = {
  title: "Insights & Perspectives | Landscape Solution PLC",
  description:
    "Editorial perspectives and technical insights on sustainable landscaping, urban forestry, nursery management, and environmental restoration in Ethiopia."
};

export default async function BlogPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/service_plant_id.jpg"
            alt="Ethiopian landscape perspectives and botanical research"
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
              {locale === "am" ? "አመለካከቶች እና ጥናቶች" : "Insights & Perspectives"}
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {locale === "am"
                ? "ስነ-ምህዳራዊ እውቀትና የመልክአ ምድር አስተሳሰብ"
                : "Ecological Knowledge & Landscape Perspectives"}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "በዘላቂ የመልክአ ምድር አሰራር፣ በከተማ አረንጓዴ ልማት እና በአካባቢ መልሶ ማቋቋም ዙሪያ ሙያዊ ጥናቶችና ግንዛቤዎች።"
                : "Exploring the intersections of landscape architecture, urban green infrastructure, indigenous botany, and climate resilience in Ethiopia."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. THEMATIC FOCUS AREAS */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የጥናትና የትኩረት አርዕስቶች" : "Editorial Themes"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "ዋና ዋና የትኩረት ዘርፎች" : "Our Thematic Research Pillars"}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              {locale === "am"
                ? "ድርጅታችን በስራው የሚያጋጥሙትን ተግባራዊ እውቀቶችና ሳይንሳዊ ምርምሮች የሚያጋራባቸው ዋና ዋና ዘርፎች።"
                : "These documented subject areas form the core of Landscape Solution PLC's technical research and community outreach programs."}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_THEMATIC_TOPICS.map((topic, idx) => (
              <Reveal key={topic.slug} delay={idx * 50}>
                <div className="card group hover-lift flex flex-col h-full bg-white border border-brand-100 overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden img-zoom">
                    <Image
                      src={topic.image}
                      alt={t(topic.name, locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-mono font-bold text-sprout-400">
                      THEME #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-brand-950 group-hover:text-brand-800 transition">
                        {t(topic.name, locale)}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {t(topic.desc, locale)}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <span className="text-xs font-semibold text-brand-700">
                        {locale === "am" ? "ጽሑፎች በቅርቡ ይቀርባሉ" : "Editorial Publications Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INSIGHTS COMING SOON — EDITORIAL STATEMENT */}
      <section className="py-20 bg-brand-50/70 border-t border-brand-100/80">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
              {locale === "am" ? "የጥናት ህትመቶች" : "Editorial Pipeline"}
            </div>

            <h3 className="mt-5 font-serif text-2xl sm:text-4xl font-normal text-brand-950">
              {locale === "am" ? "ጽሑፎችና ጥናቶች በቅርቡ ይቀርባሉ" : "Insights Coming Soon"}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
              {locale === "am"
                ? "የድርጅታችን የመልክአ ምድር አርክቴክቶችና የሆርቲካልቸር ባለሙያዎች አገር በቀል እፅዋትን፣ የውሃ ቁጠባ ቴክኖሎጂዎችንና የከተማ አረንጓዴ ልማት ተሞክሮዎችን የያዙ ጽሑፎችን በማዘጋጀት ላይ ናቸው።"
                : "Our landscape planners and environmental specialists are actively compiling technical guides on native flora propagation, urban micro-climate cooling, and precision drip irrigation in Ethiopia. Articles and project analyses will be published here."}
            </p>

            <div className="mt-8">
              <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider">
                {locale === "am" ? "ስለ ስራዎቻችን ይጠይቁ" : "Contact Our Editorial & Technical Team"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
