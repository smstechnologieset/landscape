"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { SiteSettings } from "@/lib/types";
import { uploadImageAction, updateSiteKeyAssetAction, deleteMediaFileAction } from "@/app/actions/admin-crud";

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: "site" | "service" | "project" | "blog" | "uploaded";
  tag: string;
  dimensions?: string;
  bucket?: string;
}

interface KeyAssetSlot {
  key: string;
  title: string;
  description: string;
  currentUrl: string;
  defaultUrl: string;
  bucket: string;
  accept: string;
  isDocument?: boolean;
}

interface MediaLibraryManagerProps {
  initialCloudFiles?: MediaItem[];
  currentSettings?: SiteSettings | null;
}

export default function MediaLibraryManager({
  initialCloudFiles = [],
  currentSettings
}: MediaLibraryManagerProps) {
  // Live Website Key Asset Replacer slots
  const [keyAssets, setKeyAssets] = useState<Record<string, string>>({
    logo_url: currentSettings?.logo_url || "/images/logo.png",
    hero_slide_1: currentSettings?.hero_slide_1 || "/images/hero_landscape.jpg",
    hero_slide_2: currentSettings?.hero_slide_2 || "/images/service_planning.jpg",
    hero_slide_3: currentSettings?.hero_slide_3 || "/images/service_construction.jpg",
    about_image: currentSettings?.about_image || "/images/who_we_are.jpg",
    sustainability_image: currentSettings?.sustainability_image || "/images/service_botanic.jpg",
    brochure_url: currentSettings?.brochure_url || "/downloads/landscape_solution_profile.pdf"
  });

  const [replacingSlot, setReplacingSlot] = useState<string | null>(null);
  const [successSlot, setSuccessSlot] = useState<string | null>(null);
  const [slotErrors, setSlotErrors] = useState<Record<string, string>>({});

  // Media Library state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isUploadingGeneral, setIsUploadingGeneral] = useState(false);
  const [generalUploadError, setGeneralUploadError] = useState<string | null>(null);
  const [cloudFiles, setCloudFiles] = useState<MediaItem[]>(initialCloudFiles);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const generalFileInputRef = useRef<HTMLInputElement>(null);

  const assetSlots: KeyAssetSlot[] = [
    {
      key: "logo_url",
      title: "Official Brand Logo",
      description: "Appears in Navbar header, mobile drawer, footer, and consultation badge across the website.",
      currentUrl: keyAssets.logo_url,
      defaultUrl: "/images/logo.png",
      bucket: "site-assets",
      accept: "image/*"
    },
    {
      key: "hero_slide_1",
      title: "Hero Banner (Primary Slide)",
      description: "Main full-width background photo on the Homepage hero banner.",
      currentUrl: keyAssets.hero_slide_1,
      defaultUrl: "/images/hero_landscape.jpg",
      bucket: "site-assets",
      accept: "image/*"
    },
    {
      key: "hero_slide_2",
      title: "Hero Slide 2 (Planning Showcase)",
      description: "Second slide in the homepage biophilic showcase.",
      currentUrl: keyAssets.hero_slide_2,
      defaultUrl: "/images/service_planning.jpg",
      bucket: "site-assets",
      accept: "image/*"
    },
    {
      key: "hero_slide_3",
      title: "Hero Slide 3 (Construction Showcase)",
      description: "Third slide in the homepage showcase & portfolio banner.",
      currentUrl: keyAssets.hero_slide_3,
      defaultUrl: "/images/service_construction.jpg",
      bucket: "site-assets",
      accept: "image/*"
    },
    {
      key: "about_image",
      title: "About Us Page Narrative Cover",
      description: "Showcased prominently on the /about page story and company background section.",
      currentUrl: keyAssets.about_image,
      defaultUrl: "/images/who_we_are.jpg",
      bucket: "site-assets",
      accept: "image/*"
    },
    {
      key: "sustainability_image",
      title: "Sustainability & Botanic Cover",
      description: "Display cover for ecological stewardship and nursery living collections on /sustainability.",
      currentUrl: keyAssets.sustainability_image,
      defaultUrl: "/images/service_botanic.jpg",
      bucket: "site-assets",
      accept: "image/*"
    },
    {
      key: "brochure_url",
      title: "Company Profile PDF Brochure",
      description: "Official PDF downloaded by corporate clients and government institutions across the site.",
      currentUrl: keyAssets.brochure_url,
      defaultUrl: "/downloads/landscape_solution_profile.pdf",
      bucket: "documents",
      accept: ".pdf,application/pdf",
      isDocument: true
    }
  ];

  // Handle direct file replacement for a specific website slot
  const handleSlotFileChange = async (slotKey: string, bucket: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReplacingSlot(slotKey);
    setSlotErrors((prev) => ({ ...prev, [slotKey]: "" }));
    setSuccessSlot(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const uploadRes = await uploadImageAction(formData);
      if (!uploadRes.success || !uploadRes.url) {
        throw new Error(uploadRes.error || "Failed to upload file.");
      }

      const updateRes = await updateSiteKeyAssetAction(slotKey, uploadRes.url);
      if (!updateRes.success) {
        throw new Error(updateRes.error || "Failed to update website reference.");
      }

      setKeyAssets((prev) => ({ ...prev, [slotKey]: uploadRes.url! }));
      setSuccessSlot(slotKey);
      setTimeout(() => setSuccessSlot(null), 4000);

      // Add to cloud files list
      setCloudFiles((prev) => [
        {
          id: `${bucket}-${file.name}`,
          name: file.name,
          url: uploadRes.url!,
          category: "uploaded",
          tag: `Replaced ${slotKey}`,
          dimensions: `${(file.size / 1024).toFixed(0)} KB`
        },
        ...prev
      ]);
    } catch (err: any) {
      setSlotErrors((prev) => ({ ...prev, [slotKey]: err.message || "Upload failed." }));
    } finally {
      setReplacingSlot(null);
      e.target.value = "";
    }
  };

  // Handle URL paste replacement
  const handleSlotUrlChange = async (slotKey: string, newUrl: string) => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;

    setReplacingSlot(slotKey);
    setSlotErrors((prev) => ({ ...prev, [slotKey]: "" }));

    try {
      const updateRes = await updateSiteKeyAssetAction(slotKey, trimmed);
      if (!updateRes.success) {
        throw new Error(updateRes.error || "Failed to update asset.");
      }

      setKeyAssets((prev) => ({ ...prev, [slotKey]: trimmed }));
      setSuccessSlot(slotKey);
      setTimeout(() => setSuccessSlot(null), 4000);
    } catch (err: any) {
      setSlotErrors((prev) => ({ ...prev, [slotKey]: err.message || "Failed to update URL." }));
    } finally {
      setReplacingSlot(null);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // General Media file upload
  const handleGeneralUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingGeneral(true);
    setGeneralUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "general-media");

      const res = await uploadImageAction(formData);
      if (!res.success || !res.url) {
        throw new Error(res.error || "Failed to upload image.");
      }

      setCloudFiles((prev) => [
        {
          id: `general-media-${file.name}`,
          name: file.name,
          url: res.url!,
          category: "uploaded",
          tag: "General Upload",
          dimensions: `${(file.size / 1024).toFixed(0)} KB`
        },
        ...prev
      ]);
    } catch (err: any) {
      setGeneralUploadError(err.message || "Upload failed.");
    } finally {
      setIsUploadingGeneral(false);
      e.target.value = "";
    }
  };

  const handleDeleteMedia = async (item: MediaItem) => {
    if (!confirm(`Are you sure you want to permanently delete "${item.name}" from cloud storage?`)) {
      return;
    }
    setDeletingId(item.id);
    try {
      const res = await deleteMediaFileAction(item.bucket, item.name, item.url);
      if (res.success) {
        setCloudFiles((prev) => prev.filter((f) => f.id !== item.id && f.url !== item.url));
      } else {
        alert(res.error || "Failed to delete file.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while deleting.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMedia = cloudFiles.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-10">
      {/* ========================================================================= */}
      {/* SECTION 1: VISUAL WEBSITE KEY ASSET REPLACER                              */}
      {/* ========================================================================= */}
      <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sprout-100 text-sprout-800 text-sm font-bold">
              ★
            </span>
            <h2 className="text-xl font-bold text-brand-950">Live Website Image & Asset Replacer</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1 max-w-3xl">
            Directly replace existing images currently used on the website. When you upload or paste a new image here, the live website (Hero, Navbar Logo, About Us image, Sustainability banner, Brochure) updates immediately.
          </p>
        </div>

        {/* Key Asset Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assetSlots.map((slot) => {
            const isReplacing = replacingSlot === slot.key;
            const isSuccess = successSlot === slot.key;
            const error = slotErrors[slot.key];

            return (
              <div
                key={slot.key}
                className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 flex flex-col justify-between transition hover:border-sprout-400 hover:shadow-md"
              >
                <div>
                  {/* Thumbnail Preview Stage */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-200 border border-gray-200 mb-3 flex items-center justify-center">
                    {slot.isDocument ? (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <span className="text-4xl mb-1">📄</span>
                        <span className="text-xs font-bold text-brand-950 truncate max-w-[180px]">
                          {slot.currentUrl.split("/").pop()}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-0.5">Corporate Brochure PDF</span>
                      </div>
                    ) : (
                      <Image
                        src={slot.currentUrl || slot.defaultUrl}
                        alt={slot.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-1"
                      />
                    )}

                    {isReplacing && (
                      <div className="absolute inset-0 bg-brand-950/75 flex flex-col items-center justify-center text-white text-xs font-semibold gap-2 animate-fade-in">
                        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Updating live website…</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="mb-3">
                    <h3 className="font-bold text-sm text-brand-950 flex items-center justify-between">
                      <span>{slot.title}</span>
                      <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {slot.key}
                      </span>
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                      {slot.description}
                    </p>
                  </div>
                </div>

                {/* Status & Upload Controls */}
                <div className="space-y-2 pt-3 border-t border-gray-200/80">
                  {isSuccess && (
                    <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-green-800 text-[11px] font-semibold flex items-center gap-1.5">
                      <span>✓</span> Live website updated successfully!
                    </div>
                  )}

                  {error && (
                    <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px]">
                      {error}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <label className="btn-primary !text-xs !py-1.5 flex-1 text-center cursor-pointer font-semibold shadow-sm">
                      <span>{isReplacing ? "Uploading…" : "Replace with File"}</span>
                      <input
                        type="file"
                        accept={slot.accept}
                        disabled={isReplacing}
                        onChange={(e) => handleSlotFileChange(slot.key, slot.bucket, e)}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(slot.currentUrl)}
                      title="Copy URL"
                      className="btn-secondary !text-xs !py-1.5 !px-2.5"
                    >
                      {copiedUrl === slot.currentUrl ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Quick URL replacement input */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="url"
                      placeholder="Or paste external URL…"
                      defaultValue=""
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSlotUrlChange(slot.key, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                      className="input !py-1 !text-[11px] flex-1 bg-white"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        if (input && input.value) {
                          handleSlotUrlChange(slot.key, input.value);
                          input.value = "";
                        }
                      }}
                      className="btn-secondary !py-1 !px-2 !text-[11px] font-bold"
                      title="Apply URL"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: GENERAL MEDIA STORAGE EXPLORER                                 */}
      {/* ========================================================================= */}
      <div className="card p-6 sm:p-8 bg-white border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-brand-950 flex items-center gap-2">
              <span>🗂</span> General Media Storage Explorer
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Upload auxiliary photos, inspect file dimensions, and copy image links for services, portfolio, or articles.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => generalFileInputRef.current?.click()}
              disabled={isUploadingGeneral}
              className="btn-primary !text-xs !py-2 font-semibold shadow-sm flex items-center gap-1.5"
            >
              <span>{isUploadingGeneral ? "Uploading…" : "+ Upload Media to Cloud"}</span>
            </button>
            <input
              ref={generalFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleGeneralUpload}
              className="hidden"
            />
          </div>
        </div>

        {generalUploadError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {generalUploadError}
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search media files by name or tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input !text-xs !py-2 w-full pr-8"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {["all", "uploaded", "service", "project", "blog"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 font-semibold capitalize transition ${
                  selectedCategory === cat
                    ? "bg-brand-900 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredMedia.map((item) => {
            const isCopied = copiedUrl === item.url;
            return (
              <div
                key={item.id}
                className="group relative rounded-xl border border-gray-200 bg-white p-2.5 transition hover:border-gray-400 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-gray-100 mb-2 border border-gray-100">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      sizes="220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-1.5 right-1.5">
                      <span className="rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono text-white backdrop-blur-xs">
                        {item.dimensions || "Media"}
                      </span>
                    </div>
                  </div>

                  <div className="px-1">
                    <p className="text-xs font-bold text-brand-950 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{item.tag}</p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] gap-2">
                  <span className="font-mono text-gray-400 text-[10px] truncate max-w-[90px]" title={item.url}>
                    {item.url}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => copyToClipboard(item.url)}
                      className={`rounded px-2 py-0.5 font-semibold text-[10px] transition ${
                        isCopied
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-brand-900 hover:text-white"
                      }`}
                    >
                      {isCopied ? "✓ Copied" : "Copy URL"}
                    </button>
                    {(item.category === "uploaded" || item.url.startsWith("http") || item.bucket) && (
                      <button
                        onClick={() => handleDeleteMedia(item)}
                        disabled={deletingId === item.id}
                        className="rounded px-2 py-0.5 font-semibold text-[10px] text-red-600 bg-red-50/80 hover:bg-red-600 hover:text-white border border-red-200/80 transition disabled:opacity-50 cursor-pointer"
                        title="Permanently delete from cloud storage"
                      >
                        {deletingId === item.id ? "…" : "🗑 Delete"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredMedia.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 text-sm">
              No media files matched your query. Click &quot;+ Upload Media to Cloud&quot; to add images.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
