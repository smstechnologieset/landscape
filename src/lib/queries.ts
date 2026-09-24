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

import {
  COMPANY_INFO,
  OFFICIAL_SERVICES,
  SUSTAINABILITY_PILLARS
} from "@/lib/company-data";

const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  company_name: COMPANY_INFO.name,
  phone: "",
  email: "",
  whatsapp: "",
  address: COMPANY_INFO.location,
  google_maps_url: "",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  youtube_url: "",
  default_language: "en",
  logo_url: COMPANY_INFO.logoUrl,
  favicon_url: null
};

const DEFAULT_PROFILE: CompanyProfile = {
  id: 1,
  about: COMPANY_INFO.background,
  mission: COMPANY_INFO.mission,
  vision: COMPANY_INFO.vision,
  values: {
    en: "Sustainability, Quality, Innovation, Community Engagement, Integrity, Biodiversity Conservation",
    am: "ዘላቂነት፣ ጥራት፣ ፈጠራ፣ የማህበረሰብ ተሳትፎ፣ ታማኝነት፣ የብዝሃ-ሕይወት ጥበቃ"
  },
  company_story: {
    en: "Landscape Solution PLC was established in 2026 in Addis Ababa to contribute to Ethiopia's national green development initiatives. Combining innovative technology, creative design, technical expertise, and sustainable practices, we serve government institutions, commercial developments, residential properties, and industrial sites.",
    am: "ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር በ2026 በአዲስ አበባ የተቋቋመው ለኢትዮጵያ አገራዊ የአረንጓዴ ልማት ጥረቶች የበኩሉን አስተዋጽኦ ለማበርከት ነው። አዳዲስ ቴክኖሎጂዎችን፣ የፈጠራ ዲዛይንን እና ዘላቂ አሰራሮችን በማቀናጀት ለመንግስት፣ ለንግድና ለመኖሪያ ፕሮጀክቶች አገልግሎት ይሰጣል።"
  },
  company_description: {
    en: "Professional landscaping company dedicated to creating aesthetically pleasing, functional, and sustainable indoor and outdoor environments across Ethiopia.",
    am: "በመላ ኢትዮጵያ ውበት ያላቸው፣ ተግባራዊ እና ዘላቂ የሆኑ የውስጥና የውጪ የተፈጥሮ አካባቢዎችን በመፍጠር ረገድ የተሰማራ ፕሮፌሽናል የመልክአ ምድር ኩባንያ።"
  },
  hero_title: {
    en: "Professional Landscape Solutions for a Greener Future",
    am: "ለአረንጓዴ የወደፊት ዘመናዊ የመልክአ ምድር መፍትሄዎች"
  },
  hero_description: {
    en: "Dedicated to creating aesthetically pleasing, functional, and sustainable indoor and outdoor environments across Ethiopia through innovation, technical expertise, and environmental responsibility.",
    am: "በፈጠራ፣ በቴክኒካል ብቃት እና በአካባቢያዊ ኃላፊነት በመላ ኢትዮጵያ ውብ፣ ተግባራዊ እና ዘላቂ የሆኑ የተፈጥሮ አካባቢዎችን እንገነባለን።"
  },
  brochure_url: null
};

