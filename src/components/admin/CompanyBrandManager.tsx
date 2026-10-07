"use client";

import { useState } from "react";
import Link from "next/link";
import CompanyProfileForm from "@/components/admin/CompanyProfileForm";
import SustainabilityForm from "@/components/admin/SustainabilityForm";
import DeleteButton from "@/components/admin/DeleteButton";

export type CompanyBrandTab = "profile" | "partners" | "sustainability" | "testimonials";

export interface PartnerItem {
  id: number;
  name: string;
  sort_order: number;
  is_published: boolean;
}

export interface TestimonialItem {
  id: number;
  customer_name: string;
  company: string;
  rating: number;
  is_published: boolean;
}

interface CompanyBrandManagerProps {
  profileData: any;
  sustainabilityData: any;
  partners: PartnerItem[];
  testimonials: TestimonialItem[];
  defaultTab?: CompanyBrandTab;
}

export default function CompanyBrandManager({
  profileData,
  sustainabilityData,
  partners,
  testimonials,
  defaultTab = "profile"
}: CompanyBrandManagerProps) {
  const [activeTab, setActiveTab] = useState<CompanyBrandTab>(defaultTab);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>🏢</span> Company & Brand Profile
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your firm&apos;s corporate identity, corporate partners, sustainability commitments, and client reviews.
          </p>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "profile"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>🏢 Identity & Vision</span>
          </button>

          <button
            onClick={() => setActiveTab("partners")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "partners"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>🤝 Partners & Clients</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "partners" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {partners.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("sustainability")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "sustainability"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>♻️ Sustainability</span>
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
              activeTab === "testimonials"
                ? "bg-brand-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span>★ Client Testimonials</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeTab === "testimonials" ? "bg-brand-800 text-brand-100" : "bg-gray-200 text-gray-700"
              }`}
            >
              {testimonials.length}
            </span>
          </button>
        </div>

        {activeTab === "partners" && (
          <Link href="/admin/partners/new" className="btn-primary !text-xs !py-2 font-semibold shadow-sm">
            + New Partner
          </Link>
        )}

        {activeTab === "testimonials" && (
          <Link href="/admin/testimonials/new" className="btn-primary !text-xs !py-2 font-semibold shadow-sm">
            + New Testimonial
          </Link>
        )}
      </div>

      {/* TAB 1: COMPANY PROFILE */}
      {activeTab === "profile" && (
        <div className="card p-6 bg-white border border-gray-200 shadow-sm max-w-4xl">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-brand-950">Corporate Identity & Story</h2>
            <p className="text-xs text-gray-500">
              Manage bilingual information for your About Us, Mission, Vision, and Brochure downloads.
            </p>
          </div>
          <CompanyProfileForm data={profileData ?? {}} />
        </div>
      )}

      {/* TAB 2: PARTNERS & CLIENTS */}
      {activeTab === "partners" && (
        <div className="card overflow-hidden bg-white border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm text-left">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Partner / Institution Name</th>
                  <th className="px-5 py-3.5">Display Order</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {partners.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/80 transition">
                    <td className="px-5 py-4 font-bold text-brand-950">{p.name}</td>
                    <td className="px-5 py-4 text-xs text-gray-500">{p.sort_order}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          p.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.is_published ? "Published" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-xs">
                        <Link
                          href={`/admin/partners/${p.id}`}
                          className="font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                        >
                          Edit
                        </Link>
                        <DeleteButton resource="partners" id={p.id} />
                      </div>
                    </td>
                  </tr>
                ))}
                {partners.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-gray-500 text-sm">
                      No corporate partners registered yet. Click &quot;+ New Partner&quot; to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SUSTAINABILITY PILLARS */}
      {activeTab === "sustainability" && (
        <div className="card p-6 bg-white border border-gray-200 shadow-sm max-w-4xl">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-brand-950">Sustainability & Ecological Commitments</h2>
            <p className="text-xs text-gray-500">
              Update water conservation, indigenous plant preservation, and eco-friendly standards.
            </p>
          </div>
          <SustainabilityForm data={(sustainabilityData ?? {}) as Record<string, unknown>} />
        </div>
      )}

      {/* TAB 4: CLIENT TESTIMONIALS */}
      {activeTab === "testimonials" && (
        <div className="card overflow-hidden bg-white border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm text-left">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <tr>
                  <th className="px-5 py-3.5">Customer Name</th>
                  <th className="px-5 py-3.5">Organization / Company</th>
                  <th className="px-5 py-3.5">Rating</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/80 transition">
                    <td className="px-5 py-4 font-bold text-brand-950">{t.customer_name}</td>
                    <td className="px-5 py-4 text-xs text-gray-500">{t.company || "—"}</td>
                    <td className="px-5 py-4 text-accent-500 font-semibold text-xs tracking-wider">
                      {"★".repeat(t.rating)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          t.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {t.is_published ? "Published" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-xs">
                        <Link
                          href={`/admin/testimonials/${t.id}`}
                          className="font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                        >
                          Edit
                        </Link>
                        <DeleteButton resource="testimonials" id={t.id} />
                      </div>
                    </td>
                  </tr>
                ))}
                {testimonials.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                      No client testimonials created yet. Click &quot;+ New Testimonial&quot; to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
