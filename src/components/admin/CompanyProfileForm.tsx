"use client";

import { useFormState } from "react-dom";
import { saveCompanyProfile, type ActionState } from "@/app/actions/admin";

type L = Record<string, { en?: string; am?: string }>;

const SECTIONS: { key: string; label: string; textarea?: boolean }[] = [
  { key: "hero_title", label: "Hero Title" },
  { key: "hero_description", label: "Hero Description", textarea: true },
  { key: "company_description", label: "Company Description", textarea: true },
  { key: "about", label: "About", textarea: true },
  { key: "mission", label: "Mission", textarea: true },
  { key: "vision", label: "Vision", textarea: true },
  { key: "values", label: "Values", textarea: true },
  { key: "company_story", label: "Company Story", textarea: true }
];

const initial: ActionState = { ok: false };

export default function CompanyProfileForm({ data }: { data: L & { brochure_url?: string | null } }) {
  const [state, action, pending] = useFormState(saveCompanyProfile, initial);

  return (
    <form action={action} className="space-y-6">
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-green-800">Saved successfully.</p>
      )}

      {SECTIONS.map((s) => {
        const val = (data as Record<string, { en?: string; am?: string }>)[s.key] ?? {};
        return (
          <fieldset key={s.key}>
            <legend className="label">{s.label}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor={`${s.key}-en`} className="sr-only">{s.label} English</label>
                {s.textarea ? (
                  <textarea id={`${s.key}-en`} name={`${s.key}_en`} defaultValue={val.en ?? ""} rows={3} className="input" placeholder="English" />
                ) : (
                  <input id={`${s.key}-en`} name={`${s.key}_en`} defaultValue={val.en ?? ""} className="input" placeholder="English" />
                )}
              </div>
              <div>
                <label htmlFor={`${s.key}-am`} className="sr-only">{s.label} Amharic</label>
                {s.textarea ? (
                  <textarea id={`${s.key}-am`} name={`${s.key}_am`} defaultValue={val.am ?? ""} rows={3} className="input" placeholder="አማርኛ" />
                ) : (
                  <input id={`${s.key}-am`} name={`${s.key}_am`} defaultValue={val.am ?? ""} className="input" placeholder="አማርኛ" />
                )}
              </div>
            </div>
          </fieldset>
        );
      })}

      <div>
        <label htmlFor="brochure_url" className="label">Brochure URL (PDF in documents bucket)</label>
        <input id="brochure_url" name="brochure_url" defaultValue={data.brochure_url ?? ""} className="input" />
      </div>

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Saving…" : "Save Company Profile"}
      </button>
    </form>
  );
}
