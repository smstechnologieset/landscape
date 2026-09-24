"use server";

import type { ZodError } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  applicationSchema,
  consultationSchema,
  contactSchema,
  quoteSchema
} from "@/lib/validation";

export type FormState = { ok: boolean; error?: string };

function firstIssueMessage(err: ZodError): string {
  return err.issues[0]?.message ?? "Invalid input";
}

/** Fire-and-forget email notification via Supabase Edge Function (server-side only). */
async function notifyEmail(subject: string, html: string): Promise<void> {
  try {
    const supabase = createClient();
    await supabase.functions.invoke("send-email", {
      body: { subject, html }
    });
  } catch {
    // Email failure must never break form submission.
    console.error("email notification failed");
  }
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: firstIssueMessage(parsed.error) };

  const { organization, service_of_interest, ...dbFields } = parsed.data;
  const combinedSubject = [
    parsed.data.subject,
    service_of_interest ? `[Service: ${service_of_interest}]` : "",
    organization ? `[Org: ${organization}]` : ""
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 200) || "General Inquiry";

  const supabase = createClient();
  const { error } = await supabase.from("contact_inquiries").insert({
    ...dbFields,
    subject: combinedSubject
  });
  if (error) return { ok: false, error: "Submission failed. Please try again." };

  await notifyEmail(
    `New inquiry from ${parsed.data.full_name} ${organization ? `(${organization})` : ""}`,
    `<p><strong>${escapeHtml(parsed.data.full_name)}</strong> (${escapeHtml(parsed.data.email)})</p>` +
      (organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : "") +
      (service_of_interest ? `<p><strong>Service of Interest:</strong> ${escapeHtml(service_of_interest)}</p>` : "") +
      `<p>${escapeHtml(parsed.data.message)}</p>`
  );
  return { ok: true };
}

export async function submitQuote(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData);
  const parsed = quoteSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: firstIssueMessage(parsed.error) };

  const { attachment_url, ...values } = parsed.data;
  const supabase = createClient();
  const { error } = await supabase
    .from("quote_requests")
    .insert({ ...values, service_id: values.service_id ?? null, attachment_url: attachment_url || null });
  if (error) return { ok: false, error: "Submission failed. Please try again." };

  await notifyEmail(
    `New quote request from ${parsed.data.full_name}`,
    `<p><strong>${escapeHtml(parsed.data.full_name)}</strong> — ${escapeHtml(parsed.data.project_location)}</p><p>${escapeHtml(parsed.data.description)}</p>`
  );
  return { ok: true };
}

export async function submitConsultation(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = consultationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: firstIssueMessage(parsed.error) };

  const supabase = createClient();
  const { error } = await supabase.from("consultation_requests").insert(parsed.data);
  if (error) return { ok: false, error: "Submission failed. Please try again." };

  await notifyEmail(
    `New consultation request from ${parsed.data.full_name}`,
    `<p><strong>${escapeHtml(parsed.data.full_name)}</strong> requested ${escapeHtml(parsed.data.preferred_date)} ${escapeHtml(parsed.data.preferred_time)}</p>`
  );
  return { ok: true };
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = applicationSchema.safeParse({
    job_id: formData.get("job_id"),
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    cover_letter: formData.get("cover_letter") ?? "",
    resume_url: formData.get("resume_url")
  });
  if (!parsed.success) return { ok: false, error: firstIssueMessage(parsed.error) };

  const supabase = createClient();
  const { error } = await supabase.from("job_applications").insert(parsed.data);
  if (error) return { ok: false, error: "Submission failed. Please try again." };

  await notifyEmail(
    `New job application from ${parsed.data.full_name}`,
    `<p>Applied for job #${parsed.data.job_id}: <strong>${escapeHtml(parsed.data.full_name)}</strong> (${escapeHtml(parsed.data.email)})</p>`
  );
  return { ok: true };
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}
