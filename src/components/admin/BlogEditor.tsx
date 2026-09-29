"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveBlogAction } from "@/app/actions/admin-crud";
import type { MockBlogPost } from "@/components/blog/BlogListWithModal";

const AVAILABLE_BLOG_IMAGES = [
  { label: "Botanical Plant Research", url: "/images/service_plant_id.jpg" },
  { label: "Urban Greening & Parks", url: "/images/service_urban_greening.jpg" },
  { label: "Landscape Planning", url: "/images/service_planning.jpg" },
  { label: "Construction & Hardscape", url: "/images/service_construction.jpg" },
  { label: "Nursery & Seedlings", url: "/images/service_nursery.jpg" },
  { label: "Botanic Garden", url: "/images/service_botanic.jpg" },
  { label: "Irrigation Systems", url: "/images/service_irrigation.jpg" },
  { label: "Environmental Restoration", url: "/images/service_restoration.jpg" },
  { label: "Composting & Soil", url: "/images/service_compost.jpg" }
];

const PRESET_CATEGORIES = [
  "Landscape Architecture",
  "Urban Greening & Forestry",
  "Horticulture & Nurseries",
  "Water Conservation & Irrigation",
  "Ecological Restoration",
  "Botanical Science"
];

interface BlogEditorProps {
  initialPost?: MockBlogPost | null;
}

