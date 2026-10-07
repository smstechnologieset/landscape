"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadImageAction } from "@/app/actions/admin-crud";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: "site" | "service" | "project" | "blog" | "uploaded";
  tag: string;
  dimensions?: string;
}

const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    id: "logo",
    name: "logo.png",
    url: "/images/logo.png",
    category: "site",
    tag: "Official Website Logo (Navbar, Footer, Headers)",
    dimensions: "675 × 265"
  },
  {
    id: "hero",
    name: "hero_landscape.jpg",
    url: "/images/hero_landscape.jpg",
    category: "site",
    tag: "Homepage Hero Banner & Biophilic Plaza",
    dimensions: "High Resolution"
  },
  {
    id: "about",
    name: "who_we_are.jpg",
    url: "/images/who_we_are.jpg",
    category: "site",
    tag: "About Us Page — Team & Founding Profile",
    dimensions: "High Resolution"
  },
  {
    id: "serv_planning",
    name: "service_planning.jpg",
    url: "/images/service_planning.jpg",
    category: "service",
    tag: "Landscape Planning and Concept Design",
    dimensions: "High Resolution"
  },
  {
    id: "serv_construction",
    name: "service_construction.jpg",
    url: "/images/service_construction.jpg",
    category: "service",
    tag: "Landscape Construction & Hardscape",
    dimensions: "High Resolution"
  },
  {
    id: "serv_nursery",
    name: "service_nursery.jpg",
    url: "/images/service_nursery.jpg",
    category: "service",
    tag: "Plant Nursery & Native Seedling Production",
    dimensions: "High Resolution"
  },
  {
    id: "serv_botanic",
    name: "service_botanic.jpg",
    url: "/images/service_botanic.jpg",
    category: "service",
    tag: "Modern Botanic Garden Development",
    dimensions: "High Resolution"
  },
  {
    id: "serv_urban",
    name: "service_urban_greening.jpg",
    url: "/images/service_urban_greening.jpg",
    category: "service",
    tag: "Urban Greening & Roadway Parks",
    dimensions: "High Resolution"
  },
  {
    id: "serv_irrigation",
    name: "service_irrigation.jpg",
    url: "/images/service_irrigation.jpg",
    category: "service",
    tag: "Automated Drip & Precision Irrigation",
    dimensions: "High Resolution"
  },
  {
    id: "serv_restoration",
    name: "service_restoration.jpg",
    url: "/images/service_restoration.jpg",
    category: "service",
    tag: "Environmental & Riverbank Restoration",
    dimensions: "High Resolution"
  },
  {
    id: "serv_compost",
    name: "service_compost.jpg",
    url: "/images/service_compost.jpg",
    category: "service",
    tag: "Organic Compost & Biological Soil Health",
    dimensions: "High Resolution"
  },
  {
    id: "serv_maintenance",
    name: "service_maintenance.jpg",
    url: "/images/service_maintenance.jpg",
    category: "service",
    tag: "Commercial Landscape Care & Arboriculture",
    dimensions: "High Resolution"
  },
  {
    id: "serv_plant_id",
    name: "service_plant_id.jpg",
    url: "/images/service_plant_id.jpg",
    category: "blog",
    tag: "Botanical Research & Native Flora Studies",
    dimensions: "High Resolution"
  }
];

export default function MediaLibraryManager({ initialCloudFiles = [] }: { initialCloudFiles?: MediaItem[] }) {
  const [items, setItems] = useState<MediaItem[]>([...initialCloudFiles, ...DEFAULT_MEDIA_ITEMS]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBucket, setSelectedBucket] = useState<string>("site-assets");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleUpload = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file (PNG, JPG, WebP, SVG).");
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", selectedBucket);

      const res = await uploadImageAction(formData);

      if (res.success && res.url) {
        const newItem: MediaItem = {
          id: `cloud-${Date.now()}`,
          name: file.name,
          url: res.url,
          category: "uploaded",
          tag: `Uploaded to [${selectedBucket}]`,
          dimensions: `${(file.size / 1024).toFixed(0)} KB`
        };
        setItems([newItem, ...items]);
        copyToClipboard(res.url, newItem.id);
      } else {
        setUploadError(res.error || "Failed to upload file.");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload file.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* 1. DIRECT IMAGE UPLOADER CARD */}
      <div className="card p-6 bg-gradient-to-br from-white via-brand-50/20 to-white border border-brand-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-brand-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-brand-950 flex items-center gap-2">
              <span>☁️</span> Upload New Website Image
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Images uploaded here are stored in Supabase Cloud Storage and can be used on any page, service, or portfolio project.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-700 shrink-0">Bucket:</label>
            <select
              value={selectedBucket}
              onChange={(e) => setSelectedBucket(e.target.value)}
              className="input !py-1 text-xs"
            >
              <option value="site-assets">site-assets (Logos & Banners)</option>
              <option value="service-images">service-images (Service covers)</option>
              <option value="project-images">project-images (Portfolio photos)</option>
              <option value="blog-images">blog-images (Articles)</option>
              <option value="general-media">general-media (General)</option>
            </select>
          </div>
        </div>

        {uploadError && (
          <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            {uploadError}
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-brand-300 hover:border-brand-600 bg-white hover:bg-brand-50/30 p-8 text-center transition-all group"
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center py-2 text-xs text-brand-900 gap-2">
              <div className="h-8 w-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
              <p className="font-semibold text-sm">Uploading Image to Cloud Storage…</p>
              <p className="text-gray-500 text-xs">Storing in bucket: {selectedBucket}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-12 w-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-900">
                  Click to browse and upload an image from your computer or phone
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports PNG, JPG, WebP up to 10MB • URL will be generated automatically
                </p>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleUpload(e.target.files[0]);
            }
          }}
        />
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: "all", label: "All Media", count: items.length },
            { id: "site", label: "Website Banners & Logo", count: items.filter((i) => i.category === "site").length },
            { id: "service", label: "Services", count: items.filter((i) => i.category === "service").length },
            { id: "blog", label: "Blog & Research", count: items.filter((i) => i.category === "blog").length },
            { id: "uploaded", label: "Cloud Uploads", count: items.filter((i) => i.category === "uploaded").length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedCategory === tab.id
                  ? "bg-brand-900 text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          Click <strong>&quot;Copy URL&quot;</strong> to use any image anywhere on the website.
        </p>
      </div>

      {/* 3. MEDIA CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              className="card p-3 bg-white hover:border-brand-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-gray-100 mb-3 border border-gray-100">
                  <Image
                    src={item.url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.category === "site" && (
                    <span className="absolute top-2 left-2 rounded bg-brand-950/85 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5">
                      Core Asset
                    </span>
                  )}
                  {item.category === "uploaded" && (
                    <span className="absolute top-2 left-2 rounded bg-sprout-600 text-white text-[10px] font-bold px-2 py-0.5">
                      Cloud
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-xs text-brand-950 truncate" title={item.name}>
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                    {item.tag}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-brand-900 underline text-[11px]"
                >
                  View Full
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(item.url, item.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                    isCopied
                      ? "bg-green-600 text-white"
                      : "bg-brand-50 hover:bg-brand-100 text-brand-900 border border-brand-200"
                  }`}
                >
                  {isCopied ? "✓ Copied!" : "Copy URL"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
