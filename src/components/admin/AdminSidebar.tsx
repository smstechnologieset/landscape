"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const EDITOR_LINKS: { href: string; label: string; icon: string }[] = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/services", label: "Services", icon: "🌿" },
  { href: "/admin/projects", label: "Projects", icon: "🏗" },
  { href: "/admin/blog", label: "Blog", icon: "✏️" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "★" },
  { href: "/admin/partners", label: "Partners", icon: "🤝" },
  { href: "/admin/sustainability", label: "Sustainability", icon: "♻️" },
  { href: "/admin/careers", label: "Careers", icon: "💼" },
  { href: "/admin/applications", label: "Applications", icon: "📄" },
  { href: "/admin/inquiries", label: "Contact Inquiries", icon: "✉️" },
  { href: "/admin/quotes", label: "Quote Requests", icon: "💰" },
  { href: "/admin/consultations", label: "Consultations", icon: "📅" },
  { href: "/admin/company-profile", label: "Company Profile", icon: "🏢" },
  { href: "/admin/media", label: "Media", icon: "🖼" }
];

export default function AdminSidebar({ role }: { role: "admin" | "editor" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = role === "admin"
    ? [...EDITOR_LINKS,
       { href: "/admin/settings", label: "Settings", icon: "⚙️" },
       { href: "/admin/users", label: "Admin Users", icon: "👥" }]
    : EDITOR_LINKS;

  const nav = (
    <nav aria-label="Admin navigation" className="flex-1 space-y-1 overflow-y-auto p-3">
      {links.map((l) => {
        const active = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href));
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              active ? "bg-brand-700 text-white" : "text-brand-100 hover:bg-brand-800"
            }`}
          >
            <span aria-hidden>{l.icon}</span>
            {l.label}
          </Link>
        );
      })}
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

      {/* Desktop */}
      <aside className="hidden w-60 shrink-0 flex-col bg-brand-950 lg:flex">{nav}</aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
          <aside className="relative flex w-64 flex-col bg-brand-950 pt-14">{nav}</aside>
        </div>
      )}
    </>
  );
}
