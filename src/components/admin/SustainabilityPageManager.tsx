"use client";

import { useState } from "react";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";
import {
  SustainabilityPageContent,
  DEFAULT_SUSTAINABILITY_CONTENT,
  SustainabilityPillar,
  SustainabilityInitiative,
  SustainabilityStat
} from "@/lib/sustainability-defaults";
import { saveSustainabilityPageAction } from "@/app/actions/admin-crud";

interface SustainabilityPageManagerProps {
  initialContent: SustainabilityPageContent;
}

export default function SustainabilityPageManager({ initialContent }: SustainabilityPageManagerProps) {
  const [content, setContent] = useState<SustainabilityPageContent>(
    initialContent || DEFAULT_SUSTAINABILITY_CONTENT
  );
  const [activeTab, setActiveTab] = useState<"hero" | "context" | "pillars" | "initiatives" | "cta">("hero");
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

  const updatePillar = (idx: number, field: keyof SustainabilityPillar, val: any) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.pillars_section) next.pillars_section = { pillars: [] };
      if (!next.pillars_section.pillars) next.pillars_section.pillars = [];
      if (!next.pillars_section.pillars[idx]) return prev;
      next.pillars_section.pillars[idx][field] = val;
      return next;
    });
  };

  const updateInitiative = (idx: number, field: keyof SustainabilityInitiative, val: any) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.initiatives_section) next.initiatives_section = { items: [] };
      if (!next.initiatives_section.items) next.initiatives_section.items = [];
      if (!next.initiatives_section.items[idx]) return prev;
      next.initiatives_section.items[idx][field] = val;
      return next;
    });
  };

  const updateStat = (idx: number, field: keyof SustainabilityStat, val: any) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.national_context) next.national_context = { statistics: [] };
      if (!next.national_context.statistics) next.national_context.statistics = [];
      if (!next.national_context.statistics[idx]) return prev;
      next.national_context.statistics[idx][field] = val;
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await saveSustainabilityPageAction(content);
      if (res.success) {
        setStatus({ success: true, message: res.message || "Saved successfully!" });
      } else {
        setStatus({ success: false, error: res.error || "Failed to save changes." });
      }
    } catch (err: any) {
      setStatus({ success: false, error: err.message || "An unexpected error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const tabs: { id: typeof activeTab; label: string; icon: string }[] = [
    { id: "hero", label: "Hero & Banner Visual", icon: "🌟" },
    { id: "context", label: "National Context & Metrics", icon: "📜" },
    { id: "pillars", label: "6 Environmental Pillars", icon: "💎" },
    { id: "initiatives", label: "On-the-Ground Initiatives", icon: "🌱" },
    { id: "cta", label: "Call to Action", icon: "🤝" }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
            <span>🌱</span> Sustainability Page Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Edit every visual section of the public Sustainability page: Hero, National Context, 6 Environmental Pillars with images, and Actionable Commitments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sustainability"
            target="_blank"
            className="btn-secondary !text-xs !py-2 !px-3 flex items-center gap-1.5"
          >
            <span>View Live Sustainability</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary !text-xs !py-2 !px-4 flex items-center gap-1.5 shadow-sm"
          >
            {saving ? (
              <>
                <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving All…</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status Alerts */}
      {status?.success && (
        <div className="p-3.5 rounded-xl bg-sprout-50 border border-sprout-200 text-sprout-900 text-xs font-medium flex items-center gap-2">
          <span>✅</span>
          <span>{status.message}</span>
        </div>
      )}
      {status?.error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs font-medium flex items-center gap-2">
          <span>⚠️</span>
          <span>{status.error}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-brand-900 text-white shadow-sm"
                : "text-gray-600 hover:text-brand-900 hover:bg-gray-100"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: HERO SECTION & BANNER VISUAL */}
      {activeTab === "hero" && (
        <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-brand-950 flex items-center gap-2">
              <span>🌟</span> Hero Section & Backdrop Visual
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Controls the top full-bleed architectural banner on the Sustainability page.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Hero Badge / Tag (English)</label>
                <input
                  type="text"
                  value={content.hero?.badge?.en || ""}
                  onChange={(e) => updateField(["hero", "badge", "en"], e.target.value)}
                  className="input text-sm"
                  placeholder="Ecological Commitment & Green Development"
                />
              </div>
              <div>
                <label className="label text-xs">Hero Badge / Tag (አማርኛ)</label>
                <input
                  type="text"
                  value={content.hero?.badge?.am || ""}
                  onChange={(e) => updateField(["hero", "badge", "am"], e.target.value)}
                  className="input text-sm"
                  placeholder="የአካባቢ ጥበቃ እና ዘላቂ ልማት"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Hero Main Title (English)</label>
                <input
                  type="text"
                  value={content.hero?.title?.en || ""}
                  onChange={(e) => updateField(["hero", "title", "en"], e.target.value)}
                  className="input text-sm font-semibold"
                  placeholder="Building Green Infrastructure & Climate Resilience"
                />
              </div>
              <div>
                <label className="label text-xs">Hero Main Title (አማርኛ)</label>
                <input
                  type="text"
                  value={content.hero?.title?.am || ""}
                  onChange={(e) => updateField(["hero", "title", "am"], e.target.value)}
                  className="input text-sm font-semibold"
                  placeholder="ለተፈጥሮ ተስማሚ አሰራር፣ ለዘላቂ አረንጓዴ ልማት"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Hero Description Narrative (English)</label>
                <textarea
                  rows={4}
                  value={content.hero?.description?.en || ""}
                  onChange={(e) => updateField(["hero", "description", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Hero Description Narrative (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.hero?.description?.am || ""}
                  onChange={(e) => updateField(["hero", "description", "am"], e.target.value)}
                  className="input text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <ImageUploader
              label="Hero Banner Image"
              value={content.hero?.image || ""}
              onChange={(url: string) => updateField(["hero", "image"], url)}
              aspectRatio="wide"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary !text-xs !py-2 !px-4"
            >
              {saving ? "Saving…" : "Save Hero Section"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: NATIONAL CONTEXT & METRICS */}
      {activeTab === "context" && (
        <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-brand-950 flex items-center gap-2">
              <span>📜</span> The National Context & Environmental Imperative
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Narrative section presenting Ethiopia&apos;s climate commitments and our institutional response.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Section Eyebrow (English)</label>
                <input
                  type="text"
                  value={content.national_context?.eyebrow?.en || ""}
                  onChange={(e) => updateField(["national_context", "eyebrow", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Section Eyebrow (አማርኛ)</label>
                <input
                  type="text"
                  value={content.national_context?.eyebrow?.am || ""}
                  onChange={(e) => updateField(["national_context", "eyebrow", "am"], e.target.value)}
                  className="input text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Section Headline (English)</label>
                <input
                  type="text"
                  value={content.national_context?.headline?.en || ""}
                  onChange={(e) => updateField(["national_context", "headline", "en"], e.target.value)}
                  className="input text-sm font-semibold"
                />
              </div>
              <div>
                <label className="label text-xs">Section Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.national_context?.headline?.am || ""}
                  onChange={(e) => updateField(["national_context", "headline", "am"], e.target.value)}
                  className="input text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Paragraph 1 - National Policy (English)</label>
                <textarea
                  rows={4}
                  value={content.national_context?.p1?.en || ""}
                  onChange={(e) => updateField(["national_context", "p1", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Paragraph 1 - National Policy (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.national_context?.p1?.am || ""}
                  onChange={(e) => updateField(["national_context", "p1", "am"], e.target.value)}
                  className="input text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">Paragraph 2 - Institutional Response (English)</label>
                <textarea
                  rows={4}
                  value={content.national_context?.p2?.en || ""}
                  onChange={(e) => updateField(["national_context", "p2", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">Paragraph 2 - Institutional Response (አማርኛ)</label>
                <textarea
                  rows={4}
                  value={content.national_context?.p2?.am || ""}
                  onChange={(e) => updateField(["national_context", "p2", "am"], e.target.value)}
                  className="input text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-800">
              4 Key Ecological Impact Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(content.national_context?.statistics || []).map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3">
                  <div>
                    <label className="label text-[11px]">Metric Value</label>
                    <input
                      type="text"
                      value={stat.value || ""}
                      onChange={(e) => updateStat(idx, "value", e.target.value)}
                      className="input text-sm font-bold text-sprout-700 font-mono"
                      placeholder="60%"
                    />
                  </div>
                  <div>
                    <label className="label text-[11px]">Label (EN)</label>
                    <input
                      type="text"
                      value={stat.label?.en || ""}
                      onChange={(e) => updateStat(idx, "label", { ...stat.label, en: e.target.value })}
                      className="input text-xs"
                    />
                  </div>
                  <div>
                    <label className="label text-[11px]">Label (AM)</label>
                    <input
                      type="text"
                      value={stat.label?.am || ""}
                      onChange={(e) => updateStat(idx, "label", { ...stat.label, am: e.target.value })}
                      className="input text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary !text-xs !py-2 !px-4"
            >
              {saving ? "Saving…" : "Save National Context"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: 6 ENVIRONMENTAL PILLARS (WITH IMAGES) */}
      {activeTab === "pillars" && (
        <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-brand-950 flex items-center gap-2">
              <span>💎</span> Core Environmental Pillars (6 Foundational Standards)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Each pillar features full bilingual text alongside its dedicated showcase photography.
            </p>
          </div>

          {/* Section Header Controls */}
          <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-xs">Section Eyebrow (EN)</label>
              <input
                type="text"
                value={content.pillars_section?.eyebrow?.en || ""}
                onChange={(e) => updateField(["pillars_section", "eyebrow", "en"], e.target.value)}
                className="input text-xs"
              />
            </div>
            <div>
              <label className="label text-xs">Section Eyebrow (AM)</label>
              <input
                type="text"
                value={content.pillars_section?.eyebrow?.am || ""}
                onChange={(e) => updateField(["pillars_section", "eyebrow", "am"], e.target.value)}
                className="input text-xs"
              />
            </div>
            <div>
              <label className="label text-xs">Section Headline (EN)</label>
              <input
                type="text"
                value={content.pillars_section?.headline?.en || ""}
                onChange={(e) => updateField(["pillars_section", "headline", "en"], e.target.value)}
                className="input text-xs font-semibold"
              />
            </div>
            <div>
              <label className="label text-xs">Section Headline (AM)</label>
              <input
                type="text"
                value={content.pillars_section?.headline?.am || ""}
                onChange={(e) => updateField(["pillars_section", "headline", "am"], e.target.value)}
                className="input text-xs font-semibold"
              />
            </div>
          </div>

          {/* 6 Individual Pillar Cards */}
          <div className="space-y-6">
            {(content.pillars_section?.pillars || []).map((pillar, idx) => (
              <div
                key={pillar.number || idx}
                className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 rounded-lg bg-sprout-100 text-sprout-900 font-mono font-bold text-xs flex items-center justify-center">
                      {pillar.number}
                    </span>
                    <h3 className="text-sm font-bold text-brand-950">
                      Pillar {pillar.number}: {pillar.title?.en}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">Pillar #{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Bilingual Text */}
                  <div className="lg:col-span-7 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="label text-[11px]">Title (English)</label>
                        <input
                          type="text"
                          value={pillar.title?.en || ""}
                          onChange={(e) => updatePillar(idx, "title", { ...pillar.title, en: e.target.value })}
                          className="input text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="label text-[11px]">Title (አማርኛ)</label>
                        <input
                          type="text"
                          value={pillar.title?.am || ""}
                          onChange={(e) => updatePillar(idx, "title", { ...pillar.title, am: e.target.value })}
                          className="input text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="label text-[11px]">Description (English)</label>
                        <textarea
                          rows={4}
                          value={pillar.desc?.en || ""}
                          onChange={(e) => updatePillar(idx, "desc", { ...pillar.desc, en: e.target.value })}
                          className="input text-xs leading-relaxed"
                        />
                      </div>
                      <div>
                        <label className="label text-[11px]">Description (አማርኛ)</label>
                        <textarea
                          rows={4}
                          value={pillar.desc?.am || ""}
                          onChange={(e) => updatePillar(idx, "desc", { ...pillar.desc, am: e.target.value })}
                          className="input text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pillar Image Uploader */}
                  <div className="lg:col-span-5 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    <ImageUploader
                      label={`Pillar ${pillar.number} Photo`}
                      value={pillar.image || ""}
                      onChange={(url: string) => updatePillar(idx, "image", url)}
                      aspectRatio="video"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary !text-xs !py-2 !px-4"
            >
              {saving ? "Saving…" : "Save Environmental Pillars"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: ON-THE-GROUND INITIATIVES */}
      {activeTab === "initiatives" && (
        <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-brand-950 flex items-center gap-2">
              <span>🌱</span> On-the-Ground Initiatives (Actionable Commitments)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Edit the 4 tangible operational commitments displayed in the initiatives grid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label text-xs">Section Eyebrow (EN)</label>
              <input
                type="text"
                value={content.initiatives_section?.eyebrow?.en || ""}
                onChange={(e) => updateField(["initiatives_section", "eyebrow", "en"], e.target.value)}
                className="input text-xs"
              />
            </div>
            <div>
              <label className="label text-xs">Section Eyebrow (AM)</label>
              <input
                type="text"
                value={content.initiatives_section?.eyebrow?.am || ""}
                onChange={(e) => updateField(["initiatives_section", "eyebrow", "am"], e.target.value)}
                className="input text-xs"
              />
            </div>
            <div>
              <label className="label text-xs">Section Headline (EN)</label>
              <input
                type="text"
                value={content.initiatives_section?.headline?.en || ""}
                onChange={(e) => updateField(["initiatives_section", "headline", "en"], e.target.value)}
                className="input text-xs font-semibold"
              />
            </div>
            <div>
              <label className="label text-xs">Section Headline (AM)</label>
              <input
                type="text"
                value={content.initiatives_section?.headline?.am || ""}
                onChange={(e) => updateField(["initiatives_section", "headline", "am"], e.target.value)}
                className="input text-xs font-semibold"
              />
            </div>
          </div>

          {/* 4 Initiative Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {(content.initiatives_section?.items || []).map((item, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3">
                <div className="flex items-center gap-3">
                  <div>
                    <label className="label text-[11px]">Icon / Emoji</label>
                    <input
                      type="text"
                      value={item.icon || "🌱"}
                      onChange={(e) => updateInitiative(idx, "icon", e.target.value)}
                      className="input text-base text-center !w-16"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="label text-[11px]">Title (English)</label>
                    <input
                      type="text"
                      value={item.title?.en || ""}
                      onChange={(e) => updateInitiative(idx, "title", { ...item.title, en: e.target.value })}
                      className="input text-xs font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="label text-[11px]">Title (አማርኛ)</label>
                  <input
                    type="text"
                    value={item.title?.am || ""}
                    onChange={(e) => updateInitiative(idx, "title", { ...item.title, am: e.target.value })}
                    className="input text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="label text-[11px]">Description (EN)</label>
                    <textarea
                      rows={3}
                      value={item.desc?.en || ""}
                      onChange={(e) => updateInitiative(idx, "desc", { ...item.desc, en: e.target.value })}
                      className="input text-xs leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="label text-[11px]">Description (AM)</label>
                    <textarea
                      rows={3}
                      value={item.desc?.am || ""}
                      onChange={(e) => updateInitiative(idx, "desc", { ...item.desc, am: e.target.value })}
                      className="input text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary !text-xs !py-2 !px-4"
            >
              {saving ? "Saving…" : "Save Initiatives"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: CALL TO ACTION */}
      {activeTab === "cta" && (
        <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm space-y-6 animate-fade-in">
          <div>
            <h2 className="text-base font-bold text-brand-950 flex items-center gap-2">
              <span>🤝</span> Call to Action & Partnerships
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Configure the bottom banner inviting institutions, developers, and partners to connect.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">CTA Headline (English)</label>
                <input
                  type="text"
                  value={content.cta?.headline?.en || ""}
                  onChange={(e) => updateField(["cta", "headline", "en"], e.target.value)}
                  className="input text-sm font-semibold"
                />
              </div>
              <div>
                <label className="label text-xs">CTA Headline (አማርኛ)</label>
                <input
                  type="text"
                  value={content.cta?.headline?.am || ""}
                  onChange={(e) => updateField(["cta", "headline", "am"], e.target.value)}
                  className="input text-sm font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label text-xs">CTA Subtitle (English)</label>
                <textarea
                  rows={3}
                  value={content.cta?.subtitle?.en || ""}
                  onChange={(e) => updateField(["cta", "subtitle", "en"], e.target.value)}
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="label text-xs">CTA Subtitle (አማርኛ)</label>
                <textarea
                  rows={3}
                  value={content.cta?.subtitle?.am || ""}
                  onChange={(e) => updateField(["cta", "subtitle", "am"], e.target.value)}
                  className="input text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3">
                <h4 className="text-xs font-bold text-brand-900">Primary Button</h4>
                <div>
                  <label className="label text-[11px]">Button Text (EN)</label>
                  <input
                    type="text"
                    value={content.cta?.primary_btn_text?.en || ""}
                    onChange={(e) => updateField(["cta", "primary_btn_text", "en"], e.target.value)}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="label text-[11px]">Button Text (AM)</label>
                  <input
                    type="text"
                    value={content.cta?.primary_btn_text?.am || ""}
                    onChange={(e) => updateField(["cta", "primary_btn_text", "am"], e.target.value)}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="label text-[11px]">Destination URL</label>
                  <input
                    type="text"
                    value={content.cta?.primary_btn_url || "/contact"}
                    onChange={(e) => updateField(["cta", "primary_btn_url"], e.target.value)}
                    className="input text-xs font-mono"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 space-y-3">
                <h4 className="text-xs font-bold text-brand-900">Secondary Button</h4>
                <div>
                  <label className="label text-[11px]">Button Text (EN)</label>
                  <input
                    type="text"
                    value={content.cta?.secondary_btn_text?.en || ""}
                    onChange={(e) => updateField(["cta", "secondary_btn_text", "en"], e.target.value)}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="label text-[11px]">Button Text (AM)</label>
                  <input
                    type="text"
                    value={content.cta?.secondary_btn_text?.am || ""}
                    onChange={(e) => updateField(["cta", "secondary_btn_text", "am"], e.target.value)}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="label text-[11px]">Destination URL</label>
                  <input
                    type="text"
                    value={content.cta?.secondary_btn_url || "/services"}
                    onChange={(e) => updateField(["cta", "secondary_btn_url"], e.target.value)}
                    className="input text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary !text-xs !py-2 !px-4"
            >
              {saving ? "Saving…" : "Save Call to Action"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
