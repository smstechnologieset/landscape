import Link from "next/link";
import { COMPANY_INFO } from "@/lib/company-data";

export const metadata = {
  title: "Terms of Service | Landscape Solution PLC",
  description: "Terms of service governing the use of the Landscape Solution PLC website and service inquiries in Ethiopia."
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="container-narrow">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Legal Agreement</span>
        <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">Terms of Service</h1>
        <p className="mt-2 text-xs text-gray-500">Effective Date: 2026 • Landscape Solution PLC, Addis Ababa, Ethiopia</p>

        <div className="prose-content mt-10 text-gray-700 leading-relaxed text-sm sm:text-base space-y-6">
          <p>
            Welcome to the official corporate website of {COMPANY_INFO.name}. By accessing or using our website, you agree to be bound by these Terms of Service and applicable laws of the Federal Democratic Republic of Ethiopia.
          </p>

          <h2>1. Informational Scope</h2>
          <p>
            The content provided on this website is for general informational purposes concerning Landscape Solution PLC&apos;s landscape architecture, nursery production, botanical gardens, irrigation systems, and environmental restoration capabilities. Formal service contracts, project scope of work, and fee agreements are executed through separate written instruments.
          </p>

          <h2>2. Quotes & Consultation Estimates</h2>
          <p>
            Any preliminary quotes or consultation estimates generated through our online forms represent non-binding indicative figures subject to formal on-site topography evaluation, soil testing, plant availability, and written scope confirmation.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            The Landscape Solution PLC official logo, brand identifiers, site content, editorial texts, and architectural materials are the exclusive property of Landscape Solution PLC and are protected by Ethiopian and international intellectual property laws.
          </p>

          <h2>4. Inquiries & Communication</h2>
          <p>
            Users agree to submit truthful, accurate, and non-misleading information when utilizing our inquiry and consultation forms.
          </p>

          <h2>5. Contact</h2>
          <p>
            For questions regarding these terms, please contact us via our{" "}
            <Link href="/contact" className="text-brand-700 underline font-medium">
              Contact Page
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
