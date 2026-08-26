import Link from "next/link";
import Image from "next/image";
import type { BlogPost, Project, Service, Testimonial, Partner } from "@/lib/types";
import { t } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card hover-lift flex flex-col p-6">
      <div aria-hidden className="mb-4 text-3xl">{service.icon || "🌿"}</div>
      <h3 className="text-lg font-bold text-brand-900">{t(service.title, "en")}</h3>
      <p className="mt-2 flex-1 text-sm text-gray-600">
        {t(service.short_description, "en")}
      </p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-4 text-sm font-semibold text-brand-700 hover:underline"
      >
        Learn more →
      </Link>
    </article>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="card group hover-lift block">
      <div className="relative aspect-[4/3] bg-brand-100">
        {project.featured_image && (
          <Image
            src={project.featured_image}
            alt={t(project.title, "en")}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {project.category}
        </span>
        <h3 className="mt-1 font-bold text-brand-900">{t(project.title, "en")}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {t(project.short_description, "en")}
        </p>
      </div>
    </Link>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString("en-GB", {
    year: "numeric", month: "short", day: "numeric"
  }) : "";
  return (
    <article className="card hover-lift flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] bg-brand-100">
        {post.featured_image && (
          <Image
            src={post.featured_image}
            alt={t(post.title, "en")}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wide text-brand-600">
          {post.blog_categories?.name ?? ""} · {date}
        </p>
        <h3 className="mt-1 font-bold text-brand-900">{t(post.title, "en")}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">{t(post.excerpt, "en")}</p>
        <Link href={`/blog/${post.slug}`} className="mt-3 text-sm font-semibold text-brand-700 hover:underline">
          Read more →
        </Link>
      </div>
    </article>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="card hover-lift flex h-full flex-col p-6">
      <div aria-label={`${testimonial.rating} out of 5 stars`} className="text-accent-500">
        {"★".repeat(testimonial.rating)}
        <span className="text-gray-300">{"★".repeat(5 - testimonial.rating)}</span>
      </div>
      <blockquote className="mt-3 flex-1 text-sm italic text-gray-700">
        “{t(testimonial.testimonial, "en")}”
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-brand-900">
        {testimonial.customer_name}
        {(testimonial.position || testimonial.company) && (
          <span className="block font-normal text-gray-500">
            {[testimonial.position, testimonial.company].filter(Boolean).join(", ")}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function PartnerLogo({ partner }: { partner: Partner }) {
  const content = partner.logo_url ? (
    <Image
      src={partner.logo_url}
      alt={partner.name}
      width={160}
      height={80}
      className="max-h-20 w-auto object-contain grayscale transition hover:grayscale-0"
    />
  ) : (
    <span className="text-sm font-semibold text-gray-500">{partner.name}</span>
  );

  return (
    <div className="card hover-lift flex h-28 items-center justify-center p-4">
      {partner.website_url ? (
        <a href={partner.website_url} target="_blank" rel="noopener noreferrer" title={partner.name}>
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
