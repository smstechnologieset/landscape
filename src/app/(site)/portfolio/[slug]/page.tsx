import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/queries";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";

export async function generateStaticParams() {
  const projects = await getProjects().catch(() => []);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const full = await getProjectBySlug(params.slug).catch(() => null);
  if (!full) return { title: "Project not found" };
  return {
    title: full.seo_title || t(full.title, "en"),
    description: full.seo_description || t(full.short_description, "en"),
    alternates: { canonical: `/portfolio/${full.slug}` },
    openGraph: {
      title: full.seo_title || t(full.title, "en"),
      description: full.seo_description || t(full.short_description, "en"),
      images: full.featured_image ? [full.featured_image] : undefined
    }
  };
}

export default async function ProjectDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const locale = await getLocale();
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <article className="container-page py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/portfolio" className="hover:text-brand-700">Portfolio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{t(project.title, locale)}</span>
      </nav>

      <header>
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {project.category}
        </span>
        <h1 className="mt-1 text-4xl font-extrabold text-brand-900">{t(project.title, locale)}</h1>
        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-sm text-gray-600">
          {project.location && (
            <div><dt className="inline font-semibold">Location: </dt><dd className="inline">{project.location}</dd></div>
          )}
          {project.client && (
            <div><dt className="inline font-semibold">Client: </dt><dd className="inline">{project.client}</dd></div>
          )}
          {project.completion_date && (
            <div><dt className="inline font-semibold">Completed: </dt><dd className="inline">{project.completion_date}</dd></div>
          )}
        </dl>
      </header>

      {project.featured_image && (
        <Image
          src={project.featured_image}
          alt={t(project.title, locale)}
          width={1200}
          height={630}
          priority
          className="mt-8 w-full rounded-xl object-cover"
        />
      )}

      <div className="prose-content mx-auto mt-10 max-w-3xl">
        <p className="text-lg">{t(project.short_description, locale)}</p>

        {t(project.description, locale) && (
          <>
            <h2>Overview</h2>
            <p>{t(project.description, locale)}</p>
          </>
        )}
        {t(project.challenge, locale) && (
          <>
            <h2>The Challenge</h2>
            <p>{t(project.challenge, locale)}</p>
          </>
        )}
        {t(project.solution, locale) && (
          <>
            <h2>Our Solution</h2>
            <p>{t(project.solution, locale)}</p>
          </>
        )}
        {t(project.results, locale) && (
          <>
            <h2>Results</h2>
            <p>{t(project.results, locale)}</p>
          </>
        )}
      </div>

      {project.project_images && project.project_images.length > 0 && (
        <section aria-label="Project gallery" className="mx-auto mt-12 max-w-5xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-brand-900">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {project.project_images
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((img) => (
                <Image
                  key={img.id}
                  src={img.image_url}
                  alt={img.alt_text || t(project.title, locale)}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-lg object-cover"
                />
              ))}
          </div>
        </section>
      )}

      <div className="mt-12 text-center">
        <Link href="/quote" className="btn-primary">Request a Quote</Link>
      </div>
    </article>
  );
}
