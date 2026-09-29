import { createAdminClient } from "@/lib/supabase/admin";
import {
  OFFICIAL_SERVICES,
  MOCK_PORTFOLIO_PROJECTS,
  MOCK_BLOG_POSTS,
  MOCK_JOB_OPENINGS,
  type ServiceDetail,
  type JobOpening
} from "./company-data";
import type { GalleryProject } from "@/components/portfolio/ProjectGallery";
import type { MockBlogPost } from "@/components/blog/BlogListWithModal";

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  serviceOfInterest?: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SiteStore {
  services: ServiceDetail[];
  projects: GalleryProject[];
  blogPosts: MockBlogPost[];
  jobs: JobOpening[];
  messages: ContactInquiry[];
}

const INITIAL_MESSAGES: ContactInquiry[] = [
  {
    id: "msg-101",
    fullName: "Abebe Kebede",
    organization: "Ministry of Urban Development & Infrastructure",
    email: "abebe.kebede@mudi.gov.et",
    phone: "+251 91 123 4567",
    serviceOfInterest: "Urban Greening and Environmental Services",
    subject: "Sub-city Green Corridor Master Plan Consultation",
    message: "We are developing an ecological master plan for a 15-hectare urban park along the newly expanded roadway in Addis Ababa. We reviewed your documented projects and would like to invite Landscape Solution PLC for an initial technical presentation and site evaluation next Tuesday.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    isRead: false
  },
  {
    id: "msg-102",
    fullName: "Sara Yohannes",
    organization: "Bole Luxury Residence Developers",
    email: "sara.y@boleluxury.com",
    phone: "+251 92 345 6789",
    serviceOfInterest: "Landscape Planning and Design",
    subject: "Terrace Landscape & Biophilic Design Proposal",
    message: "We have a 4-phase premium residential compound in Bole Sub-city requiring sustainable landscaping, water-efficient drip irrigation, and outdoor recreational stone paving. Please provide your portfolio presentation and schedule a site survey.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    isRead: false
  },
  {
    id: "msg-103",
    fullName: "Dawit Tefera",
    organization: "Rift Valley Eco-Resort",
    email: "dawit@riftvalleyresorts.et",
    phone: "+251 93 456 7890",
    serviceOfInterest: "Botanic Garden Development",
    subject: "Indigenous Flora Nursery & Lake Buffer Restoration",
    message: "Our resort is expanding along the lakeshore and we are committed to native plant biodiversity and wetland erosion control. We would like to contract your nursery cultivation and landscape team for 5,000 indigenous trees and shoreline bio-engineering.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    isRead: true
  }
];

// Fallback in-memory cache for ultra-fast response and graceful degradation
let cachedStore: SiteStore = {
  services: JSON.parse(JSON.stringify(OFFICIAL_SERVICES)),
  projects: JSON.parse(JSON.stringify(MOCK_PORTFOLIO_PROJECTS)),
  blogPosts: JSON.parse(JSON.stringify(MOCK_BLOG_POSTS)),
  jobs: JSON.parse(JSON.stringify(MOCK_JOB_OPENINGS)),
  messages: INITIAL_MESSAGES
};

/* ========================================================================= */
/* SERVICES CRUD                                                             */
/* ========================================================================= */

export async function getStoredServices(): Promise<ServiceDetail[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped: ServiceDetail[] = data.map((row: any) => ({
        id: row.id,
        number: String(row.sort_order || 1).padStart(2, "0"),
        title: typeof row.title === "string" ? { en: row.title, am: row.title } : (row.title || { en: "" }),
        slug: row.slug,
        categoryGroup: (row.category_group || "Landscape & Design") as any,
        short_description: typeof row.short_description === "string" ? { en: row.short_description } : (row.short_description || { en: "" }),
        description: typeof row.description === "string" ? { en: row.description } : (row.description || { en: "" }),
        features: Array.isArray(row.features)
          ? row.features.map((f: any) => typeof f === "string" ? { en: f, am: f } : f)
          : [],
        benefits: Array.isArray(row.benefits)
          ? row.benefits.map((b: any) => typeof b === "string" ? { en: b, am: b } : b)
          : [],
        faq: row.faq || [],
        featured_image: row.featured_image || "/images/service_planning.jpg",
        sort_order: row.sort_order ?? 1,
        is_published: row.is_published ?? true,
        is_featured: row.is_featured ?? false,
        seo_title: row.seo_title || null,
        seo_description: row.seo_description || null,
        icon: row.icon || null
      }));
      cachedStore.services = mapped;
      return mapped;
    }
  } catch (err) {
    console.warn("[data-store] Supabase getStoredServices fallback:", err);
  }

  return cachedStore.services;
}

