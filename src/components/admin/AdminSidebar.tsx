"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const EDITOR_LINKS: { href: string; label: string; icon: string }[] = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/services", label: "Services", icon: "🌿" },
  { href: "/admin/projects", label: "Projects", icon: "🏗" },
  { href: "/admin/media", label: "Media & Images", icon: "🖼" },
  { href: "/admin/blog", label: "Blog & Insights", icon: "✏️" },
  { href: "/admin/inquiries", label: "Messages & Inquiries", icon: "✉️" },
  { href: "/admin/careers", label: "Careers & Hiring", icon: "💼" },
  { href: "/admin/company-profile", label: "Company & Brand", icon: "🏢" }
];

const ADMIN_LINKS: { href: string; label: string; icon: string }[] = [
  { href: "/admin/settings", label: "Settings & Team", icon: "⚙️" }
];

export default function AdminSidebar({ role }: { role: "admin" | "editor" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const mainLinks = EDITOR_LINKS;
  const adminLinks = role === "admin" ? ADMIN_LINKS : [];

  const isLinkActive = (href: string) => {
    if (pathname === href) return true;
    if (href !== "/admin" && pathname.startsWith(href)) return true;

    // Handle consolidated aliases
    if (
      href === "/admin/inquiries" &&
      (pathname.startsWith("/admin/quotes") || pathname.startsWith("/admin/consultations"))
    ) {
      return true;
    }
    if (href === "/admin/careers" && pathname.startsWith("/admin/applications")) {
      return true;
    }
    if (
      href === "/admin/company-profile" &&
      (pathname.startsWith("/admin/partners") ||
        pathname.startsWith("/admin/testimonials") ||
        pathname.startsWith("/admin/sustainability"))
    ) {
      return true;
    }
    if (href === "/admin/settings" && pathname.startsWith("/admin/users")) {
      return true;
    }
    return false;
  };

  const nav = (
    <nav aria-label="Admin navigation" className="flex-1 space-y-6 overflow-y-auto p-3.5">
      {/* Content Management Group */}
      <div>
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-brand-300/60">
          Content & Inquiries
        </div>
        <div className="space-y-1">
          {mainLinks.map((l) => {
            const active = isLinkActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-brand-700 text-white shadow-sm font-semibold"
                    : "text-brand-100/90 hover:bg-brand-900/80 hover:text-white"
                }`}
              >
                <span className="text-base" aria-hidden>
                  {l.icon}
                </span>
                <span>{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Admin Operations Group */}
      {adminLinks.length > 0 && (
        <div className="pt-2 border-t border-brand-900/60">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-brand-300/60">
            Administration
          </div>
          <div className="space-y-1">
            {adminLinks.map((l) => {
              const active = isLinkActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-brand-700 text-white shadow-sm font-semibold"
                      : "text-brand-100/90 hover:bg-brand-900/80 hover:text-white"
                  }`}
                >
                  <span className="text-base" aria-hidden>
                    {l.icon}
                  </span>
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );

  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-50 rounded-full bg-brand-800 p-3 text-white shadow-lg lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle admin menu"
        aria-expanded={open}
      >
        ☰
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-brand-950 border-r border-brand-900/50 lg:flex">
        {nav}
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside className="relative flex w-64 flex-col bg-brand-950 pt-14 border-r border-brand-900/50 shadow-2xl">
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
