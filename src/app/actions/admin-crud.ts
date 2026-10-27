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
import { createAdminClient } from "@/lib/supabase/admin";

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

export async function updateConsultationAction(id: number, status: string, adminNotes: string = "") {
  try {
    const admin = createAdminClient();
    await admin
      .from("consultation_requests")
      .update({ status, admin_notes: adminNotes })
      .eq("id", id);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/consultations");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteConsultationAction(id: number) {
  try {
    const admin = createAdminClient();
    await admin.from("consultation_requests").delete().eq("id", id);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/consultations");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateQuoteAction(id: number, status: string, adminNotes: string = "") {
  try {
    const admin = createAdminClient();
    await admin
      .from("quote_requests")
      .update({ status, admin_notes: adminNotes })
      .eq("id", id);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/quotes");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteQuoteAction(id: number) {
  try {
    const admin = createAdminClient();
    await admin.from("quote_requests").delete().eq("id", id);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/quotes");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateApplicationStatusAction(id: number, status: string) {
  try {
    const admin = createAdminClient();
    await admin.from("job_applications").update({ status }).eq("id", id);
    revalidatePath("/admin/careers");
    revalidatePath("/admin/applications");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteApplicationAction(id: number) {
  try {
    const admin = createAdminClient();
    await admin.from("job_applications").delete().eq("id", id);
    revalidatePath("/admin/careers");
    revalidatePath("/admin/applications");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}



/* ========================================================================= */
/* MEDIA & IMAGE STORAGE ACTIONS                                             */
/* ========================================================================= */

export async function uploadImageAction(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File | null;
    const bucket = String(formData.get("bucket") || "general-media").trim();

    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, error: "Please select an image file to upload." };
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: "File exceeds 10MB maximum limit." };
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const base = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const fileName = `${Date.now()}_${base}.${ext}`;

    const admin = createAdminClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await admin.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true
      });

    if (uploadError) {
      console.error("[uploadImageAction] Storage upload error:", uploadError);
      return { success: false, error: uploadError.message };
    }

    const { data: publicUrlData } = admin.storage
      .from(bucket)
      .getPublicUrl(fileName);

    revalidatePath("/admin/media");
    return { success: true, url: publicUrlData.publicUrl };
  } catch (err: any) {
    console.error("[uploadImageAction] Unexpected upload exception:", err);
    return { success: false, error: err.message || "Failed to upload image." };
  }
}

export async function listBucketImagesAction(bucket: string = "general-media") {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage.from(bucket).list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" }
    });

    if (error) {
      return { success: false, error: error.message, files: [] };
    }

    const files = (data || [])
      .filter((item) => !item.name.startsWith("."))
      .map((item) => {
        const { data: pubData } = admin.storage.from(bucket).getPublicUrl(item.name);
        return {
          name: item.name,
          id: item.id,
          createdAt: item.created_at,
          size: item.metadata?.size || 0,
          url: pubData.publicUrl
        };
      });

    return { success: true, files };
  } catch (err: any) {
    return { success: false, error: err.message, files: [] };
  }
}

export async function deleteMediaFileAction(
  bucket?: string,
  fileName?: string,
  fullUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = createAdminClient();

    let targetBucket = bucket || "";
    let targetFileName = fileName || "";

    if (fullUrl) {
      const cleanUrl = fullUrl.split("?")[0];
      const match = cleanUrl.match(/\/storage\/v1\/object\/(?:public\/)?([^/]+)\/(.+)$/);
      if (match) {
        if (!targetBucket) targetBucket = match[1];
        // The path in bucket from URL is the exact key in storage
        targetFileName = decodeURIComponent(match[2]);
      }
    }

    if (!targetBucket || !targetFileName) {
      return { success: false, error: "Cannot determine storage bucket and file name for deletion." };
    }

    const { error } = await admin.storage.from(targetBucket).remove([targetFileName]);
    if (error) {
      console.error("[deleteMediaFileAction] Storage remove error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/media");
    return { success: true };
  } catch (err: any) {
    console.error("[deleteMediaFileAction] Unexpected error:", err);
    return { success: false, error: err.message || "Failed to delete file from storage." };
  }
}