export async function getStoredServiceById(id: string | number): Promise<ServiceDetail | null> {
  try {
    const supabase = createAdminClient();
    let query = supabase.from("services").select("*");
    if (typeof id === "number" || !isNaN(Number(id))) {
      query = query.or(`id.eq.${id},slug.eq.${id}`);
    } else {
      query = query.eq("slug", id);
    }
    const { data, error } = await query.maybeSingle();
    if (!error && data) {
      const row: any = data;
      return {
        id: row.id,
        number: String(row.sort_order || 1).padStart(2, "0"),
        title: typeof row.title === "string" ? { en: row.title, am: row.title } : (row.title || { en: "" }),
        slug: row.slug,
        categoryGroup: (row.category_group || "Landscape & Design") as any,
        short_description: typeof row.short_description === "string" ? { en: row.short_description } : (row.short_description || { en: "" }),
        description: typeof row.description === "string" ? { en: row.description } : (row.description || { en: "" }),
        features: Array.isArray(row.features)
          ? row.features.map((f: any) => typeof f === "string" ? { en: f, am: f } : f)
          : [],
        benefits: Array.isArray(row.benefits)
          ? row.benefits.map((b: any) => typeof b === "string" ? { en: b, am: b } : b)
          : [],
        faq: row.faq || [],
        featured_image: row.featured_image || "/images/service_planning.jpg",
        sort_order: row.sort_order ?? 1,
        is_published: row.is_published ?? true,
        is_featured: row.is_featured ?? false,
        seo_title: row.seo_title || null,
        seo_description: row.seo_description || null,
        icon: row.icon || null
      };
    }
  } catch (err) {
    console.warn("[data-store] Supabase getStoredServiceById fallback:", err);
  }

  return cachedStore.services.find((s) => String(s.id) === String(id) || s.slug === String(id)) ?? null;
}

export async function saveStoredService(
  serviceData: Partial<ServiceDetail> & { title: { en: string; am?: string } }
): Promise<ServiceDetail> {
  const slug =
    serviceData.slug ||
    serviceData.title.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const row = {
    title: serviceData.title,
    slug,
    category_group: serviceData.categoryGroup || "Landscape & Design",
    short_description: serviceData.short_description || { en: "" },
    description: serviceData.description || { en: "" },
    features: serviceData.features || [],
    benefits: serviceData.benefits || [],
    faq: serviceData.faq || [],
    featured_image: serviceData.featured_image || "/images/service_planning.jpg",
    sort_order: serviceData.sort_order ?? 1,
    is_published: serviceData.is_published ?? true,
    is_featured: serviceData.is_featured ?? false,
    seo_title: serviceData.seo_title || null,
    seo_description: serviceData.seo_description || null,
    icon: serviceData.icon || "leaf"
  };

  try {
    const supabase = createAdminClient();
    if (serviceData.id && typeof serviceData.id === "number") {
      const { data } = await supabase.from("services").update(row).eq("id", serviceData.id).select().maybeSingle();
      if (data) {
        return getStoredServiceById(data.id) as any;
      }
    } else {
      const { data } = await supabase.from("services").insert(row).select().maybeSingle();
      if (data) {
        return getStoredServiceById(data.id) as any;
      }
    }
  } catch (err) {
    console.warn("[data-store] Supabase saveStoredService error:", err);
  }

  // Update in-memory fallback cache
  const existingIdx = cachedStore.services.findIndex(
    (s) => (serviceData.id && String(s.id) === String(serviceData.id)) || s.slug === slug
  );
  const updated: ServiceDetail = {
    id: serviceData.id || cachedStore.services.length + 1,
    number: String(cachedStore.services.length + 1).padStart(2, "0"),
    ...row,
    categoryGroup: row.category_group as any
  };
  if (existingIdx >= 0) {
    cachedStore.services[existingIdx] = updated;
  } else {
    cachedStore.services.push(updated);
  }
  return updated;
}

