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
      <div role="status" className="rounded-lg border border-green-300 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">{dict.forms.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4" noValidate={false}>
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}
      <div>
        <label htmlFor="c-name" className="label">{dict.forms.fullName} *</label>
        <input id="c-name" name="full_name" required minLength={2} className="input" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="c-email" className="label">{dict.forms.email} *</label>
        <input id="c-email" name="email" type="email" required className="input" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="c-phone" className="label">{dict.forms.phone}</label>
        <input id="c-phone" name="phone" type="tel" className="input" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="c-subject" className="label">{dict.forms.subject}</label>
        <input id="c-subject" name="subject" maxLength={200} className="input" />
      </div>
      <div>
        <label htmlFor="c-message" className="label">{dict.forms.message} *</label>
        <textarea id="c-message" name="message" required minLength={10} rows={5} className="input" />
      </div>
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? dict.forms.submitting : dict.forms.send}
      </button>
    </form>
  );
}