export async function updateSiteKeyAssetAction(
  slotKey: string,
  newUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = createAdminClient();
    const updatePayload: Record<string, any> = { [slotKey]: newUrl, updated_at: new Date().toISOString() };
    await admin.from("site_settings").upsert({ id: 1, ...updatePayload }, { onConflict: "id" });

    revalidatePath("/admin/media");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/sustainability");
    revalidatePath("/contact");
    revalidatePath("/portfolio");
    revalidatePath("/services");
    return { success: true };
  } catch (err: any) {
    console.error("[updateSiteKeyAssetAction] Error:", err);
    return { success: false, error: err.message || "Failed to update asset." };
  }
}

export async function updateContactSettingsAction(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const phone = String(formData.get("phone") ?? "").trim();
    const alt_phone = String(formData.get("alt_phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const google_maps_url = String(formData.get("google_maps_url") ?? "").trim();
    const whatsapp = String(formData.get("whatsapp") ?? "").trim();
    const instagram_url = String(formData.get("instagram_url") ?? "").trim();
    const tiktok_url = String(formData.get("tiktok_url") ?? "").trim();
    const facebook_url = String(formData.get("facebook_url") ?? "").trim();
    const telegram_url = String(formData.get("telegram_url") ?? "").trim();
    const linkedin_url = String(formData.get("linkedin_url") ?? "").trim();
    const youtube_url = String(formData.get("youtube_url") ?? "").trim();

    const admin = createAdminClient();
    await admin.from("site_settings").upsert(
      {
        id: 1,
        phone,
        alt_phone,
        email,
        address,
        google_maps_url,
        whatsapp,
        instagram_url,
        tiktok_url,
        facebook_url,
        telegram_url,
        linkedin_url,
        youtube_url,
        updated_at: new Date().toISOString()
      },
      { onConflict: "id" }
    );

    revalidatePath("/admin/contact");
    revalidatePath("/admin/settings");
    revalidatePath("/contact");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("[updateContactSettingsAction] Error:", err);
    return { success: false, error: err.message || "Failed to save contact settings." };
  }
}

/* ========================================================================= */
/* HOMEPAGE & ABOUT PAGE SECTION-BY-SECTION ACTIONS                          */
/* ========================================================================= */

export async function saveHomePageAction(
  payload: any
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    const admin = createAdminClient();

    // 1. Update company_profile row 1
    const profileRow = {
      id: 1,
      hero_title: payload.hero?.headline || { en: "Professional Landscape Architecture for a Greener Future", am: "" },
      hero_description: payload.hero?.description || { en: "", am: "" },
      company_description: payload.hero?.description || { en: "", am: "" },
      about: payload.who_we_are || {},
      company_story: { home_content: payload },
      updated_at: new Date().toISOString()
    };

    const { error: profileErr } = await admin
      .from("company_profile")
      .upsert(profileRow, { onConflict: "id" });

    if (profileErr) throw new Error(profileErr.message);

    // 2. Sync hero_image and who_we_are image to site_settings
    const settingsUpdate: Record<string, any> = { id: 1, updated_at: new Date().toISOString() };
    if (payload.hero?.hero_image) {
      settingsUpdate.hero_slide_1 = payload.hero.hero_image;
    }
    if (payload.who_we_are?.image) {
      settingsUpdate.about_image = payload.who_we_are.image;
    }

    await admin.from("site_settings").upsert(settingsUpdate, { onConflict: "id" });

    revalidatePath("/admin/home");
    revalidatePath("/admin/media");
    revalidatePath("/admin/about");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidatePath("/about");

    return { success: true, message: "Homepage sections successfully saved!" };
  } catch (err: any) {
    console.error("[saveHomePageAction] Error:", err);
    return { success: false, error: err.message || "Failed to save homepage sections." };
  }
}

