"use client";

import { useFormState } from "react-dom";
import { saveSettings, type ActionState } from "@/app/actions/admin";

const initial: ActionState = { ok: false };

const FIELDS: { name: string; label: string; type?: string }[] = [
  { name: "company_name", label: "Company Name" },
  { name: "phone", label: "Phone" },
  { name: "email", label: "Email", type: "email" },
  { name: "whatsapp", label: "WhatsApp Number (international digits only)" },
  { name: "address", label: "Address" },
  { name: "google_maps_url", label: "Google Maps Embed URL" },
  { name: "facebook_url", label: "Facebook URL" },
  { name: "instagram_url", label: "Instagram URL" },
  { name: "linkedin_url", label: "LinkedIn URL" },
  { name: "youtube_url", label: "YouTube URL" }
];

export default function SettingsForm({ data }: { data: Record<string, string> }) {
  const [state, action, pending] = useFormState(saveSettings, initial);

  return (
    <form action={action} className="space-y-5">
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}
      {state.ok && (
        <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-green-800">Saved successfully.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label htmlFor={`s-${f.name}`} className="label">{f.label}</label>
            <input
              id={`s-${f.name}`}
              name={f.name}
              type={f.type ?? "text"}
              defaultValue={data[f.name] ?? ""}
              className="input"
            />
          </div>
        ))}
      </div>

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}
