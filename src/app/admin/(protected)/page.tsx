import Link from "next/link";
import { getDashboardStats } from "@/lib/data-store";

export const metadata = { title: "Admin Dashboard | Landscape Solution PLC" };

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Services Managed",
      value: stats.servicesCount,
      href: "/admin/services",
      icon: "🌿",
      description: "Custom titles, descriptions & key capabilities"
    },
    {
      label: "Portfolio Projects",
      value: stats.projectsCount,
      href: "/admin/projects",
      icon: "🏗️",
      description: "Multi-photo cover & slideshow galleries"
    },
    {
      label: "Published Articles",
      value: stats.blogCount,
      href: "/admin/blog",
      icon: "✏️",
      description: "Editorial perspectives & case studies"
    },
    {
      label: "Active Careers",
      value: stats.jobsCount,
      href: "/admin/careers",
      icon: "💼",
      description: "Job openings, responsibilities & requirements"
    },
    {
      label: "Contact Messages",
      value: stats.totalMessagesCount,
      unread: stats.unreadMessagesCount,
      href: "/admin/inquiries",
      icon: "✉️",
      highlight: stats.unreadMessagesCount > 0,
      description: stats.unreadMessagesCount > 0 ? `${stats.unreadMessagesCount} unread message(s)` : "All messages reviewed"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
        <div>
          <span className="text-xs font-semibold text-sprout-700 uppercase tracking-wider">Control Panel</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-950 mt-1">Website Content Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage public services, executed works gallery, blog publications, career openings, and customer inquiries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="btn-secondary !text-xs !py-2 inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>Live Website</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${
              card.highlight ? "border-sprout-400 bg-sprout-50/20" : "hover:border-brand-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{card.icon}</span>
              {card.unread !== undefined && card.unread > 0 && (
                <span className="rounded-full bg-sprout-600 text-white px-2 py-0.5 text-[11px] font-bold animate-pulse">
                  {card.unread} New
                </span>
              )}
            </div>
            <div className="mt-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{card.label}</dt>
              <dd className="mt-1 text-3xl font-extrabold text-brand-950">{card.value}</dd>
              <p className="mt-2 text-xs text-gray-500 leading-tight">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Navigation Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6 bg-white border border-gray-200/80">
          <h2 className="text-lg font-bold text-brand-900 mb-4 flex items-center gap-2">
            <span>🌿</span> Quick Action Shortcuts
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href="/admin/services/new"
              className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-brand-50/50 hover:border-brand-200 transition group"
            >
              <div className="font-semibold text-sm text-brand-900 group-hover:text-brand-700">+ Add New Service</div>
              <p className="text-xs text-gray-500 mt-1">Configure images, key capabilities & descriptions</p>
            </Link>
            <Link
              href="/admin/projects/new"
              className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-brand-50/50 hover:border-brand-200 transition group"
            >
              <div className="font-semibold text-sm text-brand-900 group-hover:text-brand-700">+ Add Portfolio Project</div>
              <p className="text-xs text-gray-500 mt-1">Upload photos, cover image & slideshow gallery</p>
            </Link>
            <Link
              href="/admin/blog/new"
              className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-brand-50/50 hover:border-brand-200 transition group"
            >
              <div className="font-semibold text-sm text-brand-900 group-hover:text-brand-700">+ Post Article</div>
              <p className="text-xs text-gray-500 mt-1">Create ecological and landscaping insights</p>
            </Link>
            <Link
              href="/admin/careers/new"
              className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-brand-50/50 hover:border-brand-200 transition group"
            >
              <div className="font-semibold text-sm text-brand-900 group-hover:text-brand-700">+ Post Job Opening</div>
              <p className="text-xs text-gray-500 mt-1">Select pre-prepared responsibilities & requirements</p>
            </Link>
          </div>
        </div>

        <div className="card p-6 bg-white border border-gray-200/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-brand-900 flex items-center gap-2">
              <span>✉️</span> Contact Inquiries & Quotes
            </h2>
            <Link href="/admin/inquiries" className="text-xs text-brand-700 hover:underline font-semibold">
              View All ({stats.totalMessagesCount}) →
            </Link>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-4">
            Website contact submissions are collected in real-time. Click any message to open the full detail window and mark as read/unread.
          </p>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-50/60 border border-brand-100">
            <div className="h-10 w-10 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-sm">
              {stats.unreadMessagesCount}
            </div>
            <div>
              <div className="text-sm font-semibold text-brand-950">
                {stats.unreadMessagesCount > 0 ? "Pending Customer Inquiries" : "No Unread Inquiries"}
              </div>
              <div className="text-xs text-gray-500">
                {stats.unreadMessagesCount > 0
                  ? "You have new inquiries awaiting response"
                  : "All inquiries have been reviewed"}
              </div>
            </div>
            <Link
              href="/admin/inquiries"
              className="ml-auto btn-primary !text-xs !py-1.5 !px-3 font-semibold"
            >
              Open Inbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