export async function saveAboutPageAction(
  payload: any
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    const admin = createAdminClient();

    // 1. Update company_profile row 1 with all structured sections
    const profileRow = {
      id: 1,
      hero_title: payload.hero?.title || {},
      hero_description: payload.hero?.description || {},
      vision: payload.vision_mission?.vision || {},
      mission: payload.vision_mission?.mission || {},
      values: payload.values_section?.items || [],
      company_story: {
        en: payload.background_context?.quote?.en || "",
        am: payload.background_context?.quote?.am || "",
        about_content: payload
      },
      about: {
        en: payload.background_context?.p1?.en || "",
        am: payload.background_context?.p1?.am || "",
        p1: payload.background_context?.p1,
        p2: payload.background_context?.p2,
        full_about_content: payload
      },
      company_description: payload.background_context?.p2 || payload.hero?.description || {},
      brochure_url: payload.background_context?.brochure_url || "/downloads/landscape_solution_profile.pdf",
      updated_at: new Date().toISOString()
    };

    const { error: profileErr } = await admin
      .from("company_profile")
      .upsert(profileRow, { onConflict: "id" });

    if (profileErr) throw new Error(profileErr.message);

    // 2. Sync images & brochure_url to site_settings
    const settingsUpdate: Record<string, any> = { id: 1, updated_at: new Date().toISOString() };
    if (payload.background_context?.image) settingsUpdate.about_image = payload.background_context.image;
    if (payload.hero?.image) settingsUpdate.hero_slide_2 = payload.hero.image;
    if (payload.background_context?.brochure_url) settingsUpdate.brochure_url = payload.background_context.brochure_url;

    await admin.from("site_settings").upsert(settingsUpdate, { onConflict: "id" });

    revalidatePath("/admin/about");
    revalidatePath("/admin/media");
    revalidatePath("/about");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return { success: true, message: "All About page sections successfully saved!" };
  } catch (err: any) {
    console.error("[saveAboutPageAction] Error:", err);
    return { success: false, error: err.message || "Failed to save About page." };
  }
}

export async function saveSustainabilityPageAction(
  payload: any
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    const admin = createAdminClient();

    // 1. Update sustainability_content row 1 with all structured sections
    const sustainabilityRow = {
      id: 1,
      title: payload.hero?.title || {},
      introduction: {
        en: payload.national_context?.p1?.en || "",
        am: payload.national_context?.p1?.am || "",
        p1: payload.national_context?.p1,
        p2: payload.national_context?.p2,
        full_content: payload
      },
      water_conservation: payload.pillars_section?.pillars?.[0]?.desc || {},
      native_plants: payload.pillars_section?.pillars?.[1]?.desc || {},
      environmental_responsibility: payload.pillars_section?.pillars?.[2]?.desc || {},
      eco_friendly_practices: payload.pillars_section?.pillars?.[3]?.desc || {},
      waste_reduction: payload.pillars_section?.pillars?.[4]?.desc || {},
      sustainable_design: payload.pillars_section?.pillars?.[5]?.desc || {},
      statistics: payload.national_context?.statistics || [],
      initiatives: payload.initiatives_section?.items || [],
      updated_at: new Date().toISOString()
    };

    const { error: sErr } = await admin
      .from("sustainability_content")
      .upsert(sustainabilityRow, { onConflict: "id" });

    if (sErr) throw new Error(sErr.message);

    // 2. Sync hero banner image to site_settings
    if (payload.hero?.image) {
      await admin.from("site_settings").upsert(
        { id: 1, sustainability_image: payload.hero.image, updated_at: new Date().toISOString() },
        { onConflict: "id" }
      );
    }

    revalidatePath("/admin/sustainability");
    revalidatePath("/admin/media");
    revalidatePath("/sustainability");
    revalidatePath("/");
    revalidatePath("/", "layout");

    return { success: true, message: "All Sustainability page sections successfully saved!" };
  } catch (err: any) {
    console.error("[saveSustainabilityPageAction] Error:", err);
    return { success: false, error: err.message || "Failed to save Sustainability page." };
  }
}



