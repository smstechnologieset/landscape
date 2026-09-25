import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import BlogListWithModal from "@/components/blog/BlogListWithModal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { MOCK_BLOG_POSTS } from "@/lib/company-data";

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
                ? "በዘላቂ የመልክአ ምድር አሰራር፣ በከተማ አረንጓዴ ልማት እና በአካባቢ መልሶ ማቋቋም ዙሪያ ሙያዊ ጥናቶችና ግንዛቤዎች። የተሟላውን ጽሑፍ ለማንበብ ካርዶቹን ይጫኑ።"
                : "Exploring the intersections of landscape architecture, urban green infrastructure, indigenous botany, and climate resilience in Ethiopia. Click any article to read the full technical briefing."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. EXPANDABLE ARTICLES SECTION */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የጥናት ህትመቶች" : "Published Articles"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "የባለሙያ ጽሑፎችና ጥናቶች" : "Technical Briefings & Articles"}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              {locale === "am"
                ? "ድርጅታችን በስራው የሚያጋጥሙትን ተግባራዊ እውቀቶችና ሳይንሳዊ ምርምሮች የሚያጋራባቸው ዋና ዋና ጽሑፎች።"
                : "Practical insights and research from Landscape Solution PLC's landscape architects, horticulturists, and environmental planners."}
            </p>
          </div>

          {/* Interactive Blog List with Expandable Modal Reader */}
          <BlogListWithModal posts={MOCK_BLOG_POSTS} locale={locale} />
        </div>
      </section>

      {/* 3. EDITORIAL CALL TO ACTION */}
      <section className="py-20 bg-brand-50/70 border-t border-brand-100/80">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
              {locale === "am" ? "የትብብር ጥናት" : "Technical Advisory"}
            </div>

            <h3 className="mt-5 font-serif text-2xl sm:text-4xl font-normal text-brand-950">
              {locale === "am" ? "ስለ ፕሮጀክትዎ የባለሙያ ምክር ይፈልጋሉ?" : "Need Technical Landscape Advisory?"}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
              {locale === "am"
                ? "የድርጅታችን የመልክአ ምድር አርክቴክቶችና የሆርቲካልቸር ባለሙያዎች ለማንኛውም የመንግስት፣ የንግድ ወይም የግል ፕሮጀክት ዝርዝር ምክክር ለመስጠት ዝግጁ ናቸው።"
                : "Our landscape planners and environmental specialists provide bespoke consultancy for public agencies, commercial developers, and private property owners."}
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider">
                {locale === "am" ? "ያነጋግሩን" : "Inquire for Consultation"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
