import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects, getServices } from "@/lib/queries";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/sustainability",
    "/blog",
    "/careers",
    "/contact",
    "/quote",
    "/consultation",
    "/testimonials",
    "/partners",
    "/privacy",
    "/terms"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [services, projects, blog] = await Promise.all([
      getServices(),
      getProjects(),
      getBlogPosts({ perPage: 100 })
    ]);
    dynamicRoutes = [
      ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date(s.updated_at ?? Date.now()) })),
      ...projects.map((p) => ({ url: `${base}/portfolio/${p.slug}`, lastModified: new Date(p.updated_at ?? Date.now()) })),
      ...blog.posts.map((b) => ({ url: `${base}/blog/${b.slug}`, lastModified: new Date(b.published_at ?? b.updated_at ?? Date.now()) }))
    ];
  } catch {
    // Supabase not reachable at build time — ship static routes only.
  }

  return [...staticRoutes, ...dynamicRoutes];
}
