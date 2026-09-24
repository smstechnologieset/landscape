import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, getServices } from "@/lib/queries";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import { OFFICIAL_SERVICES } from "@/lib/company-data";

export async function generateStaticParams() {
  return OFFICIAL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug).catch(() => null);
  if (!service) return { title: "Service Not Found | Landscape Solution PLC" };
  return {
    title: `${service.seo_title || t(service.title, "en")} | Landscape Solution PLC`,
    description: service.seo_description || t(service.short_description, "en"),
    alternates: { canonical: `/services/${service.slug}` }
  };
}

function asStringArray(value: unknown, locale: "en" | "am"): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => {
    if (typeof v === "string") return v;
    return t(v as { en: string; am?: string }, locale);
  });
}

export default async function ServiceDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const locale = await getLocale();
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const features = asStringArray(service.features, locale);
  const benefits = asStringArray(service.benefits, locale);
  const otherServices = OFFICIAL_SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <article className="py-12 sm:py-20 bg-white">
      <div className="container-page">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-wider text-gray-500">
          <Link href="/" className="hover:text-brand-800">Home</Link>
          <span className="mx-2 text-gray-300">/</span>
          <Link href="/services" className="hover:text-brand-800">Services</Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-brand-900 font-semibold">{t(service.title, locale)}</span>
        </nav>

        {/* Title Header */}
        <div className="max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            Professional Landscape Discipline
          </span>
          <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950 leading-tight">
            {t(service.title, locale)}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-light">
            {t(service.short_description, locale)}
          </p>
        </div>

        {/* Main Image */}
        {service.featured_image && (
          <div className="relative aspect-[16/8] w-full my-10 rounded-2xl overflow-hidden shadow-xl border border-brand-100 img-zoom">
            <Image
              src={service.featured_image}
              alt={t(service.title, locale)}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start mt-12">
          {/* Detailed Content */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-brand-950 mb-4">
                Service Scope & Execution
              </h2>
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                {t(service.description, locale)}
              </p>
            </div>

            {features.length > 0 && (
              <div className="rounded-xl border border-brand-100 bg-brand-50/40 p-6 sm:p-8">
                <h3 className="font-serif text-xl font-semibold text-brand-950 mb-4">
                  What&apos;s Included in This Discipline
                </h3>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-600 font-bold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {benefits.length > 0 && (
              <div>
                <h3 className="font-serif text-xl font-semibold text-brand-950 mb-4">
                  Key Environmental & Client Benefits
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-sprout-500 mt-2 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.faq && service.faq.length > 0 && (
              <div>
                <h3 className="font-serif text-xl font-semibold text-brand-950 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {service.faq.map((item, i) => (
                    <details key={i} className="rounded-lg border border-brand-100 p-4 bg-white">
                      <summary className="cursor-pointer font-medium text-brand-900 text-sm">
                        {t(item.question, locale)}
                      </summary>
                      <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {t(item.answer, locale)}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Inquiry Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="card p-6 sm:p-8 border-brand-100 bg-brand-50/50 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                Project Consultation
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-brand-950">
                Inquire About This Service
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Connect with our landscape architects and technical specialists to schedule a site evaluation and proposal.
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href="/contact"
                  className="btn-primary w-full text-center text-xs uppercase tracking-wider py-3"
                >
                  Contact Landscape Solution
                </Link>
                <Link
                  href="/consultation"
                  className="btn-secondary w-full text-center text-xs uppercase tracking-wider py-3"
                >
                  Book a Site Consultation
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-100 text-xs text-gray-500 space-y-1">
                <p>• Tailored for residential, commercial & government</p>
                <p>• Eco-friendly, climate-resilient practices</p>
                <p>• Headquartered in Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Services Section */}
        {otherServices.length > 0 && (
          <div className="mt-24 pt-12 border-t border-brand-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-normal text-brand-950">
                Explore Other Services
              </h3>
              <Link href="/services" className="text-xs font-semibold text-brand-800 hover:text-brand-600">
                View All 11 Services →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.slug}`}
                  className="card group hover-lift p-5 block bg-white border-brand-100"
                >
                  <span className="text-xs font-mono font-bold text-sprout-600">
                    {other.number}
                  </span>
                  <h4 className="mt-1 font-serif text-base font-semibold text-brand-950 group-hover:text-brand-800">
                    {t(other.title, locale)}
                  </h4>
                  <p className="mt-2 text-xs text-gray-600 line-clamp-2">
                    {t(other.short_description, locale)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
