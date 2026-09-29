"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveProjectAction } from "@/app/actions/admin-crud";
import type { GalleryProject } from "@/components/portfolio/ProjectGallery";

const AVAILABLE_PROJECT_IMAGES = [
  { label: "Biophilic Plaza & Roof Terraces", url: "/images/hero_landscape.jpg" },
  { label: "Master Planning & Concept Design", url: "/images/service_planning.jpg" },
  { label: "Stone Walkways & Hardscape", url: "/images/service_construction.jpg" },
  { label: "Nursery & Seedling Cultivation", url: "/images/service_nursery.jpg" },
  { label: "Botanical Garden & Living Terraces", url: "/images/service_botanic.jpg" },
  { label: "Urban Greening & Roadway Parks", url: "/images/service_urban_greening.jpg" },
  { label: "Automated Drip Irrigation Systems", url: "/images/service_irrigation.jpg" },
  { label: "Riverbank & Slope Restoration", url: "/images/service_restoration.jpg" },
  { label: "Soil Composting & Plant Health", url: "/images/service_compost.jpg" },
  { label: "Long-term Maintenance & Lawn Care", url: "/images/service_maintenance.jpg" },
  { label: "Botanical Research & Native Flora", url: "/images/service_plant_id.jpg" },
  { label: "Executive Landscape Installation", url: "/images/who_we_are.jpg" }
];

const PRESET_TAGS = [
  "Landscape Architecture & Master Planning • Addis Ababa, Ethiopia",
  "Living Botanical Gardens & Nurseries • Addis Ababa, Ethiopia",
  "Urban Greening & Public Parks • Addis Ababa, Ethiopia",
  "Commercial Rooftop Terraces • Bole, Addis Ababa",
  "Ecological Watershed & Riverbank Restoration • Ethiopia",
  "Water-Smart Irrigation & Green Infrastructure • Oromia Region"
];

interface ProjectEditorProps {
  initialProject?: GalleryProject | null;
}

