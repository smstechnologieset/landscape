import Link from "next/link";
import { COMPANY_INFO } from "@/lib/company-data";

export const metadata = {
  title: "Privacy Policy | Landscape Solution PLC",
  description: "Privacy policy and client data protection practices of Landscape Solution PLC in Ethiopia."
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="container-narrow">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Legal & Privacy</span>
        <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-brand-950">Privacy Policy</h1>
        <p className="mt-2 text-xs text-gray-500">Effective Date: 2026 • Landscape Solution PLC, Addis Ababa, Ethiopia</p>

        <div className="prose-content mt-10 text-gray-700 leading-relaxed text-sm sm:text-base space-y-6">
          <p>
            {COMPANY_INFO.name} (&quot;Landscape Solution&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy of clients, institutional partners, and visitors who interact with our website and digital services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect personal and professional information provided voluntarily through our inquiry, quote, and consultation forms. This may include:
          </p>
          <ul>
            <li>Full Name and contact details (email address and phone number).</li>
            <li>Organization, company, or institutional affiliation.</li>
            <li>Project location, site specifications, budget parameters, and landscape service preferences.</li>
            <li>Resume files and credentials submitted for professional opportunities.</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>The information collected is used solely for professional business purposes, including:</p>
          <ul>
            <li>Responding to landscape inquiries, site consultations, and quote requests.</li>
            <li>Preparing detailed architectural proposals, plant schedules, and technical estimates.</li>
            <li>Reviewing vocational qualifications and talent inquiries.</li>
            <li>Complying with applicable legal and commercial regulations in the Federal Democratic Republic of Ethiopia.</li>
          </ul>

          <h2>3. Data Protection & Security</h2>
          <p>
            We deploy secure storage and administrative access restrictions to protect submitted data. Client attachments and resume documents are maintained in secure private cloud storage and are never sold, rented, or distributed to unauthorized third parties.
          </p>

          <h2>4. Contact Us</h2>
          <p>
            For any questions or privacy inquiries regarding our website, please visit our{" "}
            <Link href="/contact" className="text-brand-700 underline font-medium">
              Contact Page
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
