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
  email: string;
  whatsapp: string;
  address: string;
  google_maps_url: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  default_language: "en" | "am";
  logo_url: string | null;
  favicon_url: string | null;
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

/** Pick a localized value with graceful fallback (locale -> en -> first non-empty). */
export function t(value: LocalizedText | null | undefined, locale: "en" | "am"): string {
  if (!value) return "";
  return value[locale] || value.en || Object.values(value).find(Boolean) || "";
}
