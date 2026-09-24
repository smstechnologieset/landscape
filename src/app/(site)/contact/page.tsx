import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { COMPANY_INFO } from "@/lib/company-data";

export const metadata = {
  title: "Contact Us | Landscape Solution PLC",
  description:
    "Get in touch with Landscape Solution PLC in Addis Ababa, Ethiopia. Inquire about landscape planning, urban greening, nursery seedlings, or consultation."
};

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      {/* 1. HERO HEADER */}
      <section className="bg-brand-950 text-white py-16 sm:py-20 border-b border-brand-900">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-block rounded-full border border-sprout-400/50 bg-brand-900/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sprout-400">
            {locale === "am" ? "ያነጋግሩን" : "Get In Touch"}
          </span>
          <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-normal text-white">
            {locale === "am" ? "የመልክአ ምድር ፕሮጀክትዎን ከእኛ ጋር ይጀምሩ" : "Initiate Your Landscape Project"}
          </h1>
          <p className="mt-4 text-brand-200 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            {locale === "am"
              ? "ለመንግስት ተቋማት፣ ለግል ድርጅቶች፣ ለንግድ ማዕከላትና ለመኖሪያ ቤቶች የተሟላ የሙያ መፍትሄ ለመስጠት ዝግጁ ነን።"
              : "Landscape Solution PLC provides comprehensive landscape planning, construction, irrigation, and environmental restoration services across Ethiopia."}
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTACT INTERFACE */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-10 shadow-sm">
                  <h2 className="font-serif text-2xl font-semibold text-brand-950">
                    {locale === "am" ? "የጥያቄ ወይም የምክክር ቅጽ" : "Project Inquiry & Consultation Form"}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 mb-8">
                    {locale === "am"
                      ? "እባክዎን ከዚህ በታች ያለውን ቅጽ ይሙሉ፤ የባለሙያዎች ቡድናችን በፍጥነት ምላሽ ይሰጥዎታል።"
                      : "Please submit your project details below. Our landscape architects and technical advisory team will review and respond promptly."}
                  </p>

                  <ContactForm locale={locale} />
                </div>
              </Reveal>
            </div>

            {/* Right Column: Sectors Served & Engagement Overview */}
            <div className="lg:col-span-5 space-y-8">
              <Reveal delay={100}>
                {/* Headquarters card */}
                <div className="rounded-xl border border-brand-100 bg-brand-50/50 p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                    {locale === "am" ? "ዋና መስሪያ ቤት" : "Headquarters"}
                  </span>
                  <h3 className="mt-1 font-serif text-xl font-medium text-brand-950">
                    {COMPANY_INFO.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">
                    {COMPANY_INFO.location}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {locale === "am" ? "በ2026 የተመሰረተ • አዲስ አበባ" : "Established in 2026 in Addis Ababa"}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={150}>
                {/* Documented Client Sectors */}
                <div className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm">
                  <h3 className="font-serif text-lg font-semibold text-brand-950 mb-3">
                    {locale === "am" ? "የምናገለግላቸው ደንበኞች" : "Clients & Sectors We Serve"}
                  </h3>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    Landscape Solution PLC specializes in customized, sustainable environmental solutions for:
                  </p>
                  <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-sprout-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-950 font-medium">Government Institutions:</strong> Public plazas, municipal park developments, roadside greenery, and ministry grounds.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-sprout-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-950 font-medium">Private Businesses & Commercial:</strong> Corporate headquarters, shopping centers, hotels, and business parks.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-sprout-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-950 font-medium">Residential Properties:</strong> Private villas, residential real estate communities, and compound gardens.
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-sprout-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-950 font-medium">Industrial Sites:</strong> Eco-industrial parks, factories, and protective green buffer zones.
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={200}>
                {/* Engagement process */}
                <div className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm">
                  <h3 className="font-serif text-lg font-semibold text-brand-950 mb-3">
                    {locale === "am" ? "የአሰራር ሂደታችን" : "Our Project Workflow"}
                  </h3>
                  <ol className="space-y-2.5 text-xs text-gray-600">
                    <li className="flex gap-2">
                      <span className="font-mono font-bold text-sprout-600">1.</span>
                      <span>Initial project brief, spatial requirements & site analysis.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-mono font-bold text-sprout-600">2.</span>
                      <span>Concept master plan, 3D visualization & technical specification.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-mono font-bold text-sprout-600">3.</span>
                      <span>Grading, soil conditioning, irrigation & plant installation.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-mono font-bold text-sprout-600">4.</span>
                      <span>Scheduled horticultural maintenance & ecological health monitoring.</span>
                    </li>
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
