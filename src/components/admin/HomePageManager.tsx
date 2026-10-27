"use client";

import { useState } from "react";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import { HomePageContent, DEFAULT_HOME_CONTENT } from "@/lib/home-defaults";
import { saveHomePageAction } from "@/app/actions/admin-crud";

interface HomePageManagerProps {
  initialContent: HomePageContent;
  testimonials: Array<{
    id: number;
    customer_name: string;
    company?: string;
    rating: number;
    is_published: boolean;
  }>;
}

export default function HomePageManager({
  initialContent,
  testimonials
}: HomePageManagerProps) {
  const [content, setContent] = useState<HomePageContent>(initialContent || DEFAULT_HOME_CONTENT);
  const [activeTab, setActiveTab] = useState<"hero" | "who_we_are" | "why_choose_us" | "cta" | "testimonials">("hero");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  // Deep update helper
  const updateField = (path: string[], val: any) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let cur = next;
      for (let i = 0; i < path.length - 1; i++) {
        if (!cur[path[i]]) cur[path[i]] = {};
        cur = cur[path[i]];
      }
      cur[path[path.length - 1]] = val;
      return next;
    });
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setStatus(null);

    const res = await saveHomePageAction(content);
    setSaving(false);
    if (res.success) {
      setStatus({ success: true, message: res.message || "Homepage saved successfully!" });
    } else {
      setStatus({ error: res.error || "Failed to save homepage sections." });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>🏠</span> Home Page Section-by-Section Editor
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Edit each exact visual section of the live homepage with real-time sync in English and Amharic.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" target="_blank" className="btn-secondary !text-xs !py-2 font-medium">
            View Live Homepage ↗
          </Link>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={saving}
            className="btn-primary !text-xs !py-2 px-5 font-semibold shadow-md"
          >
            {saving ? "Saving Changes…" : "Save All Sections"}
          </button>
        </div>
      </div>

      {/* Alert Status Banner */}
      {status?.success && (
        <div className="rounded-xl bg-green-50 p-4 border border-green-200 text-sm text-green-800 flex items-center justify-between">
          <span>✓ {status.message}</span>
          <Link href="/" target="_blank" className="underline font-semibold text-xs">
            Check on Live Website ↗
          </Link>
        </div>
      )}
      {status?.error && (
        <div className="rounded-xl bg-red-50 p-4 border border-red-200 text-sm text-red-700">
          ✕ {status.error}
        </div>
      )}

      {/* Visual Section Navigation Tabs */}
      <div className="flex flex-wrap gap-1 p-1.5 rounded-2xl bg-gray-100 border border-gray-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
            activeTab === "hero" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>🌟</span> 1. Hero Banner & Visuals
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("who_we_are")}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
            activeTab === "who_we_are" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>🌿</span> 2. Who We Are Section
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("why_choose_us")}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
            activeTab === "why_choose_us" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>🛡️</span> 3. Why Choose Us & Team
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("cta")}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
            activeTab === "cta" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>📣</span> 4. Closing Call-To-Action
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("testimonials")}
          className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
            activeTab === "testimonials" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>⭐</span> 5. Client Testimonials ({testimonials.length})
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: HERO SECTION                                                */}
      {/* =================================================================== */}
      {activeTab === "hero" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">1. Hero Section Editorial & Architectural Visual</h2>
              <p className="text-xs text-gray-500">
                Matches the top architectural banner with badge metadata, headline, 3 key metrics, and right photo frame.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live Homepage Section 01
            </span>
          </div>

          {/* Top Origin Metadata Bar */}
          <div className="p-5 rounded-xl bg-gray-50/80 border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Top Badge & Metadata Bar (Above Headline)
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Date & Location Badge (English)</label>
                <input
                  type="text"
                  value={content.hero.badge_date.en}
                  onChange={(e) => updateField(["hero", "badge_date", "en"], e.target.value)}
                  className="input"
                  placeholder="Est. 2026 • Addis Ababa"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Date & Location Badge (አማርኛ)</label>
                <input
                  type="text"
                  value={content.hero.badge_date.am}
                  onChange={(e) => updateField(["hero", "badge_date", "am"], e.target.value)}
                  className="input"
                  placeholder="የተመሰረተበት ዓ.ም • 2026"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Subtitle Discipline Badge (English)</label>
                <input
                  type="text"
                  value={content.hero.badge_subtitle.en}
                  onChange={(e) => updateField(["hero", "badge_subtitle", "en"], e.target.value)}
                  className="input"
                  placeholder="Landscape Architecture & Ecological Infrastructure"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Subtitle Discipline Badge (አማርኛ)</label>
                <input
                  type="text"
                  value={content.hero.badge_subtitle.am}
                  onChange={(e) => updateField(["hero", "badge_subtitle", "am"], e.target.value)}
                  className="input"
                  placeholder="የአረንጓዴ ልማት እና የመልክአ ምድር መፍትሄዎች"
                />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Main Hero Headline
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Headline (English)</label>
                <input
                  type="text"
                  value={content.hero.headline.en}
                  onChange={(e) => updateField(["hero", "headline", "en"], e.target.value)}
                  className="input font-medium"
                  placeholder="Professional Landscape Architecture for a Greener Future"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.hero.headline.am}
                  onChange={(e) => updateField(["hero", "headline", "am"], e.target.value)}
                  className="input font-medium"
                  placeholder="ለዘላቂ አረንጓዴ የወደፊት ፕሮፌሽናል የመልክአ ምድር መፍትሄዎች"
                />
              </div>
            </div>
          </div>

          {/* Subtitle Statement */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Supporting Statement Narrative
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Description (English)</label>
                <textarea
                  value={content.hero.description.en}
                  onChange={(e) => updateField(["hero", "description", "en"], e.target.value)}
                  rows={3}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Description (አማርኛ)</label>
                <textarea
                  value={content.hero.description.am}
                  onChange={(e) => updateField(["hero", "description", "am"], e.target.value)}
                  rows={3}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-5 rounded-xl bg-gray-50/80 border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Hero Call-To-Action Buttons
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Primary Button Label (EN)</label>
                <input
                  type="text"
                  value={content.hero.primary_btn.label.en}
                  onChange={(e) => updateField(["hero", "primary_btn", "label", "en"], e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Primary Button Label (AM)</label>
                <input
                  type="text"
                  value={content.hero.primary_btn.label.am}
                  onChange={(e) => updateField(["hero", "primary_btn", "label", "am"], e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Primary Button Link</label>
                <input
                  type="text"
                  value={content.hero.primary_btn.url}
                  onChange={(e) => updateField(["hero", "primary_btn", "url"], e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Secondary Button Label (EN)</label>
                <input
                  type="text"
                  value={content.hero.secondary_btn.label.en}
                  onChange={(e) => updateField(["hero", "secondary_btn", "label", "en"], e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Secondary Button Label (AM)</label>
                <input
                  type="text"
                  value={content.hero.secondary_btn.label.am}
                  onChange={(e) => updateField(["hero", "secondary_btn", "label", "am"], e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Secondary Button Link</label>
                <input
                  type="text"
                  value={content.hero.secondary_btn.url}
                  onChange={(e) => updateField(["hero", "secondary_btn", "url"], e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* 3 Factual Stat Metrics */}
          <div className="p-5 rounded-xl bg-brand-50/50 border border-brand-200/80 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-900">
              3 Institutional Stat Counters (Under Hero Buttons)
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Metric 1 */}
              <div className="p-3 bg-white rounded-lg border border-brand-100 space-y-2">
                <label className="label text-xs font-bold text-brand-900">Metric 1 (Number)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m1.value}
                  onChange={(e) => updateField(["hero", "metrics", "m1", "value"], e.target.value)}
                  className="input font-bold text-brand-800"
                />
                <label className="label text-[11px] text-gray-600">Label (EN)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m1.label.en}
                  onChange={(e) => updateField(["hero", "metrics", "m1", "label", "en"], e.target.value)}
                  className="input text-xs"
                />
                <label className="label text-[11px] text-gray-600">Label (AM)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m1.label.am}
                  onChange={(e) => updateField(["hero", "metrics", "m1", "label", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>

              {/* Metric 2 */}
              <div className="p-3 bg-white rounded-lg border border-brand-100 space-y-2">
                <label className="label text-xs font-bold text-brand-900">Metric 2 (Number)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m2.value}
                  onChange={(e) => updateField(["hero", "metrics", "m2", "value"], e.target.value)}
                  className="input font-bold text-brand-800"
                />
                <label className="label text-[11px] text-gray-600">Label (EN)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m2.label.en}
                  onChange={(e) => updateField(["hero", "metrics", "m2", "label", "en"], e.target.value)}
                  className="input text-xs"
                />
                <label className="label text-[11px] text-gray-600">Label (AM)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m2.label.am}
                  onChange={(e) => updateField(["hero", "metrics", "m2", "label", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>

              {/* Metric 3 */}
              <div className="p-3 bg-white rounded-lg border border-brand-100 space-y-2">
                <label className="label text-xs font-bold text-brand-900">Metric 3 (Number)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m3.value}
                  onChange={(e) => updateField(["hero", "metrics", "m3", "value"], e.target.value)}
                  className="input font-bold text-brand-800"
                />
                <label className="label text-[11px] text-gray-600">Label (EN)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m3.label.en}
                  onChange={(e) => updateField(["hero", "metrics", "m3", "label", "en"], e.target.value)}
                  className="input text-xs"
                />
                <label className="label text-[11px] text-gray-600">Label (AM)</label>
                <input
                  type="text"
                  value={content.hero.metrics.m3.label.am}
                  onChange={(e) => updateField(["hero", "metrics", "m3", "label", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>
          </div>

          {/* Right Frame Photo & Captions */}
          <div className="p-5 rounded-xl bg-gray-50/80 border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Right Architectural Visual Frame & Captions
            </h3>

            <ImageUploader
              label="Hero Main Photo (Architectural Frame)"
              name="hero_image"
              value={content.hero.hero_image || "/images/hero_landscape.jpg"}
              onChange={(url) => updateField(["hero", "hero_image"], url)}
              bucket="site-assets"
              aspectRatio="video"
            />

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Floating Top Tag (EN)</label>
                <input
                  type="text"
                  value={content.hero.visual_card.tag.en}
                  onChange={(e) => updateField(["hero", "visual_card", "tag", "en"], e.target.value)}
                  className="input text-xs"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Floating Top Tag (AM)</label>
                <input
                  type="text"
                  value={content.hero.visual_card.tag.am}
                  onChange={(e) => updateField(["hero", "visual_card", "tag", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Bottom Card Title (EN)</label>
                <input
                  type="text"
                  value={content.hero.visual_card.caption_title.en}
                  onChange={(e) => updateField(["hero", "visual_card", "caption_title", "en"], e.target.value)}
                  className="input text-xs"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Bottom Card Title (AM)</label>
                <input
                  type="text"
                  value={content.hero.visual_card.caption_title.am}
                  onChange={(e) => updateField(["hero", "visual_card", "caption_title", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Bottom Card Description (EN)</label>
                <input
                  type="text"
                  value={content.hero.visual_card.caption_desc.en}
                  onChange={(e) => updateField(["hero", "visual_card", "caption_desc", "en"], e.target.value)}
                  className="input text-xs"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Bottom Card Description (AM)</label>
                <input
                  type="text"
                  value={content.hero.visual_card.caption_desc.am}
                  onChange={(e) => updateField(["hero", "visual_card", "caption_desc", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold shadow-md"
            >
              {saving ? "Saving Section…" : "Save Hero Section"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: WHO WE ARE SECTION                                          */}
      {/* =================================================================== */}
      {activeTab === "who_we_are" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">2. &quot;Who We Are&quot; Editorial Company Intro</h2>
              <p className="text-xs text-gray-500">
                Matches Section 02 on the homepage with two paragraphs, 2 specialization pillars, and photo composition.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live Homepage Section 02
            </span>
          </div>

          {/* Section Image & Badge */}
          <div className="p-5 rounded-xl bg-gray-50/80 border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Left Image & Fact Badge
            </h3>

            <ImageUploader
              label="Who We Are Section Image"
              name="who_we_are_image"
              value={content.who_we_are.image || "/images/who_we_are.jpg"}
              onChange={(url) => updateField(["who_we_are", "image"], url)}
              bucket="site-assets"
              aspectRatio="video"
            />

            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Fact Badge Year</label>
                <input
                  type="text"
                  value={content.who_we_are.fact_badge.year}
                  onChange={(e) => updateField(["who_we_are", "fact_badge", "year"], e.target.value)}
                  className="input font-bold"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Fact Badge Subtitle (EN)</label>
                <input
                  type="text"
                  value={content.who_we_are.fact_badge.label.en}
                  onChange={(e) => updateField(["who_we_are", "fact_badge", "label", "en"], e.target.value)}
                  className="input text-xs"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Fact Badge Subtitle (AM)</label>
                <input
                  type="text"
                  value={content.who_we_are.fact_badge.label.am}
                  onChange={(e) => updateField(["who_we_are", "fact_badge", "label", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>
          </div>

          {/* Eyebrow & Headline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Section Eyebrow & Headline
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Eyebrow Tag (English)</label>
                <input
                  type="text"
                  value={content.who_we_are.eyebrow.en}
                  onChange={(e) => updateField(["who_we_are", "eyebrow", "en"], e.target.value)}
                  className="input text-xs uppercase"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Eyebrow Tag (አማርኛ)</label>
                <input
                  type="text"
                  value={content.who_we_are.eyebrow.am}
                  onChange={(e) => updateField(["who_we_are", "eyebrow", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Headline (English)</label>
                <input
                  type="text"
                  value={content.who_we_are.headline.en}
                  onChange={(e) => updateField(["who_we_are", "headline", "en"], e.target.value)}
                  className="input font-medium"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.who_we_are.headline.am}
                  onChange={(e) => updateField(["who_we_are", "headline", "am"], e.target.value)}
                  className="input font-medium"
                />
              </div>
            </div>
          </div>

          {/* Paragraph 1 */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Paragraph 1: Founding & Green Development Focus
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Paragraph 1 (English)</label>
                <textarea
                  value={content.who_we_are.p1.en}
                  onChange={(e) => updateField(["who_we_are", "p1", "en"], e.target.value)}
                  rows={4}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Paragraph 1 (አማርኛ)</label>
                <textarea
                  value={content.who_we_are.p1.am}
                  onChange={(e) => updateField(["who_we_are", "p1", "am"], e.target.value)}
                  rows={4}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Paragraph 2 */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Paragraph 2: Technology, Design & Sectors
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Paragraph 2 (English)</label>
                <textarea
                  value={content.who_we_are.p2.en}
                  onChange={(e) => updateField(["who_we_are", "p2", "en"], e.target.value)}
                  rows={4}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Paragraph 2 (አማርኛ)</label>
                <textarea
                  value={content.who_we_are.p2.am}
                  onChange={(e) => updateField(["who_we_are", "p2", "am"], e.target.value)}
                  rows={4}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Documented Pillars */}
          <div className="p-5 rounded-xl bg-gray-50/80 border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Documented 2 Key Pillars & Button
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-2">
                <span className="text-[11px] font-bold text-brand-900 block">Pillar 1: Specialization</span>
                <input
                  type="text"
                  value={content.who_we_are.pillar_specialization.value.en}
                  onChange={(e) => updateField(["who_we_are", "pillar_specialization", "value", "en"], e.target.value)}
                  className="input text-xs"
                  placeholder="11 Documented Major Services"
                />
                <input
                  type="text"
                  value={content.who_we_are.pillar_specialization.value.am}
                  onChange={(e) => updateField(["who_we_are", "pillar_specialization", "value", "am"], e.target.value)}
                  className="input text-xs"
                  placeholder="11 ዋና ዋና አገልግሎቶች"
                />
              </div>

              <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-2">
                <span className="text-[11px] font-bold text-brand-900 block">Pillar 2: Focus</span>
                <input
                  type="text"
                  value={content.who_we_are.pillar_focus.value.en}
                  onChange={(e) => updateField(["who_we_are", "pillar_focus", "value", "en"], e.target.value)}
                  className="input text-xs"
                  placeholder="Sustainability & Climate Resilience"
                />
                <input
                  type="text"
                  value={content.who_we_are.pillar_focus.value.am}
                  onChange={(e) => updateField(["who_we_are", "pillar_focus", "value", "am"], e.target.value)}
                  className="input text-xs"
                  placeholder="ዘላቂነት እና ብዝሃ-ሕይወት"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">CTA Button Text (English)</label>
                <input
                  type="text"
                  value={content.who_we_are.cta_btn.label.en}
                  onChange={(e) => updateField(["who_we_are", "cta_btn", "label", "en"], e.target.value)}
                  className="input text-xs"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">CTA Button Text (አማርኛ)</label>
                <input
                  type="text"
                  value={content.who_we_are.cta_btn.label.am}
                  onChange={(e) => updateField(["who_we_are", "cta_btn", "label", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold shadow-md"
            >
              {saving ? "Saving Section…" : "Save Who We Are Section"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: WHY CHOOSE US & TEAM                                        */}
      {/* =================================================================== */}
      {activeTab === "why_choose_us" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">3. &quot;Why Choose Us&quot; & Technical Team</h2>
              <p className="text-xs text-gray-500">
                Institutional capabilities, 4 technical strengths from the founding charter, and team photo.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live Homepage Section 06
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Section Headline & Descriptions
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Headline (English)</label>
                <input
                  type="text"
                  value={content.why_choose_us.headline.en}
                  onChange={(e) => updateField(["why_choose_us", "headline", "en"], e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.why_choose_us.headline.am}
                  onChange={(e) => updateField(["why_choose_us", "headline", "am"], e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Overview Description (English)</label>
                <textarea
                  value={content.why_choose_us.description.en}
                  onChange={(e) => updateField(["why_choose_us", "description", "en"], e.target.value)}
                  rows={3}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Overview Description (አማርኛ)</label>
                <textarea
                  value={content.why_choose_us.description.am}
                  onChange={(e) => updateField(["why_choose_us", "description", "am"], e.target.value)}
                  rows={3}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Team Photo */}
          <div className="p-5 rounded-xl bg-gray-50/80 border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Technical Team Photo
            </h3>
            <ImageUploader
              label="Team Photo / Field Implementation"
              name="team_image"
              value={content.why_choose_us.team_image || "/images/who_we_are.jpg"}
              onChange={(url) => updateField(["why_choose_us", "team_image"], url)}
              bucket="site-assets"
              aspectRatio="square"
            />
          </div>

          {/* 4 Core Strengths */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              4 Technical Capabilities
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.why_choose_us.strengths.map((s, idx) => (
                <div key={idx} className="p-4 bg-gray-50/80 rounded-xl border border-gray-200 space-y-2">
                  <span className="text-xs font-bold text-sprout-700">Capability #{idx + 1}</span>
                  <input
                    type="text"
                    value={s.title.en}
                    onChange={(e) => updateField(["why_choose_us", "strengths", String(idx), "title", "en"], e.target.value)}
                    className="input text-xs font-semibold"
                    placeholder="Title (English)"
                  />
                  <input
                    type="text"
                    value={s.title.am}
                    onChange={(e) => updateField(["why_choose_us", "strengths", String(idx), "title", "am"], e.target.value)}
                    className="input text-xs font-semibold"
                    placeholder="Title (አማርኛ)"
                  />
                  <textarea
                    value={s.desc.en}
                    onChange={(e) => updateField(["why_choose_us", "strengths", String(idx), "desc", "en"], e.target.value)}
                    rows={2}
                    className="input text-xs"
                    placeholder="Description (English)"
                  />
                  <textarea
                    value={s.desc.am}
                    onChange={(e) => updateField(["why_choose_us", "strengths", String(idx), "desc", "am"], e.target.value)}
                    rows={2}
                    className="input text-xs"
                    placeholder="Description (አማርኛ)"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold shadow-md"
            >
              {saving ? "Saving Section…" : "Save Why Choose Us"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: CLOSING CALL TO ACTION                                      */}
      {/* =================================================================== */}
      {activeTab === "cta" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">4. Closing Call-To-Action Banner</h2>
              <p className="text-xs text-gray-500">
                The final high-conversion closing banner at the bottom of the homepage.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live Homepage Section 09
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Badge & Main Headline
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Top Badge (English)</label>
                <input
                  type="text"
                  value={content.cta_banner.badge.en}
                  onChange={(e) => updateField(["cta_banner", "badge", "en"], e.target.value)}
                  className="input text-xs uppercase"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Top Badge (አማርኛ)</label>
                <input
                  type="text"
                  value={content.cta_banner.badge.am}
                  onChange={(e) => updateField(["cta_banner", "badge", "am"], e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Headline (English)</label>
                <input
                  type="text"
                  value={content.cta_banner.headline.en}
                  onChange={(e) => updateField(["cta_banner", "headline", "en"], e.target.value)}
                  className="input font-medium"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.cta_banner.headline.am}
                  onChange={(e) => updateField(["cta_banner", "headline", "am"], e.target.value)}
                  className="input font-medium"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label text-xs font-semibold text-gray-700">Description (English)</label>
                <textarea
                  value={content.cta_banner.description.en}
                  onChange={(e) => updateField(["cta_banner", "description", "en"], e.target.value)}
                  rows={3}
                  className="input"
                />
              </div>
              <div>
                <label className="label text-xs font-semibold text-gray-700">Description (አማርኛ)</label>
                <textarea
                  value={content.cta_banner.description.am}
                  onChange={(e) => updateField(["cta_banner", "description", "am"], e.target.value)}
                  rows={3}
                  className="input"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold shadow-md"
            >
              {saving ? "Saving Section…" : "Save Closing Banner"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 5: CLIENT TESTIMONIALS                                         */}
      {/* =================================================================== */}
      {activeTab === "testimonials" && (
        <div id="testimonials" className="card p-6 sm:p-8 space-y-6 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">5. Client Testimonials & Social Proof</h2>
              <p className="text-xs text-gray-500">
                Customer quotes, star ratings, and company attributions shown on the homepage.
              </p>
            </div>
            <Link
              href="/admin/testimonials/new"
              className="btn-primary !text-xs !py-2 px-4 shadow-sm"
            >
              + Add New Testimonial
            </Link>
          </div>

          {testimonials.length === 0 ? (
            <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              No testimonials created yet. Click &quot;+ Add New Testimonial&quot; above to create one.
            </div>
          ) : (
            <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 overflow-hidden bg-white">
              {testimonials.map((t) => (
                <div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-brand-950">{t.customer_name}</div>
                    <div className="text-xs text-gray-500">
                      {t.company || "Client"} • <span className="text-amber-500 font-semibold">{"★".repeat(t.rating || 5)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full border ${
                      t.is_published
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-500 border-gray-200"
                    }`}>
                      {t.is_published ? "Published" : "Draft"}
                    </span>
                    <Link
                      href={`/admin/testimonials/${t.id}`}
                      className="btn-secondary !text-xs !py-1 px-3"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
