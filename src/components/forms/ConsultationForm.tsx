"use client";

import { useFormState } from "react-dom";
import { submitConsultation, type FormState } from "@/app/actions/public-forms";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const initial: FormState = { ok: false };

export default function ConsultationForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [state, action, pending] = useFormState(submitConsultation, initial);

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
      <div>
        <label htmlFor="k-name" className="label">{dict.forms.fullName} *</label>
        <input id="k-name" name="full_name" required minLength={2} className="input" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="k-email" className="label">{dict.forms.email} *</label>
          <input id="k-email" name="email" type="email" required className="input" />
        </div>
        <div>
          <label htmlFor="k-phone" className="label">{dict.forms.phone} *</label>
          <input id="k-phone" name="phone" required className="input" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="k-date" className="label">{dict.forms.preferredDate} *</label>
          <input id="k-date" name="preferred_date" type="date" required className="input" />
        </div>
        <div>
          <label htmlFor="k-time" className="label">{dict.forms.preferredTime}</label>
          <select id="k-time" name="preferred_time" className="input">
            <option value="">—</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
        <div>
          <label htmlFor="k-type" className="label">{dict.forms.consultationType}</label>
          <select id="k-type" name="consultation_type" className="input">
            <option value="on_site">On-site visit</option>
            <option value="office">Office meeting</option>
            <option value="virtual">Virtual call</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="k-details" className="label">{dict.forms.projectDetails}</label>
        <textarea id="k-details" name="project_details" rows={3} maxLength={2000} className="input" />
      </div>
      <div>
        <label htmlFor="k-message" className="label">{dict.forms.message}</label>
        <textarea id="k-message" name="message" rows={3} maxLength={5000} className="input" />
      </div>
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? dict.forms.submitting : dict.cta.consultation}
      </button>
    </form>
  );
}