export async function deleteStoredService(id: string | number): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    if (typeof id === "number" || !isNaN(Number(id))) {
      await supabase.from("services").delete().or(`id.eq.${id},slug.eq.${id}`);
    } else {
      await supabase.from("services").delete().eq("slug", id);
    }
  } catch (err) {
    console.warn("[data-store] Supabase deleteStoredService error:", err);
  }

  cachedStore.services = cachedStore.services.filter((s) => String(s.id) !== String(id) && s.slug !== String(id));
  return true;
}

/* ========================================================================= */
/* PORTFOLIO PROJECTS CRUD                                                   */
/* ========================================================================= */

export async function getStoredProjects(): Promise<GalleryProject[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(image_url, alt_text, sort_order)")
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped: GalleryProject[] = data.map((row: any) => {
        const galleryImages = (row.project_images || [])
          .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
          .map((img: any) => ({
            url: img.image_url,
            caption: { en: img.alt_text || row.title?.en || "Project View", am: row.title?.am || img.alt_text }
          }));

        if (galleryImages.length === 0 && row.featured_image) {
          galleryImages.push({
            url: row.featured_image,
            caption: { en: row.title?.en || "Project View", am: row.title?.am }
          });
        }

        return {
          id: String(row.slug || row.id),
          title: typeof row.title === "string" ? { en: row.title, am: row.title } : (row.title || { en: "" }),
          category: {
            en: row.tag || row.category || "Landscape Architecture",
            am: row.category || "የመልክአ ምድር አርክቴክቸር"
          },
          location: row.location || "Addis Ababa, Ethiopia",
          year: row.year || "2026",
          coverImage: row.featured_image || galleryImages[0]?.url || "/images/hero_landscape.jpg",
          galleryImages,
          description: typeof row.description === "string" ? { en: row.description, am: row.description } : (row.description || { en: "" })
        };
      });
      cachedStore.projects = mapped;
      return mapped;
    }
  } catch (err) {
    console.warn("[data-store] Supabase getStoredProjects fallback:", err);
  }

  return cachedStore.projects;
}

export async function getStoredProjectById(id: string): Promise<GalleryProject | null> {
  const projects = await getStoredProjects();
  return projects.find((p) => p.id === id) ?? null;
}

export async function saveStoredProject(
  projectData: Partial<GalleryProject> & { title: { en: string; am?: string } }
): Promise<GalleryProject> {
  const slug =
    projectData.id ||
    projectData.title.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const row = {
    slug,
    title: projectData.title,
    category: projectData.category?.en || "Commercial",
    tag: projectData.category?.en || "Landscape Architecture & Master Planning • Addis Ababa, Ethiopia",
    location: projectData.location || "Addis Ababa, Ethiopia",
    year: projectData.year || new Date().getFullYear().toString(),
    short_description: projectData.description || { en: "" },
    description: projectData.description || { en: "" },
    featured_image: projectData.coverImage || projectData.galleryImages?.[0]?.url || "/images/hero_landscape.jpg",
    is_published: true,
    is_featured: true
  };

  try {
    const supabase = createAdminClient();
    const { data: projectRow } = await supabase
      .from("projects")
      .upsert(row, { onConflict: "slug" })
      .select()
      .maybeSingle();

    if (projectRow && projectData.galleryImages && projectData.galleryImages.length > 0) {
      // Re-insert project images
      await supabase.from("project_images").delete().eq("project_id", projectRow.id);
      const imagesToInsert = projectData.galleryImages.map((img, idx) => ({
        project_id: projectRow.id,
        image_url: img.url,
        alt_text: img.caption?.en || projectData.title.en,
        sort_order: idx + 1
      }));
      await supabase.from("project_images").insert(imagesToInsert);
    }
  } catch (err) {
    console.warn("[data-store] Supabase saveStoredProject error:", err);
  }

  const existingIdx = cachedStore.projects.findIndex((p) => p.id === slug);
  const updated: GalleryProject = {
    id: slug,
    title: projectData.title,
    category: projectData.category || { en: "Landscape Architecture", am: "የመልክአ ምድር አርክቴክቸር" },
    location: projectData.location || "Addis Ababa, Ethiopia",
    year: projectData.year || "2026",
    coverImage: row.featured_image,
    galleryImages: projectData.galleryImages || [{ url: row.featured_image, caption: projectData.title }],
    description: projectData.description || { en: "", am: "" }
  };
  if (existingIdx >= 0) {
    cachedStore.projects[existingIdx] = updated;
  } else {
    cachedStore.projects.push(updated);
  }
  return updated;
}

