import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { MOCK_PORTFOLIO_PROJECTS } from "@/lib/company-data";

export const metadata = {
  title: "Project Portfolio & Gallery | Landscape Solution PLC",
  description:
    "Explore Landscape Solution PLC's project gallery and portfolio of executed works in landscape architecture, urban greening, botanical gardens, and environmental restoration in Ethiopia."
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
              {locale === "am" ? "የስራዎቻችን ጋለሪ" : "Project Portfolio & Works"}
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {locale === "am"
                ? "የተከናወኑ ስራዎችና የመልክአ ምድር ፕሮጀክቶች"
                : "Our Executed Works & Project Gallery"}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "በመኖሪያ፣ በንግድ እና በመንግስታዊ ተቋማት ዘላቂና ውብ የመልክአ ምድር ፕሮጀክቶችን የያዘ የስራዎቻችን ምስል ጋለሪ።"
                : "Browse our project portfolio across master landscape design, living botanical gardens, urban green corridors, and environmental restoration in Ethiopia. Click any project to open the interactive photo gallery."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROJECT GALLERY SECTION WITH POPUP SLIDESHOW */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የስራዎች ካታሎግ" : "Executed Projects"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "የቀደምት ስራዎቻችን ማህደር" : "Project Gallery & Portfolio"}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              {locale === "am"
                ? "ከዚህ በታች የተዘረዘሩትን ፕሮጀክቶች በመጫን የተሟላውን የፎቶ ስላይድ ሾውና ዝርዝር መረጃ ይመልከቱ።"
                : "Click on any project card to view the high-resolution photo slideshow and stage-by-stage gallery documentation."}
            </p>
          </div>

          {/* Interactive Client Gallery Component */}
          <ProjectGallery projects={MOCK_PORTFOLIO_PROJECTS} locale={locale} />
        </div>
      </section>

      {/* 3. CALL TO ACTION */}
      <section className="py-20 bg-brand-50/70 border-y border-brand-100/80">
        <div className="container-page max-w-4xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
              {locale === "am" ? "አብረውን ይስሩ" : "Initiate a Project"}
            </div>

            <h3 className="mt-5 font-serif text-2xl sm:text-4xl font-normal text-brand-950">
              {locale === "am"
                ? "የመልክአ ምድር ፕሮጀክትዎን ከእኛ ጋር ይጀምሩ"
                : "Plan Your Landscape Project With Us"}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {locale === "am"
                ? "ለኮርፖሬት ግቢዎ፣ ለመኖሪያ ቤትዎ ወይም ለመንግስታዊ ተቋማት ዘላቂና ውብ የመልክአ ምድር መፍትሄዎችን ለመተግበር የባለሙያ ምክክር ይጠይቁ።"
                : "Whether developing a commercial campus, residential estate, botanical collection, or urban greening corridor, our multidisciplinary team delivers excellence."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider">
                {locale === "am" ? "ያነጋግሩን" : "Contact Our Team"}
              </Link>
              <Link href="/consultation" className="btn-secondary text-xs uppercase tracking-wider">
                {locale === "am" ? "የጣቢያ ጉብኝት ቀጠሮ ይያዙ" : "Book a Site Consultation"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
