"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  saveStoredService,
  deleteStoredService,
  saveStoredProject,
  deleteStoredProject,
  saveStoredBlogPost,
  deleteStoredBlogPost,
  saveStoredJob,
  deleteStoredJob,
  toggleStoredMessageRead,
  deleteStoredMessage
} from "@/lib/data-store";

/* ========================================================================= */
/* SERVICES ACTIONS                                                          */
/* ========================================================================= */

export async function saveServiceAction(formData: FormData) {
  const rawId = formData.get("id");
  const id = rawId ? Number(rawId) : undefined;
  const title_en = String(formData.get("title_en") ?? "").trim();
  const title_am = String(formData.get("title_am") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const categoryGroup = (String(formData.get("categoryGroup") ?? "Landscape & Design")) as
    | "Landscape & Design"
    | "Plants & Gardens"
    | "Water & Environment"
    | "Professional Services";
  const featured_image = String(formData.get("featured_image") ?? "/images/service_planning.jpg").trim();
  const shortDescription_en = String(formData.get("shortDescription_en") ?? "").trim();
  const shortDescription_am = String(formData.get("shortDescription_am") ?? "").trim();
  const description_en = String(formData.get("description_en") ?? "").trim();
  const description_am = String(formData.get("description_am") ?? "").trim();
  
  let keyCapabilities: { en: string; am?: string }[] = [];
  try {
    const rawCaps = String(formData.get("keyCapabilities") ?? "[]");
    const parsed = JSON.parse(rawCaps);
    if (Array.isArray(parsed)) {
      keyCapabilities = parsed.map((item) => {
        if (typeof item === "string") return { en: item, am: item };
        return { en: item.en || "", am: item.am || item.en || "" };
      });
    }
  } catch {
    keyCapabilities = [];
  }

  const is_published = formData.get("is_published") === "true" || formData.get("is_published") === "on";
  const is_featured = formData.get("is_featured") === "true" || formData.get("is_featured") === "on";
  const sort_order = Number(formData.get("sort_order") ?? 0) || 1;

  if (!title_en) {
    throw new Error("English service title is required");
  }

  await saveStoredService({
    id,
    title: { en: title_en, am: title_am || title_en },
    slug: slug || undefined,
    categoryGroup,
    featured_image,
    short_description: { en: shortDescription_en, am: shortDescription_am || shortDescription_en },
    description: { en: description_en, am: description_am || description_en },
    features: keyCapabilities,
    is_published,
    is_featured,
    sort_order
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteServiceAction(id: string) {
  await deleteStoredService(id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { success: true };
}

/* ========================================================================= */
/* PORTFOLIO PROJECTS ACTIONS                                                */
/* ========================================================================= */

export async function saveProjectAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const title_am = String(formData.get("title_am") ?? "").trim();
  const tag = String(formData.get("tag") ?? "Landscape Architecture & Master Planning • Addis Ababa, Ethiopia").trim();
  const location = String(formData.get("location") ?? "Addis Ababa, Ethiopia").trim();
  const year = String(formData.get("year") ?? new Date().getFullYear().toString()).trim();
  const description_en = String(formData.get("description_en") ?? "").trim();
  const description_am = String(formData.get("description_am") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "/images/hero_landscape.jpg").trim();

  let galleryImages: { url: string; caption: { en: string; am: string } }[] = [];
  try {
    const rawImages = String(formData.get("galleryImages") ?? "[]");
    const parsed = JSON.parse(rawImages);
    if (Array.isArray(parsed) && parsed.length > 0) {
      galleryImages = parsed.map((item) => {
        if (typeof item === "string") {
          return { url: item, caption: { en: title_en, am: title_am || title_en } };
        }
        return {
          url: item.url || "/images/hero_landscape.jpg",
          caption: {
            en: item.caption?.en || title_en,
            am: item.caption?.am || title_am || title_en
          }
        };
      });
    }
  } catch {
    galleryImages = [];
  }

  // Ensure coverImage is always part of gallery images (as first item)
  if (galleryImages.length === 0 && coverImage) {
    galleryImages = [{ url: coverImage, caption: { en: title_en, am: title_am || title_en } }];
  } else if (galleryImages.length > 0 && !galleryImages.some(g => g.url === coverImage)) {
    galleryImages.unshift({ url: coverImage, caption: { en: title_en, am: title_am || title_en } });
  }

  if (!title_en) {
    throw new Error("Project title is required");
  }

  // Parse category tag from the tag string
  const category_en = tag.includes("•") ? tag.split("•")[0].trim() : tag;

  await saveStoredProject({
    id: id || undefined,
    title: { en: title_en, am: title_am || title_en },
    category: { en: category_en, am: title_am || category_en },
    location,
    year,
    description: { en: description_en, am: description_am || description_en },
    coverImage,
    galleryImages
  });

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  await deleteStoredProject(id);
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  return { success: true };
}

/* ========================================================================= */
/* BLOG POST ACTIONS                                                         */
/* ========================================================================= */

export async function saveBlogAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const title_am = String(formData.get("title_am") ?? "").trim();
  const category_en = String(formData.get("category_en") ?? "Landscape Architecture").trim();
  const category_am = String(formData.get("category_am") ?? "").trim();
  const author = String(formData.get("author") ?? "Landscape Solution PLC Editorial Team").trim();
  const date = String(formData.get("date") ?? new Date().toISOString().split("T")[0]).trim();
  const readTime = String(formData.get("readTime") ?? "5 min read").trim();
  const image = String(formData.get("image") ?? "/images/service_planning.jpg").trim();
  const excerpt_en = String(formData.get("excerpt_en") ?? "").trim();
  const excerpt_am = String(formData.get("excerpt_am") ?? "").trim();

  // Paragraphs
  const paragraphs_en = String(formData.get("paragraphs_en") ?? "")
    .split("\n\n")
    .map(p => p.trim())
    .filter(Boolean);
  const paragraphs_am = String(formData.get("paragraphs_am") ?? "")
    .split("\n\n")
    .map(p => p.trim())
    .filter(Boolean);

  // Takeaways
  let takeaways_en: string[] = [];
  try {
    const rawTakeaways = String(formData.get("takeaways_en") ?? "[]");
    const parsed = JSON.parse(rawTakeaways);
    if (Array.isArray(parsed)) takeaways_en = parsed.filter(Boolean);
  } catch {
    takeaways_en = [];
  }

  if (!title_en) {
    throw new Error("Article title is required");
  }

  await saveStoredBlogPost({
    id: id || undefined,
    slug: slug || undefined,
    title: { en: title_en, am: title_am || title_en },
    category: { en: category_en, am: category_am || category_en },
    author,
    date,
    readTime,
    image,
    excerpt: { en: excerpt_en, am: excerpt_am || excerpt_en },
    content: {
      en: { paragraphs: paragraphs_en.length > 0 ? paragraphs_en : [excerpt_en], takeaways: takeaways_en },
      am: { paragraphs: paragraphs_am.length > 0 ? paragraphs_am : [excerpt_am || excerpt_en], takeaways: takeaways_en }
    }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogAction(id: string) {
  await deleteStoredBlogPost(id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

/* ========================================================================= */
/* CAREER ACTIONS                                                            */
/* ========================================================================= */

export async function saveJobAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const title_am = String(formData.get("title_am") ?? "").trim();
  const department_en = String(formData.get("department_en") ?? "Operations & Construction").trim();
  const department_am = String(formData.get("department_am") ?? "").trim();
  const location = String(formData.get("location") ?? "Addis Ababa, Ethiopia").trim();
  const type = String(formData.get("type") ?? "Full-time").trim();
  const deadline = String(formData.get("deadline") ?? "Open until filled").trim();
  const summary_en = String(formData.get("summary_en") ?? "").trim();
  const summary_am = String(formData.get("summary_am") ?? "").trim();

  let responsibilities: string[] = [];
  try {
    const rawResp = String(formData.get("responsibilities") ?? "[]");
    const parsed = JSON.parse(rawResp);
    if (Array.isArray(parsed)) responsibilities = parsed.filter(Boolean);
  } catch {
    responsibilities = [];
  }

  let requirements: string[] = [];
  try {
    const rawReq = String(formData.get("requirements") ?? "[]");
    const parsed = JSON.parse(rawReq);
    if (Array.isArray(parsed)) requirements = parsed.filter(Boolean);
  } catch {
    requirements = [];
  }

  if (!title_en) {
    throw new Error("Job title is required");
  }

  await saveStoredJob({
    id: id || undefined,
    title: { en: title_en, am: title_am || title_en },
    department: { en: department_en, am: department_am || department_en },
    location: { en: location, am: location },
    type: { en: type, am: type },
    experience: { en: "3+ years", am: "3+ ዓመታት" },
    postedDate: new Date().toISOString().split("T")[0],
    salary: { en: "Competitive & Negotiable", am: "ማራኪ እና በስምምነት" },
    deadline,
    summary: { en: summary_en, am: summary_am || summary_en },
    responsibilities: { en: responsibilities, am: responsibilities },
    requirements: { en: requirements, am: requirements }
  });

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  redirect("/admin/careers");
}

export async function deleteJobAction(id: string) {
  await deleteStoredJob(id);
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}

/* ========================================================================= */
/* CONTACT MESSAGE ACTIONS                                                   */
/* ========================================================================= */

export async function toggleMessageReadAction(id: string, isRead?: boolean) {
  const result = await toggleStoredMessageRead(id, isRead);
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { success: true, message: result };
}

export async function deleteMessageAction(id: string) {
  await deleteStoredMessage(id);
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { success: true };
}
