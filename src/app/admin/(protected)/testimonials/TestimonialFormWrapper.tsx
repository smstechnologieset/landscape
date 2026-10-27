"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { saveTestimonial, type ActionState } from "@/app/actions/admin";
import ImageUploader from "@/components/admin/ImageUploader";

interface TestimonialFormProps {
  initial?: Record<string, any>;
  id?: number;
}

export default function TestimonialForm({ initial = {}, id }: TestimonialFormProps) {
  const [state, formAction, pending] = useFormState(saveTestimonial, { ok: false } as ActionState);
  const [photoUrl, setPhotoUrl] = useState<string>(String(initial.photo_url || ""));

  const initialTestimonial = typeof initial.testimonial === "object" && initial.testimonial !== null
    ? initial.testimonial
    : { en: String(initial.testimonial || ""), am: "" };

  return (
    <form action={formAction} className="space-y-6">
      {id && <input type="hidden" name="id" value={id} />}

      {state.error && (
        <div role="alert" className="rounded-lg bg-red-50 p-4 border border-red-200 text-sm text-red-700">
          <span className="font-semibold">Error: </span>
          {state.error}
        </div>
      )}

      {/* Customer Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="customer_name" className="label text-xs font-semibold text-gray-700">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            id="customer_name"
            name="customer_name"
            defaultValue={initial.customer_name || ""}
            required
            className="input"
            placeholder="e.g. Dr. Tewodros Haile"
          />
        </div>

        <div>
          <label htmlFor="company" className="label text-xs font-semibold text-gray-700">
            Company / Organization
          </label>
          <input
            id="company"
            name="company"
            defaultValue={initial.company || ""}
            className="input"
            placeholder="e.g. Ethiopian Biodiversity Institute"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="position" className="label text-xs font-semibold text-gray-700">
            Job Title / Position
          </label>
          <input
            id="position"
            name="position"
            defaultValue={initial.position || ""}
            className="input"
            placeholder="e.g. Director General / Project Developer"
          />
        </div>

        <div>
          <label htmlFor="rating" className="label text-xs font-semibold text-gray-700">
            Star Rating
          </label>
          <select
            id="rating"
            name="rating"
            defaultValue={String(initial.rating ?? 5)}
            className="input"
          >
            <option value="5">★★★★★ (5 Stars - Exceptional)</option>
            <option value="4">★★★★☆ (4 Stars - Highly Satisfied)</option>
            <option value="3">★★★☆☆ (3 Stars - Satisfactory)</option>
            <option value="2">★★☆☆☆ (2 Stars - Mediocre)</option>
            <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
          </select>
        </div>
      </div>

      {/* Client Avatar / Photo with Live Visual Preview & Server Upload */}
      <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
        <ImageUploader
          label="Client Photo / Headshot (Live Preview & Cloud Upload)"
          name="photo_url"
          value={photoUrl}
          onChange={(url) => setPhotoUrl(url)}
          bucket="general-media"
          aspectRatio="square"
        />
        <p className="text-[11px] text-gray-500 mt-2">
          Upload a square portrait photo of the client. It will display next to their quote on the homepage.
        </p>
      </div>

      {/* Testimonial Quote in English & Amharic */}
      <div className="space-y-4">
        <div>
          <label htmlFor="testimonial_en" className="label text-xs font-semibold text-gray-700">
            Testimonial Quote (English) <span className="text-red-500">*</span>
          </label>
          <textarea
            id="testimonial_en"
            name="testimonial_en"
            defaultValue={initialTestimonial.en || ""}
            required
            rows={4}
            className="input"
            placeholder="What the client had to say about Landscape Solution PLC's service delivery..."
          />
        </div>

        <div>
          <label htmlFor="testimonial_am" className="label text-xs font-semibold text-gray-700">
            Testimonial Quote (አማርኛ - Optional)
          </label>
          <textarea
            id="testimonial_am"
            name="testimonial_am"
            defaultValue={initialTestimonial.am || ""}
            rows={4}
            className="input"
            placeholder="የደንበኛው አስተያየት በአማርኛ..."
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-gray-100">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={initial.is_published !== false}
            className="rounded border-gray-300 text-brand-700 focus:ring-brand-500"
          />
          <span className="font-medium">Published on Live Website</span>
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={initial.is_featured === true}
            className="rounded border-gray-300 text-brand-700 focus:ring-brand-500"
          />
          <span className="font-medium">Featured Review</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <Link
          href="/admin/home#testimonials"
          className="btn-secondary !text-xs !py-2.5 font-medium"
        >
          Cancel & Return
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary !text-xs !py-2.5 px-6 font-semibold shadow-md"
        >
          {pending ? "Saving Testimonial…" : id ? "Update Testimonial" : "Create Testimonial"}
        </button>
      </div>
    </form>
  );
}
