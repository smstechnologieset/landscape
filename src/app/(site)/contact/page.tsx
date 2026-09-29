import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { COMPANY_INFO } from "@/lib/company-data";
import SocialLinks from "@/components/site/SocialLinks";

export const metadata = {
  title: "Contact Us | Landscape Solution PLC",
  description:
    "Get in touch with Landscape Solution PLC at Sur Construction Building, 8th Floor, Addis Ababa, Ethiopia. Inquire about landscape planning, urban greening, nursery seedlings, or consultation."
};

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      {/* 1. HERO HEADER WITH OFFICIAL BRAND LOGO */}
      <section className="bg-brand-950 text-white py-16 sm:py-20 border-b border-brand-900 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sprout-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container-page max-w-4xl text-center relative z-10">
          {/* Brand Logo & Tag Emblem */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-brand-800/20 hover:scale-105 transition-transform duration-300">
              <div className="relative h-9 w-28">
                <Image
                  src="/images/logo.png"
                  alt="Landscape Solution PLC Logo"
                  fill
                  sizes="112px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="h-4 w-px bg-gray-300" />
              <span className="text-xs font-semibold tracking-wider uppercase text-brand-900">
                {locale === "am" ? "ዋና መስሪያ ቤት" : "Corporate Headquarters"}
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white">
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
      <section className="py-16 sm:py-20 bg-white">
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

                  <div className="space-y-3 pt-2 border-t border-gray-100">
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
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-base sm:text-lg font-semibold text-brand-900 hover:text-sprout-600 transition block mt-0.5"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={250}>
                {/* Social Media Channels Card */}
                <div className="rounded-2xl border border-brand-100 bg-white p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-brand-950">
                        {locale === "am" ? "የማህበራዊ ሚዲያ ገጾቻችን" : "Social Media & Messaging"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {locale === "am" ? "በዋትስአፕ፣ ቴሌግራም፣ ኢንስታግራም ይከታተሉን" : "Connect with us across digital platforms"}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-4 pt-2 border-t border-gray-100 leading-relaxed">
                    Chat directly with our landscaping team or follow our ongoing projects in Ethiopia:
                  </p>

                  <SocialLinks variant="light" size="md" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE HQ LOCATION MAP SECTION */}
      <section className="py-16 sm:py-20 bg-brand-50/50 border-t border-brand-100">
        <div className="container-page">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-sprout-700 bg-sprout-100 px-3 py-1 rounded-full">
              {locale === "am" ? "የቢሮ አድራሻ እና ካርታ" : "Office Location & Map"}
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-normal text-brand-950">
              {locale === "am" ? "ዋና መስሪያ ቤታችንን ይጎብኙ" : "Visit Our Corporate Headquarters"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed font-light">
              {locale === "am"
                ? "ዋና መስሪያ ቤታችን በአዲስ አበባ ሱር ኮንስትራክሽን ህንፃ 8ኛ ፎቅ ላይ ይገኛል። ለምክክር ወይም ለስብሰባ ቀጠሮ ይዘው መምጣት ይችላሉ።"
                : "Our headquarters is situated on the 8th Floor of Sur Construction Building in Addis Ababa, Ethiopia. Welcome for scheduled consultations and project briefings."}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Map Frame */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-brand-200/80 shadow-md bg-white min-h-[420px] relative">
              <iframe
                title="Landscape Solution PLC Headquarters - Sur Construction Building"
                src={COMPANY_INFO.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Location Details Card */}
            <div className="lg:col-span-4 rounded-2xl border border-brand-200/80 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative h-12 w-24">
                    <Image
                      src="/images/logo.png"
                      alt="Landscape Solution PLC"
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-brand-950 leading-tight">
                      HQ Office
                    </h3>
                    <p className="text-xs text-sprout-700 font-medium">Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-gray-700">
                  <div className="p-3.5 rounded-xl bg-brand-50/80 border border-brand-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                      {locale === "am" ? "የህንፃውና የፎቅ አድራሻ" : "Building & Floor"}
                    </p>
                    <p className="font-semibold text-brand-950 text-base">
                      {COMPANY_INFO.building}
                    </p>
                    <p className="text-sprout-700 font-semibold mt-0.5">
                      {COMPANY_INFO.floor}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      {locale === "am" ? "የመቀበያ ሰዓት" : "Visiting & Reception Hours"}
                    </p>
                    <div className="flex justify-between text-xs">
                      <span>Mon – Fri:</span>
                      <span className="font-medium text-brand-950">8:30 AM – 5:30 PM</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Saturday:</span>
                      <span className="font-medium text-brand-950">8:30 AM – 1:00 PM</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-center text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {locale === "am" ? "አቅጣጫ በጎግል ካርታ ይክፈቱ" : "Get Directions on Google Maps"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
