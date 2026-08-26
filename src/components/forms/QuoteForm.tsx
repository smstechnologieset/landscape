"use client";

import { useFormState } from "react-dom";
import { submitQuote, type FormState } from "@/app/actions/public-forms";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { uploadFile } from "@/lib/upload";
import { useState } from "react";

const initial: FormState = { ok: false };

export default function QuoteForm({
  locale,
  services
}: {
  locale: Locale;
  services: { id: number; title: string }[];
}) {
  const dict = getDictionary(locale);
  const [state, action, pending] = useFormState(submitQuote, initial);
  const [attachmentPath, setAttachmentPath] = useState("");
  const [uploadError, setUploadError] = useState("");

  async function handleFile(file: File | undefined) {
    setUploadError("");
    if (!file) return;
    const result = await uploadFile(
      "attachments",
      file,
      ["application/pdf", "image/png", "image/jpeg", "image/webp"]
    );
    if (result.error) setUploadError(result.error);
    else if (result.path) setAttachmentPath(result.path);
  }

  if (state.ok) {
    return (
      <div role="status" className="rounded-lg border border-green-300 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">{dict.forms.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4" encType="multipart/form-data">
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}
      <input type="hidden" name="attachment_url" value={attachmentPath} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className="label">{dict.forms.fullName} *</label>
          <input id="q-name" name="full_name" required minLength={2} className="input" />
        </div>
        <div>
          <label htmlFor="q-company" className="label">{dict.forms.company}</label>
          <input id="q-company" name="company" maxLength={200} className="input" />
        </div>
        <div>
          <label htmlFor="q-email" className="label">{dict.forms.email} *</label>
          <input id="q-email" name="email" type="email" required className="input" />
        </div>
        <div>
          <label htmlFor="q-phone" className="label">{dict.forms.phone} *</label>
          <input id="q-phone" name="phone" required className="input" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-service" className="label">{dict.forms.service}</label>
          <select id="q-service" name="service_id" className="input">
            <option value="">—</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-location" className="label">{dict.forms.projectLocation} *</label>
          <input id="q-location" name="project_location" required className="input" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="q-type" className="label">{dict.forms.projectType}</label>
          <select id="q-type" name="project_type" className="input">
            <option value="">—</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="public">Public</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="q-size" className="label">{dict.forms.projectSize}</label>
          <input id="q-size" name="project_size" placeholder="e.g. 500 m²" className="input" />
        </div>
        <div>
          <label htmlFor="q-budget" className="label">{dict.forms.budget}</label>
          <select id="q-budget" name="budget_range" className="input">
            <option value="">—</option>
            <option value="<100k">Under 100,000 ETB</option>
            <option value="100-500k">100,000 – 500,000 ETB</option>
            <option value="500k+">Over 500,000 ETB</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="q-timeline" className="label">{dict.forms.timeline}</label>
        <input id="q-timeline" name="desired_timeline" placeholder="e.g. Within 2 months" className="input" />
      </div>
      <div>
        <label htmlFor="q-desc" className="label">{dict.forms.message} *</label>
        <textarea id="q-desc" name="description" required minLength={10} rows={5} className="input" />
      </div>
      <div>
        <label htmlFor="q-file" className="label">{dict.forms.attachment}</label>
        <input
          id="q-file"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="input"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {uploadError && <p role="alert" className="field-error">{uploadError}</p>}
      </div>
      <button type="submit" disabled={pending || !!uploadError} className="btn-primary w-full">
        {pending ? dict.forms.submitting : dict.cta.quote}
      </button>
    </form>
  );
}
