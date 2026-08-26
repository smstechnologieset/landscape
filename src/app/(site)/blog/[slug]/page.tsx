import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts, getPostBySlug } from "@/lib/queries";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";

export async function generateStaticParams() {
  const { posts } = await getBlogPosts({ perPage: 100 }).catch(() => ({ posts: [], count: 0 }));
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) return { title: "Article not found" };
  return {
    title: post.seo_title || t(post.title, "en"),
    description: post.seo_description || t(post.excerpt, "en"),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: t(post.title, "en"),
      description: t(post.excerpt, "en"),
      type: "article",
      images: post.featured_image ? [post.featured_image] : undefined
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const locale = await getLocale();
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const related = await getBlogPosts({
    categorySlug: post.blog_categories?.slug,
    perPage: 4
  });
  const relatedPosts = related.posts.filter((p) => p.id !== post.id).slice(0, 3);

  const publishedAt = post.published_at ? new Date(post.published_at).toLocaleDateString("en-GB", {
    year: "numeric", month: "long", day: "numeric"
  }) : "";

  return (
    <article className="container-page py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/blog" className="hover:text-brand-700">Blog</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{t(post.title, locale)}</span>
      </nav>

      <header className="mx-auto max-w-3xl text-center">
        {post.blog_categories && (
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {post.blog_categories.name}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-extrabold text-brand-900">{t(post.title, locale)}</h1>
        <p className="mt-3 text-sm text-gray-500">{publishedAt}</p>
      </header>

      {post.featured_image && (
        <Image
          src={post.featured_image}
          alt={t(post.title, locale)}
          width={1200}
          height={630}
          priority
          className="mx-auto mt-8 w-full max-w-4xl rounded-xl object-cover"
        />
      )}

      {/* Content is admin-authored HTML */}
      <div
        className="prose-content mx-auto mt-10 max-w-3xl"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: t(post.content, locale) }}
      />

      {post.tags.length > 0 && (
        <ul aria-label="Tags" className="mx-auto mt-8 flex max-w-3xl flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">
              #{tag}
            </li>
          ))}
        </ul>
      )}

      {relatedPosts.length > 0 && (
        <section aria-label="Related posts" className="mx-auto mt-16 max-w-5xl border-t border-gray-200 pt-10">
          <h2 className="mb-6 text-2xl font-bold text-brand-900">Related articles</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="card p-5 hover:border-brand-400">
                <h3 className="font-semibold text-brand-900">{t(p.title, locale)}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{t(p.excerpt, locale)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
