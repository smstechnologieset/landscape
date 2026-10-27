"use client";

import { useState } from "react";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import { AboutPageContent, DEFAULT_ABOUT_CONTENT } from "@/lib/about-defaults";
import { saveAboutPageAction } from "@/app/actions/admin-crud";

interface PartnerItem {
  id: number;
  name: string;
  website_url?: string | null;
  description?: string;
  is_published?: boolean;
}

interface AboutPageManagerProps {
  initialContent: AboutPageContent;
  partners?: PartnerItem[];
}

export default function AboutPageManager({ initialContent, partners = [] }: AboutPageManagerProps) {
  const [content, setContent] = useState<AboutPageContent>(initialContent || DEFAULT_ABOUT_CONTENT);
  const [activeTab, setActiveTab] = useState<
    "hero" | "background" | "vision_mission" | "objectives" | "values" | "strategic"
  >("hero");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

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

  const updateObjective = (index: number, field: "title" | "desc", lang: "en" | "am", val: string) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.objectives.specific[index]) return prev;
      if (!next.objectives.specific[index][field]) {
        next.objectives.specific[index][field] = { en: "", am: "" };
      }
      next.objectives.specific[index][field][lang] = val;
      return next;
    });
  };

  const updateValue = (index: number, field: "title" | "desc", lang: "en" | "am", val: string) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.values_section.items[index]) return prev;
      if (!next.values_section.items[index][field]) {
        next.values_section.items[index][field] = { en: "", am: "" };
      }
      next.values_section.items[index][field][lang] = val;
      return next;
    });
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setStatus(null);

    const res = await saveAboutPageAction(content);
    setSaving(false);
    if (res.success) {
      setStatus({ success: true, message: res.message || "About Page successfully saved!" });
    } else {
      setStatus({ error: res.error || "Failed to save About page." });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>🌿</span> About Us Page Section-by-Section Editor
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Edit every visual section of the public About page matching the live layout with instant bilingual sync.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/about" target="_blank" className="btn-secondary !text-xs !py-2 font-medium">
            View Live About Page ↗
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
          <Link href="/about" target="_blank" className="underline font-semibold text-xs">
            Check on Live Website ↗
          </Link>
        </div>
      )}
      {status?.error && (
        <div className="rounded-xl bg-red-50 p-4 border border-red-200 text-sm text-red-700">
          ✕ {status.error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-1 p-1.5 rounded-2xl bg-gray-100 border border-gray-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === "hero" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>🌟</span> 1. Hero Section
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("background")}
          className={`px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === "background" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>📜</span> 2. Background & Context
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("vision_mission")}
          className={`px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === "vision_mission" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>🎯</span> 3. Vision & Mission
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("objectives")}
          className={`px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === "objectives" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>🚩</span> 4. Objectives (12 Goals)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("values")}
          className={`px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === "values" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>💎</span> 5. 6 Core Values
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("strategic")}
          className={`px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === "strategic" ? "bg-white text-brand-950 shadow-sm" : "text-gray-600 hover:text-brand-950"
          }`}
        >
          <span>🤝</span> 6. Strategic Engagement
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: HERO SECTION                                                 */}
      {/* =================================================================== */}
      {activeTab === "hero" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">1. Hero Architectural Visual & Banner</h2>
              <p className="text-xs text-gray-500">
                Top dark banner on the About Us page with brand logo emblem, corporate badge, headline, and background image.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live About Page Section 01
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Top Corporate Badge (Next to Logo)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Badge Text (English)</label>
                <input
                  type="text"
                  value={content.hero?.badge?.en || ""}
                  onChange={(e) => updateField(["hero", "badge", "en"], e.target.value)}
                  className="input text-sm"
                  placeholder="Corporate Profile"
                />
              </div>
              <div>
                <label className="label text-xs">Badge Text (አማርኛ)</label>
                <input
                  type="text"
                  value={content.hero?.badge?.am || ""}
                  onChange={(e) => updateField(["hero", "badge", "am"], e.target.value)}
                  className="input text-sm font-amharic"
                  placeholder="ኦፊሴላዊ የድርጅት መገለጫ"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Main Hero Headline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Hero Headline (English)</label>
                <input
                  type="text"
                  value={content.hero?.title?.en || ""}
                  onChange={(e) => updateField(["hero", "title", "en"], e.target.value)}
                  className="input text-sm"
                  placeholder="Dedicated to Sustainable Green Development in Ethiopia"
                />
              </div>
              <div>
                <label className="label text-xs">Hero Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.hero?.title?.am || ""}
                  onChange={(e) => updateField(["hero", "title", "am"], e.target.value)}
                  className="input text-sm font-amharic"
                  placeholder="ለአረንጓዴ፣ ውብ እና ዘላቂ ኢትዮጵያ ቁርጠኝነት"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Supporting Statement Narrative
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Description (English)</label>
                <textarea
                  rows={3}
                  value={content.hero?.description?.en || ""}
                  onChange={(e) => updateField(["hero", "description", "en"], e.target.value)}
                  className="input text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="label text-xs">Description (አማርኛ)</label>
                <textarea
                  rows={3}
                  value={content.hero?.description?.am || ""}
                  onChange={(e) => updateField(["hero", "description", "am"], e.target.value)}
                  className="input text-sm font-amharic leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <ImageUploader
              label="Hero Background Photo"
              value={content.hero?.image || ""}
              onChange={(url: string) => updateField(["hero", "image"], url)}
              aspectRatio="wide"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold"
            >
              {saving ? "Saving…" : "Save Hero Section"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: BACKGROUND, CONTEXT & IDENTITY                               */}
      {/* =================================================================== */}
      {activeTab === "background" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">2. Background, Context & Company Identity</h2>
              <p className="text-xs text-gray-500">
                Editorial company history, 3 paragraphs, pull-quote, brand fundamentals, and brochure PDF download.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live About Page Section 02
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Section Header & Eyebrow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Eyebrow (English)</label>
                <input
                  type="text"
                  value={content.background_context?.eyebrow?.en || ""}
                  onChange={(e) => updateField(["background_context", "eyebrow", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Eyebrow (አማርኛ)</label>
                <input
                  type="text"
                  value={content.background_context?.eyebrow?.am || ""}
                  onChange={(e) => updateField(["background_context", "eyebrow", "am"], e.target.value)}
                  className="input text-sm font-amharic"
                />
              </div>
              <div>
                <label className="label text-xs">Headline (English)</label>
                <input
                  type="text"
                  value={content.background_context?.headline?.en || ""}
                  onChange={(e) => updateField(["background_context", "headline", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.background_context?.headline?.am || ""}
                  onChange={(e) => updateField(["background_context", "headline", "am"], e.target.value)}
                  className="input text-sm font-amharic"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Editorial Narrative Paragraph 1 (National Context)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Paragraph 1 (English)</label>
                <textarea
                  rows={4}
                  value={content.background_context?.p1?.en || ""}
                  onChange={(e) => updateField(["background_context", "p1", "en"], e.target.value)}
                  className="input text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="label text-xs">Paragraph 1 (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.background_context?.p1?.am || ""}
                  onChange={(e) => updateField(["background_context", "p1", "am"], e.target.value)}
                  className="input text-sm font-amharic leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Editorial Narrative Paragraph 2 (Founding Mission)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Paragraph 2 (English)</label>
                <textarea
                  rows={4}
                  value={content.background_context?.p2?.en || ""}
                  onChange={(e) => updateField(["background_context", "p2", "en"], e.target.value)}
                  className="input text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="label text-xs">Paragraph 2 (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.background_context?.p2?.am || ""}
                  onChange={(e) => updateField(["background_context", "p2", "am"], e.target.value)}
                  className="input text-sm font-amharic leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Editorial Narrative Paragraph 3 (Client Commitment)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Paragraph 3 (English)</label>
                <textarea
                  rows={4}
                  value={content.background_context?.p3?.en || ""}
                  onChange={(e) => updateField(["background_context", "p3", "en"], e.target.value)}
                  className="input text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="label text-xs">Paragraph 3 (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.background_context?.p3?.am || ""}
                  onChange={(e) => updateField(["background_context", "p3", "am"], e.target.value)}
                  className="input text-sm font-amharic leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Highlight Editorial Pull-Quote
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Quote Callout (English)</label>
                <textarea
                  rows={3}
                  value={content.background_context?.quote?.en || ""}
                  onChange={(e) => updateField(["background_context", "quote", "en"], e.target.value)}
                  className="input text-sm italic leading-relaxed"
                />
              </div>
              <div>
                <label className="label text-xs">Quote Callout (አማርኛ)</label>
                <textarea
                  rows={3}
                  value={content.background_context?.quote?.am || ""}
                  onChange={(e) => updateField(["background_context", "quote", "am"], e.target.value)}
                  className="input text-sm font-amharic italic leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Left Column Visual & Fundamentals Card
            </h3>
            <ImageUploader
              label="Company Overview Photo"
              value={content.background_context?.image || ""}
              onChange={(url: string) => updateField(["background_context", "image"], url)}
              aspectRatio="square"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Established Year</label>
                <input
                  type="text"
                  value={content.background_context?.established_year || "2026"}
                  onChange={(e) => updateField(["background_context", "established_year"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Headquarters Location</label>
                <input
                  type="text"
                  value={content.background_context?.headquarters || ""}
                  onChange={(e) => updateField(["background_context", "headquarters"], e.target.value)}
                  className="input text-sm"
                />
              </div>
            </div>

            <div>
              <label className="label text-xs">Brochure PDF Download URL</label>
              <input
                type="text"
                value={content.background_context?.brochure_url || "/downloads/landscape_solution_profile.pdf"}
                onChange={(e) => updateField(["background_context", "brochure_url"], e.target.value)}
                className="input text-xs font-mono"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Powers the &quot;Download Brochure (PDF)&quot; button on the About Us page.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold"
            >
              {saving ? "Saving…" : "Save Background & Identity"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: VISION & MISSION                                             */}
      {/* =================================================================== */}
      {activeTab === "vision_mission" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">3. Vision & Mission Statements</h2>
              <p className="text-xs text-gray-500">
                Dual statement cards rendered side-by-side with badge tags and institutional subtitles.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live About Page Section 03
            </span>
          </div>

          {/* Vision Card */}
          <div className="p-5 rounded-2xl bg-brand-950 text-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sprout-400">
                Vision Statement (Card 1)
              </span>
              <span className="text-[10px] bg-brand-900 text-brand-200 px-2 py-0.5 rounded">
                Dark Brand Theme
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Vision Badge (EN)</label>
                <input
                  type="text"
                  value={content.vision_mission?.vision_badge?.en || "Our Vision 2030"}
                  onChange={(e) => updateField(["vision_mission", "vision_badge", "en"], e.target.value)}
                  className="input !bg-brand-900 !text-white !border-brand-800 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Vision Badge (AM)</label>
                <input
                  type="text"
                  value={content.vision_mission?.vision_badge?.am || "የረጅም ጊዜ ራዕይ"}
                  onChange={(e) => updateField(["vision_mission", "vision_badge", "am"], e.target.value)}
                  className="input !bg-brand-900 !text-white !border-brand-800 text-sm font-amharic"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Vision Statement (English)</label>
                <textarea
                  rows={4}
                  value={content.vision_mission?.vision?.en || ""}
                  onChange={(e) => updateField(["vision_mission", "vision", "en"], e.target.value)}
                  className="input !bg-brand-900 !text-white !border-brand-800 text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Vision Statement (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.vision_mission?.vision?.am || ""}
                  onChange={(e) => updateField(["vision_mission", "vision", "am"], e.target.value)}
                  className="input !bg-brand-900 !text-white !border-brand-800 text-sm font-amharic leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="p-5 rounded-2xl bg-brand-50/50 border border-brand-200 text-brand-950 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                Mission Statement (Card 2)
              </span>
              <span className="text-[10px] bg-white text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                Light Theme
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Mission Badge (EN)</label>
                <input
                  type="text"
                  value={content.vision_mission?.mission_badge?.en || "Our Mission"}
                  onChange={(e) => updateField(["vision_mission", "mission_badge", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Mission Badge (AM)</label>
                <input
                  type="text"
                  value={content.vision_mission?.mission_badge?.am || "የተልዕኮ መግለጫ"}
                  onChange={(e) => updateField(["vision_mission", "mission_badge", "am"], e.target.value)}
                  className="input text-sm font-amharic"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Mission Statement (English)</label>
                <textarea
                  rows={4}
                  value={content.vision_mission?.mission?.en || ""}
                  onChange={(e) => updateField(["vision_mission", "mission", "en"], e.target.value)}
                  className="input text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="label text-xs">Mission Statement (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.vision_mission?.mission?.am || ""}
                  onChange={(e) => updateField(["vision_mission", "mission", "am"], e.target.value)}
                  className="input text-sm font-amharic leading-relaxed"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold"
            >
              {saving ? "Saving…" : "Save Vision & Mission"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: GENERAL & 12 SPECIFIC OBJECTIVES                             */}
      {/* =================================================================== */}
      {activeTab === "objectives" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">4. General & 12 Specific Objectives</h2>
              <p className="text-xs text-gray-500">
                Matches the Objectives section on the About page with the General Objective callout and 12 documented goals.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live About Page Section 04
            </span>
          </div>

          {/* General Objective */}
          <div className="p-5 rounded-2xl bg-brand-50 border border-brand-200 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
              General Corporate Objective
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">General Objective (English)</label>
                <textarea
                  rows={4}
                  value={content.objectives?.general_objective?.en || ""}
                  onChange={(e) => updateField(["objectives", "general_objective", "en"], e.target.value)}
                  className="input text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="label text-xs">General Objective (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.objectives?.general_objective?.am || ""}
                  onChange={(e) => updateField(["objectives", "general_objective", "am"], e.target.value)}
                  className="input text-sm font-amharic leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 12 Specific Objectives */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
                12 Specific Strategic Objectives
              </h3>
              <span className="text-xs text-gray-500">
                Total Goals: {content.objectives?.specific?.length || 12}
              </span>
            </div>

            <div className="space-y-4">
              {(content.objectives?.specific || []).map((obj, idx) => (
                <div
                  key={obj.id || idx}
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 hover:border-brand-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sprout-700 bg-sprout-50 px-2 py-0.5 rounded border border-sprout-200">
                      Goal #{String(obj.id || idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] text-gray-400">Section 04 Grid Card</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">Title (EN)</label>
                      <input
                        type="text"
                        value={obj.title?.en || ""}
                        onChange={(e) => updateObjective(idx, "title", "en", e.target.value)}
                        className="input !py-1.5 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">Title (AM)</label>
                      <input
                        type="text"
                        value={obj.title?.am || ""}
                        onChange={(e) => updateObjective(idx, "title", "am", e.target.value)}
                        className="input !py-1.5 text-xs font-medium font-amharic"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">Description (EN)</label>
                      <textarea
                        rows={2}
                        value={obj.desc?.en || ""}
                        onChange={(e) => updateObjective(idx, "desc", "en", e.target.value)}
                        className="input !py-1.5 text-xs leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-1">Description (AM)</label>
                      <textarea
                        rows={2}
                        value={obj.desc?.am || ""}
                        onChange={(e) => updateObjective(idx, "desc", "am", e.target.value)}
                        className="input !py-1.5 text-xs font-amharic leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold"
            >
              {saving ? "Saving…" : "Save All 12 Objectives"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 5: 6 FOUNDATIONAL VALUES                                        */}
      {/* =================================================================== */}
      {activeTab === "values" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">5. The 6 Foundational Corporate Values</h2>
              <p className="text-xs text-gray-500">
                Numbered 01 to 06 with bilingual titles and descriptions matching Section 05 on the About page.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live About Page Section 05
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(content.values_section?.items || []).map((val, idx) => (
              <div
                key={val.number || idx}
                className="p-5 rounded-xl border border-gray-200 bg-gray-50/40 space-y-3 hover:border-brand-400 transition"
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-mono text-base font-bold text-sprout-700">
                    {val.number}
                  </span>
                  <span className="text-xs font-semibold text-brand-900">
                    {val.title?.en || `Value ${idx + 1}`}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">Title (English)</label>
                      <input
                        type="text"
                        value={val.title?.en || ""}
                        onChange={(e) => updateValue(idx, "title", "en", e.target.value)}
                        className="input !py-1.5 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">Title (አማርኛ)</label>
                      <input
                        type="text"
                        value={val.title?.am || ""}
                        onChange={(e) => updateValue(idx, "title", "am", e.target.value)}
                        className="input !py-1.5 text-xs font-medium font-amharic"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">Description (English)</label>
                      <textarea
                        rows={3}
                        value={val.desc?.en || ""}
                        onChange={(e) => updateValue(idx, "desc", "en", e.target.value)}
                        className="input !py-1.5 text-xs leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">Description (አማርኛ)</label>
                      <textarea
                        rows={3}
                        value={val.desc?.am || ""}
                        onChange={(e) => updateValue(idx, "desc", "am", e.target.value)}
                        className="input !py-1.5 text-xs font-amharic leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold"
            >
              {saving ? "Saving…" : "Save 6 Values"}
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 6: STRATEGIC ENGAGEMENT & PARTNERS                              */}
      {/* =================================================================== */}
      {activeTab === "strategic" && (
        <div className="card p-6 sm:p-8 space-y-8 bg-white border border-gray-200 shadow-sm">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-950">6. Strategic Engagement & Institutional Partners</h2>
              <p className="text-xs text-gray-500">
                Matches Section 06 on the About page covering corporate collaborator directory and institutional partnerships.
              </p>
            </div>
            <span className="text-xs bg-sprout-50 text-sprout-800 font-semibold px-2.5 py-1 rounded-full border border-sprout-200">
              Live About Page Section 06
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              Section Header & Narrative
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Eyebrow (English)</label>
                <input
                  type="text"
                  value={content.strategic_engagement?.eyebrow?.en || ""}
                  onChange={(e) => updateField(["strategic_engagement", "eyebrow", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Eyebrow (አማርኛ)</label>
                <input
                  type="text"
                  value={content.strategic_engagement?.eyebrow?.am || ""}
                  onChange={(e) => updateField(["strategic_engagement", "eyebrow", "am"], e.target.value)}
                  className="input text-sm font-amharic"
                />
              </div>
              <div>
                <label className="label text-xs">Headline (English)</label>
                <input
                  type="text"
                  value={content.strategic_engagement?.headline?.en || ""}
                  onChange={(e) => updateField(["strategic_engagement", "headline", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.strategic_engagement?.headline?.am || ""}
                  onChange={(e) => updateField(["strategic_engagement", "headline", "am"], e.target.value)}
                  className="input text-sm font-amharic"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Description (English)</label>
                <textarea
                  rows={3}
                  value={content.strategic_engagement?.description?.en || ""}
                  onChange={(e) => updateField(["strategic_engagement", "description", "en"], e.target.value)}
                  className="input text-sm leading-relaxed"
                />
              </div>
              <div>
                <label className="label text-xs">Description (አማርኛ)</label>
                <textarea
                  rows={3}
                  value={content.strategic_engagement?.description?.am || ""}
                  onChange={(e) => updateField(["strategic_engagement", "description", "am"], e.target.value)}
                  className="input text-sm font-amharic leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Registered Partners List */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
                  Institutional Partners Directory
                </h3>
                <p className="text-xs text-gray-500">
                  Partners dynamically rendered on the About page.
                </p>
              </div>
              <Link
                href="/admin/partners"
                className="btn-secondary !text-xs !py-1.5 px-3 font-semibold flex items-center gap-1"
              >
                + Add / Manage Partners ↗
              </Link>
            </div>

            {partners.length === 0 ? (
              <div className="p-6 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs">
                No corporate partners registered yet. Click &quot;+ Add / Manage Partners&quot; above to create partner records.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {partners.map((p) => (
                  <div key={p.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-xs text-brand-950">{p.name}</div>
                      {p.description && (
                        <div className="text-[11px] text-gray-500 mt-1 line-clamp-2">{p.description}</div>
                      )}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
                      <span className="text-sprout-700 font-semibold">Active Partner</span>
                      <Link href={`/admin/partners/${p.id}`} className="text-brand-700 hover:underline">
                        Edit ↗
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="btn-primary !text-xs !py-2.5 px-6 font-semibold"
            >
              {saving ? "Saving…" : "Save Strategic Engagement"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
