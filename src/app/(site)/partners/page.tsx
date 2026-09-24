import Link from "next/link";
import Reveal from "@/components/Reveal";
import { COMPANY_INFO } from "@/lib/company-data";
import { getLocale } from "@/lib/locale";

export const metadata = {
  title: "Stakeholders & Collaborations | Landscape Solution PLC",
  description:
    "Explore the institutional, government, diplomatic, and private sectors Landscape Solution PLC seeks to engage with across Ethiopia."
};

export default async function PartnersPage() {
  const locale = await getLocale();

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="container-page">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            {locale === "am" ? "ተቋማዊ ትብብር" : "Stakeholder Ecosystem"}
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">
            {locale === "am"
              ? "ዘርፎች እና የታለሙ አጋር ተቋማት"
              : "Sectors & Organizations We Seek to Engage With"}
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
            Documented in Landscape Solution PLC&apos;s founding charter as vital partners in advancing Ethiopia&apos;s green infrastructure, urban aesthetic transformation, and environmental resilience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {COMPANY_INFO.stakeholderCategories.map((group, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <div className="card p-6 h-full border-brand-100 flex flex-col justify-between bg-white hover-lift">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-brand-950">
                    {group.category}
                  </h3>
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

        <div className="mt-16 rounded-2xl bg-brand-50/80 border border-brand-200 p-8 sm:p-12 text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-2xl font-normal text-brand-950">
            Explore Institutional Collaboration
          </h3>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            We welcome collaborative dialogues with ministries, diplomatic missions, development partners, and construction developers committed to sustainable environmental standards.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/contact" className="btn-primary text-xs uppercase tracking-wider px-7 py-3">
              Initiate Partnership Dialogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
