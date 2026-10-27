"use server";

import type { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { addStoredMessage } from "@/lib/data-store";
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

  // Store in persistent database via admin client
  await addStoredMessage({
    fullName: parsed.data.full_name,
    email: parsed.data.email,
    phone: parsed.data.phone || "",
    organization: organization || "",
    serviceOfInterest: service_of_interest || "",
    subject: combinedSubject,
    message: parsed.data.message
  });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");

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

import { createAdminClient } from "@/lib/supabase/admin";

export async function submitJobApplicationAction(payload: {
  jobId?: string | number | null;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  coverNote?: string;
  resumeUrl?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const fullName = (payload.fullName || "").trim();
    const email = (payload.email || "").trim().toLowerCase();
    const phone = (payload.phone || "").trim();
    const portfolioUrl = (payload.portfolioUrl || "").trim();
    const coverNote = (payload.coverNote || "").trim();
    const resumeUrl = (payload.resumeUrl || "").trim();

    if (!fullName || fullName.length < 2) {
      return { ok: false, error: "Please enter your full name." };
    }
    if (!email || !email.includes("@")) {
      return { ok: false, error: "Please enter a valid email address." };
    }
    if (!phone || phone.length < 5) {
      return { ok: false, error: "Please enter a valid phone number." };
    }

    const admin = createAdminClient();

    // Resolve job_id if provided
    let resolvedJobId: number | null = null;
    if (payload.jobId) {
      const numeric = Number(payload.jobId);
      if (!isNaN(numeric) && numeric > 0) {
        const { data: jobMatch } = await admin.from("jobs").select("id").eq("id", numeric).maybeSingle();
        if (jobMatch) resolvedJobId = jobMatch.id;
      }
      if (!resolvedJobId) {
        const { data: jobMatch } = await admin.from("jobs").select("id").eq("slug", String(payload.jobId)).maybeSingle();
        if (jobMatch) resolvedJobId = jobMatch.id;
      }
    }

    const { error: insertError } = await admin.from("job_applications").insert({
      job_id: resolvedJobId,
      full_name: fullName,
      email: email,
      phone: phone,
      cover_letter: coverNote || null,
      resume_url: resumeUrl || null,
      portfolio_url: portfolioUrl || null,
      status: "new"
    });

    if (insertError) {
      console.error("[submitJobApplicationAction] Database insert error:", insertError);
      return { ok: false, error: insertError.message || "Failed to submit application." };
    }

    // Revalidate admin careers page and public careers page
    revalidatePath("/admin/careers");
    revalidatePath("/admin");
    revalidatePath("/careers");

    await notifyEmail(
      `New Job Application from ${fullName}`,
      `<p><strong>Applicant:</strong> ${escapeHtml(fullName)} (${escapeHtml(email)})</p>
       <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
       <p><strong>Position:</strong> ${resolvedJobId ? `Job #${resolvedJobId}` : "General / Speculative"}</p>
       ${portfolioUrl ? `<p><strong>Portfolio / Profile:</strong> <a href="${escapeHtml(portfolioUrl)}">${escapeHtml(portfolioUrl)}</a></p>` : ""}
       ${coverNote ? `<p><strong>Cover Note:</strong><br/>${escapeHtml(coverNote).replace(/\n/g, "<br/>")}</p>` : ""}
       ${resumeUrl ? `<p><strong>Resume URL:</strong> <a href="${escapeHtml(resumeUrl)}">${escapeHtml(resumeUrl)}</a></p>` : ""}`
    );

    return { ok: true };
  } catch (err: any) {
    console.error("[submitJobApplicationAction] Unexpected error:", err);
    return { ok: false, error: err.message || "An unexpected error occurred." };
  }
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const result = await submitJobApplicationAction({
    jobId: formData.get("job_id") as string | null,
    fullName: String(formData.get("full_name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    coverNote: String(formData.get("cover_letter") ?? ""),
    resumeUrl: String(formData.get("resume_url") ?? ""),
    portfolioUrl: String(formData.get("portfolio_url") ?? "")
  });
  return result;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}
