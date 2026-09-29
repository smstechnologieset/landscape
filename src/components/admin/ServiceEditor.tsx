"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveServiceAction } from "@/app/actions/admin-crud";
import type { ServiceDetail } from "@/lib/company-data";

const PRESET_IMAGES = [
  { label: "Landscape Planning & Design", url: "/images/service_planning.jpg" },
  { label: "Construction & Hardscape", url: "/images/service_construction.jpg" },
  { label: "Plant Nursery & Seedlings", url: "/images/service_nursery.jpg" },
  { label: "Botanic Garden Development", url: "/images/service_botanic.jpg" },
  { label: "Urban Greening & Parks", url: "/images/service_urban_greening.jpg" },
  { label: "Irrigation & Water Systems", url: "/images/service_irrigation.jpg" },
  { label: "Environmental Restoration", url: "/images/service_restoration.jpg" },
  { label: "Compost & Organic Soil", url: "/images/service_compost.jpg" },
  { label: "Maintenance & Tree Pruning", url: "/images/service_maintenance.jpg" },
  { label: "Botanical Plant Identification", url: "/images/service_plant_id.jpg" },
  { label: "Biophilic Master Project", url: "/images/hero_landscape.jpg" }
];

const PRE_PREPARED_CAPABILITIES = [
  "Site Analysis & Topographical Surveying",
  "Master Landscape Concept & Detail Design",
  "3D Architectural Visualization & Modeling",
  "Plant Species Selection & Microclimate Planning",
  "Hardscape, Walkway & Retaining Wall Construction",
  "Automated Drip & Micro-Sprinkler Irrigation",
  "Indigenous Seedling Cultivation & Propagation",
  "Urban Green Corridor & Public Park Development",
  "Slope Bio-Engineering & Soil Erosion Control",
  "Wetland, Riverbank & Watershed Bio-Restoration",
  "Sustainable Landscape Care & Arboriculture",
  "Indoor Biophilic Planting & Botanical Styling",
  "Organic Composting & Soil Enrichment",
  "Drainage & Rainwater Harvesting Systems",
  "Community Outreach & Environmental Training"
];

interface ServiceEditorProps {
  initialService?: ServiceDetail | null;
}