export async function deleteStoredProject(id: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    await supabase.from("projects").delete().or(`slug.eq.${id},id.eq.${isNaN(Number(id)) ? -1 : Number(id)}`);
  } catch (err) {
    console.warn("[data-store] Supabase deleteStoredProject error:", err);
  }
  cachedStore.projects = cachedStore.projects.filter((p) => p.id !== id);
  return true;
}

/* ========================================================================= */
/* BLOG POSTS CRUD                                                           */
/* ========================================================================= */

export async function getStoredBlogPosts(): Promise<MockBlogPost[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*, blog_categories(name)")
      .order("published_at", { ascending: false });

    if (!error && data && data.length > 0) {
      const mapped: MockBlogPost[] = data.map((row: any) => ({
        id: String(row.slug || row.id),
        slug: row.slug,
        title: typeof row.title === "string" ? { en: row.title, am: row.title } : (row.title || { en: "" }),
        category: {
          en: row.blog_categories?.name?.en || "Urban Ecology & Architecture",
          am: row.blog_categories?.name?.am || "የከተማ ስነ-ምህዳር"
        },
        date: row.published_at ? new Date(row.published_at).toISOString().split("T")[0] : "2026-03-24",
        readTime: row.reading_time || "4 min read",
        author: row.author_name || "Landscape Solution PLC Editorial Team",
        image: row.featured_image || "/images/service_planning.jpg",
        excerpt: typeof row.excerpt === "string" ? { en: row.excerpt, am: row.excerpt } : (row.excerpt || { en: "" }),
        content: {
          en: {
            paragraphs: typeof row.body === "string" ? [row.body] : (row.body?.en ? [row.body.en] : []),
            takeaways: []
          },
          am: {
            paragraphs: row.body?.am ? [row.body.am] : [],
            takeaways: []
          }
        }
      }));
      cachedStore.blogPosts = mapped;
      return mapped;
    }
  } catch (err) {
    console.warn("[data-store] Supabase getStoredBlogPosts fallback:", err);
  }

  return cachedStore.blogPosts;
}

export async function getStoredBlogPostById(id: string): Promise<MockBlogPost | null> {
  const posts = await getStoredBlogPosts();
  return posts.find((p) => p.id === id || p.slug === id) ?? null;
}

export async function saveStoredBlogPost(
  postData: Partial<MockBlogPost> & { title: { en: string; am?: string } }
): Promise<MockBlogPost> {
  const slug =
    postData.slug ||
    postData.title.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const bodyEn = postData.content?.en?.paragraphs?.join("\n\n") || "";
  const bodyAm = postData.content?.am?.paragraphs?.join("\n\n") || bodyEn;

  const row = {
    slug,
    title: postData.title,
    excerpt: postData.excerpt || { en: "", am: "" },
    body: { en: bodyEn, am: bodyAm },
    featured_image: postData.image || "/images/service_planning.jpg",
    author_name: postData.author || "Landscape Solution PLC",
    reading_time: postData.readTime || "4 min read",
    is_published: true,
    is_featured: false
  };

  try {
    const supabase = createAdminClient();
    await supabase.from("blog_posts").upsert(row, { onConflict: "slug" });
  } catch (err) {
    console.warn("[data-store] Supabase saveStoredBlogPost error:", err);
  }

  const existingIdx = cachedStore.blogPosts.findIndex((p) => p.slug === slug || p.id === slug);
  const updated: MockBlogPost = {
    id: slug,
    slug,
    title: postData.title,
    category: postData.category || { en: "Landscape Architecture", am: "የመልክአ ምድር አርክቴክቸር" },
    date: postData.date || new Date().toISOString().split("T")[0],
    readTime: postData.readTime || "4 min read",
    author: postData.author || "Landscape Solution PLC",
    image: row.featured_image,
    excerpt: postData.excerpt || { en: "", am: "" },
    content: postData.content || { en: { paragraphs: [bodyEn], takeaways: [] }, am: { paragraphs: [bodyAm], takeaways: [] } }
  };

  if (existingIdx >= 0) {
    cachedStore.blogPosts[existingIdx] = updated;
  } else {
    cachedStore.blogPosts.push(updated);
  }
  return updated;
}

