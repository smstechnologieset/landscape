"use client";

import { useFormState } from "react-dom";
import { saveSustainability, type ActionState } from "@/app/actions/admin";

const initial: ActionState = { ok: false };

const SECTIONS: { key: string; label: string; textarea?: boolean }[] = [
  { key: "title", label: "Page Title" },
  { key: "introduction", label: "Introduction", textarea: true },
  { key: "water_conservation", label: "Water Conservation", textarea: true },
  { key: "native_plants", label: "Native Plants", textarea: true },
  { key: "environmental_responsibility", label: "Environmental Responsibility", textarea: true },
  { key: "eco_friendly_practices", label: "Eco-Friendly Practices", textarea: true },
  { key: "waste_reduction", label: "Waste Reduction", textarea: true },
  { key: "sustainable_design", label: "Sustainable Design", textarea: true }
];

export default function SustainabilityForm({ data }: { data: Record<string, unknown> }) {
  const [state, action, pending] = useFormState(saveSustainability, initial);

  return (
    <form action={action} className="space-y-6">
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-green-800">Saved successfully.</p>
      )}

      {SECTIONS.map((s) => {
        const val = (data[s.key] as { en?: string; am?: string }) ?? {};
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

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Saving…" : "Save Sustainability Content"}
      </button>
    </form>
  );
}