export default function ServiceEditor({ initialService }: ServiceEditorProps) {
  const [titleEn, setTitleEn] = useState(initialService?.title?.en || "");
  const [titleAm, setTitleAm] = useState(initialService?.title?.am || "");
  const [slug, setSlug] = useState(initialService?.slug || "");
  const [categoryGroup, setCategoryGroup] = useState(initialService?.categoryGroup || "Landscape & Design");
  const [imageUrl, setImageUrl] = useState(initialService?.featured_image || "/images/service_planning.jpg");
  const [shortDescEn, setShortDescEn] = useState(initialService?.short_description?.en || "");
  const [shortDescAm, setShortDescAm] = useState(initialService?.short_description?.am || "");
  const [descEn, setDescEn] = useState(initialService?.description?.en || "");
  const [descAm, setDescAm] = useState(initialService?.description?.am || "");
  
  // Key Capabilities
  const [capabilities, setCapabilities] = useState<string[]>(
    initialService?.features?.map((f) => (typeof f === "string" ? f : f.en)) || [
      "Master Landscape Concept & Detail Design",
      "Plant Species Selection & Microclimate Planning",
      "3D Architectural Visualization"
    ]
  );
  const [customCapabilityInput, setCustomCapabilityInput] = useState("");

  const addCapability = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !capabilities.includes(trimmed)) {
      setCapabilities([...capabilities, trimmed]);
    }
  };

  const removeCapability = (indexToRemove: number) => {
    setCapabilities(capabilities.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCustomAdd = () => {
    if (customCapabilityInput.trim()) {
      addCapability(customCapabilityInput);
      setCustomCapabilityInput("");
    }
  };

  return (
    <form action={saveServiceAction} className="space-y-8 max-w-4xl">
      {initialService?.id && <input type="hidden" name="id" value={initialService.id} />}
      <input type="hidden" name="keyCapabilities" value={JSON.stringify(capabilities)} />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">
            {initialService ? `Edit Service: ${initialService.title.en}` : "Create New Landscape Service"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure titles, descriptions, imagery, and interactive key capabilities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/services" className="btn-secondary !text-xs !py-2">
            Cancel
          </Link>
          <button type="submit" className="btn-primary !text-xs !py-2 shadow-sm font-semibold">
            {initialService ? "Save Service Changes" : "Create & Publish Service"}
          </button>
        </div>
      </div>

      {/* Basic Info Card */}
      <div className="card p-6 bg-white space-y-6">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">1. Service Titles & Category</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Title (English) *</label>
            <input
              type="text"
              name="title_en"
              required
              value={titleEn}
              onChange={(e) => {
                setTitleEn(e.target.value);
                if (!initialService) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                }
              }}
              className="input font-medium"
              placeholder="e.g. Landscape Planning and Design"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Title (Amharic - አማርኛ)</label>
            <input
              type="text"
              name="title_am"
              value={titleAm}
              onChange={(e) => setTitleAm(e.target.value)}
              className="input"
              placeholder="e.g. የመልክአ ምድር ፕላን እና ዲዛይን"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Slug (URL identifier)</label>
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="input text-xs font-mono text-gray-600"
              placeholder="landscape-planning-and-design"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Category Group</label>
            <select
              name="categoryGroup"
              value={categoryGroup}
              onChange={(e) => setCategoryGroup(e.target.value as any)}
              className="input"
            >
              <option value="Landscape & Design">Landscape & Design</option>
              <option value="Plants & Gardens">Plants & Gardens</option>
              <option value="Water & Environment">Water & Environment</option>
              <option value="Professional Services">Professional Services</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Image & Visual Presentation Card */}
      <div className="card p-6 bg-white space-y-5">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">2. Featured Image</h2>

        <div>
          <label className="label text-xs font-semibold">Select from Official Image Library</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
            {PRESET_IMAGES.map((img) => (
              <button
                type="button"
                key={img.url}
                onClick={() => setImageUrl(img.url)}
                className={`group text-left rounded-xl border p-2 text-xs transition relative overflow-hidden ${
                  imageUrl === img.url
                    ? "border-sprout-500 ring-2 ring-sprout-400 bg-sprout-50/30"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="relative h-20 w-full rounded-lg overflow-hidden mb-1.5 bg-gray-100">
                  <Image src={img.url} alt={img.label} fill sizes="150px" className="object-cover" />
                </div>
                <div className="font-semibold text-[11px] text-brand-950 truncate">{img.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label text-xs font-semibold">Custom Image URL</label>
          <input
            type="text"
            name="featured_image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="input text-xs"
            placeholder="/images/service_planning.jpg or https://..."
          />
        </div>
      </div>

      {/* Descriptions Card */}
      <div className="card p-6 bg-white space-y-5">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">3. Service Descriptions</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Short Summary (English)</label>
            <textarea
              name="shortDescription_en"
              rows={3}
              value={shortDescEn}
              onChange={(e) => setShortDescEn(e.target.value)}
              className="input leading-relaxed"
              placeholder="Concise overview of what this service delivers..."
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Short Summary (Amharic)</label>
            <textarea
              name="shortDescription_am"
              rows={3}
              value={shortDescAm}
              onChange={(e) => setShortDescAm(e.target.value)}
              className="input leading-relaxed"
              placeholder="የአገልግሎቱ አጭር ማጠቃለያ..."
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Full Description (English)</label>
            <textarea
              name="description_en"
              rows={5}
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              className="input leading-relaxed"
              placeholder="Detailed technical explanation of methodology, workflow, and deliverables..."
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Full Description (Amharic)</label>
            <textarea
              name="description_am"
              rows={5}
              value={descAm}
              onChange={(e) => setDescAm(e.target.value)}
              className="input leading-relaxed"
              placeholder="ዝርዝር የአገልግሎት መግለጫ..."
            />
          </div>
        </div>
      </div>

      {/* Key Capabilities Card (Special Requirement from User Prompt) */}
      <div className="card p-6 bg-white space-y-5">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <h2 className="text-base font-bold text-brand-900">4. Key Capabilities</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select from pre-prepared capabilities or write custom capabilities below.
            </p>
          </div>
          <span className="rounded-full bg-brand-100 text-brand-900 px-2.5 py-0.5 text-xs font-semibold">
            {capabilities.length} selected
          </span>
        </div>

        {/* Selected Capabilities Chips */}
        <div>
          <label className="label text-xs font-semibold">Active Key Capabilities for this Service</label>
          {capabilities.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center text-xs text-gray-400">
              No capabilities added yet. Choose from the pre-prepared list below or add a custom one.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
              {capabilities.map((cap, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-brand-200 px-3 py-1.5 text-xs font-medium text-brand-900 shadow-sm"
                >
                  <span>✓ {cap}</span>
                  <button
                    type="button"
                    onClick={() => removeCapability(idx)}
                    className="text-gray-400 hover:text-red-600 transition ml-1 font-bold"
                    title="Remove capability"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Custom Capability Input */}
        <div>
          <label className="label text-xs font-semibold">Add Custom Capability</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customCapabilityInput}
              onChange={(e) => setCustomCapabilityInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleCustomAdd();
                }
              }}
              className="input flex-1 text-xs"
              placeholder="Write a custom key capability and press Add..."
            />
            <button
              type="button"
              onClick={handleCustomAdd}
              className="btn-secondary !text-xs !px-4 shrink-0 font-semibold"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Pre-prepared Capabilities Options */}
        <div>
          <label className="label text-xs font-semibold text-gray-600">
            Quick-Add from Pre-Prepared Capabilities (Click to Add):
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-3 rounded-xl border border-gray-100 bg-gray-50/50">
            {PRE_PREPARED_CAPABILITIES.map((option) => {
              const alreadyAdded = capabilities.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  onClick={() => (alreadyAdded ? setCapabilities(capabilities.filter((c) => c !== option)) : addCapability(option))}
                  className={`text-xs px-2.5 py-1 rounded-md transition border ${
                    alreadyAdded
                      ? "bg-brand-800 text-white border-brand-900"
                      : "bg-white text-gray-700 border-gray-200 hover:border-brand-400 hover:text-brand-900"
                  }`}
                >
                  {alreadyAdded ? `✓ ${option}` : `+ ${option}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visibility & Sorting */}
      <div className="card p-6 bg-white space-y-4">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">5. Publishing & Sort Order</h2>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={initialService?.is_published ?? true}
              className="h-4 w-4 rounded border-gray-300 text-brand-800 focus:ring-brand-700"
            />
            <span>Published on Live Site</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={initialService?.is_featured ?? false}
              className="h-4 w-4 rounded border-gray-300 text-brand-800 focus:ring-brand-700"
            />
            <span>Featured on Homepage</span>
          </label>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500 font-medium">Display Sort Order:</span>
            <input
              type="number"
              name="sort_order"
              defaultValue={initialService?.sort_order ?? 1}
              className="input !w-20 !py-1 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link href="/admin/services" className="btn-secondary !text-xs !py-2.5">
          Cancel
        </Link>
        <button type="submit" className="btn-primary !text-xs !py-2.5 !px-6 shadow-md font-semibold">
          {initialService ? "Save Service Changes" : "Create & Publish Service"}
        </button>
      </div>
    </form>
  );
}