const DEFAULT_SUSTAINABILITY: SustainabilityContent = {
  id: 1,
  title: {
    en: "Environmental Responsibility & Green Development",
    am: "የአካባቢ ጥበቃ ኃላፊነት እና አረንጓዴ ልማት"
  },
  introduction: {
    en: "Ethiopia is actively implementing green development initiatives to address trans-boundary climate change, deforestation, and environmental degradation. Landscape Solution PLC was founded to advance these commitments through science-backed landscaping and ecological stewardship.",
    am: "ኢትዮጵያ የአየር ንብረት ለውጥን፣ የደን መጨፍጨፍንና የአካባቢ መራቆትን ለመቅረፍ የአረንጓዴ ልማት ስራዎችን እያከናወነች ትገኛለች። ላንድስኬፕ ሶሉሽን እነዚህን አገራዊ ጥረቶች በሳይንሳዊ የመልክአ ምድር ስራዎች ለማሳካት ቆርጦ ተነስቷል።"
  },
  water_conservation: {
    en: "Precision drip irrigation, automated smart scheduling, and drought-tolerant plant palettes optimize every drop of water in urban and nursery environments.",
    am: "ዘመናዊ የጠብታ መስኖዎች እና ውሃ ቆጣቢ እፅዋት የውሃ ብክነትን በከፍተኛ ደረጃ ይቀንሳሉ።"
  },
  native_plants: {
    en: "Dedicated production and preservation of indigenous Ethiopian flora, native ornamentals, shade trees, and medicinal species.",
    am: "አገር በቀል የኢትዮጵያ እፅዋትን፣ የደን ዛፎችንና የመድኃኒት ቅመሞችን በጥራት ማፍላትና መጠበቅ።"
  },
  environmental_responsibility: {
    en: "Integrating professional landscape expertise with deep ecological ethics to foster healthier communities and biodiversity.",
    am: "የመልክአ ምድር የሙያ ብቃትን ከአካባቢ ጥበቃ ስነ-ምግባር ጋር በማቀናጀት ጤናማ ማህበረሰብን መገንባት።"
  },
  eco_friendly_practices: {
    en: "Climate-smart landscaping, integrated organic pest management, and zero-chemical soil cultivation protocols.",
    am: "የአየር ንብረት ተስማሚ አሰራር፣ የተፈጥሮ ተባይ መከላከያ እና ኬሚካል አልባ የአፈር አያያዝ።"
  },
  waste_reduction: {
    en: "Recycling 100% of green biomass and landscape clippings into nutrient-dense organic compost.",
    am: "የአትክልት ተረፈ-ምርቶችን በሙሉ መልሶ በመጠቀም ወደ ተፈጥሮ ማዳበሪያነት መቀየር።"
  },
  sustainable_design: {
    en: "Architectural spatial layouts engineered for natural stormwater filtration, solar orientation, and micro-climate cooling.",
    am: "የተፈጥሮ ዝናብ ውሃን በአግባቡ የሚይዙ እና የከባቢ አየር ቅዝቃዜን የሚፈጥሩ የዲዛይን እሳቤዎች።"
  },
  initiatives: [
    { en: "Active contribution to Ethiopia's national Green Legacy initiatives", am: "ለአገራዊው የአረንጓዴ አሻራ መርሃ-ግብር ንቁ አስተዋጽኦ ማበርከት" },
    { en: "Large-scale indigenous seedling propagation and distribution", am: "አገር በቀል ችግኞችን በስፋት ማፍላትና ማሰራጨት" },
    { en: "Bio-engineered slope stabilization on degraded soils", am: "በተራቆቱ መሬቶች ላይ የተፈጥሮ የአፈር መሸርሸር መከላከያ መስራት" },
    { en: "Youth and community vocational trainings in sustainable horticulture", am: "ለወጣቶችና ለማህበረሰቡ ዘላቂ የሆርቲካልቸር ስልጠና መስጠት" }
  ],
  statistics: [
    { label: { en: "Documented Services", am: "ዋና ዋና አገልግሎቶች" }, value: "11" },
    { label: { en: "Core Objectives", am: "ዋነኛ ግቦች" }, value: "12" },
    { label: { en: "Founded", am: "የተመሰረተበት" }, value: "2026" },
    { label: { en: "Vision Target", am: "የራዕይ ዘመን" }, value: "2030" }
  ]
};

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
    if (error || !data) return DEFAULT_SETTINGS;
    return {
      ...DEFAULT_SETTINGS,
      ...data,
      logo_url: data.logo_url || DEFAULT_SETTINGS.logo_url
    } as SiteSettings;
  }, DEFAULT_SETTINGS);
}

export async function getCompanyProfile(): Promise<CompanyProfile | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("company_profile").select("*").eq("id", 1).maybeSingle();
    if (error || !data || !data.about?.en) return DEFAULT_PROFILE;
    return data as CompanyProfile;
  }, DEFAULT_PROFILE);
}

export async function getSustainability(): Promise<SustainabilityContent | null> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("sustainability_content").select("*").eq("id", 1).maybeSingle();
    if (error || !data || !data.title?.en) return DEFAULT_SUSTAINABILITY;
    return data as SustainabilityContent;
  }, DEFAULT_SUSTAINABILITY);
}

export async function getServices(): Promise<Service[]> {
  return safe(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("sort_order");
    if (error || !data || data.length === 0) return OFFICIAL_SERVICES;
    return data as Service[];
  }, OFFICIAL_SERVICES);
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
    if (error || !data) {
      const match = OFFICIAL_SERVICES.find((s) => s.slug === slug);
      return match ?? null;
    }
    return data as Service;
  }, OFFICIAL_SERVICES.find((s) => s.slug === slug) ?? null);
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
