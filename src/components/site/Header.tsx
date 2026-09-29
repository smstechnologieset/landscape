"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function Header({ dict }: { dict: Dictionary; whatsapp?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    setLocale(document.documentElement.lang === "am" ? "am" : "en");
  }, []);

  // Reset header state and close mobile drawer on route navigation
  useEffect(() => {
    setOpen(false);
    setVisible(true);
  }, [pathname]);

  // Smart header: hide on scroll down, reveal immediately on scroll up
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show when near or at the top of the page
      if (currentScrollY <= 60) {
        setVisible(true);
        setScrolled(false);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      setScrolled(true);

      // Keep header visible if mobile drawer is currently open
      if (open) {
        setVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollYRef.current;

      // Smooth threshold to prevent jitter from micro-scrolls
      if (Math.abs(delta) > 10) {
        if (delta > 0) {
          // Scrolling down -> hide navbar to give full screen content immersion
          setVisible(false);
        } else {
          // Scrolling up -> reveal navbar so user can easily change pages
          setVisible(true);
        }
        lastScrollYRef.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

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

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Layout spacer so page content does not jump when header is fixed */}
      <div className="h-20 w-full flex-shrink-0" aria-hidden="true" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-transform duration-300 ease-in-out ${
          scrolled
            ? "border-brand-100/90 bg-white/95 shadow-md backdrop-blur-md"
            : "border-brand-100/80 bg-white/95 backdrop-blur-md"
        } ${visible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container-page flex h-20 items-center justify-between gap-4">
        {/* Official Brand Logo */}
        <Link
          href="/"
          className="group flex items-center py-2 transition-transform duration-200 hover:opacity-95 flex-shrink-0"
          aria-label="Landscape Solution PLC Home"
        >
          <div className="relative h-12 w-36 sm:h-14 sm:w-44">
            <Image
              src="/images/logo.png"
              alt="Landscape Solution PLC"
              fill
              sizes="(max-width: 640px) 144px, 176px"
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {links.map((l) => {
              const active = isLinkActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative py-2 transition-colors duration-150 ${
                      active
                        ? "font-semibold text-brand-900"
                        : "text-gray-600 hover:text-brand-800"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-brand-700" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Language Switcher */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-brand-200 bg-brand-50/60 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold tracking-wider text-brand-900 transition hover:border-brand-300 hover:bg-brand-100/70"
            aria-label={dict.common.language}
          >
            <span className="text-[11px] text-gray-500">🌐</span>
            <span>{locale === "am" ? "ENGLISH" : "አማርኛ"}</span>
          </button>

          {/* Primary CTA — desktop only (xl+), on smaller screens lives inside the hamburger drawer */}
          <Link
            href="/contact"
            className="btn-primary !hidden xl:!inline-flex text-xs uppercase tracking-wider"
          >
            {dict.cta.contactUs}
          </Link>

          {/* Mobile hamburger menu */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-brand-900 transition hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-700 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-brand-100 bg-white shadow-xl xl:hidden animate-fade-in"
        >
          <div className="container-page py-4">
            <ul className="flex flex-col space-y-1">
              {links.map((l) => {
                const active = isLinkActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2.5 text-base font-medium transition ${
                        active
                          ? "bg-brand-50 font-semibold text-brand-900"
                          : "text-gray-700 hover:bg-brand-50/50 hover:text-brand-900"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/contact"
                className="btn-primary w-full text-center py-3 text-sm font-semibold tracking-wide uppercase"
                onClick={() => setOpen(false)}
              >
                {dict.cta.contactUs}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  </>
);
}
