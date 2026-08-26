"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  collectLocalized,
  collectLocalizedList,
  requireAdmin,
  requireStaff,
  slugify
} from "@/lib/admin-utils";

export type ActionState = { ok: boolean; error?: string };

function fail(err: unknown): ActionState {
  const msg = err instanceof Error ? err.message : "Unknown error";
  if (msg === "UNAUTHENTICATED") return { ok: false, error: "Not signed in." };
  if (msg === "FORBIDDEN") return { ok: false, error: "You do not have permission for this action." };
  return { ok: false, error: "Save failed. Please check your input and try again." };
}

function bool(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true";
}

/* ------------------------------- services -------------------------------- */

export async function saveService(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const { supabase } = await requireStaff();
    const id = fd.get("id") ? Number(fd.get("id")) : null;
    const title = collectLocalized(fd, "title");
    const slug = String(fd.get("slug") || "").trim() || slugify(title.en);

    const row = {
      title,
      slug,
      short_description: collectLocalized(fd, "short_description"),
      description: collectLocalized(fd, "description"),
      icon: String(fd.get("icon") ?? "") || null,
      featured_image: String(fd.get("featured_image") ?? "") || null,
      features: collectLocalizedList(fd, "features"),
      benefits: collectLocalizedList(fd, "benefits"),
      faq: [],
      is_featured: bool(fd, "is_featured"),
      is_published: bool(fd, "is_published"),
      sort_order: Number(fd.get("sort_order") ?? 0) || 0,
      seo_title: String(fd.get("seo_title") ?? "") || null,
      seo_description: String(fd.get("seo_description") ?? "") || null
    };

    const { error } = id
      ? await supabase.from("services").update(row).eq("id", id)
      : await supabase.from("services").insert(row);
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(fd: FormData): Promise<void> {
  const { supabase } = await requireStaff();
  await supabase.from("services").delete().eq("id", Number(fd.get("id")));
  revalidatePath("/admin/services");
}

/* ------------------------------- projects -------------------------------- */

export async function saveProject(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const { supabase } = await requireStaff();
    const id = fd.get("id") ? Number(fd.get("id")) : null;
    const title = collectLocalized(fd, "title");
    const slug = String(fd.get("slug") || "").trim() || slugify(title.en);

    const row = {
      title,
      slug,
      category: String(fd.get("category") ?? ""),
      location: String(fd.get("location") ?? ""),
      client: String(fd.get("client") ?? ""),
      completion_date: String(fd.get("completion_date") ?? "") || null,
      short_description: collectLocalized(fd, "short_description"),
      description: collectLocalized(fd, "description"),
      challenge: collectLocalized(fd, "challenge"),
      solution: collectLocalized(fd, "solution"),
      results: collectLocalized(fd, "results"),
      featured_image: String(fd.get("featured_image") ?? "") || null,
      is_featured: bool(fd, "is_featured"),
      is_published: bool(fd, "is_published"),
      seo_title: String(fd.get("seo_title") ?? "") || null,
      seo_description: String(fd.get("seo_description") ?? "") || null
    };

    const { error } = id
      ? await supabase.from("projects").update(row).eq("id", id)
      : await supabase.from("projects").insert(row);
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}

export async function deleteProject(fd: FormData): Promise<void> {
  const { supabase } = await requireStaff();
  await supabase.from("projects").delete().eq("id", Number(fd.get("id")));
  revalidatePath("/admin/projects");
}

/* --------------------------------- blog ---------------------------------- */

export async function savePost(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const { supabase, user } = await requireStaff();
    const id = fd.get("id") ? Number(fd.get("id")) : null;
    const title = collectLocalized(fd, "title");
    const slug = String(fd.get("slug") || "").trim() || slugify(title.en);
    const isPublished = bool(fd, "is_published");

    const row: Record<string, unknown> = {
      title,
      slug,
      excerpt: collectLocalized(fd, "excerpt"),
      content: collectLocalized(fd, "content"),
      featured_image: String(fd.get("featured_image") ?? "") || null,
      category_id: fd.get("category_id") ? Number(fd.get("category_id")) : null,
      tags: String(fd.get("tags") ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      is_featured: bool(fd, "is_featured"),
      is_published: isPublished,
      seo_title: String(fd.get("seo_title") ?? "") || null,
      seo_description: String(fd.get("seo_description") ?? "") || null
    };
    if (isPublished) row.published_at = new Date().toISOString();

    const { error } = id
      ? await supabase.from("blog_posts").update(row).eq("id", id)
      : await supabase.from("blog_posts").insert({ ...row, author_id: user.id });
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deletePost(fd: FormData): Promise<void> {
  const { supabase } = await requireStaff();
  await supabase.from("blog_posts").delete().eq("id", Number(fd.get("id")));
  revalidatePath("/admin/blog");
}

/* ----------------------------- testimonials ------------------------------- */

export async function saveTestimonial(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const { supabase } = await requireStaff();
    const id = fd.get("id") ? Number(fd.get("id")) : null;
    const row = {
      customer_name: String(fd.get("customer_name") ?? "").trim(),
      company: String(fd.get("company") ?? ""),
      position: String(fd.get("position") ?? ""),
      testimonial: collectLocalized(fd, "testimonial"),
      photo_url: String(fd.get("photo_url") ?? "") || null,
      rating: Math.min(5, Math.max(1, Number(fd.get("rating") ?? 5))),
      is_featured: bool(fd, "is_featured"),
      is_published: bool(fd, "is_published")
    };
    const { error } = id
      ? await supabase.from("testimonials").update(row).eq("id", id)
      : await supabase.from("testimonials").insert(row);
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(fd: FormData): Promise<void> {
  const { supabase } = await requireStaff();
  await supabase.from("testimonials").delete().eq("id", Number(fd.get("id")));
  revalidatePath("/admin/testimonials");
}

/* -------------------------------- partners -------------------------------- */

export async function savePartner(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const { supabase } = await requireStaff();
    const id = fd.get("id") ? Number(fd.get("id")) : null;
    const row = {
      name: String(fd.get("name") ?? "").trim(),
      logo_url: String(fd.get("logo_url") ?? "") || null,
      website_url: String(fd.get("website_url") ?? "") || null,
      description: String(fd.get("description") ?? ""),
      sort_order: Number(fd.get("sort_order") ?? 0) || 0,
      is_published: bool(fd, "is_published")
    };
    const { error } = id
      ? await supabase.from("partners").update(row).eq("id", id)
      : await supabase.from("partners").insert(row);
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/partners");
  redirect("/admin/partners");
}

export async function deletePartner(fd: FormData): Promise<void> {
  const { supabase } = await requireStaff();
  await supabase.from("partners").delete().eq("id", Number(fd.get("id")));
  revalidatePath("/admin/partners");
}

/* ---------------------------------- jobs ---------------------------------- */

export async function saveJob(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const { supabase } = await requireStaff();
    const id = fd.get("id") ? Number(fd.get("id")) : null;
    const row = {
      title: collectLocalized(fd, "title"),
      department: String(fd.get("department") ?? ""),
      location: String(fd.get("location") ?? ""),
      employment_type: String(fd.get("employment_type") ?? "full_time"),
      description: collectLocalized(fd, "description"),
      responsibilities: collectLocalizedList(fd, "responsibilities"),
      requirements: collectLocalizedList(fd, "requirements"),
      application_deadline: String(fd.get("application_deadline") ?? "") || null,
      is_published: bool(fd, "is_published"),
      is_closed: bool(fd, "is_closed")
    };
    const { error } = id
      ? await supabase.from("jobs").update(row).eq("id", id)
      : await supabase.from("jobs").insert(row);
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  redirect("/admin/careers");
}

export async function deleteJob(fd: FormData): Promise<void> {
  const { supabase } = await requireStaff();
  await supabase.from("jobs").delete().eq("id", Number(fd.get("id")));
  revalidatePath("/admin/careers");
}

/* --------------------------- inbound requests ----------------------------- */

const INQUIRY_STATUSES = ["new", "read", "contacted", "archived"] as const;
const QUOTE_STATUSES = ["new", "reviewing", "contacted", "quoted", "won", "closed"] as const;
const CONSULTATION_STATUSES = ["pending", "approved", "rejected", "rescheduled", "completed"] as const;
const APPLICATION_STATUSES = ["new", "reviewing", "shortlisted", "rejected", "hired"] as const;

export async function updateInquiryStatus(fd: FormData): Promise<void> {
  const status = String(fd.get("status"));
  if (!INQUIRY_STATUSES.includes(status as never)) return;
  const { supabase } = await requireStaff();
  await supabase.from("contact_inquiries").update({ status }).eq("id", Number(fd.get("id")));
  revalidatePath("/admin/inquiries");
}

export async function updateQuoteStatus(fd: FormData): Promise<void> {
  const status = String(fd.get("status"));
  if (!QUOTE_STATUSES.includes(status as never)) return;
  const { supabase } = await requireStaff();
  await supabase
    .from("quote_requests")
    .update({ status, admin_notes: String(fd.get("admin_notes") ?? "") })
    .eq("id", Number(fd.get("id")));
  revalidatePath("/admin/quotes");
}

export async function updateConsultationStatus(fd: FormData): Promise<void> {
  const status = String(fd.get("status"));
  if (!CONSULTATION_STATUSES.includes(status as never)) return;
  const { supabase } = await requireStaff();
  await supabase
    .from("consultation_requests")
    .update({ status, admin_notes: String(fd.get("admin_notes") ?? "") })
    .eq("id", Number(fd.get("id")));
  revalidatePath("/admin/consultations");
}

export async function updateApplicationStatus(fd: FormData): Promise<void> {
  const status = String(fd.get("status"));
  if (!APPLICATION_STATUSES.includes(status as never)) return;
  const { supabase } = await requireStaff();
  await supabase.from("job_applications").update({ status }).eq("id", Number(fd.get("id")));
  revalidatePath("/admin/applications");
}

/* -------------------------------- admin users ------------------------------ */

export async function setUserRole(fd: FormData): Promise<void> {
  const role = String(fd.get("role"));
  if (!["admin", "editor"].includes(role)) return;
  const { supabase } = await requireAdmin();
  await supabase.from("profiles").update({ role }).eq("id", String(fd.get("id")));
  revalidatePath("/admin/users");
}

/* ---------------------------- single-row pages ---------------------------- */

export async function saveCompanyProfile(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    await requireStaff();
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();
    const row = {
      about: collectLocalized(fd, "about"),
      mission: collectLocalized(fd, "mission"),
      vision: collectLocalized(fd, "vision"),
      values: collectLocalized(fd, "values"),
      company_story: collectLocalized(fd, "company_story"),
      company_description: collectLocalized(fd, "company_description"),
      hero_title: collectLocalized(fd, "hero_title"),
      hero_description: collectLocalized(fd, "hero_description"),
      brochure_url: String(fd.get("brochure_url") ?? "") || null
    };
    const { error } = await supabase.from("company_profile").update(row).eq("id", 1);
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/company-profile");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function saveSettings(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    const { role } = await requireStaff();
    if (role !== "admin") throw new Error("FORBIDDEN");
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();
    const row = {
      company_name: String(fd.get("company_name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? "").replace(/[^\d]/g, ""),
      address: String(fd.get("address") ?? ""),
      google_maps_url: String(fd.get("google_maps_url") ?? ""),
      facebook_url: String(fd.get("facebook_url") ?? ""),
      instagram_url: String(fd.get("instagram_url") ?? ""),
      linkedin_url: String(fd.get("linkedin_url") ?? ""),
      youtube_url: String(fd.get("youtube_url") ?? "")
    };
    const { error } = await supabase.from("site_settings").update(row).eq("id", 1);
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function saveSustainability(_prev: ActionState, fd: FormData): Promise<ActionState> {
  try {
    await requireStaff();
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();
    const row = {
      title: collectLocalized(fd, "title"),
      introduction: collectLocalized(fd, "introduction"),
      water_conservation: collectLocalized(fd, "water_conservation"),
      native_plants: collectLocalized(fd, "native_plants"),
      environmental_responsibility: collectLocalized(fd, "environmental_responsibility"),
      eco_friendly_practices: collectLocalized(fd, "eco_friendly_practices"),
      waste_reduction: collectLocalized(fd, "waste_reduction"),
      sustainable_design: collectLocalized(fd, "sustainable_design")
    };
    const { error } = await supabase.from("sustainability_content").update(row).eq("id", 1);
    if (error) throw new Error(error.message);
  } catch (err) {
    return fail(err);
  }
  revalidatePath("/admin/sustainability");
  revalidatePath("/sustainability");
  return { ok: true };
}
