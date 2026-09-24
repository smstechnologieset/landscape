import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";

export const metadata = {
  title: "Careers & Opportunities | Landscape Solution PLC",
  description:
    "Explore career values, technical disciplines, and future opportunities at Landscape Solution PLC in Ethiopia."
};

export default async function CareersPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/who_we_are.jpg"
            alt="Professional landscape architecture and environmental team in Addis Ababa"
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
              {locale === "am" ? "የስራ ዕድሎችና ባህል" : "Careers & Culture"}
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
              {locale === "am"
                ? "ለአረንጓዴ ማህበረሰቦች ግንባታ የበኩሎን አስተዋጽኦ ያበርክቱ"
                : "Contribute to Greener, Healthier Communities"}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "በመልክአ ምድር አርክቴክቸር፣ በሆርቲካልቸር፣ በመስኖ ምህንድስና እና በአካባቢ ሳይንስ ዘርፎች የላቀ የሙያ አሻራ ለማሳረፍ ከእኛ ጋር ይስሩ።"
                : "At Landscape Solution PLC, our team combines creative design, plant science, and technical execution to shape Ethiopia&apos;s sustainable green future."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHY BUILD YOUR CAREER WITH US */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የስራ አካባቢያችን" : "Our Professional Culture"}
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am" ? "ከእኛ ጋር መስራት ለምን ይመረጣል?" : "Why Build a Career in the Green Economy?"}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              {locale === "am"
                ? "በስራዎቻችን ሁሉ ለቴክኒካል ልህቀት፣ ለአካባቢ ጥበቃ እና ለማህበረሰብ ተጠቃሚነት ቅድሚያ እንሰጣለን።"
                : "Grounded in our founding charter, we foster a collaborative, environmentally conscious culture driven by technical expertise and purposeful impact."}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={0}>
              <div className="card p-8 h-full border-brand-100 bg-brand-50/30 hover-lift">
                <span className="font-mono text-2xl font-bold text-sprout-600">01</span>
                <h3 className="mt-4 font-serif text-xl font-medium text-brand-950">
                  Environmental Responsibility
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every project contributes directly to Ethiopia&apos;s climate resilience, reforestation, and ecological preservation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={50}>
              <div className="card p-8 h-full border-brand-100 bg-brand-50/30 hover-lift">
                <span className="font-mono text-2xl font-bold text-sprout-600">02</span>
                <h3 className="mt-4 font-serif text-xl font-medium text-brand-950">
                  Modern Technologies
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Work with state-of-the-art nursery misting systems, precision drip irrigation, and 3D architectural landscape software.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="card p-8 h-full border-brand-100 bg-brand-50/30 hover-lift">
                <span className="font-mono text-2xl font-bold text-sprout-600">03</span>
                <h3 className="mt-4 font-serif text-xl font-medium text-brand-950">
                  Technical Excellence
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Collaborate with skilled horticulturists, botanists, landscape designers, and environmental restoration planners.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="card p-8 h-full border-brand-100 bg-brand-50/30 hover-lift">
                <span className="font-mono text-2xl font-bold text-sprout-600">04</span>
                <h3 className="mt-4 font-serif text-xl font-medium text-brand-950">
                  Continuous Learning
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Expand your skills through active research into indigenous Ethiopian flora, water conservation, and soil biology.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="card p-8 h-full border-brand-100 bg-brand-50/30 hover-lift">
                <span className="font-mono text-2xl font-bold text-sprout-600">05</span>
                <h3 className="mt-4 font-serif text-xl font-medium text-brand-950">
                  Community Engagement
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Participate in institutional outreach programs, vocational trainings, and urban greening campaigns that transform public spaces.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="card p-8 h-full border-brand-100 bg-brand-50/30 hover-lift">
                <span className="font-mono text-2xl font-bold text-sprout-600">06</span>
                <h3 className="mt-4 font-serif text-xl font-medium text-brand-950">
                  Integrity & Quality
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Operate within an organization committed to transparent standards, professional ethics, and lasting craftsmanship.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. FUTURE OPPORTUNITIES — PROFESSIONAL INVITATION */}
      <section className="py-20 bg-brand-50/70 border-t border-brand-100/80">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-800">
              {locale === "am" ? "የወደፊት የስራ ዕድሎች" : "Talent Network"}
            </div>

            <h3 className="mt-5 font-serif text-2xl sm:text-4xl font-normal text-brand-950">
              {locale === "am"
                ? "በአረንጓዴው ዘርፍ አሻራዎን ለማሳረፍ ፍላጎት አለዎት?"
                : "Interested in Contributing to Greener Communities?"}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
              {locale === "am"
                ? "ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር በመልክአ ምድር አርክቴክቸር፣ በሆርቲካልቸር፣ በችግኝ ጣቢያ አያያዝ እና በመስኖ ቴክኖሎጂዎች የሰለጠኑ ባለሙያዎችን ሁልጊዜም በደስታ ይቀበላል። ወደፊት ለሚኖሩ ክፍት የስራ መደቦች እውቀትዎን ለማጋራት ያነጋግሩን።"
                : "While specific vacancies are reviewed on a rolling project basis, we always welcome inquiries from qualified landscape architects, horticulturists, irrigation engineers, and nursery practitioners. Contact us to learn about future project opportunities."}
            </p>

            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider px-8 py-3">
                {locale === "am" ? "ያነጋግሩን" : "Submit Professional Inquiry"}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
