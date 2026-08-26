"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Header({ dict, whatsapp }: { dict: Dictionary; whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    setLocale(document.documentElement.lang === "am" ? "am" : "en");
  }, []);

  const links: { href: string; label: string }[] = [
    { href: "/", label: dict.nav.home },
    { href: "/about", label: dict.nav.about },
    { href: "/services", label: dict.nav.services },
    { href: "/portfolio", label: dict.nav.portfolio },
    { href: "/sustainability", label: dict.nav.sustainability },
    { href: "/blog", label: dict.nav.blog },
    { href: "/careers", label: dict.nav.careers },
    { href: "/contact", label: dict.nav.contact }
  ];

  function switchLocale() {
    const next: Locale = locale === "am" ? "en" : "am";
    setLocale(next);
    document.cookie = `ls_locale=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-brand-800">
          <span aria-hidden className="text-xl">🌿</span>
          <span className="hidden sm:inline">Landscape Solution</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm font-medium">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded px-1 py-1 hover:text-brand-600 ${
                    pathname === l.href || pathname.startsWith(l.href + "/")
                      ? "text-brand-700 underline underline-offset-4"
                      : "text-gray-700"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="rounded border border-brand-300 px-2 py-1 text-xs font-semibold text-brand-800 hover:bg-brand-50"
            aria-label={dict.common.language}
          >
            {locale === "am" ? "EN" : "አማ"}
          </button>
          <div className="hidden sm:block">
            <WhatsAppButton number={whatsapp} label={dict.cta.whatsapp} compact />
          </div>
          <Link href="/quote" className="btn-primary hidden md:inline-flex">
            {dict.cta.quote}
          </Link>
          <button
            className="lg:hidden rounded p-2"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="border-t border-gray-200 bg-white lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded px-2 py-2 text-sm font-medium hover:bg-brand-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex gap-2">
              <Link href="/quote" className="btn-primary flex-1" onClick={() => setOpen(false)}>
                {dict.cta.quote}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