export async function deleteStoredBlogPost(id: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    await supabase.from("blog_posts").delete().or(`slug.eq.${id},id.eq.${isNaN(Number(id)) ? -1 : Number(id)}`);
  } catch (err) {
    console.warn("[data-store] Supabase deleteStoredBlogPost error:", err);
  }
  cachedStore.blogPosts = cachedStore.blogPosts.filter((p) => p.id !== id && p.slug !== id);
  return true;
}

/* ========================================================================= */
/* CAREER JOBS CRUD                                                          */
/* ========================================================================= */

export async function getStoredJobs(): Promise<JobOpening[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_published", true)
      .eq("is_closed", false)
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      const mapped: JobOpening[] = data.map((row: any) => ({
        id: String(row.slug || row.id),
        title: typeof row.title === "string" ? { en: row.title, am: row.title } : (row.title || { en: "" }),
        department: typeof row.department === "string" ? { en: row.department, am: row.department } : (row.department || { en: "Horticulture & Architecture", am: "ሆርቲካልቸር እና አርክቴክቸር" }),
        location: typeof row.location === "string" ? { en: row.location, am: row.location } : (row.location || { en: "Addis Ababa, Ethiopia", am: "አዲስ አበባ፣ ኢትዮጵያ" }),
        type: typeof row.employment_type === "string" ? { en: row.employment_type, am: row.employment_type } : (row.employment_type || { en: "Full-Time", am: "ሙሉ ጊዜ" }),
        experience: typeof row.experience_level === "string" ? { en: row.experience_level, am: row.experience_level } : (row.experience_level || { en: "3+ Years", am: "3+ ዓመታት" }),
        postedDate: row.created_at ? new Date(row.created_at).toISOString().split("T")[0] : "2026-03-24",
        deadline: row.deadline || "Open until filled",
        salary: { en: "Competitive corporate compensation", am: "ተወዳዳሪ የድርጅት ደመወዝ" },
        summary: typeof row.description === "string" ? { en: row.description, am: row.description } : (row.description || { en: "", am: "" }),
        responsibilities: {
          en: Array.isArray(row.responsibilities) ? row.responsibilities : [],
          am: []
        },
        requirements: {
          en: Array.isArray(row.requirements) ? row.requirements : [],
          am: []
        }
      }));
      cachedStore.jobs = mapped;
      return mapped;
    }
  } catch (err) {
    console.warn("[data-store] Supabase getStoredJobs fallback:", err);
  }

  return cachedStore.jobs;
}

export async function getStoredJobById(id: string): Promise<JobOpening | null> {
  const jobs = await getStoredJobs();
  return jobs.find((j) => j.id === id) ?? null;
}

export async function saveStoredJob(
  jobData: Partial<JobOpening> & { title: { en: string; am?: string } }
): Promise<JobOpening> {
  const slug =
    jobData.id ||
    jobData.title.en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const row = {
    slug,
    title: jobData.title,
    department: jobData.department?.en || "Design & Master Planning",
    location: jobData.location?.en || "Addis Ababa, Ethiopia",
    employment_type: jobData.type?.en || "Full-Time",
    experience_level: jobData.experience?.en || "3+ Years",
    description: jobData.summary || { en: "" },
    responsibilities: jobData.responsibilities?.en || [],
    requirements: jobData.requirements?.en || [],
    is_published: true,
    is_closed: false
  };

  try {
    const supabase = createAdminClient();
    await supabase.from("jobs").upsert(row, { onConflict: "slug" });
  } catch (err) {
    console.warn("[data-store] Supabase saveStoredJob error:", err);
  }

  const existingIdx = cachedStore.jobs.findIndex((j) => j.id === slug);
  const updated: JobOpening = {
    id: slug,
    title: jobData.title,
    department: jobData.department || { en: row.department, am: row.department },
    location: jobData.location || { en: row.location, am: row.location },
    type: jobData.type || { en: row.employment_type, am: row.employment_type },
    experience: jobData.experience || { en: row.experience_level, am: row.experience_level },
    postedDate: jobData.postedDate || new Date().toISOString().split("T")[0],
    deadline: jobData.deadline || "Open until filled",
    salary: jobData.salary || { en: "Competitive", am: "ተወዳዳሪ" },
    summary: jobData.summary || { en: "", am: "" },
    responsibilities: jobData.responsibilities || { en: [], am: [] },
    requirements: jobData.requirements || { en: [], am: [] }
  };

  if (existingIdx >= 0) {
    cachedStore.jobs[existingIdx] = updated;
  } else {
    cachedStore.jobs.push(updated);
  }
  return updated;
}

