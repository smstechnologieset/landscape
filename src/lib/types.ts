export type Locale = "en" | "am";

export type LocalizedText = { en: string; am?: string };

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  role: "admin" | "editor";
  created_at: string;
  updated_at: string;
};

export type SiteSettings = {
  id: number;
  company_name: string;
  phone: string;
  alt_phone?: string;
  email: string;
  whatsapp: string;
  address: string;
  google_maps_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  telegram_url?: string;
  tiktok_url?: string;
  default_language: "en" | "am";
  logo_url: string | null;
  favicon_url: string | null;
  hero_slide_1?: string | null;
  hero_slide_2?: string | null;
  hero_slide_3?: string | null;
  about_image?: string | null;
  sustainability_image?: string | null;
  brochure_url?: string | null;
};

export type CompanyProfile = {
  id: number;
  about: LocalizedText;
  mission: LocalizedText;
  vision: LocalizedText;
  values: LocalizedText;
  company_story: LocalizedText;
  company_description: LocalizedText;
  hero_title: LocalizedText;
  hero_description: LocalizedText;
  brochure_url: string | null;
};

export type Service = {
  id: number;
  title: LocalizedText;
  slug: string;
  short_description: LocalizedText;
  description: LocalizedText;
  icon: string | null;
  featured_image: string | null;
  features: LocalizedText[] | string[];
  benefits: LocalizedText[] | string[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
};

export type ProjectImage = {
  id: number;
  project_id: number;
  image_url: string;
  alt_text: string;
  sort_order: number;
};

export type Project = {
  id: number;
  title: LocalizedText;
  slug: string;
  category: string;
  location: string;
  client: string;
  completion_date: string | null;
  short_description: LocalizedText;
  description: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  results: LocalizedText;
  featured_image: string | null;
  is_featured: boolean;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
  project_images?: ProjectImage[];
};

export type BlogCategory = { id: number; name: string; slug: string };

export type BlogPost = {
  id: number;
  title: LocalizedText;
  slug: string;
  excerpt: LocalizedText;
  content: LocalizedText;
  featured_image: string | null;
  author_id: string | null;
  category_id: number | null;
  tags: string[];
  published_at: string | null;
  is_featured: boolean;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
  blog_categories?: BlogCategory | null;
};

export type Testimonial = {
  id: number;
  customer_name: string;
  company: string;
  position: string;
  testimonial: LocalizedText;
  photo_url: string | null;
  rating: number;
  is_featured: boolean;
  is_published: boolean;
};

export type Partner = {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string;
  sort_order: number;
  is_published: boolean;
};

export type Job = {
  id: number;
  title: LocalizedText;
  department: string;
  location: string;
  employment_type: string;
  description: LocalizedText;
  responsibilities: LocalizedText[];
  requirements: LocalizedText[];
  application_deadline: string | null;
  is_published: boolean;
  is_closed: boolean;
};

export type SustainabilityContent = {
  id: number;
  title: LocalizedText;
  introduction: LocalizedText;
  water_conservation: LocalizedText;
  native_plants: LocalizedText;
  environmental_responsibility: LocalizedText;
  eco_friendly_practices: LocalizedText;
  waste_reduction: LocalizedText;
  sustainable_design: LocalizedText;
  initiatives: LocalizedText[];
  statistics: { label: LocalizedText; value: string }[];
};

/** Pick a localized value with graceful fallback (locale -> en -> first non-empty string). */
export function t(value: any, locale: "en" | "am"): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    // 1. Direct string on current locale
    if (typeof value[locale] === "string" && value[locale].trim().length > 0) {
      return value[locale];
    }
    // 2. English fallback string
    if (typeof value.en === "string" && value.en.trim().length > 0) {
      return value.en;
    }
    // 3. Amharic fallback string
    if (typeof value.am === "string" && value.am.trim().length > 0) {
      return value.am;
    }
    // 4. Nested localized sub-objects (e.g. { p1: { en, am } })
    for (const val of Object.values(value)) {
      if (typeof val === "string" && val.trim().length > 0) {
        return val;
      }
      if (typeof val === "object" && val !== null) {
        const nested = t(val, locale);
        if (nested) return nested;
      }
    }
  }
  return "";
}
