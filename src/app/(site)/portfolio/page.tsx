import Link from "next/link";
import { EmptyState, SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/Cards";
import { getProjects } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";

export const metadata = {
  title: "Portfolio",
  description: "Explore our completed landscaping projects."
};

export default async function PortfolioPage({
  searchParams
}: {
  searchParams: { category?: string };
}) {
  const dict = getDictionary("en");
  const category = searchParams.category || "";
  const projects = await getProjects(category || undefined);

  const categories = ["", "residential", "commercial", "public"];

  return (
    <div className="container-page py-16">
      <SectionHeading title={dict.nav.portfolio} />

      <nav aria-label="Project categories" className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <Link
            key={c}
            href={c ? `/portfolio?category=${c}` : "/portfolio"}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              category === c
                ? "bg-brand-700 text-white"
                : "bg-brand-50 text-brand-800 hover:bg-brand-100"
            }`}
          >
            {c ? c.charAt(0).toUpperCase() + c.slice(1) : "All"}
          </Link>
        ))}
      </nav>

      {projects.length === 0 ? (
        <EmptyState message={dict.common.empty} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
