import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import { COMPANY_INFO } from "@/lib/company-data";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Landscape Solution PLC, established in 2026 in Addis Ababa, dedicated to professional landscaping, urban greening, and environmental restoration in Ethiopia."
};

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_landscape.jpg"
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
            <span className="inline-block rounded-full border border-sprout-400/50 bg-brand-900/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sprout-400 backdrop-blur-sm">
              {locale === "am" ? "ስለ ድርጅታችን" : "About Landscape Solution PLC"}
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {locale === "am"
                ? "ለአረንጓዴ፣ ውብ እና ዘላቂ ኢትዮጵያ ቁርጠኝነት"
                : "Dedicated to Sustainable Green Development in Ethiopia"}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "በ2026 በአዲስ አበባ የተመሰረተው ላንድስኬፕ ሶሉሽን፣ የስነ-ምህዳር ጥበቃን ከዘመናዊ አርክቴክቸራል ዲዛይን ጋር በማቀናጀት የላቀ አገልግሎት ይሰጣል።"
                : "Established in 2026 in Addis Ababa, combining professional landscape architecture, plant science, and environmental responsibility to build resilient communities."}
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
                    src="/images/who_we_are.jpg"
                    alt="Landscape Solution PLC team of landscape architects in Addis Ababa"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="font-mono text-xs uppercase tracking-wider text-sprout-400">
                      Addis Ababa, Ethiopia
                    </p>
                    <p className="mt-1 font-serif text-xl font-medium">
                      Landscape Solution PLC
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800">
                    {locale === "am" ? "ቁልፍ መረጃዎች" : "Company Fundamentals"}
                  </h4>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-brand-100 pb-2">
                      <dt className="text-gray-500">{locale === "am" ? "የተመሰረተበት ዓመት" : "Established"}</dt>
                      <dd className="font-semibold text-brand-950">{COMPANY_INFO.establishedYear}</dd>
                    </div>
                    <div className="flex justify-between border-b border-brand-100 pb-2">
                      <dt className="text-gray-500">{locale === "am" ? "ዋና መሥሪያ ቤት" : "Headquarters"}</dt>
                      <dd className="font-semibold text-brand-950">{COMPANY_INFO.location}</dd>
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
                </div>
              </Reveal>
            </div>

            {/* Right Column: Full Official Narrative broken into editorial sections */}
            <div className="lg:col-span-7 lg:pl-6 space-y-8">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                  {locale === "am" ? "ዳራ እና መነሻ" : "Background & Context"}
                </span>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-brand-950 leading-tight">
                  {locale === "am"
                    ? "ለአገራዊ አረንጓዴ ልማት ጥረቶች የተሰጠ ሙያዊ ምላሽ"
                    : "Responding to Ethiopia's Environmental & Greening Demands"}
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <div className="prose-content space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg text-brand-950 font-serif font-light leading-relaxed">
                    Ethiopia is implementing a range of development initiatives, including green development, to address the impacts of trans-boundary climate change, deforestation, and environmental degradation associated with population growth and increasing demand for natural resources.
                  </p>
                  <p>
                    <strong>Landscape Solution PLC</strong>, established in 2026, was founded to contribute to these efforts as a professional landscaping company dedicated to creating aesthetically pleasing, functional, and sustainable indoor and outdoor environments. The company provides comprehensive landscape planning, design, implementation, and maintenance services for government institutions, private businesses, commercial developments, residential properties, and industrial sites.
                  </p>
                  <p>
                    Landscape Solution PLC combines innovative technology, creative design, technical expertise, and sustainable practices to enhance biodiversity, improve urban aesthetics, and promote climate resilience. In response to the growing demand for high-quality green infrastructure and environmentally responsible landscaping, the company specializes in lawn establishment, irrigation systems, urban greening, environmental restoration, modern botanical garden development, nursery establishment and management, and the production of diverse native, ornamental, and indigenous seedlings.
                  </p>
                  <p>
                    With a team of skilled, experienced, and dedicated professionals, Landscape Solution PLC is committed to delivering customized, high-quality, sustainable, and cost-effective landscape solutions tailored to the specific needs of each client. By integrating professional expertise with environmental responsibility, the company contributes to healthier communities, greener cities, enhanced biodiversity, environmental restoration, and improved quality of life.
                  </p>
                  <p className="border-l-4 border-brand-600 pl-4 italic text-brand-900 bg-brand-50/50 py-3 rounded-r-lg">
                    &ldquo;Landscape Solution PLC aspires to become a trusted and leading partner in sustainable landscaping, nursery development, environmental restoration, and green infrastructure in Ethiopia, contributing to a greener, healthier, and more climate-resilient future.&rdquo;
                  </p>
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
                    {locale === "am" ? "የረጅም ጊዜ ራዕይ" : "Our Vision 2030"}
                  </span>
                  <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-normal leading-relaxed text-white">
                    &ldquo;{t(COMPANY_INFO.vision, locale)}&rdquo;
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
                    {locale === "am" ? "የተልዕኮ መግለጫ" : "Our Mission"}
                  </span>
                  <p className="mt-4 font-serif text-xl sm:text-2xl text-brand-900 leading-relaxed font-light">
                    &ldquo;{t(COMPANY_INFO.mission, locale)}&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
                  {locale === "am" ? "ሁሉን አቀፍ የመልክአ ምድር መፍትሄዎች" : "Integrated Environmental Solutions for Ethiopia"}
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
              {locale === "am" ? "ግብ እና አላማዎች" : "Objectives"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "አጠቃላይ እና ዝርዝር ግቦች" : "General & Specific Objectives"}
            </h2>

            {/* General Objective */}
            <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/70 p-6 sm:p-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
                {locale === "am" ? "አጠቃላይ ግብ" : "General Objective"}
              </h3>
              <p className="mt-3 font-serif text-lg sm:text-xl text-brand-950 font-normal leading-relaxed">
                &ldquo;{t(COMPANY_INFO.generalObjective, locale)}&rdquo;
              </p>
            </div>
          </div>

          {/* 12 Specific Objectives Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANY_INFO.specificObjectives.map((obj) => (
              <Reveal key={obj.id} delay={(obj.id % 6) * 40}>
                <div className="card p-6 h-full flex flex-col justify-between border-brand-100/90 hover-lift bg-white">
                  <div>
                    <span className="font-mono text-xs font-bold text-sprout-600 bg-sprout-50 rounded px-2 py-0.5 border border-sprout-200">
                      #{String(obj.id).padStart(2, "0")}
                    </span>
                    <h4 className="mt-3 font-serif text-base font-semibold text-brand-950">
                      {t(obj.title, locale)}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {t(obj.desc, locale)}
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
            {COMPANY_INFO.values.map((v, i) => (
              <Reveal key={v.number} delay={i * 50}>
                <div className="rounded-xl border border-brand-800 bg-brand-900/60 p-6">
                  <span className="font-mono text-xl font-bold text-sprout-400">{v.number}</span>
                  <h4 className="mt-3 font-serif text-lg font-medium text-white">
                    {t(v.title, locale)}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-brand-200 leading-relaxed font-light">
                    {t(v.desc, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. POTENTIAL STAKEHOLDERS & COLLABORATORS DIRECTORY */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "አጋሮችና ባለድርሻ አካላት" : "Strategic Engagement"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-brand-950">
              {locale === "am"
                ? "ድርጅቱ ሊሰራባቸው ያቀዳቸው ዘርፎችና ባለድርሻ አካላት"
                : "Sectors & Organizations Landscape Solution Seeks to Engage With"}
            </h2>
            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              {locale === "am"
                ? "በድርጅቱ ሰነድ የተለዩና ወደፊት በትብብርና በጋራ ለመስራት የታለሙ የዲፕሎማቲክ፣ የመንግስት፣ የትምህርት፣ የልማት ድርጅቶችና የግሉ ዘርፍ ተቋማት።"
                : "Identified in our founding charter as key institutional, governmental, and private collaborators for sustainable green infrastructure and environmental initiatives across Ethiopia."}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {COMPANY_INFO.stakeholderCategories.map((group, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="card p-6 h-full border-brand-100 flex flex-col justify-between bg-white">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-brand-950">
                      {group.category}
                    </h4>
                    <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                      {group.description}
                    </p>
                    <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-3 text-xs text-gray-700">
                      {group.entities.map((entity, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-sprout-500 flex-shrink-0" />
                          <span>{entity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OUR COMMITMENT (CLOSING SECTION) */}
      <section className="py-20 bg-brand-950 text-white text-center">
        <div className="container-page max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              {locale === "am" ? "የእኛ ቁርጠኝነት" : "Our Enduring Commitment"}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "በኢትዮጵያ ውስጥ ውበት ያላቸው፣ ጤናማና ዘላቂ መልክአ ምድሮችን በመገንባት፣ አገር በቀል እፅዋትን በመጠበቅና የአየር ንብረት ለውጥን በጋራ በመቋቋም ለትውልድ የሚተላለፍ አረንጓዴ ቅርስ እንፈጥራለን።"
                : "By integrating professional expertise with environmental responsibility, Landscape Solution PLC is committed to delivering lasting value for clients while protecting Ethiopia's natural heritage and advancing community well-being."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/services" className="btn-accent px-7 py-3 text-xs uppercase tracking-wider font-semibold">
                {locale === "am" ? "አገልግሎቶቻችንን ያስሱ" : "Explore Services"}
              </Link>
              <Link href="/contact" className="btn border border-brand-700 bg-brand-900/60 px-7 py-3 text-xs uppercase tracking-wider font-medium text-white hover:bg-brand-800">
                {dict.cta.contactUs}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
