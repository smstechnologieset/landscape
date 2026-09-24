import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/company-data";

export default function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-900 bg-brand-950 text-brand-100">
      {/* Upper Footer */}
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & Mission column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block rounded-lg bg-white p-2.5 shadow-sm">
              <div className="relative h-11 w-40">
                <Image
                  src="/images/logo.png"
                  alt="Landscape Solution PLC"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-brand-200">
              Established in {COMPANY_INFO.establishedYear} in {COMPANY_INFO.location}, Landscape Solution PLC provides professional landscape planning, design, urban greening, nursery development, botanical gardens, and sustainable environmental restoration services across Ethiopia.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-brand-300">
              <span className="inline-block h-2 w-2 rounded-full bg-sprout-400" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>

          {/* Major Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
              {dict.nav.services}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
              <li>
                <Link href="/services#landscape-planning-and-design" className="hover:text-white transition">
                  Landscape Planning & Design
                </Link>
              </li>
              <li>
                <Link href="/services#landscape-construction-and-installation" className="hover:text-white transition">
                  Construction & Installation
                </Link>
              </li>
              <li>
                <Link href="/services#nursery-development-and-plant-production" className="hover:text-white transition">
                  Nursery Development & Plants
                </Link>
              </li>
              <li>
                <Link href="/services#botanic-garden-development" className="hover:text-white transition">
                  Botanic Garden Development
                </Link>
              </li>
              <li>
                <Link href="/services#urban-greening-and-environmental-services" className="hover:text-white transition">
                  Urban Greening & Parks
                </Link>
              </li>
              <li>
                <Link href="/services#irrigation-and-water-management" className="hover:text-white transition">
                  Irrigation & Water Systems
                </Link>
              </li>
              <li>
                <Link href="/services#environmental-restoration" className="hover:text-white transition">
                  Environmental Restoration
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Core Values */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-200">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition">
                  {dict.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-white transition">
                  {dict.nav.sustainability}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  {dict.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  {dict.nav.careers}
                </Link>
              </li>
            </ul>
          </div>

          {/* Inquiries & Consultations */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-300">
              Engage With Us
            </h3>
            <p className="mt-4 text-sm text-brand-200 leading-relaxed">
              We collaborate with government bodies, commercial enterprises, private clients, and international institutions.
            </p>
            <div className="mt-5 space-y-3">
              <Link
                href="/contact"
                className="btn-accent inline-flex w-full justify-center text-xs uppercase tracking-wider"
              >
                {dict.cta.contactUs}
              </Link>
              <Link
                href="/consultation"
                className="btn inline-flex w-full justify-center border border-brand-700 bg-brand-900/60 text-xs uppercase tracking-wider text-white hover:bg-brand-800"
              >
                {dict.cta.consultation}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-900/80 bg-brand-950 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-4 text-xs text-brand-400 sm:flex-row">
          <p>
            © {year} {COMPANY_INFO.name}. All rights reserved. Addis Ababa, Ethiopia.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-200 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-200 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
