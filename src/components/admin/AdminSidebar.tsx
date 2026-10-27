"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PAGE_LINKS: { href: string; label: string; icon: string }[] = [
  { href: "/admin/home", label: "Home Page", icon: "🏠" },
  { href: "/admin/about", label: "About Us", icon: "🏛" },
  { href: "/admin/services", label: "Services", icon: "🌿" },
  { href: "/admin/projects", label: "Portfolio", icon: "🏗" },
  { href: "/admin/sustainability", label: "Sustainability", icon: "🌱" },
  { href: "/admin/blog", label: "Blog & Insights", icon: "✏️" },
  { href: "/admin/careers", label: "Careers & Hiring", icon: "💼" },
  { href: "/admin/contact", label: "Contact & Inbox", icon: "✉️" }
];

const ASSET_AND_SYSTEM_LINKS: { href: string; label: string; icon: string }[] = [
  { href: "/admin/media", label: "Site Media & Images", icon: "🖼" },
  { href: "/admin/settings", label: "Settings & Team", icon: "⚙️" }
];

export default function AdminSidebar({ role }: { role: "admin" | "editor" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isLinkActive = (href: string) => {
    if (pathname === href) return true;
    if (href !== "/admin" && pathname.startsWith(href)) return true;

    // Handle aliases
    if (
      href === "/admin/contact" &&
      (pathname.startsWith("/admin/inquiries") ||
        pathname.startsWith("/admin/quotes") ||
        pathname.startsWith("/admin/consultations"))
    ) {
      return true;
    }
    if (
      href === "/admin/about" &&
      (pathname.startsWith("/admin/company-profile") || pathname.startsWith("/admin/partners"))
    ) {
      return true;
    }
    if (href === "/admin/careers" && pathname.startsWith("/admin/applications")) {
      return true;
    }
    if (href === "/admin/settings" && pathname.startsWith("/admin/users")) {
      return true;
    }
    return false;
  };

  const nav = (
    <nav aria-label="Admin navigation" className="flex-1 space-y-6 overflow-y-auto p-3.5">
      {/* Overview */}
      <div>
        <Link
          href="/admin"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
            pathname === "/admin"
              ? "bg-brand-700 text-white shadow-sm font-semibold"
              : "text-brand-100/90 hover:bg-brand-900/80 hover:text-white"
          }`}
        >
          <span className="text-base" aria-hidden>
            ▦
          </span>
          <span>Dashboard Overview</span>
        </Link>
      </div>

      {/* Website Pages Section */}
      <div>
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-brand-300/60">
          Website Pages
        </div>
        <div className="space-y-1">
          {PAGE_LINKS.map((l) => {
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

      {/* Global Assets & Settings Section */}
      <div className="pt-2 border-t border-brand-900/60">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-brand-300/60">
          Global Assets & System
        </div>
        <div className="space-y-1">
          {ASSET_AND_SYSTEM_LINKS.map((l) => {
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
