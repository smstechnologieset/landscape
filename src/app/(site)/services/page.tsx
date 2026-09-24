import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import { OFFICIAL_SERVICES } from "@/lib/company-data";

export const metadata = {
  title: "Major Services | Landscape Solution PLC",
  description:
    "Explore the 11 major landscape, nursery, irrigation, botanical garden, and environmental restoration services offered by Landscape Solution PLC in Ethiopia."
};

export default async function ServicesPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  // Group services according to prompt suggestion
  const landscapeDesign = OFFICIAL_SERVICES.filter((s) => s.categoryGroup === "Landscape & Design");
  const plantsGardens = OFFICIAL_SERVICES.filter((s) => s.categoryGroup === "Plants & Gardens");
  const waterEnvironment = OFFICIAL_SERVICES.filter((s) => s.categoryGroup === "Water & Environment");
  const professionalServices = OFFICIAL_SERVICES.filter((s) => s.categoryGroup === "Professional Services");

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/service_planning.jpg"
            alt="Landscape design and green environmental engineering"
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
              {locale === "am" ? "የምንሰጣቸው 11 ዋና ዋና አገልግሎቶች" : "11 Documented Major Services"}
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {locale === "am"
                ? "ሁሉን አቀፍ የመልክአ ምድር እና የአካባቢ ጥበቃ አገልግሎቶች"
                : "Integrated Landscape & Environmental Services"}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "ከማስተር ፕላን እስከ ተከላ፣ ከችግኝ ጣቢያ እስከ ዘመናዊ የመስኖ ስርዓትና መልሶ ማቋቋም ድረስ የላቁ የሙያ መፍትሄዎችን እናቀርባለን።"
                : "From artistic master planning and seedling cultivation to precision irrigation and large-scale ecological restoration across Ethiopia."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY JUMP NAV */}
      <nav aria-label="Service category quick links" className="sticky top-20 z-30 border-b border-brand-100 bg-white/95 backdrop-blur-md py-4">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium">
          <span className="text-gray-400 font-serif hidden md:inline">Browse Disciplines:</span>
          <div className="flex flex-wrap gap-2">
            <a href="#landscape-design" className="rounded-full bg-brand-50 px-4 py-1.5 text-brand-900 border border-brand-200 hover:bg-brand-100 transition">
              Landscape & Design (3)
            </a>
            <a href="#plants-gardens" className="rounded-full bg-brand-50 px-4 py-1.5 text-brand-900 border border-brand-200 hover:bg-brand-100 transition">
              Plants & Gardens (3)
            </a>
            <a href="#water-environment" className="rounded-full bg-brand-50 px-4 py-1.5 text-brand-900 border border-brand-200 hover:bg-brand-100 transition">
              Water & Environment (4)
            </a>
            <a href="#professional-services" className="rounded-full bg-brand-50 px-4 py-1.5 text-brand-900 border border-brand-200 hover:bg-brand-100 transition">
              Professional Services (1)
            </a>
          </div>
        </div>
      </nav>

      <div className="container-page py-16 sm:py-24 space-y-24">
        {/* GROUP 1: LANDSCAPE & DESIGN */}
        <section id="landscape-design" className="scroll-mt-36">
          <div className="border-b border-brand-100 pb-6 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Category 01</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-brand-950 font-normal">
              Landscape & Design
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Architectural planning, engineering execution, lawn establishment, and ongoing horticultural maintenance for indoor and outdoor living environments.
            </p>
          </div>

          <div className="space-y-12">
            {landscapeDesign.map((service, idx) => (
              <Reveal key={service.id}>
                <div
                  id={service.slug}
                  className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-10 shadow-sm grid lg:grid-cols-12 gap-8 items-center scroll-mt-36 hover:border-brand-300 transition"
                >
                  <div className={`relative aspect-[16/10] rounded-xl overflow-hidden shadow-md lg:col-span-6 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    {service.featured_image && (
                      <Image
                        src={service.featured_image}
                        alt={t(service.title, locale)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-3 left-3 rounded bg-brand-950/80 px-2.5 py-1 text-xs font-mono font-bold text-sprout-400">
                      {service.number}
                    </div>
                  </div>

                  <div className={`lg:col-span-6 flex flex-col justify-between ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                        {service.categoryGroup}
                      </span>
                      <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-brand-950">
                        {t(service.title, locale)}
                      </h3>
                      <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                        {t(service.description, locale)}
                      </p>

                      <div className="mt-6 border-t border-gray-100 pt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-800 mb-2">
                          Key Capabilities:
                        </p>
                        <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                          {((service.features as { en: string; am?: string }[]) || []).map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-brand-600 font-bold">✓</span>
                              <span>{t(f, locale)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="btn-primary text-xs uppercase tracking-wider"
                      >
                        Detailed Blueprint
                      </Link>
                      <Link
                        href="/contact"
                        className="btn-secondary text-xs uppercase tracking-wider"
                      >
                        Inquire About This Service
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* GROUP 2: PLANTS & GARDENS */}
        <section id="plants-gardens" className="scroll-mt-36">
          <div className="border-b border-brand-100 pb-6 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Category 02</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-brand-950 font-normal">
              Plants & Gardens
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Nursery propagation, botanical living collections, indigenous plant conservation, and scientific taxonomic identification.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plantsGardens.map((service) => (
              <Reveal key={service.id}>
                <div
                  id={service.slug}
                  className="rounded-2xl border border-brand-100 bg-white overflow-hidden shadow-sm flex flex-col h-full hover-lift scroll-mt-36"
                >
                  <div className="relative aspect-[16/11] overflow-hidden img-zoom">
                    {service.featured_image && (
                      <Image
                        src={service.featured_image}
                        alt={t(service.title, locale)}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-3 left-3 rounded bg-brand-950/80 px-2.5 py-0.5 text-xs font-mono font-bold text-sprout-400">
                      {service.number}
                    </div>
                  </div>

                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-brand-950">
                        {t(service.title, locale)}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {t(service.short_description, locale)}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-brand-800 hover:text-brand-600 flex items-center gap-1"
                      >
                        <span>Full Scope</span>
                        <span>→</span>
                      </Link>
                      <Link href="/contact" className="text-gray-500 hover:text-brand-800">
                        Inquire
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* GROUP 3: WATER & ENVIRONMENT */}
        <section id="water-environment" className="scroll-mt-36">
          <div className="border-b border-brand-100 pb-6 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Category 03</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-brand-950 font-normal">
              Water & Environment
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Water-conserving irrigation systems, civic urban greening corridors, ecological soil composting, and environmental restoration of degraded lands.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {waterEnvironment.map((service) => (
              <Reveal key={service.id}>
                <div
                  id={service.slug}
                  className="rounded-2xl border border-brand-100 bg-white overflow-hidden shadow-sm flex flex-col h-full hover-lift scroll-mt-36"
                >
                  <div className="relative aspect-[16/10] overflow-hidden img-zoom">
                    {service.featured_image && (
                      <Image
                        src={service.featured_image}
                        alt={t(service.title, locale)}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-3 left-3 rounded bg-brand-950/80 px-2.5 py-0.5 text-xs font-mono font-bold text-sprout-400">
                      {service.number}
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                        {service.categoryGroup}
                      </span>
                      <h3 className="mt-1 font-serif text-xl sm:text-2xl font-medium text-brand-950">
                        {t(service.title, locale)}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {t(service.description, locale)}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-xs font-semibold text-brand-800 hover:text-brand-600 flex items-center gap-1"
                      >
                        <span>Learn More</span>
                        <span>→</span>
                      </Link>
                      <Link
                        href="/contact"
                        className="btn-secondary !py-1.5 !px-3 text-xs uppercase tracking-wider"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* GROUP 4: PROFESSIONAL SERVICES */}
        <section id="professional-services" className="scroll-mt-36">
          <div className="border-b border-brand-100 pb-6 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Category 04</span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl text-brand-950 font-normal">
              Professional Services
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Technical advisory, landscape architectural audits, and capacity-building trainings for institutions, communities, and professionals.
            </p>
          </div>

          {professionalServices.map((service) => (
            <Reveal key={service.id}>
              <div
                id={service.slug}
                className="rounded-2xl border border-brand-100 bg-white p-8 sm:p-12 shadow-sm grid lg:grid-cols-12 gap-8 items-center scroll-mt-36"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-md lg:col-span-5 img-zoom">
                  {service.featured_image && (
                    <Image
                      src={service.featured_image}
                      alt={t(service.title, locale)}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3 rounded bg-brand-950/80 px-2.5 py-0.5 text-xs font-mono font-bold text-sprout-400">
                    {service.number}
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                      Capacity Building & Advisory
                    </span>
                    <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-brand-950">
                      {t(service.title, locale)}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                      {t(service.description, locale)}
                    </p>
                    <ul className="mt-6 space-y-2 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-4">
                      {((service.features as { en: string; am?: string }[]) || []).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-brand-600 font-bold">✓</span>
                          <span>{t(f, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                    <Link href={`/services/${service.slug}`} className="btn-primary text-xs uppercase tracking-wider">
                      Consultancy Scope
                    </Link>
                    <Link href="/contact" className="btn-secondary text-xs uppercase tracking-wider">
                      Request a Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      </div>

      {/* BOTTOM CTA */}
      <section className="bg-brand-950 text-white py-20 text-center">
        <div className="container-page max-w-2xl">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Ready to Start Your Landscape Project?
            </h2>
            <p className="mt-4 text-brand-200 text-sm sm:text-base font-light">
              Contact our team of landscape planners and horticultural specialists to discuss your site requirements.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/contact" className="btn-accent px-8 py-3 text-xs uppercase tracking-wider font-semibold">
                {dict.cta.contactUs}
              </Link>
              <Link href="/consultation" className="btn border border-brand-700 bg-brand-900/60 px-7 py-3 text-xs uppercase tracking-wider font-medium text-white hover:bg-brand-800">
                {dict.cta.consultation}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
