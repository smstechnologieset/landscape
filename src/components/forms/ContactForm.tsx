"use client";

import { useFormState } from "react-dom";
import { submitContact, type FormState } from "@/app/actions/public-forms";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const initial: FormState = { ok: false };

export default function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [state, action, pending] = useFormState(submitContact, initial);

  if (state.ok) {
    return (
      <div role="status" className="rounded-xl border border-brand-200 bg-brand-50/80 p-8 text-center animate-fade-in">
        <span className="text-3xl">🌿</span>
        <h3 className="mt-3 font-serif text-xl font-semibold text-brand-900">Message Received</h3>
        <p className="mt-2 text-sm text-gray-700">
          Thank you for reaching out to Landscape Solution PLC. Our landscape planning and technical advisory team will review your inquiry and follow up promptly.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4" noValidate={false}>
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">{state.error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="label">{dict.forms.fullName} *</label>
          <input
            id="c-name"
            name="full_name"
            required
            minLength={2}
            placeholder="Abebe Kebede"
            className="input"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="label">{dict.forms.email} *</label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            placeholder="name@organization.com"
            className="input"
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-phone" className="label">{dict.forms.phone}</label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            placeholder="Optional telephone"
            className="input"
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="c-organization" className="label">
            {locale === "am" ? "ድርጅት / ተቋም (ካለ)" : "Organization / Company"}
          </label>
          <input
            id="c-organization"
            name="organization"
            placeholder="e.g. Real Estate, Embassy, Institution"
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="c-service" className="label">
          {locale === "am" ? "የፍላጎት አገልግሎት" : "Service of Interest"}
        </label>
        <select id="c-service" name="service_of_interest" className="input bg-white">
          <option value="">-- Select a Service / General Inquiry --</option>
          <option value="Landscape Planning and Design">Landscape Planning and Design</option>
          <option value="Landscape Construction and Installation">Landscape Construction and Installation</option>
          <option value="Nursery Development and Plant Production">Nursery Development & Plant Production</option>
          <option value="Botanic Garden Development">Botanic Garden Development</option>
          <option value="Garden and Landscape Maintenance">Garden and Landscape Maintenance</option>
          <option value="Urban Greening and Environmental Services">Urban Greening & Environmental Services</option>
          <option value="Irrigation and Water Management">Irrigation and Water Management</option>
          <option value="Environmental Restoration">Environmental Restoration</option>
          <option value="Composting and Organic Fertilizer Production">Composting & Organic Fertilizer</option>
          <option value="Consultancy and Training">Consultancy and Training</option>
          <option value="Plant Identification">Plant Identification</option>
          <option value="General Consultation">General Consultation / Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className="label">{dict.forms.message} *</label>
        <textarea
          id="c-message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Please describe your site, landscape project requirements, or questions..."
          className="input"
        />
      </div>

      <button type="submit" disabled={pending} className="btn-primary w-full text-xs uppercase tracking-wider py-3">
        {pending ? dict.forms.submitting : "Send Inquiry to Landscape Solution"}
      </button>
    </form>
  );
}
