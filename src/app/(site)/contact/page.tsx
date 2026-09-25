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

            {/* Right Column: Direct Contact Details & Communication Channels */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal delay={100}>
                {/* Headquarters Card */}
                <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-6 sm:p-7 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                    {locale === "am" ? "ዋና መስሪያ ቤት" : "Headquarters"}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-brand-950">
                    {COMPANY_INFO.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    {COMPANY_INFO.location}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {locale === "am" ? "በ2026 የተመሰረተ • አዲስ አበባ፣ ኢትዮጵያ" : "Established in 2026 • Addis Ababa, Ethiopia"}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={150}>
                {/* Telephone Numbers Card */}
                <div className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-sprout-50 border border-sprout-200 flex items-center justify-center text-sprout-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-brand-950">
                        {locale === "am" ? "የስልክ አድራሻዎች" : "Telephone Lines"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {locale === "am" ? "በስራ ሰዓት በቀጥታ ይደውሉልን" : "Call us directly during working hours"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                        {locale === "am" ? "ዋና የቢሮ ስልክ (ኦፊስ)" : "Main Office Line"}
                      </span>
                      <a
                        href="tel:+251116678901"
                        className="text-base sm:text-lg font-semibold text-brand-900 hover:text-sprout-600 transition block mt-0.5"
                      >
                        +251 11 667 8901
                      </a>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                        {locale === "am" ? "ቀጥታ የሞባይል መስመር" : "Direct / Mobile Line"}
                      </span>
                      <a
                        href="tel:+251911234567"
                        className="text-base sm:text-lg font-semibold text-brand-900 hover:text-sprout-600 transition block mt-0.5"
                      >
                        +251 91 123 4567
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                {/* Email Address Card */}
                <div className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-sprout-50 border border-sprout-200 flex items-center justify-center text-sprout-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-brand-950">
                        {locale === "am" ? "የኢሜይል አድራሻ" : "Email Inquiries"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {locale === "am" ? "ለማንኛውም የጽሑፍ ጥያቄና ፕሮጀክት ዝርዝር" : "Send us your project brief or inquiries"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      {locale === "am" ? "ኦፊሴላዊ የኢሜይል አድራሻ" : "Official Email"}
                    </span>
                    <a
                      href="mailto:info@landscapesolutionet.com"
                      className="text-base sm:text-lg font-semibold text-brand-900 hover:text-sprout-600 transition block mt-0.5"
                    >
                      info@landscapesolutionet.com
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={250}>
                {/* Working Hours Card */}
                <div className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-7 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 mb-2">
                    {locale === "am" ? "የስራ ሰዓት" : "Working Hours (EAT)"}
                  </h4>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p className="flex justify-between">
                      <span>{locale === "am" ? "ከሰኞ - አርብ:" : "Monday – Friday:"}</span>
                      <span className="font-medium text-gray-900">8:30 AM – 5:30 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>{locale === "am" ? "ቅዳሜ:" : "Saturday:"}</span>
                      <span className="font-medium text-gray-900">8:30 AM – 1:00 PM</span>
                    </p>
                    <p className="flex justify-between text-gray-400">
                      <span>{locale === "am" ? "እሁድ:" : "Sunday:"}</span>
                      <span>{locale === "am" ? "ዝግ ነው" : "Closed"}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