export default function ProjectEditor({ initialProject }: ProjectEditorProps) {
  const [titleEn, setTitleEn] = useState(initialProject?.title?.en || "");
  const [titleAm, setTitleAm] = useState(initialProject?.title?.am || "");
  const [tag, setTag] = useState(
    initialProject ? `${initialProject.category.en} • ${initialProject.location}` : PRESET_TAGS[0]
  );
  const [location, setLocation] = useState(initialProject?.location || "Addis Ababa, Ethiopia");
  const [year, setYear] = useState(initialProject?.year || new Date().getFullYear().toString());
  const [descEn, setDescEn] = useState(initialProject?.description?.en || "");
  const [descAm, setDescAm] = useState(initialProject?.description?.am || "");

  // Photos state: first photo is the cover, remaining are slideshow photos
  const [photos, setPhotos] = useState<string[]>(
    initialProject?.galleryImages?.map((g) => g.url) || [
      initialProject?.coverImage || "/images/hero_landscape.jpg",
      "/images/service_planning.jpg",
      "/images/service_construction.jpg"
    ]
  );
  const [customPhotoInput, setCustomPhotoInput] = useState("");

  const addPhoto = (url: string) => {
    const trimmed = url.trim();
    if (trimmed && !photos.includes(trimmed)) {
      setPhotos([...photos, trimmed]);
    }
  };

  const removePhoto = (index: number) => {
    if (photos.length <= 1) {
      alert("A project must have at least one photo (for the cover).");
      return;
    }
    setPhotos(photos.filter((_, idx) => idx !== index));
  };

  const movePhoto = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= photos.length) return;
    const updated = [...photos];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setPhotos(updated);
  };

  const makeCover = (index: number) => {
    if (index === 0) return;
    const updated = [...photos];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    setPhotos(updated);
  };

  // Prepare gallery images array for server action
  const galleryImagesPayload = photos.map((url) => ({
    url,
    caption: { en: titleEn || "Project Photo", am: titleAm || titleEn || "የስራ ምስል" }
  }));

  return (
    <form action={saveProjectAction} className="space-y-8 max-w-4xl">
      {initialProject?.id && <input type="hidden" name="id" value={initialProject.id} />}
      <input type="hidden" name="coverImage" value={photos[0] || "/images/hero_landscape.jpg"} />
      <input type="hidden" name="galleryImages" value={JSON.stringify(galleryImagesPayload)} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">
            {initialProject ? `Edit Project: ${initialProject.title.en}` : "Add New Portfolio Project"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure project photos (cover & slideshow), titles, descriptions, and tags.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/projects" className="btn-secondary !text-xs !py-2">
            Cancel
          </Link>
          <button type="submit" className="btn-primary !text-xs !py-2 shadow-sm font-semibold">
            {initialProject ? "Save Project Changes" : "Publish to Gallery"}
          </button>
        </div>
      </div>

      {/* 1. Project Photos (Cover + Slideshow) - USER SPECIAL REQUIREMENT */}
      <div className="card p-6 bg-white space-y-6">
        <div className="border-b pb-3">
          <h2 className="text-base font-bold text-brand-900 flex items-center gap-2">
            <span>📷</span> 1. Project Photos (Cover & Slideshow Sequence)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            <strong>The first photo</strong> serves as the cover card on the portfolio page. <strong>The other photos</strong> appear sequentially in the interactive popup slideshow!
          </p>
        </div>

        {/* Current Photos Sequence */}
        <div className="space-y-3">
          <label className="label text-xs font-semibold text-gray-800">
            Photo Order ({photos.length} photos attached)
          </label>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photoUrl, index) => {
              const isCover = index === 0;
              return (
                <div
                  key={`${photoUrl}-${index}`}
                  className={`rounded-xl border p-3 bg-white relative transition-all ${
                    isCover
                      ? "border-sprout-500 ring-2 ring-sprout-400/50 shadow-md bg-sprout-50/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="relative h-36 w-full rounded-lg overflow-hidden bg-gray-100 mb-2 border border-gray-100">
                    <Image
                      src={photoUrl}
                      alt={`Photo ${index + 1}`}
                      fill
                      sizes="250px"
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {isCover ? (
                        <span className="rounded-md bg-sprout-600 text-white font-bold text-[10px] uppercase px-2 py-0.5 shadow-sm flex items-center gap-1">
                          <span>★</span> COVER IMAGE
                        </span>
                      ) : (
                        <span className="rounded-md bg-brand-950/80 text-white font-semibold text-[10px] px-2 py-0.5 backdrop-blur-sm">
                          Slide #{index + 1}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions for this photo */}
                  <div className="flex items-center justify-between gap-1 text-[11px] pt-1">
                    <div className="flex items-center gap-1">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => makeCover(index)}
                          className="text-sprout-700 font-bold hover:underline"
                          title="Make this the cover photo"
                        >
                          Make Cover
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => movePhoto(index, "up")}
                          className="px-1.5 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                          title="Move left/up"
                        >
                          ◀
                        </button>
                      )}
                      {index < photos.length - 1 && (
                        <button
                          type="button"
                          onClick={() => movePhoto(index, "down")}
                          className="px-1.5 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                          title="Move right/down"
                        >
                          ▶
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="text-red-500 hover:text-red-700 font-bold ml-1"
                        title="Remove photo"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add photo tools */}
        <div className="pt-2 border-t space-y-4">
          <div>
            <label className="label text-xs font-semibold">Add Custom Photo URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPhotoInput}
                onChange={(e) => setCustomPhotoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (customPhotoInput.trim()) {
                      addPhoto(customPhotoInput);
                      setCustomPhotoInput("");
                    }
                  }
                }}
                className="input text-xs flex-1"
                placeholder="Paste image URL (e.g. /images/service_botanic.jpg or https://...)"
              />
              <button
                type="button"
                onClick={() => {
                  if (customPhotoInput.trim()) {
                    addPhoto(customPhotoInput);
                    setCustomPhotoInput("");
                  }
                }}
                className="btn-secondary !text-xs !px-4 shrink-0 font-semibold"
              >
                + Add Photo
              </button>
            </div>
          </div>

          <div>
            <label className="label text-xs font-semibold text-gray-600">
              Quick-Attach from High-Resolution Asset Library:
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_PROJECT_IMAGES.map((img) => {
                const added = photos.includes(img.url);
                return (
                  <button
                    type="button"
                    key={img.url}
                    onClick={() => addPhoto(img.url)}
                    disabled={added}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition ${
                      added
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-brand-900 border-gray-200 hover:border-brand-500 hover:bg-brand-50/50"
                    }`}
                  >
                    {added ? `✓ Attached: ${img.label}` : `+ Add: ${img.label}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Project Title & Tags */}
      <div className="card p-6 bg-white space-y-5">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">2. Title, Tags & Location</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Project Title (English) *</label>
            <input
              type="text"
              name="title_en"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="input font-semibold"
              placeholder="e.g. Bole Commercial Plaza & Biophilic Terraces"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Project Title (Amharic - አማርኛ)</label>
            <input
              type="text"
              name="title_am"
              value={titleAm}
              onChange={(e) => setTitleAm(e.target.value)}
              className="input"
              placeholder="e.g. የቦሌ የንግድ ማዕከልና የተፈጥሮ መልክአ ምድር"
            />
          </div>
        </div>

        {/* Tags Requirement */}
        <div>
          <label className="label text-xs font-semibold">
            Project Tag Line (Format: &quot;Category &bull; Location&quot;) *
          </label>
          <input
            type="text"
            name="tag"
            required
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="input font-medium text-xs"
            placeholder="Landscape Architecture & Master Planning • Addis Ababa, Ethiopia"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            <span className="text-[11px] text-gray-500 self-center">Presets:</span>
            {PRESET_TAGS.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTag(t)}
                className="text-[11px] rounded bg-gray-100 hover:bg-brand-100 px-2 py-0.5 text-gray-700 transition"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input text-xs"
              placeholder="Addis Ababa, Ethiopia"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Execution Year</label>
            <input
              type="text"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="input text-xs"
              placeholder="2026"
            />
          </div>
        </div>
      </div>

      {/* 3. Descriptions */}
      <div className="card p-6 bg-white space-y-5">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">3. Project Description</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Description (English) *</label>
            <textarea
              name="description_en"
              rows={4}
              required
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              className="input leading-relaxed"
              placeholder="Detailed summary of the client brief, landscape architecture execution, indigenous plants used, and sustainable features..."
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Description (Amharic - አማርኛ)</label>
            <textarea
              name="description_am"
              rows={4}
              value={descAm}
              onChange={(e) => setDescAm(e.target.value)}
              className="input leading-relaxed"
              placeholder="የፕሮጀክቱ ዝርዝር መግለጫ..."
            />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link href="/admin/projects" className="btn-secondary !text-xs !py-2.5">
          Cancel
        </Link>
        <button type="submit" className="btn-primary !text-xs !py-2.5 !px-6 shadow-md font-semibold">
          {initialProject ? "Save Project Changes" : "Publish to Gallery"}
        </button>
      </div>
    </form>
  );
}
