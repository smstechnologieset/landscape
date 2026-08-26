"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { uploadFile } from "@/lib/upload";
import { ALLOWED_IMAGE_TYPES } from "@/lib/utils";

export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "date"
    | "checkbox"
    | "select"
    | "localized"
    | "localized_textarea"
    | "lines"
    | "tags"
    | "image";
  required?: boolean;
  options?: { value: string; label: string }[];
  bucket?: string;
  placeholder?: string;
};

type Values = Record<string, unknown>;

function get(values: Values, name: string): string {
  const v = values[name];
  if (v == null) return "";
  if (typeof v === "object") return "";
  return String(v);
}

function getLocalized(values: Values, name: string): { en: string; am: string } {
  const v = values[name] as { en?: string; am?: string } | undefined;
  return { en: v?.en ?? "", am: v?.am ?? "" };
}

function getLines(values: Values, name: string): string {
  const arr = values[name];
  if (!Array.isArray(arr)) return "";
  return arr
    .map((item) =>
      typeof item === "string" ? item : ((item as { en?: string })?.en ?? "")
    )
    .join("\n");
}

export default function ResourceForm({
  fields,
  initial,
  action,
  submitLabel = "Save",
  cancelHref
}: {
  fields: FieldConfig[];
  initial: Values;
  action: (prev: { ok: boolean; error?: string }, fd: FormData) => Promise<{ ok: boolean; error?: string }>;
  submitLabel?: string;
  cancelHref?: string;
}) {
  const [state, formAction, pending] = useFormState(action, { ok: false } as { ok: boolean; error?: string });
  const [uploading, setUploading] = useState("");

  async function handleImageUpload(name: string, bucket: string, file: File | undefined) {
    if (!file) return;
    setUploading(name);
    const result = await uploadFile(bucket, file, ALLOWED_IMAGE_TYPES);
    setUploading("");
    if (!result.error && result.path) {
      // Write public URL into the corresponding text input.
      const { data } = await import("@/lib/supabase/client").then((m) => {
        const client = m.createClient();
        return client.storage.from(bucket).getPublicUrl(result.path!);
      });
      const input = document.getElementById(`f-${name}`) as HTMLInputElement | null;
      if (input) input.value = data.publicUrl;
    }
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}

      {fields.map((field) => {
        const id = `f-${field.name}`;
        if (field.type === "checkbox") {
          return (
            <div key={field.name} className="flex items-center gap-2">
              <input
                id={id}
                name={field.name}
                type="checkbox"
                defaultChecked={Boolean(initial[field.name])}
                className="h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor={id} className="text-sm font-medium">{field.label}</label>
            </div>
          );
        }

        if (field.type === "localized" || field.type === "localized_textarea") {
          const loc = getLocalized(initial, field.name);
          const InputEl = field.type === "localized" ? false : true;
          return (
            <fieldset key={field.name}>
              <legend className="label">{field.label}</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-en`} className="sr-only">{field.label} (English)</label>
                  {InputEl ? (
                    <textarea id={`${id}-en`} name={`${field.name}_en`} defaultValue={loc.en} rows={4} required={field.required} className="input" placeholder="English" />
                  ) : (
                    <input id={`${id}-en`} name={`${field.name}_en`} defaultValue={loc.en} required={field.required} className="input" placeholder="English" />
                  )}
                </div>
                <div>
                  <label htmlFor={`${id}-am`} className="sr-only">{field.label} (Amharic)</label>
                  {InputEl ? (
                    <textarea id={`${id}-am`} name={`${field.name}_am`} defaultValue={loc.am} rows={4} className="input" placeholder="አማርኛ (optional)" />
                  ) : (
                    <input id={`${id}-am`} name={`${field.name}_am`} defaultValue={loc.am} className="input" placeholder="አማርኛ (optional)" />
                  )}
                </div>
              </div>
            </fieldset>
          );
        }

        if (field.type === "image") {
          return (
            <div key={field.name}>
              <label htmlFor={id} className="label">{field.label}</label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input id={id} name={field.name} defaultValue={get(initial, field.name)} className="input" placeholder="https://… or upload below" />
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  aria-label={`Upload ${field.label}`}
                  onChange={(e) => handleImageUpload(field.name, field.bucket || "general-media", e.target.files?.[0])}
                  className="text-sm"
                />
              </div>
              {uploading === field.name && <p className="field-error">Uploading…</p>}
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name}>
              <label htmlFor={id} className="label">{field.label}</label>
              <select id={id} name={field.name} defaultValue={get(initial, field.name)} className="input">
                {(field.options ?? []).map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "lines") {
          return (
            <div key={field.name}>
              <label htmlFor={id} className="label">
                {field.label}
                <span className="font-normal text-gray-400"> (one per line)</span>
              </label>
              <textarea id={id} name={field.name} defaultValue={getLines(initial, field.name)} rows={4} className="input" />
            </div>
          );
        }

        if (field.type === "tags") {
          return (
            <div key={field.name}>
              <label htmlFor={id} className="label">{field.label}<span className="font-normal text-gray-400"> (comma separated)</span></label>
              <input id={id} name={field.name} defaultValue={Array.isArray(initial[field.name]) ? (initial[field.name] as string[]).join(", ") : ""} className="input" />
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.name}>
              <label htmlFor={id} className="label">{field.label}</label>
              <textarea id={id} name={field.name} defaultValue={get(initial, field.name)} rows={3} required={field.required} className="input" />
            </div>
          );
        }

        return (
          <div key={field.name}>
            <label htmlFor={id} className="label">{field.label}</label>
            <input
              id={id}
              name={field.name}
              type={field.type}
              defaultValue={get(initial, field.name)}
              required={field.required}
              placeholder={field.placeholder}
              className="input"
            />
          </div>
        );
      })}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Saving…" : submitLabel}
        </button>
        {cancelHref && (
          <a href={cancelHref} className="btn-secondary">Cancel</a>
        )}
      </div>
    </form>
  );
}
