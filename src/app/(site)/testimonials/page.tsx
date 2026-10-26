import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getLocale } from "@/lib/locale";
import { getTestimonials } from "@/lib/queries";
import { t } from "@/lib/types";

export const metadata = {
  title: "Client Perspectives & Reviews | Landscape Solution PLC",
  description:
    "Read verified client testimonials and project reviews for Landscape Solution PLC in Ethiopia."
};

export default async function TestimonialsPage() {
  const [locale, testimonials] = await Promise.all([
    getLocale(),
    getTestimonials()
  ]);

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="container-page max-w-6xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
              {locale === "am" ? "የደንበኞች አስተያየትና ምስክርነት" : "Client Reviews & Testimonials"}
            </span>
            <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
              {locale === "am"
                ? "የደንበኞች እምነትና የተግባር ጥራት"
                : "Client Perspectives & Verified Trust"}
            </h1>
            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              {locale === "am"
                ? "በመላ ኢትዮጵያ ለንግድ፣ ለመኖሪያ እና ለመንግስታዊ ፕሮጀክቶች ያከናወናቸውን የመልክአ ምድር ስራዎች በተመለከተ የደንበኞች ግምገማዎች።"
                : "Real feedback from commercial developers, institutional partners, and residential property owners across Ethiopia."}
            </p>
          </Reveal>
        </div>

        {/* Dynamic Testimonials Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 60}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-brand-100 bg-brand-50/40 p-8 shadow-sm hover:border-brand-300 hover:shadow-md transition">
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-accent-500 text-base" aria-label={`${item.rating} out of 5 stars`}>
                    {"★".repeat(item.rating)}
                    <span className="text-gray-300">{"★".repeat(Math.max(0, 5 - item.rating))}</span>
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="mt-5 text-sm sm:text-base text-gray-800 leading-relaxed italic">
                    &ldquo;{t(item.testimonial, locale)}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="mt-6 flex items-center gap-3.5 border-t border-brand-100 pt-5">
                  {item.photo_url ? (
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-brand-200">
                      <Image
                        src={item.photo_url}
                        alt={item.customer_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white shadow-inner">
                      {item.customer_name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h4 className="font-serif text-sm font-bold text-brand-950">
                      {item.customer_name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {[item.position, item.company].filter(Boolean).join(" • ")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Institutional Assurance Box */}
        <div className="mt-16 rounded-2xl border border-brand-100 bg-white p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🌱</span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-brand-950">
                {locale === "am" ? "የጥራት ማረጋገጫና የፕሮጀክት ሰነዶች" : "Verified Quality & Milestone Documentation"}
              </h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                {locale === "am"
                  ? "የድርጅታችን ፕሮጀክቶች በሙሉ በከፍተኛ የሆርቲካልቸር ሳይንስ እና በዘላቂ አሰራር የሚተገበሩ ሲሆን፣ ደንበኞች በየምዕራፉ የሚሰጡትን አስተያየት በከፍተኛ ክብር እንቀበላለን።"
                  : "All completed landscape construction, irrigation retrofits, and nursery supply contracts are audited for ecological integrity and long-term plant viability."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t border-brand-100 pt-6">
            <span className="text-3xl">📋</span>
            <div>
              <h3 className="font-serif text-xl font-semibold text-brand-950">
                {locale === "am" ? "የተቋማዊ ብቃት እና የጣቢያ ጉብኝት ጥያቄ" : "Institutional Capability & Site Audits"}
              </h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                {locale === "am"
                  ? "የመንግስት መስሪያ ቤቶች፣ የዲፕሎማቲክ ተልዕኮዎች እና የኮንስትራክሽን ድርጅቶች የድርጅታችንን የቴክኒክ ሰነዶች፣ የችግኝ ጣቢያዎች ፍተሻ ወይም የጣቢያ ቅኝት ምክክር በቀጥታ መጠየቅ ይችላሉ።"
                  : "Prospective government bodies, diplomatic missions, and commercial developers may request technical capability dossiers, nursery seedling inspections, or preliminary site planning consultations directly from our senior landscape team."}
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-center">
          <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider px-8 py-3.5 shadow-sm">
            {locale === "am" ? "የቴክኒክ ማጣቀሻዎችን ይጠይቁ" : "Inquire for Technical References"}
          </Link>
          <Link href="/consultation" className="btn-secondary text-xs uppercase tracking-wider px-7 py-3.5">
            {locale === "am" ? "የጣቢያ ቅኝት ምክክር ያሲዙ" : "Book Site Consultation"}
          </Link>
        </div>
      </div>
    </div>
  );
}