export async function deleteStoredJob(id: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    await supabase.from("jobs").delete().or(`slug.eq.${id},id.eq.${isNaN(Number(id)) ? -1 : Number(id)}`);
  } catch (err) {
    console.warn("[data-store] Supabase deleteStoredJob error:", err);
  }
  cachedStore.jobs = cachedStore.jobs.filter((j) => j.id !== id);
  return true;
}

/* ========================================================================= */
/* INBOX MESSAGES CRUD                                                       */
/* ========================================================================= */

export async function getStoredMessages(): Promise<ContactInquiry[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("contact_inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      const mapped: ContactInquiry[] = data.map((row: any) => ({
        id: String(row.id),
        fullName: row.full_name,
        email: row.email,
        phone: row.phone || undefined,
        organization: row.organization || undefined,
        serviceOfInterest: row.service_of_interest || undefined,
        subject: row.subject,
        message: row.message,
        createdAt: row.created_at,
        isRead: Boolean(row.is_read || row.status === "read" || row.status === "contacted")
      }));
      cachedStore.messages = mapped;
      return mapped;
    }
  } catch (err) {
    console.warn("[data-store] Supabase getStoredMessages fallback:", err);
  }

  return cachedStore.messages;
}

export async function addStoredMessage(
  msg: Omit<ContactInquiry, "id" | "createdAt" | "isRead">
): Promise<ContactInquiry> {
  const newMsg: ContactInquiry = {
    id: `msg-${Date.now()}`,
    ...msg,
    createdAt: new Date().toISOString(),
    isRead: false
  };

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("contact_inquiries")
      .insert({
        full_name: msg.fullName,
        email: msg.email,
        phone: msg.phone || null,
        organization: msg.organization || null,
        service_of_interest: msg.serviceOfInterest || null,
        subject: msg.subject,
        message: msg.message,
        status: "new",
        is_read: false
      })
      .select()
      .maybeSingle();

    if (data) {
      newMsg.id = String(data.id);
    }
  } catch (err) {
    console.warn("[data-store] Supabase addStoredMessage error:", err);
  }

  cachedStore.messages.unshift(newMsg);
  return newMsg;
}

export async function toggleStoredMessageRead(id: string, explicitState?: boolean): Promise<boolean> {
  const currentMsg = cachedStore.messages.find((m) => m.id === id);
  const nextReadState = explicitState !== undefined ? explicitState : (currentMsg ? !currentMsg.isRead : true);

  try {
    const supabase = createAdminClient();
    await supabase
      .from("contact_inquiries")
      .update({
        is_read: nextReadState,
        status: nextReadState ? "read" : "new"
      })
      .eq("id", isNaN(Number(id)) ? -1 : Number(id));
  } catch (err) {
    console.warn("[data-store] Supabase toggleStoredMessageRead error:", err);
  }

  if (currentMsg) {
    currentMsg.isRead = nextReadState;
  }
  return nextReadState;
}

export async function deleteStoredMessage(id: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    await supabase.from("contact_inquiries").delete().eq("id", isNaN(Number(id)) ? -1 : Number(id));
  } catch (err) {
    console.warn("[data-store] Supabase deleteStoredMessage error:", err);
  }

  cachedStore.messages = cachedStore.messages.filter((m) => m.id !== id);
  return true;
}

/* ========================================================================= */
/* DASHBOARD STATS                                                           */
/* ========================================================================= */

export async function getDashboardStats(): Promise<{
  servicesCount: number;
  projectsCount: number;
  blogCount: number;
  jobsCount: number;
  totalMessagesCount: number;
  unreadMessagesCount: number;
}> {
  const [services, projects, blogs, jobs, messages] = await Promise.all([
    getStoredServices(),
    getStoredProjects(),
    getStoredBlogPosts(),
    getStoredJobs(),
    getStoredMessages()
  ]);

  return {
    servicesCount: services.length,
    projectsCount: projects.length,
    blogCount: blogs.length,
    jobsCount: jobs.length,
    totalMessagesCount: messages.length,
    unreadMessagesCount: messages.filter((m) => !m.isRead).length
  };
}

