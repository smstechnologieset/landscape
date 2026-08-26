"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { submitApplication, type FormState } from "@/app/actions/public-forms";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { uploadFile } from "@/lib/upload";

const initial: FormState = { ok: false };
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export default function ApplicationForm({ jobId, locale }: { jobId: number; locale: Locale }) {
  const dict = getDictionary(locale);
  const [state, action, pending] = useFormState(submitApplication, initial);
  const [resumePath, setResumePath] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    setUploadError("");
    if (!file) return;
    setUploading(true);
    const result = await uploadFile("career-applications", file, RESUME_TYPES);
    setUploading(false);
    if (result.error) setUploadError(result.error);
    else if (result.path) setResumePath(result.path);
  }

  if (state.ok) {
    return (
      <div role="status" className="rounded-lg border border-green-300 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">{dict.forms.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}
      <input type="hidden" name="job_id" value={jobId} />
      <input type="hidden" name="resume_url" value={resumePath} />
      <div>
        <label htmlFor="a-name" className="label">{dict.forms.fullName} *</label>
        <input id="a-name" name="full_name" required minLength={2} className="input" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="a-email" className="label">{dict.forms.email} *</label>
          <input id="a-email" name="email" type="email" required className="input" />
        </div>
        <div>
          <label htmlFor="a-phone" className="label">{dict.forms.phone} *</label>
          <input id="a-phone" name="phone" required className="input" />
        </div>
      </div>
      <div>
        <label htmlFor="a-cover" className="label">{dict.forms.coverLetter}</label>
        <textarea id="a-cover" name="cover_letter" rows={5} maxLength={8000} className="input" />
      </div>
      <div>
        <label htmlFor="a-resume" className="label">{dict.forms.resume} *</label>
        <input
          id="a-resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          className="input"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {(uploadError || uploading) && (
          <p role={uploadError ? "alert" : undefined} className="field-error">
            {uploadError || "Uploading…"}
          </p>
        )}
      </div>
      <button type="submit" disabled={pending || uploading || !resumePath} className="btn-primary w-full">
        {pending ? dict.forms.submitting : dict.cta.apply}
      </button>
    </form>
  );
}
