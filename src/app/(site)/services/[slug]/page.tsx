import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, getServices } from "@/lib/queries";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";

export async function generateStaticParams() {
  const services = await getServices().catch(() => []);
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug).catch(() => null);
  if (!service) return { title: "Service not found" };
  return {
    title: service.seo_title || t(service.title, "en"),
    description: service.seo_description || t(service.short_description, "en"),
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.seo_title || t(service.title, "en"),
      description: service.seo_description || t(service.short_description, "en")
    }
  };
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => (typeof v === "string" ? v : t(v as { en: string }, "en")));
}

export default async function ServiceDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const locale = await getLocale();
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const features = asStringArray(service.features);
  const benefits = asStringArray(service.benefits);

  return (
    <article className="container-page py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/services" className="hover:text-brand-700">Services</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{t(service.title, locale)}</span>
      </nav>

      <header className="mx-auto max-w-3xl text-center">
        <div aria-hidden className="mb-4 text-5xl">{service.icon || "🌿"}</div>
        <h1 className="text-4xl font-extrabold text-brand-900">{t(service.title, locale)}</h1>
        <p className="mt-4 text-lg text-gray-600">{t(service.short_description, locale)}</p>
      </header>

      {service.featured_image && (
        <Image
          src={service.featured_image}
          alt={t(service.title, locale)}
          width={1200}
          height={600}
          priority
          className="mx-auto mt-10 w-full max-w-4xl rounded-xl object-cover"
        />
      )}

      <div className="prose-content mx-auto mt-10 max-w-3xl">
        <p>{t(service.description, locale)}</p>

        {features.length > 0 && (
          <>
            <h2>What&apos;s included</h2>
            <ul>
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </>
        )}

        {benefits.length > 0 && (
          <>
            <h2>Benefits</h2>
            <ul>
              {benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </>
        )}

        {service.faq?.length > 0 && (
          <>
            <h2>FAQ</h2>
            {service.faq.map((item, i) => (
              <details key={i} className="my-3 rounded-lg border border-gray-200 p-4">
                <summary className="cursor-pointer font-semibold text-brand-900">
                  {t(item.question, locale)}
                </summary>
                <p className="mt-2 text-gray-700">{t(item.answer, locale)}</p>
              </details>
            ))}
          </>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/quote" className="btn-primary">Request a Quote</Link>
      </div>
    </article>
  );
}
