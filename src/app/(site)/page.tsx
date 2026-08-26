import Link from "next/link";
import { SectionHeading, EmptyState } from "@/components/SectionHeading";
import {
  BlogCard,
  PartnerLogo,
  ProjectCard,
  ServiceCard,
  TestimonialCard
} from "@/components/Cards";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";
import {
  getBlogPosts,
  getCompanyProfile,
  getFeaturedProjects,
  getPartners,
  getServices,
  getSustainability,
  getTestimonials
} from "@/lib/queries";

export default async function HomePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const [profile, services, projects, sustainability, testimonials, partners, blog] =
    await Promise.all([
      getCompanyProfile(),
      getServices(),
      getFeaturedProjects(3),
      getSustainability(),
      getTestimonials(),
      getPartners(),
      getBlogPosts({ perPage: 3 })
    ]);

  const stats = sustainability?.statistics ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 to-brand-800 py-20 text-white sm:py-28">
        <div className="container-page animate-fade-up text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            {t(profile?.hero_title, locale) || "Beautiful landscapes, built sustainably"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            {t(profile?.hero_description, locale)}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/quote" className="btn-primary animate-pop !bg-white !text-brand-900 hover:!bg-brand-50">
              {dict.cta.quote}
            </Link>
            <Link href="/consultation" className="btn !border !border-white/40 !text-white transition hover:!bg-white/10">
              {dict.cta.consultation}
            </Link>
          </div>
        </div>
      </section>

      {/* Company introduction */}
      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading align="left" title={dict.nav.about} />
            <p className="-mt-6 text-gray-700 leading-relaxed">
              {t(profile?.company_description, locale)}
            </p>
            <Link href="/about" className="mt-6 inline-block font-semibold text-brand-700 hover:underline">
              {dict.cta.readMore} →
            </Link>
          </Reveal>
          <dl className="grid grid-cols-2 gap-4">
            {stats.slice(0, 4).map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card hover-lift p-6 text-center">
                  <dt className="text-sm text-gray-500">{t(s.label, locale)}</dt>
                  <dd className="mt-1 text-3xl font-extrabold text-brand-700">{s.value}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="bg-brand-50 py-16">
        <div className="container-page">
          <SectionHeading title={dict.home.ourServices} />
          {services.length === 0 ? (
            <EmptyState message={dict.common.empty} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((s, i) => (
                <Reveal key={s.id} delay={i * 60}>
                  <div className="hover-lift h-full">
                    <ServiceCard service={s} />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
          <p className="mt-8 text-center">
            <Link href="/services" className="btn-secondary transition hover:scale-105">{dict.cta.viewAll}</Link>
          </p>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-16">
        <div className="container-page">
          <SectionHeading title={dict.home.featuredProjects} />
          {projects.length === 0 ? (
            <EmptyState message={dict.common.empty} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 60}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          )}
          <p className="mt-8 text-center">
            <Link href="/portfolio" className="btn-secondary transition hover:scale-105">{dict.cta.viewAll}</Link>
          </p>
        </div>
      </section>

      {/* Sustainability */}
      {sustainability && (
        <section className="bg-brand-950 py-16 text-white">
          <Reveal className="container-page text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{t(sustainability.title, locale)}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-100">
              {t(sustainability.introduction, locale)}
            </p>
            <Link href="/sustainability" className="btn mt-8 !bg-accent-500 !text-brand-950 transition hover:!scale-105 hover:!bg-accent-400">
              {dict.cta.readMore}
            </Link>
          </Reveal>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <SectionHeading title={dict.home.whatClientsSay} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((tm, i) => (
                <Reveal key={tm.id} delay={i * 80}>
                  <TestimonialCard testimonial={tm} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners */}
      {partners.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container-page">
            <SectionHeading title={dict.home.ourPartners} />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {partners.slice(0, 5).map((p, i) => (
                <Reveal key={p.id} delay={i * 50}>
                  <PartnerLogo partner={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog */}
      {blog.posts.length > 0 && (
        <section className="py-16">
          <div className="container-page">
            <SectionHeading title={dict.home.latestPosts} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blog.posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 60}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-accent-500 py-14 text-center">
        <Reveal className="container-page">
          <h2 className="text-2xl font-bold text-brand-950 sm:text-3xl">{dict.cta.quote}</h2>
          <p className="mt-2 text-brand-900">{t(profile?.company_description, locale)}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="btn bg-brand-950 !px-8 text-white transition hover:scale-105 hover:bg-black">
              {dict.cta.quote}
            </Link>
            <Link href="/contact" className="btn border border-brand-950 text-brand-950 transition hover:scale-105 hover:bg-brand-950 hover:text-white">
              {dict.cta.contactUs}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
