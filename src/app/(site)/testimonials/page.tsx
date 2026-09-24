import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getLocale } from "@/lib/locale";

export const metadata = {
  title: "Client Perspectives & References | Landscape Solution PLC",
  description:
    "Client perspectives and capability auditing for Landscape Solution PLC in Ethiopia."
};

export default async function TestimonialsPage() {
  const locale = await getLocale();

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="container-page max-w-4xl text-center">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            {locale === "am" ? "የደንበኞች አስተያየት" : "Client Perspectives"}
          </span>
          <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
            {locale === "am"
              ? "የደንበኞች እምነትና የፕሮጀክት ጥራት"
              : "Quality Assurance & Client Perspectives"}
          </h1>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {locale === "am"
              ? "ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር በ2026 የተቋቋመ ድርጅት እንደመሆኑ፣ የመጀመሪያ ዙር የመልክአ ምድር ፕሮጀክቶቹን በማጠናቀቅ ላይ ይገኛል።"
              : "As an enterprise established in 2026, Landscape Solution PLC is actively executing initial commercial, institutional, and residential landscape contracts across Ethiopia."}
          </p>
        </Reveal>

        <div className="mt-12 rounded-2xl border border-brand-100 bg-brand-50/60 p-8 sm:p-12 text-left space-y-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🌱</span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-brand-950">
                Verified Reviews & Portfolio Updates
              </h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                Formal client testimonials, case studies, and photographic before-and-after documentation will be published here upon completion and client sign-off of current project milestones.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-brand-100 pt-6">
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-brand-950">
                Institutional Capability & Site Audits
              </h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                Prospective government bodies, diplomatic missions, and commercial developers may request technical capability dossiers, nursery seedling inspections, or preliminary site planning consultations directly from our senior landscape team.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider px-8 py-3">
            Inquire for Technical References
          </Link>
          <Link href="/consultation" className="btn-secondary text-xs uppercase tracking-wider px-7 py-3">
            Book Site Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
