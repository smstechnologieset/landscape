import { createClient } from "@/lib/supabase/server";

if (
  process.env.NODE_ENV !== "production" &&
  (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
) {
  console.warn(
    "[queries] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. " +
      "Create .env.local from .env.example and fill them from your Supabase project API settings. " +
      "All queries will return empty until this is configured."
  );
}
import type {
  BlogCategory,
  BlogPost,
  CompanyProfile,
  Job,
  Partner,
  Project,
  Service,
  SiteSettings,
  SustainabilityContent,
  Testimonial
} from "@/lib/types";

/** Public site data helpers.
 * All queries run with the anon key + RLS, so only published rows return.
 * Failures degrade gracefully to empty results so the site still renders
 * when the database is unreachable (e.g. during CI builds).
 */

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[queries] Supabase query failed:", (err as Error)?.message ?? err);
    }
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select(
        "id,company_name,phone,email,whatsapp,address,google_maps_url,facebook_url,instagram_url,linkedin_url,youtube_url,default_language,logo_url,favicon_url"
      )
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return data as SiteSettings | null;
  }, null);
}

export async function getCompanyProfile(): Promise<CompanyProfile | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("company_profile").select("*").eq("id", 1).maybeSingle();
    if (error) throw error;
    return data as CompanyProfile | null;
  }, null);
}

export async function getSustainability(): Promise<SustainabilityContent | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("sustainability_content").select("*").eq("id", 1).maybeSingle();
    if (error) throw error;
    return data as SustainabilityContent | null;
  }, null);
}

export async function getServices(): Promise<Service[]> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    if (error) throw error;
    return (data as Service[]) ?? [];
  }, []);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw error;
    return data as Service | null;
  }, null);
}

export async function getProjects(category?: string): Promise<Project[]> {
  return safe(async () => {
    const supabase = createClient();
    let query = supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (category) query = query.eq("category", category);
    const { data, error } = await query;
    if (error) throw error;
    return (data as Project[]) ?? [];
  }, []);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_published", true)
      .eq("is_featured", true)
      .limit(limit);
    if (error) throw error;
    return (data as Project[]) ?? [];
  }, []);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*, project_images(id, project_id, image_url, alt_text, sort_order)")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw error;
    return data as Project | null;
  }, null);
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("blog_categories").select("*").order("name");
    if (error) throw error;
    return (data as BlogCategory[]) ?? [];
  }, []);
}

export async function getBlogPosts(opts: {
  categorySlug?: string;
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<{ posts: BlogPost[]; count: number }> {
  return safe(
    async () => {
      const supabase = createClient();
      const page = Math.max(1, opts.page ?? 1);
      const perPage = opts.perPage ?? 9;

      let query = supabase
        .from("blog_posts")
        .select("*, blog_categories(id,name,slug)", { count: "exact" })
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .range((page - 1) * perPage, page * perPage - 1);

      if (opts.categorySlug) {
        const cat = await supabase
          .from("blog_categories")
          .select("id")
          .eq("slug", opts.categorySlug)
          .maybeSingle();
        if (!cat.data) return { posts: [], count: 0 };
        query = query.eq("category_id", (cat.data as { id: number }).id);
      }
      if (opts.search) query = query.ilike("title->>en", `%${opts.search}%`);

      const { data, count, error } = await query;
      if (error) throw error;
      return { posts: (data as BlogPost[]) ?? [], count: count ?? 0 };
    },
    { posts: [], count: 0 }
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*, blog_categories(id,name,slug)")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw error;
    return data as BlogPost | null;
  }, null);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false });
    if (error) throw error;
    return (data as Testimonial[]) ?? [];
  }, []);
}

export async function getPartners(): Promise<Partner[]> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    if (error) throw error;
    return (data as Partner[]) ?? [];
  }, []);
}

export async function getJobs(): Promise<Job[]> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_published", true)
      .eq("is_closed", false)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Job[]) ?? [];
  }, []);
}

export async function getJobById(id: number): Promise<Job | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .eq("is_closed", false)
      .maybeSingle();
    if (error) throw error;
    return data as Job | null;
  }, null);
}
