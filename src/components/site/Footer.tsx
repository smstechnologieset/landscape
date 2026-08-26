import Link from "next/link";
import { getSiteSettings } from "@/lib/queries";
import type { Dictionary } from "@/lib/i18n";

export default async function Footer({ dict }: { dict: Dictionary }) {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-800 bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">
            {settings?.company_name || "Landscape Solution PLC"}
          </p>
          <p className="mt-3 text-sm text-brand-200">{settings?.address}</p>
          <p className="mt-1 text-sm text-brand-200">{settings?.email}</p>
          <p className="mt-1 text-sm text-brand-200">{settings?.phone}</p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-300">
            {dict.nav.services}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-white">{dict.nav.services}</Link></li>
            <li><Link href="/portfolio" className="hover:text-white">{dict.nav.portfolio}</Link></li>
            <li><Link href="/sustainability" className="hover:text-white">{dict.nav.sustainability}</Link></li>
            <li><Link href="/blog" className="hover:text-white">{dict.nav.blog}</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company links">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-300">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">{dict.nav.about}</Link></li>
            <li><Link href="/careers" className="hover:text-white">{dict.nav.careers}</Link></li>
            <li><Link href="/partners" className="hover:text-white">{dict.nav.partners}</Link></li>
            <li><Link href="/testimonials" className="hover:text-white">{dict.nav.testimonials}</Link></li>
          </ul>
        </nav>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-300">
            {dict.cta.contactUs}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/quote" className="hover:text-white">{dict.cta.quote}</Link></li>
            <li><Link href="/consultation" className="hover:text-white">{dict.cta.consultation}</Link></li>
            <li><Link href="/contact" className="hover:text-white">{dict.nav.contact}</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-900 py-4">
        <p className="container-page text-center text-xs text-brand-400">
          © {year} {settings?.company_name || "Landscape Solution PLC"}. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
