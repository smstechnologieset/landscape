import Link from "next/link";
import { EmptyState } from "@/components/SectionHeading";
import { BlogCard } from "@/components/Cards";
import { getBlogCategories, getBlogPosts } from "@/lib/queries";

export const metadata = {
  title: "Blog",
  description: "Landscaping insights and company news."
};

export default async function BlogPage({
  searchParams
}: {
  searchParams: { page?: string; category?: string; q?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const perPage = 9;

  const [{ posts, count }, categories] = await Promise.all([
    getBlogPosts({
      page,
      perPage,
      categorySlug: searchParams.category,
      search: searchParams.q
    }),
    getBlogCategories()
  ]);

  const totalPages = Math.max(1, Math.ceil(count / perPage));

  function pageHref(p: number): string {
    const params = new URLSearchParams();
    if (searchParams.category) params.set("category", searchParams.category);
    if (searchParams.q) params.set("q", searchParams.q);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="container-page py-16">
      <h1 className="mb-10 text-center text-4xl font-extrabold text-brand-900">Blog</h1>

      <form className="mx-auto mb-8 flex max-w-xl gap-2" role="search">
        {searchParams.category && <input type="hidden" name="category" value={searchParams.category} />}
        <input
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="input"
        />
        <button type="submit" className="btn-primary">Search</button>
      </form>

      <nav aria-label="Blog categories" className="mb-8 flex flex-wrap justify-center gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            !searchParams.category ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-800 hover:bg-brand-100"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/blog?category=${c.slug}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              searchParams.category === c.slug
                ? "bg-brand-700 text-white"
                : "bg-brand-50 text-brand-800 hover:bg-brand-100"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      {posts.length === 0 ? (
        <EmptyState message="No articles found." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={pageHref(p)}
              aria-current={p === page ? "page" : undefined}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                p === page ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-800 hover:bg-brand-100"
              }`}
            >
              {p}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
