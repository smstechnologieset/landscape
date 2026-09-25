import Image from "next/image";
import { getLocale } from "@/lib/locale";
import { MOCK_JOB_OPENINGS } from "@/lib/company-data";
import JobOpeningsBoard from "@/components/careers/JobOpeningsBoard";

export const metadata = {
  title: "Current Job Openings | Landscape Solution PLC",
  description:
    "Explore active career vacancies and professional job openings at Landscape Solution PLC in Ethiopia."
};

export default async function CareersPage() {
  const locale = await getLocale();

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[38vh] flex items-center overflow-hidden bg-brand-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/who_we_are.jpg"
            alt="Landscape Solution PLC professional team and landscape operations"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.32] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/75 to-transparent" />
        </div>

        <div className="container-page relative z-10 py-16 sm:py-20">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block rounded-full border border-sprout-400/50 bg-brand-900/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sprout-400 backdrop-blur-sm">
              {locale === "am" ? "ክፍት የሥራ ቦታዎች" : "Active Job Openings"}
            </span>
            <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
              {locale === "am"
                ? "በላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር ያሉ ክፍት የስራ መደቦች"
                : "Current Career Opportunities"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-brand-100/90 leading-relaxed font-light">
              {locale === "am"
                ? "በመልክአ ምድር አርክቴክቸር፣ በሆርቲካልቸር፣ በመስኖ ምህንድስና እና በአካባቢ ሳይንስ ዘርፎች የወጡ ወቅታዊ ክፍት የስራ መደቦችን ይመልከቱ እና ያመልክቱ።"
                : "Explore our current vacancies below and submit your application to join our multidisciplinary landscape and environmental teams."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. JOB OPENINGS BOARD */}
      <section className="py-14 sm:py-20 bg-stone-50/60">
        <div className="container-page">
          <JobOpeningsBoard jobs={MOCK_JOB_OPENINGS} locale={locale} />
        </div>
      </section>
    </div>
  );
}
