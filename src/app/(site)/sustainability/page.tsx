import { notFound } from "next/navigation";
import { getSustainability } from "@/lib/queries";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";

export const metadata = {
  title: "Sustainability",
  description: "Our commitment to sustainable landscaping practices."
};

function Section({ heading, body }: { heading: string; body: string }) {
  if (!body) return null;
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold text-brand-900">{heading}</h2>
      <p className="mt-2 leading-relaxed text-gray-700">{body}</p>
    </section>
  );
}

export default async function SustainabilityPage() {
  const locale = await getLocale();
  const content = await getSustainability();
  if (!content) notFound();

  const stats = content.statistics ?? [];

  return (
    <div className="container-page py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold text-brand-900">{t(content.title, locale)}</h1>
        <p className="mt-4 text-lg text-gray-600">{t(content.introduction, locale)}</p>
      </header>

      {stats.length > 0 && (
        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="card p-5 text-center">
              <dt className="text-xs text-gray-500">{t(s.label, locale)}</dt>
              <dd className="text-2xl font-extrabold text-brand-700">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mx-auto max-w-3xl">
        <Section heading={t({ en: "Water Conservation", am: "የውሃ ጥቅም" }, locale)} body={t(content.water_conservation, locale)} />
        <Section heading={t({ en: "Native Plants", am: "ተለዋዋጭ ተክሎች" }, locale)} body={t(content.native_plants, locale)} />
        <Section heading={t({ en: "Environmental Responsibility" }, locale)} body={t(content.environmental_responsibility, locale)} />
        <Section heading={t({ en: "Eco-Friendly Practices" }, locale)} body={t(content.eco_friendly_practices, locale)} />
        <Section heading={t({ en: "Waste Reduction" }, locale)} body={t(content.waste_reduction, locale)} />
        <Section heading={t({ en: "Sustainable Design" }, locale)} body={t(content.sustainable_design, locale)} />
      </div>

      {(content.initiatives ?? []).length > 0 && (
        <div className="mx-auto mt-10 max-w-3xl">
          <h2 className="text-2xl font-bold text-brand-900">Initiatives</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            {(content.initiatives as { en: string; am?: string }[]).map((init, i) => (
              <li key={i}>{t(init, locale)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
