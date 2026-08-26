import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function count(supabase: ReturnType<typeof createClient>, table: string, filters?: Record<string, boolean | string>): Promise<number> {
  let query = supabase.from(table).select("id", { count: "exact", head: true });
  if (filters) {
    for (const [key, value] of Object.entries(filters)) query = query.eq(key, value);
  }
  const { count } = await query;
  return count ?? 0;
}

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const [
    projects,
    services,
    blogPosts,
    newInquiries,
    newQuotes,
    pendingConsultations,
    activeJobs,
    applications
  ] = await Promise.all([
    count(supabase, "projects", { is_published: true }),
    count(supabase, "services", { is_published: true }),
    count(supabase, "blog_posts", { is_published: true }),
    count(supabase, "contact_inquiries", { status: "new" }),
    count(supabase, "quote_requests", { status: "new" }),
    count(supabase, "consultation_requests", { status: "pending" }),
    count(supabase, "jobs", { is_published: true, is_closed: false }),
    count(supabase, "job_applications", { status: "new" })
  ]);

  const stats = [
    { label: "Published Projects", value: projects, href: "/admin/projects" },
    { label: "Published Services", value: services, href: "/admin/services" },
    { label: "Published Blog Posts", value: blogPosts, href: "/admin/blog" },
    { label: "New Inquiries", value: newInquiries, href: "/admin/inquiries", highlight: newInquiries > 0 },
    { label: "New Quote Requests", value: newQuotes, href: "/admin/quotes", highlight: newQuotes > 0 },
    { label: "Pending Consultations", value: pendingConsultations, href: "/admin/consultations", highlight: pendingConsultations > 0 },
    { label: "Active Jobs", value: activeJobs, href: "/admin/careers" },
    { label: "New Applications", value: applications, href: "/admin/applications", highlight: applications > 0 }
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Dashboard</h1>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 transition hover:border-brand-400">
            <dt className="text-sm text-gray-500">{s.label}</dt>
            <dd className={`mt-1 text-3xl font-extrabold ${s.highlight ? "text-accent-600" : "text-brand-800"}`}>
              {s.value}
            </dd>
          </Link>
        ))}
      </dl>
    </div>
  );
}