export default function BlogEditor({ initialPost }: BlogEditorProps) {
  const [titleEn, setTitleEn] = useState(initialPost?.title?.en || "");
  const [titleAm, setTitleAm] = useState(initialPost?.title?.am || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [categoryEn, setCategoryEn] = useState(initialPost?.category?.en || PRESET_CATEGORIES[0]);
  const [categoryAm, setCategoryAm] = useState(initialPost?.category?.am || "");
  const [author, setAuthor] = useState(initialPost?.author || "Landscape Solution PLC Editorial Team");
  const [date, setDate] = useState(initialPost?.date || new Date().toISOString().split("T")[0]);
  const [readTime, setReadTime] = useState(initialPost?.readTime || "5 min read");
  const [image, setImage] = useState(initialPost?.image || "/images/service_plant_id.jpg");
  const [excerptEn, setExcerptEn] = useState(initialPost?.excerpt?.en || "");
  const [excerptAm, setExcerptAm] = useState(initialPost?.excerpt?.am || "");

  // Content Paragraphs
  const [paragraphsEn, setParagraphsEn] = useState(
    initialPost?.content?.en?.paragraphs?.join("\n\n") || ""
  );
  const [paragraphsAm, setParagraphsAm] = useState(
    initialPost?.content?.am?.paragraphs?.join("\n\n") || ""
  );

  // Takeaways
  const [takeaways, setTakeaways] = useState<string[]>(
    initialPost?.content?.en?.takeaways || [
      "Select climate-adaptive native species to ensure drought resilience.",
      "Integrate micro-drip irrigation to reduce water demand by over 40%.",
      "Prioritize multi-canopy layers for natural urban cooling."
    ]
  );
  const [customTakeaway, setCustomTakeaway] = useState("");

  const addTakeaway = () => {
    if (customTakeaway.trim()) {
      setTakeaways([...takeaways, customTakeaway.trim()]);
      setCustomTakeaway("");
    }
  };

  const removeTakeaway = (idx: number) => {
    setTakeaways(takeaways.filter((_, i) => i !== idx));
  };

  return (
    <form action={saveBlogAction} className="space-y-8 max-w-4xl">
      {initialPost?.id && <input type="hidden" name="id" value={initialPost.id} />}
      <input type="hidden" name="takeaways_en" value={JSON.stringify(takeaways)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">
            {initialPost ? `Edit Article: ${initialPost.title.en}` : "Write New Perspective / Article"}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Publish technical landscaping insights, case studies, and ecological perspectives.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="btn-secondary !text-xs !py-2">
            Cancel
          </Link>
          <button type="submit" className="btn-primary !text-xs !py-2 shadow-sm font-semibold">
            {initialPost ? "Save Article Changes" : "Publish Article"}
          </button>
        </div>
      </div>

      {/* 1. Article Metadata */}
      <div className="card p-6 bg-white space-y-5">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">1. Article Titles & Category</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Article Title (English) *</label>
            <input
              type="text"
              name="title_en"
              required
              value={titleEn}
              onChange={(e) => {
                setTitleEn(e.target.value);
                if (!initialPost) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                }
              }}
              className="input font-semibold"
              placeholder="e.g. Modern Urban Greening Techniques for Addis Ababa"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Article Title (Amharic - አማርኛ)</label>
            <input
              type="text"
              name="title_am"
              value={titleAm}
              onChange={(e) => setTitleAm(e.target.value)}
              className="input"
              placeholder="e.g. ለአዲስ አበባ ዘመናዊ የከተማ አረንጓዴ ልማት ቴክኒኮች"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="label text-xs font-semibold">Category (English)</label>
            <input
              type="text"
              name="category_en"
              value={categoryEn}
              onChange={(e) => setCategoryEn(e.target.value)}
              className="input text-xs"
              placeholder="Landscape Architecture"
            />
            <div className="flex flex-wrap gap-1 mt-1.5">
              {PRESET_CATEGORIES.slice(0, 3).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategoryEn(c)}
                  className="text-[10px] bg-gray-100 hover:bg-brand-50 px-1.5 py-0.5 rounded text-gray-700"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label text-xs font-semibold">Author</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input text-xs"
              placeholder="Landscape Solution PLC Research Team"
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Publication Date & Read Time</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input text-xs !py-1.5 flex-1"
              />
              <input
                type="text"
                name="readTime"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="input text-xs !py-1.5 w-24 text-center"
                placeholder="5 min read"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Cover Image */}
      <div className="card p-6 bg-white space-y-4">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">2. Article Cover Image</h2>

        <div>
          <label className="label text-xs font-semibold">Select from Image Presets</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-1.5">
            {AVAILABLE_BLOG_IMAGES.map((img) => (
              <button
                type="button"
                key={img.url}
                onClick={() => setImage(img.url)}
                className={`rounded-xl border p-2 text-left transition ${
                  image === img.url
                    ? "border-sprout-500 ring-2 ring-sprout-400 bg-sprout-50/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="relative h-18 w-full rounded-lg overflow-hidden mb-1.5 bg-gray-100">
                  <Image src={img.url} alt={img.label} fill sizes="140px" className="object-cover" />
                </div>
                <div className="text-[11px] font-semibold text-brand-950 truncate">{img.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label text-xs font-semibold">Custom Cover Image URL</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input text-xs"
            placeholder="/images/service_plant_id.jpg or https://..."
          />
        </div>
      </div>

      {/* 3. Excerpts & Article Body */}
      <div className="card p-6 bg-white space-y-5">
        <h2 className="text-base font-bold text-brand-900 border-b pb-2">3. Excerpt & Full Content</h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Summary / Excerpt (English) *</label>
            <textarea
              name="excerpt_en"
              rows={3}
              required
              value={excerptEn}
              onChange={(e) => setExcerptEn(e.target.value)}
              className="input leading-relaxed text-xs"
              placeholder="Short summary displayed on the card..."
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Summary / Excerpt (Amharic)</label>
            <textarea
              name="excerpt_am"
              rows={3}
              value={excerptAm}
              onChange={(e) => setExcerptAm(e.target.value)}
              className="input leading-relaxed text-xs"
              placeholder="በካርዱ ላይ የሚታይ አጭር ማጠቃለያ..."
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label text-xs font-semibold">Full Article Body (English) *</label>
            <p className="text-[11px] text-gray-500 mb-1">Separate paragraphs with double Enter (blank line).</p>
            <textarea
              name="paragraphs_en"
              rows={8}
              required
              value={paragraphsEn}
              onChange={(e) => setParagraphsEn(e.target.value)}
              className="input leading-relaxed text-xs font-sans"
              placeholder="First paragraph of the complete article...&#10;&#10;Second paragraph elaborating on technical details..."
            />
          </div>

          <div>
            <label className="label text-xs font-semibold">Full Article Body (Amharic)</label>
            <p className="text-[11px] text-gray-500 mb-1">አንቀጾቹን በባዶ መስመር ይለዩ።</p>
            <textarea
              name="paragraphs_am"
              rows={8}
              value={paragraphsAm}
              onChange={(e) => setParagraphsAm(e.target.value)}
              className="input leading-relaxed text-xs font-sans"
              placeholder="የጽሑፉ የመጀመሪያ አንቀጽ...&#10;&#10;ሁለተኛው አንቀጽ..."
            />
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="pt-2 border-t">
          <label className="label text-xs font-semibold">Key Takeaways (Highlights)</label>
          <div className="space-y-2 mb-3">
            {takeaways.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-200 text-xs">
                <span className="text-sprout-700 font-bold">•</span>
                <span className="flex-1 text-gray-800">{point}</span>
                <button
                  type="button"
                  onClick={() => removeTakeaway(idx)}
                  className="text-red-500 hover:text-red-700 font-bold px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customTakeaway}
              onChange={(e) => setCustomTakeaway(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTakeaway();
                }
              }}
              className="input text-xs flex-1"
              placeholder="Add key takeaway point and press Add..."
            />
            <button
              type="button"
              onClick={addTakeaway}
              className="btn-secondary !text-xs !px-4 shrink-0 font-semibold"
            >
              + Add Point
            </button>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link href="/admin/blog" className="btn-secondary !text-xs !py-2.5">
          Cancel
        </Link>
        <button type="submit" className="btn-primary !text-xs !py-2.5 !px-6 shadow-md font-semibold">
          {initialPost ? "Save Article Changes" : "Publish Article"}
        </button>
      </div>
    </form>
  );
}
