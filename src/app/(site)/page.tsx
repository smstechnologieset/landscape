import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import {
  COMPANY_INFO,
  OFFICIAL_SERVICES,
  ServiceDetail
} from "@/lib/company-data";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  // Group services (Show only the first 4 on the homepage)
  const featuredService = OFFICIAL_SERVICES[0];
  const supportingServices = OFFICIAL_SERVICES.slice(1, 4);

  return (
    <>
      {/* 1. MODERN ARCHITECTURAL HERO SECTION */}
      <section className="relative overflow-hidden bg-[#07130c] text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-emerald-950/60">
        {/* Subtle architectural drafting grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b433218_1px,transparent_1px),linear-gradient(to_bottom,#1b433218_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sprout-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-page relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Corporate Narrative */}
            <div className="lg:col-span-6 xl:col-span-6 pr-0 lg:pr-4">
              {/* Origin & Date Metadata Bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-sprout-400 font-semibold mb-6">
                <span className="inline-flex items-center gap-2 rounded-md bg-brand-900/80 border border-brand-700/50 px-3 py-1 text-[11px] text-sprout-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sprout-400" />
                  {locale === "am" ? "የተመሰረተበት ዓ.ም • 2026" : "Est. 2026 • Addis Ababa"}
                </span>
                <span className="text-gray-400 hidden sm:inline">•</span>
                <span className="text-gray-300 font-normal">
                  {locale === "am" ? "የአረንጓዴ ልማት እና የመልክአ ምድር መፍትሄዎች" : "Landscape Architecture & Ecological Infrastructure"}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl xl:text-6xl font-normal leading-[1.12] tracking-tight text-white">
                {locale === "am" ? (
                  <>
                    ለዘላቂ አረንጓዴ የወደፊት <br />
                    <span className="italic text-sprout-300">ፕሮፌሽናል</span> የመልክአ ምድር መፍትሄዎች
                  </>
                ) : (
                  <>
                    Professional Landscape <br />
                    <span className="italic text-sprout-300">Architecture</span> for a Greener Future
                  </>
                )}
              </h1>

              {/* Precise Supporting Statement from Document */}
              <p className="mt-6 text-base sm:text-lg text-emerald-100/85 leading-relaxed font-light max-w-xl">
                {locale === "am"
                  ? "በፈጠራ ቴክኖሎጂ፣ በአርክቴክቸራል ዲዛይንና በዘላቂ አሰራሮች በመላ ኢትዮጵያ ውብ፣ ተግባራዊ እና ከአየር ንብረት ለውጥ ጋር የተጣጣሙ የመልክአ ምድር ስራዎችን እንገነባለን።"
                  : "Dedicated to creating aesthetically pleasing, functional, and climate-resilient indoor and outdoor environments across Ethiopia through innovation, technical expertise, and environmental responsibility."}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/services"
                  className="btn-accent px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-xl shadow-sprout-900/40 hover:scale-[1.02] transition"
                >
                  {locale === "am" ? "11ዱን ዋና አገልግሎቶች ይመልከቱ" : "Explore 11 Major Services"}
                </Link>
                <Link
                  href="/contact"
                  className="btn border border-emerald-700/60 bg-brand-950/60 hover:bg-brand-900/80 px-6 py-3.5 text-xs sm:text-sm font-medium text-white backdrop-blur-sm transition"
                >
                  {locale === "am" ? "ያግኙን / ምክክር ይጠይቁ" : "Request Consultation"}
                </Link>
              </div>

              {/* Factual Institutional Metrics Bar */}
              <div className="mt-12 pt-8 border-t border-emerald-900/40 grid grid-cols-3 gap-6">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-sprout-400">11</p>
                  <p className="text-[11px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">
                    {locale === "am" ? "ዋና ዋና አገልግሎቶች" : "Specialized Services"}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-sprout-400">2026</p>
                  <p className="text-[11px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">
                    {locale === "am" ? "የተቋቋመበት ዓመት" : "Founded in Ethiopia"}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-sprout-400">100%</p>
                  <p className="text-[11px] sm:text-xs text-gray-300 mt-1 uppercase tracking-wider">
                    {locale === "am" ? "ዘላቂና አገር በቀል" : "Sustainable Focus"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Visual Frame */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="relative">
                {/* Architectural Outer Frame with Corner Crosshairs */}
                <div className="relative rounded-2xl overflow-hidden border border-emerald-800/50 shadow-2xl shadow-black/80 bg-brand-900/30 group">
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src="/images/hero_landscape.jpg"
                      alt="Landscape Solution PLC - Professional Landscape Architecture & Sustainable Greening in Ethiopia"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
                  </div>

                  {/* Top Floating Project Tag */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-950/80 backdrop-blur-md border border-emerald-700/40 px-3.5 py-1 text-xs text-sprout-300 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-sprout-400" />
                      <span>{locale === "am" ? "የመልክአ ምድር አርክቴክቸር • አዲስ አበባ" : "Biophilic Architecture • Addis Ababa"}</span>
                    </div>
                  </div>

                  {/* Bottom Caption Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-brand-950/90 backdrop-blur-md border border-emerald-800/40 p-4 text-white">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-sprout-300 text-sm">
                          {locale === "am" ? "የአረንጓዴ ልማት ማስተር ፕላን" : "Sustainable Landscape Master Planning"}
                        </p>
                        <p className="text-gray-300 text-xs mt-0.5">
                          {locale === "am" ? "አገር በቀል እፅዋት፣ ዘመናዊ የመስኖ ስርዓት እና የስነ-ምህዳር ጥበቃ" : "Indigenous flora, smart water conservation, and eco-restoration"}
                        </p>
                      </div>
                      <Link
                        href="/about"
                        className="hidden sm:inline-flex items-center gap-1 text-xs text-sprout-400 hover:text-white transition font-medium ml-4 shrink-0"
                      >
                        {locale === "am" ? "ስለ እኛ" : "About"} &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-DISCIPLINE QUICK-JUMP STRIP */}
        <div className="container-page mt-12 pt-8 border-t border-emerald-950/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <Link
              href="/services/landscape-planning-and-design"
              className="p-3.5 rounded-xl bg-brand-950/40 border border-emerald-900/40 hover:border-sprout-400/50 hover:bg-brand-900/60 transition group"
            >
              <span className="text-sprout-400 font-mono text-[10px] block mb-1">01 / DISCIPLINE</span>
              <p className="font-medium text-gray-200 group-hover:text-white transition text-xs sm:text-sm">
                {locale === "am" ? "የመልክአ ምድር ፕላን እና ዲዛይን" : "Landscape Planning & Design"}
              </p>
            </Link>

            <Link
              href="/services/nursery-development-and-plant-production"
              className="p-3.5 rounded-xl bg-brand-950/40 border border-emerald-900/40 hover:border-sprout-400/50 hover:bg-brand-900/60 transition group"
            >
              <span className="text-sprout-400 font-mono text-[10px] block mb-1">02 / DISCIPLINE</span>
              <p className="font-medium text-gray-200 group-hover:text-white transition text-xs sm:text-sm">
                {locale === "am" ? "የችግኝ ጣቢያ ልማትና ማፍራት" : "Nursery & Seedling Cultivation"}
              </p>
            </Link>

            <Link
              href="/services/irrigation-and-water-management"
              className="p-3.5 rounded-xl bg-brand-950/40 border border-emerald-900/40 hover:border-sprout-400/50 hover:bg-brand-900/60 transition group"
            >
              <span className="text-sprout-400 font-mono text-[10px] block mb-1">03 / DISCIPLINE</span>
              <p className="font-medium text-gray-200 group-hover:text-white transition text-xs sm:text-sm">
                {locale === "am" ? "ዘመናዊ የመስኖ እና የውሃ አያያዝ" : "Smart Irrigation & Water Systems"}
              </p>
            </Link>

            <Link
              href="/services/environmental-restoration"
              className="p-3.5 rounded-xl bg-brand-950/40 border border-emerald-900/40 hover:border-sprout-400/50 hover:bg-brand-900/60 transition group"
            >
              <span className="text-sprout-400 font-mono text-[10px] block mb-1">04 / DISCIPLINE</span>
              <p className="font-medium text-gray-200 group-hover:text-white transition text-xs sm:text-sm">
                {locale === "am" ? "የአካባቢና የተራቆተ መሬት መልሶ ማቋቋም" : "Environmental Restoration"}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE (EDITORIAL COMPANY INTRO) */}
      <section className="py-20 sm:py-28 bg-white relative">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Image composition */}
            <div className="lg:col-span-6">
              <Reveal>
                <div className="relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-brand-100 img-zoom">
                    <Image
                      src="/images/who_we_are.jpg"
                      alt="Landscape architecture and garden design implementation team in Addis Ababa"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Fact Badge */}
                  <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 rounded-xl bg-brand-900 text-white p-5 sm:p-6 shadow-xl max-w-[240px] border border-brand-800">
                    <p className="text-3xl sm:text-4xl font-serif font-bold text-sprout-400">2026</p>
                    <p className="mt-1 text-xs sm:text-sm font-medium text-brand-100">
                      {locale === "am" ? "የተመሰረተበት ዓመት • አዲስ አበባ" : "Founded to Advance Ethiopia's Green Development"}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Editorial Copy */}
            <div className="lg:col-span-6 lg:pl-6">
              <Reveal delay={100}>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                  {locale === "am" ? "ማን ነን" : "Who We Are"}
                </span>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-brand-950 leading-tight">
                  {locale === "am"
                    ? "ለቀጣይነት ያለው አረንጓዴ ልማት የታመነ አጋር"
                    : "Pioneering Sustainable Environments Across Ethiopia"}
                </h2>

                <p className="mt-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                  {locale === "am"
                    ? "በ2026 የተቋቋመው ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር፣ በኢትዮጵያ የአረንጓዴ ልማት ጥረቶችን ለመደገፍና የተፈጥሮ ሀብት መመናመንን ለመከላከል የተቋቋመ ፕሮፌሽናል የመልክአ ምድር ድርጅት ነው።"
                    : "Established in 2026, Landscape Solution PLC was founded to contribute directly to Ethiopia's green development initiatives, addressing climate change and environmental degradation through professional, science-backed landscaping."}
                </p>

                <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  {locale === "am"
                    ? "ድርጅቱ የፈጠራ ቴክኖሎጂን፣ አርክቴክቸራል ዲዛይንን፣ የቴክኒክ እውቀትንና ዘላቂ አሰራሮችን በማቀናጀት ለመንግስት ተቋማት፣ ለግል ድርጅቶች፣ ለንግድ ማዕከላት፣ ለመኖሪያ ቤቶች እና ለኢንዱስትሪ ቦታዎች ሁሉን አቀፍ አገልግሎት ይሰጣል።"
                    : "We combine innovative technology, creative design, technical expertise, and sustainable practices to enhance biodiversity, elevate urban aesthetics, and foster long-term climate resilience for government institutions, private enterprises, commercial centers, residential properties, and industrial sites."}
                </p>

                {/* Documented Key Pillars */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-brand-100 pt-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-800">
                      {locale === "am" ? "ስፔሻላይዜሽን" : "Specialization"}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {locale === "am" ? "11 ዋና ዋና አገልግሎቶች" : "11 Documented Major Services"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-800">
                      {locale === "am" ? "ተልዕኮ" : "Focus"}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      {locale === "am" ? "ዘላቂነት እና ብዝሃ-ሕይወት" : "Sustainability & Climate Resilience"}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-600 group">
                    <span>{locale === "am" ? "ሙሉ ታሪካችንን ያንብቡ" : "Read Full Company Background"}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAJOR SERVICES ("WHAT WE DO") */}
      <section className="py-20 sm:py-28 bg-brand-50/50 border-y border-brand-100/60">
        <div className="container-page">
          {/* Section Header */}
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የምንሰጣቸው አገልግሎቶች" : "What We Do"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "ዋና ዋና አገልግሎቶቻችን" : "Comprehensive Landscape Services"}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {locale === "am"
                ? "ድርጅታችን ከመልክአ ምድር ፕላን እስከ ተከላ፣ ከመስኖ እስከ አካባቢ መልሶ ማቋቋም የሚደርሱ 11 የተሟሉ የሙያ አገልግሎቶችን ያቀርባል።"
                : "From master planning and nursery cultivation to precision irrigation and ecological rehabilitation, Landscape Solution PLC delivers 11 documented professional disciplines."}
            </p>
          </div>

          {/* Featured Hero Service: Landscape Planning and Design */}
          <Reveal>
            <div className="mb-12 rounded-2xl bg-white border border-brand-100 overflow-hidden shadow-sm grid lg:grid-cols-12">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 img-zoom">
                <Image
                  src={featuredService.featured_image || "/images/service_planning.jpg"}
                  alt={t(featuredService.title, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 rounded-full bg-brand-900/80 backdrop-blur-sm px-3.5 py-1 text-xs font-bold text-sprout-400">
                  FLAGSHIP SERVICE • {featuredService.number}
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                    {featuredService.categoryGroup}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-medium text-brand-950">
                    {t(featuredService.title, locale)}
                  </h3>
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {t(featuredService.description, locale)}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-gray-100 pt-4 text-xs sm:text-sm text-gray-700">
                    {((featuredService.features as { en: string; am?: string }[]) || []).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-brand-600 font-bold mt-0.5">✓</span>
                        <span>{t(f, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100">
                  <Link
                    href={`/services#${featuredService.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 hover:text-brand-600"
                  >
                    <span>{locale === "am" ? "ዝርዝር መረጃ ይመልከቱ" : "Explore Service Details"}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Grid of the remaining documented services */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {supportingServices.map((service, index) => (
              <Reveal key={service.id} delay={index * 50}>
                <div className="card group hover-lift flex flex-col h-full bg-white border border-brand-100/90 overflow-hidden">
                  {/* Photo header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-100 img-zoom">
                    {service.featured_image && (
                      <Image
                        src={service.featured_image}
                        alt={t(service.title, locale)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-3 left-3 rounded-md bg-brand-950/70 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-mono font-bold text-sprout-400">
                      {service.number}
                    </div>
                  </div>

                  {/* Content body */}
                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                        {service.categoryGroup}
                      </span>
                      <h4 className="mt-1 font-serif text-lg font-semibold text-brand-950 group-hover:text-brand-800 transition">
                        {t(service.title, locale)}
                      </h4>
                      <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {t(service.short_description, locale)}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-brand-800">
                      <Link
                        href={`/services#${service.slug}`}
                        className="hover:text-brand-600 flex items-center gap-1.5"
                      >
                        <span>{locale === "am" ? "ተጨማሪ ያንብቡ" : "View Details"}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/services" className="btn-primary px-8 py-3 text-sm">
              {locale === "am" ? "ሁሉንም 11 አገልግሎቶች በዝርዝር ይመልከቱ" : "View All 11 Services In Detail"}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION (DISTINCT EDITORIAL BLOCKS) */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "አቅጣጫችን" : "Our Direction"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "ራዕይ እና ተልዕኮ" : "Vision & Mission"}
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Vision Block: Deep forest green */}
            <Reveal>
              <div className="h-full rounded-2xl bg-brand-900 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-sprout-400/40 bg-brand-800/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-sprout-400">
                    {locale === "am" ? "ራዕይ 2030" : "Vision 2030"}
                  </div>
                  <h3 className="mt-6 font-serif text-2xl sm:text-3xl font-normal leading-snug text-white">
                    {t(COMPANY_INFO.vision, locale)}
                  </h3>
                </div>

                <div className="relative z-10 mt-10 pt-6 border-t border-brand-800/80 flex items-center justify-between text-xs text-brand-200">
                  <span>Landscape Solution PLC</span>
                  <span className="text-sprout-400 font-mono font-bold">2030 Benchmark</span>
                </div>

                {/* Decorative background watermark */}
                <div className="absolute -bottom-10 -right-10 text-brand-800/40 text-9xl font-serif font-black select-none pointer-events-none">
                  V
                </div>
              </div>
            </Reveal>

            {/* Mission Block: Warm earthen natural tone */}
            <Reveal delay={100}>
              <div className="h-full rounded-2xl bg-earth-50 border border-earth-200 text-brand-950 p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between shadow-sm">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
                    {locale === "am" ? "የድርጅቱ ተልዕኮ" : "Our Mission"}
                  </div>
                  <p className="mt-6 font-serif text-xl sm:text-2xl text-brand-900 leading-relaxed font-light">
                    {t(COMPANY_INFO.mission, locale)}
                  </p>
                </div>

                <div className="relative z-10 mt-10 pt-6 border-t border-earth-200 flex items-center justify-between text-xs text-gray-500">
                  <span>{locale === "am" ? "የተቀናጁ የመልክአ ምድር መፍትሄዎች" : "Integrated Environmental Solutions"}</span>
                  <span className="font-semibold text-brand-800">Addis Ababa, Ethiopia</span>
                </div>

                {/* Decorative watermark */}
                <div className="absolute -bottom-10 -right-10 text-earth-200/50 text-9xl font-serif font-black select-none pointer-events-none">
                  M
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. CORE VALUES (REFINED NUMBERED EDITORIAL) */}
      <section className="py-20 sm:py-28 bg-brand-950 text-white relative">
        <div className="container-page">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-sprout-400">
              {locale === "am" ? "መመሪያዎቻችን" : "Core Values"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-white">
              {locale === "am" ? "የምንመራባቸው 6 እሴቶቻችን" : "The Values That Guide Us"}
            </h2>
            <p className="mt-4 text-brand-200 leading-relaxed">
              {locale === "am"
                ? "ስራዎቻችን ሁሉ በከፍተኛ የሙያ ስነ-ምግባርና በአካባቢ ጥበቃ ኃላፊነት ላይ የተመሰረቱ ናቸው።"
                : "Six documented institutional values anchoring our landscape projects, client relationships, and environmental stewardship."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANY_INFO.values.map((val, idx) => (
              <Reveal key={val.number} delay={idx * 60}>
                <div className="rounded-xl border border-brand-800/90 bg-brand-900/60 p-8 hover:border-sprout-500/50 transition">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-2xl font-bold text-sprout-400">{val.number}</span>
                    <span className="h-2 w-2 rounded-full bg-sprout-500" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium text-white">
                    {t(val.title, locale)}
                  </h3>
                  <p className="mt-3 text-sm text-brand-200/90 leading-relaxed font-light">
                    {t(val.desc, locale)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE LANDSCAPE SOLUTION PLC */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
                  {locale === "am" ? "ለምን እንመረጣለን" : "Why Choose Us"}
                </span>
                <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-brand-950 leading-tight">
                  {locale === "am"
                    ? "የሙያ ብቃት፣ ዘመናዊ ቴክኖሎጂ እና ዘላቂነት"
                    : "Technical Expertise Meets Environmental Responsibility"}
                </h2>
                <p className="mt-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                  {locale === "am"
                    ? "ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር ጥራት ያላቸውንና ወጪ ቆጣቢ የመልክአ ምድር መፍትሄዎችን ለደንበኞች ፍላጎት አመቺ በሆነ መልኩ ያዘጋጃል።"
                    : "Backed by dedicated horticulturalists, landscape planners, and environmental specialists, we deliver customized, high-quality, and cost-effective solutions tailored to Ethiopian realities."}
                </p>

                {/* 4 Documented Pillars */}
                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-800 font-bold">
                      01
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-900">
                        {locale === "am" ? "የአየር ንብረት ተስማሚና ዘላቂ አሰራር" : "Sustainable & Climate-Smart Solutions"}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {locale === "am"
                          ? "የውሃ ብክነትን የሚቀንሱ፣ የአፈር ለምነትን የሚጠብቁና ብዝሃ-ሕይወትን የሚያበለጽጉ ስራዎች።"
                          : "Water-conserving irrigation, organic composting, and ecological restoration principles integrated into every site."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-800 font-bold">
                      02
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-900">
                        {locale === "am" ? "አዳዲስ ቴክኖሎጂዎችና የፈጠራ ዲዛይን" : "Modern Technologies & Creative Design"}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {locale === "am"
                          ? "ዘመናዊ የመስኖ ስርዓቶች፣ የ3ዲ አርክቴክቸር ዲዛይንና ጥራት ያላቸው ችግኞች።"
                          : "Continuous adoption of advanced nursery infrastructure, 3D architectural mapping, and automated smart watering."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-brand-50 border border-brand-200 flex items-center justify-center text-brand-800 font-bold">
                      03
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-900">
                        {locale === "am" ? "ሁሉን አቀፍ የመፍትሄ ፓኬጅ" : "Integrated End-to-End Capabilities"}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {locale === "am"
                          ? "ከፕላንና ዲዛይን ጀምሮ እስከ ግንባታ፣ ችግኝ ማፍራት፣ ተከላ እና ቀጣይ ጥገና ድረስ።"
                          : "Complete synergy across master planning, nursery propagation, earthworks construction, and long-term horticultural care."}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-6">
              <Reveal delay={100}>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-brand-100 img-zoom">
                  <Image
                    src="/images/who_we_are.jpg"
                    alt="Professional Ethiopian landscape architects and environmental team"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-wider text-sprout-400 font-bold">
                      {locale === "am" ? "የባለሙያዎች ቡድን" : "Professional Technical Team"}
                    </p>
                    <p className="mt-1 text-sm text-brand-100">
                      {locale === "am"
                        ? "በሆርቲካልቸር፣ በመልክአ ምድር አርክቴክቸርና በአካባቢ ሳይንስ የሰለጠኑ ባለሙያዎች።"
                        : "Horticulturists, environmental planners, and landscape technicians dedicated to quality."}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TARGET SECTORS SERVED */}
      <section className="py-20 bg-brand-50/60 border-t border-brand-100/80">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የምንሰራላቸው ደንበኞች" : "Sectors We Serve"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-brand-950">
              {locale === "am" ? "ለተለያዩ ተቋማትና ግለሰቦች የተዘጋጀ" : "Tailored Solutions Across Industries"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              {locale === "am"
                ? "በድርጅቱ ቻርተር መሰረት አገልግሎታችን የሚደርስባቸው ዋና ዋና ዘርፎች።"
                : "Serving public, commercial, residential, and industrial environments across Ethiopia."}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_INFO.targetSectors.map((sector, index) => (
              <Reveal key={index} delay={index * 50}>
                <div className="rounded-xl bg-white border border-brand-100 overflow-hidden shadow-sm flex flex-col h-full hover-lift group">
                  <div className="relative aspect-[16/10] overflow-hidden img-zoom">
                    <Image
                      src={sector.image}
                      alt={t(sector.title, locale)}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-base font-semibold text-brand-950 group-hover:text-brand-800 transition">
                        {t(sector.title, locale)}
                      </h4>
                      <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                        {t(sector.desc, locale)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CLOSING CTA */}
      <section className="py-20 sm:py-28 bg-brand-950 text-white text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#569d43_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container-page relative z-10 max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sprout-400/40 bg-brand-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sprout-400">
              {locale === "am" ? "አብረን እንስራ" : "Let's Collaborate"}
            </div>

            <h2 className="mt-6 font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
              {locale === "am"
                ? "አረንጓዴና ጤናማ አካባቢዎችን በጋራ እንገንባ"
                : "Let's build greener, healthier environments together."}
            </h2>

            <p className="mt-6 text-brand-200 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-light">
              {locale === "am"
                ? "ለመንግስት፣ ለንግድ ተቋም ወይም ለመኖሪያ ቤትዎ ፕሮፌሽናል የመልክአ ምድር መፍትሄ ዛሬውኑ ያነጋግሩን።"
                : "Whether planning a new commercial development, municipal green corridor, or private estate landscape, our team is ready to assist."}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-accent px-8 py-3.5 text-sm font-semibold tracking-wide uppercase hover:scale-[1.02]"
              >
                {dict.cta.contactUs}
              </Link>
              <Link
                href="/services"
                className="btn border border-brand-700 bg-brand-900/60 px-7 py-3.5 text-sm font-medium text-white hover:bg-brand-800"
              >
                {locale === "am" ? "አገልግሎቶቻችንን ያስሱ" : "Explore All Services"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
