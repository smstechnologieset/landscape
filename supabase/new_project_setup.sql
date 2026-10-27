-- ============================================================================
-- PINNACLE LANDSCAPE SOLUTION PLC — COMPLETE SUPABASE DATABASE SETUP & SEED
-- Database Project: https://coksxzifntucyotsarvs.supabase.co
-- Run this script in the Supabase Dashboard -> SQL Editor
-- ============================================================================

-- 1. ENUM TYPES
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('admin', 'editor');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.inquiry_status AS ENUM ('new', 'read', 'contacted', 'archived');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.quote_status AS ENUM ('new', 'reviewing', 'contacted', 'quoted', 'won', 'closed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.consultation_status AS ENUM ('pending', 'approved', 'rejected', 'rescheduled', 'completed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.application_status AS ENUM ('new', 'reviewing', 'shortlisted', 'rejected', 'hired');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. TABLES

-- Profiles (linked 1-to-1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  avatar_url text,
  role public.user_role NOT NULL DEFAULT 'editor',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Site Settings (Global Contact, Social Links & Assets)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  company_name text NOT NULL DEFAULT 'Landscape Solution PLC',
  phone text NOT NULL DEFAULT '+251 11 667 8901',
  alt_phone text NOT NULL DEFAULT '+251 91 123 4567',
  email text NOT NULL DEFAULT 'admin@pinnaclelandscapesolution.com',
  whatsapp text NOT NULL DEFAULT '+251911234567',
  address text NOT NULL DEFAULT 'Sur Construction Building, 8th Floor, Addis Ababa, Ethiopia',
  google_maps_url text NOT NULL DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548483584877!2d38.78345237494578!3d9.013589991047127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d998276f7%3A0xc6cb697e06a380e2!2sSur%20Construction!5e0!3m2!1sen!2set!4v1711200000000!5m2!1sen!2set',
  facebook_url text NOT NULL DEFAULT 'https://facebook.com',
  instagram_url text NOT NULL DEFAULT 'https://instagram.com',
  linkedin_url text NOT NULL DEFAULT 'https://linkedin.com',
  youtube_url text NOT NULL DEFAULT 'https://youtube.com',
  telegram_url text NOT NULL DEFAULT 'https://t.me/pinnaclelandscape',
  tiktok_url text NOT NULL DEFAULT 'https://tiktok.com',
  default_language text NOT NULL DEFAULT 'en' CHECK (default_language IN ('en','am')),
  logo_url text DEFAULT '/images/logo.png',
  favicon_url text,
  hero_slide_1 text DEFAULT '/images/hero_landscape.jpg',
  hero_slide_2 text DEFAULT '/images/service_planning.jpg',
  hero_slide_3 text DEFAULT '/images/service_construction.jpg',
  about_image text DEFAULT '/images/who_we_are.jpg',
  sustainability_image text DEFAULT '/images/service_botanic.jpg',
  brochure_url text DEFAULT '/downloads/landscape_solution_profile.pdf',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Company Profile (About page and vision)
CREATE TABLE IF NOT EXISTS public.company_profile (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  about jsonb NOT NULL DEFAULT '{}'::jsonb,
  mission jsonb NOT NULL DEFAULT '{}'::jsonb,
  vision jsonb NOT NULL DEFAULT '{}'::jsonb,
  values jsonb NOT NULL DEFAULT '{}'::jsonb,
  company_story jsonb NOT NULL DEFAULT '{}'::jsonb,
  company_description jsonb NOT NULL DEFAULT '{}'::jsonb,
  hero_title jsonb NOT NULL DEFAULT '{}'::jsonb,
  hero_description jsonb NOT NULL DEFAULT '{}'::jsonb,
  brochure_url text DEFAULT '/downloads/landscape_solution_profile.pdf',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Sustainability Content
CREATE TABLE IF NOT EXISTS public.sustainability_content (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title jsonb NOT NULL DEFAULT '{}'::jsonb,
  introduction jsonb NOT NULL DEFAULT '{}'::jsonb,
  water_conservation jsonb NOT NULL DEFAULT '{}'::jsonb,
  native_plants jsonb NOT NULL DEFAULT '{}'::jsonb,
  environmental_responsibility jsonb NOT NULL DEFAULT '{}'::jsonb,
  eco_friendly_practices jsonb NOT NULL DEFAULT '{}'::jsonb,
  waste_reduction jsonb NOT NULL DEFAULT '{}'::jsonb,
  sustainable_design jsonb NOT NULL DEFAULT '{}'::jsonb,
  initiatives jsonb NOT NULL DEFAULT '[]'::jsonb,
  statistics jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Services
CREATE TABLE IF NOT EXISTS public.services (
  id serial PRIMARY KEY,
  title jsonb NOT NULL,
  slug text NOT NULL UNIQUE,
  category_group text NOT NULL DEFAULT 'Landscape & Design',
  short_description jsonb NOT NULL,
  description jsonb NOT NULL,
  icon text DEFAULT 'leaf',
  featured_image text,
  features jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  faq jsonb DEFAULT '[]'::jsonb,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id serial PRIMARY KEY,
  title jsonb NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'Commercial',
  tag text,
  location text NOT NULL DEFAULT 'Addis Ababa, Ethiopia',
  client text DEFAULT '',
  year text DEFAULT '2026',
  completion_date date,
  short_description jsonb NOT NULL,
  description jsonb NOT NULL,
  challenge jsonb DEFAULT '{}'::jsonb,
  solution jsonb DEFAULT '{}'::jsonb,
  results jsonb DEFAULT '{}'::jsonb,
  featured_image text NOT NULL,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Project Images (slideshow gallery)
CREATE TABLE IF NOT EXISTS public.project_images (
  id serial PRIMARY KEY,
  project_id int NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Blog Categories
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id serial PRIMARY KEY,
  name jsonb NOT NULL,
  slug text NOT NULL UNIQUE,
  description jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id serial PRIMARY KEY,
  title jsonb NOT NULL,
  slug text NOT NULL UNIQUE,
  category_id int REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  excerpt jsonb NOT NULL,
  body jsonb NOT NULL,
  featured_image text NOT NULL,
  author_name text NOT NULL DEFAULT 'Landscape Solution PLC',
  author_role text NOT NULL DEFAULT 'Editorial Team',
  author_avatar text,
  reading_time text NOT NULL DEFAULT '4 min read',
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Jobs (Careers)
CREATE TABLE IF NOT EXISTS public.jobs (
  id serial PRIMARY KEY,
  title jsonb NOT NULL,
  slug text NOT NULL UNIQUE,
  department text NOT NULL DEFAULT 'Horticulture & Architecture',
  location text NOT NULL DEFAULT 'Addis Ababa, Ethiopia',
  employment_type text NOT NULL DEFAULT 'Full-Time',
  experience_level text NOT NULL DEFAULT 'Mid-Senior Level',
  summary jsonb,
  description jsonb NOT NULL,
  responsibilities jsonb DEFAULT '[]'::jsonb,
  requirements jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  deadline date,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  is_closed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Job Applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id serial PRIMARY KEY,
  job_id int REFERENCES public.jobs(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  cover_letter text,
  resume_url text,
  portfolio_url text,
  status public.application_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Contact Inquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id serial PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  service_of_interest text,
  subject text NOT NULL,
  message text NOT NULL,
  status public.inquiry_status NOT NULL DEFAULT 'new',
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Quote Requests
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id serial PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  service_id int REFERENCES public.services(id) ON DELETE SET NULL,
  location text,
  estimated_budget text,
  project_timeline text,
  project_description text NOT NULL,
  status public.quote_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Consultation Bookings
CREATE TABLE IF NOT EXISTS public.consultation_bookings (
  id serial PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  organization text,
  preferred_date date,
  preferred_time text,
  topic text NOT NULL,
  notes text,
  status public.consultation_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id serial PRIMARY KEY,
  customer_name text NOT NULL,
  company text NOT NULL DEFAULT '',
  position text NOT NULL DEFAULT '',
  testimonial jsonb NOT NULL DEFAULT '{}'::jsonb,
  photo_url text,
  rating int NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Partners
CREATE TABLE IF NOT EXISTS public.partners (
  id serial PRIMARY KEY,
  name text NOT NULL,
  logo_url text,
  website_url text,
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 3. FUNCTIONS & AUTH TRIGGERS

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin','editor')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
  );
$$;

-- Trigger to automatically populate public.profiles on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'Staff Member'),
    coalesce(new.email, ''),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'admin')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = excluded.email,
    role = CASE WHEN excluded.email = 'admin@pinnaclelandscapesolution.com' THEN 'admin'::public.user_role ELSE public.profiles.role END;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. ROW LEVEL SECURITY (RLS) POLICIES

REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sustainability_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials: public read" ON public.testimonials;
CREATE POLICY "testimonials: public read" ON public.testimonials FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "testimonials: staff manage" ON public.testimonials;
CREATE POLICY "testimonials: staff manage" ON public.testimonials FOR ALL USING (public.is_staff());

DROP POLICY IF EXISTS "partners: public read" ON public.partners;
CREATE POLICY "partners: public read" ON public.partners FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "partners: staff manage" ON public.partners;
CREATE POLICY "partners: staff manage" ON public.partners FOR ALL USING (public.is_staff());

-- Profiles Policies
DROP POLICY IF EXISTS "profiles: read" ON public.profiles;
CREATE POLICY "profiles: read" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "profiles: manage" ON public.profiles;
CREATE POLICY "profiles: manage" ON public.profiles FOR ALL USING (public.is_admin());

-- Site Settings Policies
DROP POLICY IF EXISTS "settings: public read" ON public.site_settings;
CREATE POLICY "settings: public read" ON public.site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "settings: staff write" ON public.site_settings;
CREATE POLICY "settings: staff write" ON public.site_settings FOR ALL USING (public.is_staff());

-- Company Profile Policies
DROP POLICY IF EXISTS "company: public read" ON public.company_profile;
CREATE POLICY "company: public read" ON public.company_profile FOR SELECT USING (true);
DROP POLICY IF EXISTS "company: staff write" ON public.company_profile;
CREATE POLICY "company: staff write" ON public.company_profile FOR ALL USING (public.is_staff());

-- Sustainability Policies
DROP POLICY IF EXISTS "sustainability: public read" ON public.sustainability_content;
CREATE POLICY "sustainability: public read" ON public.sustainability_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "sustainability: staff write" ON public.sustainability_content;
CREATE POLICY "sustainability: staff write" ON public.sustainability_content FOR ALL USING (public.is_staff());

-- Services Policies
DROP POLICY IF EXISTS "services: public read" ON public.services;
CREATE POLICY "services: public read" ON public.services FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "services: staff write" ON public.services;
CREATE POLICY "services: staff write" ON public.services FOR ALL USING (public.is_staff());

-- Projects Policies
DROP POLICY IF EXISTS "projects: public read" ON public.projects;
CREATE POLICY "projects: public read" ON public.projects FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "projects: staff write" ON public.projects;
CREATE POLICY "projects: staff write" ON public.projects FOR ALL USING (public.is_staff());

-- Project Images Policies
DROP POLICY IF EXISTS "project_images: public read" ON public.project_images;
CREATE POLICY "project_images: public read" ON public.project_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "project_images: staff write" ON public.project_images;
CREATE POLICY "project_images: staff write" ON public.project_images FOR ALL USING (public.is_staff());

-- Blog Policies
DROP POLICY IF EXISTS "blog_posts: public read" ON public.blog_posts;
CREATE POLICY "blog_posts: public read" ON public.blog_posts FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "blog_posts: staff write" ON public.blog_posts;
CREATE POLICY "blog_posts: staff write" ON public.blog_posts FOR ALL USING (public.is_staff());

-- Jobs Policies
DROP POLICY IF EXISTS "jobs: public read" ON public.jobs;
CREATE POLICY "jobs: public read" ON public.jobs FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "jobs: staff write" ON public.jobs;
CREATE POLICY "jobs: staff write" ON public.jobs FOR ALL USING (public.is_staff());

-- Inquiries & Quotes Policies
DROP POLICY IF EXISTS "inquiries: public insert" ON public.contact_inquiries;
CREATE POLICY "inquiries: public insert" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "inquiries: staff read" ON public.contact_inquiries;
CREATE POLICY "inquiries: staff read" ON public.contact_inquiries FOR ALL USING (public.is_staff());

DROP POLICY IF EXISTS "quotes: public insert" ON public.quote_requests;
CREATE POLICY "quotes: public insert" ON public.quote_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "quotes: staff read" ON public.quote_requests;
CREATE POLICY "quotes: staff read" ON public.quote_requests FOR ALL USING (public.is_staff());

DROP POLICY IF EXISTS "consultations: public insert" ON public.consultation_bookings;
CREATE POLICY "consultations: public insert" ON public.consultation_bookings FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "consultations: staff read" ON public.consultation_bookings;
CREATE POLICY "consultations: staff read" ON public.consultation_bookings FOR ALL USING (public.is_staff());

-- 5. INITIAL SEED DATA

-- Link Admin user profile if user exists in auth.users
INSERT INTO public.profiles (id, full_name, email, role)
SELECT id, 'System Administrator', email, 'admin'::public.user_role
FROM auth.users
WHERE email = 'admin@pinnaclelandscapesolution.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin', email = excluded.email;

-- Site Settings
INSERT INTO public.site_settings (
  id, company_name, phone, alt_phone, email, whatsapp, address,
  google_maps_url, facebook_url, instagram_url, linkedin_url,
  youtube_url, telegram_url, tiktok_url, default_language, logo_url
)
VALUES (
  1,
  'Landscape Solution PLC',
  '+251 11 667 8901',
  '+251 91 123 4567',
  'admin@pinnaclelandscapesolution.com',
  '+251911234567',
  'Sur Construction Building, 8th Floor, Addis Ababa, Ethiopia',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548483584877!2d38.78345237494578!3d9.013589991047127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d998276f7%3A0xc6cb697e06a380e2!2sSur%20Construction!5e0!3m2!1sen!2set!4v1711200000000!5m2!1sen!2set',
  'https://facebook.com',
  'https://instagram.com',
  'https://linkedin.com',
  'https://youtube.com',
  'https://t.me/pinnaclelandscape',
  'https://tiktok.com',
  'en',
  '/images/logo.png'
) ON CONFLICT (id) DO UPDATE SET
  company_name = excluded.company_name,
  phone = excluded.phone,
  alt_phone = excluded.alt_phone,
  email = excluded.email,
  whatsapp = excluded.whatsapp,
  address = excluded.address;

-- Company Profile
INSERT INTO public.company_profile (
  id, about, mission, vision, values, company_story, company_description, hero_title, hero_description, brochure_url
)
VALUES (
  1,
  '{"en":"Established in 2017 in Addis Ababa, Landscape Solution PLC is Ethiopia''s premier multi-disciplinary landscaping, urban greening, and environmental engineering company. We transform urban spaces, corporate campuses, diplomatic compounds, and private estates into thriving ecological landscapes.","am":"በ2009 ዓ.ም የተመሰረተው ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማ በኢትዮጵያ ቀዳሚ የመልክአ ምድር ፕላን፣ የከተማ አረንጓዴ ልማት እና የአካባቢ ጥበቃ ምህንድስና ድርጅት ነው።"}'::jsonb,
  '{"en":"To create resilient, biodiverse, and aesthetically breathtaking landscapes that enhance human well-being and protect Ethiopian natural ecosystems.","am":"የሰው ልጆችን ጤና እና ደህንነት የሚያጎለብቱ እንዲሁም የኢትዮጵያን ስነ-ምህዳር የሚጠብቁ ውብ እና ዘላቂ የመልክአ ምድር ስራዎችን መፍጠር።"}'::jsonb,
  '{"en":"To become East Africa''s vanguard landscape architecture and ecological engineering enterprise, recognized for sustainable innovation and botanic preservation.","am":"በምስራቅ አፍሪካ ቀዳሚና ፈጠራ የታከለበት ዘላቂ የመልክአ ምድር አርክቴክቸርና የአካባቢ ጥበቃ ተቋም መሆን።"}'::jsonb,
  '{"en":"Ecological Integrity, Horticultural Mastery, Architectural Precision, Client Partnership, Environmental Stewardship","am":"የስነ-ምህዳር ጥበቃ፣ የሆርቲካልቸር ሙያዊ ብቃት፣ የዲዛይን ጥራት፣ የታማኝነት አጋርነት"}'::jsonb,
  '{"en":"From a passionate team of botanists and landscape architects in Addis Ababa, Landscape Solution PLC has evolved into a recognized nationwide contractor capable of handling master municipal parks, commercial developments, and private luxury gardens.","am":"በጥቂት የዕፅዋትና የመልክአ ምድር ባለሙያዎች የተጀመረው ድርጅታችን ዛሬ በመላው ሀገሪቱ ታላላቅ የመንግስትና የንግድ ተቋማት ፕሮጀክቶችን የሚፈፅም ደረጃ ላይ ደርሷል።"}'::jsonb,
  '{"en":"Comprehensive landscape design, installation, automated irrigation, nursery propagation, and living botanical curation.","am":"የተሟላ የመልክአ ምድር ዲዛይን፣ ግንባታ፣ ዘመናዊ የመስኖ ስርዓት እና የችግኝ እርባታ አገልግሎት።"}'::jsonb,
  '{"en":"Transforming Landscapes, Preserving Nature Across Ethiopia","am":"የመልክአ ምድር ውበትን ከተፈጥሮ ጥበቃ ጋር በማጣመር"}'::jsonb,
  '{"en":"Pioneering sustainable landscape architecture, urban greening corridors, and living botanical environments.","am":"ዘላቂ የመልክአ ምድር አርክቴክቸር፣ የከተማ አረንጓዴ ልማት እና የተፈጥሮ ጥበቃ መፍትሄዎች።"}'::jsonb,
  '/downloads/landscape_solution_profile.pdf'
) ON CONFLICT (id) DO NOTHING;

-- Sustainability Content
INSERT INTO public.sustainability_content (
  id, title, introduction, water_conservation, native_plants, environmental_responsibility,
  eco_friendly_practices, waste_reduction, sustainable_design, statistics
)
VALUES (
  1,
  '{"en":"Pioneering Ecological Stewardship in Ethiopian Landscapes","am":"በኢትዮጵያ የመልክአ ምድር ልማት ውስጥ የስነ-ምህዳር ጥበቃ መሪነት"}'::jsonb,
  '{"en":"At Landscape Solution PLC, sustainability is not an afterthought—it is the biological foundation of every garden, urban park, and master plan we create. We balance aesthetic elegance with soil conservation, groundwater preservation, and biodiversity enrichment.","am":"በላንድስኬፕ ሶሉሽን ዘላቂነት ለእያንዳንዱ የምንሰራው ስራ መሰረት ነው። ውበትን ከአፈር እና ውሃ ጥበቃ እንዲሁም ከብዝሃ-ህይወት ጋር እናዋህዳለን።"}'::jsonb,
  '{"en":"Smart drip irrigation networks, rainwater harvesting retention ponds, and low-flow emitters that save up to 60% of landscape water compared to traditional overhead sprayers.","am":"እስከ 60% የውሃ ብክነትን የሚቀንሱ ዘመናዊ የጠብታ መስኖ እና የዝናብ ውሃ ማቆሪያ ስርዓቶች።"}'::jsonb,
  '{"en":"Prioritizing Ethiopian indigenous tree species, drought-tolerant shrubs, and high-altitude flora that thrive naturally without chemical pesticides or heavy fertilizers.","am":"አገር በቀል የሆኑ የኢትዮጵያ ዛፎችን እና ለድርቅ የማይበገሩ ዕፅዋትን በማልማት የተፈጥሮ ሚዛንን መጠበቅ።"}'::jsonb,
  '{"en":"100% organic compost integration produced from green yard waste, eliminating synthetic chemical runoff into Addis Ababa municipal waterways.","am":"ከአረንጓዴ ተረፈ-ምርቶች የተዘጋጀ የተፈጥሮ ማዳበሪያን በመጠቀም የአፈር ለምነትን ማሳደግ።"}'::jsonb,
  '{"en":"Permeable stone paving and gravel swales that allow urban rainwater to percolate naturally into the ground table rather than eroding city streets.","am":"የዝናብ ውሃ ወደ መሬት እንዲሰርግ የሚያደርጉ የተፈጥሮ ድንጋይ ንጣፎችና የፍሳሽ ቦዮች።"}'::jsonb,
  '{"en":"Zero-green-waste policy: All pruning, lawn clippings, and clearing debris are mulched and returned to the soil as moisture-retaining organic matter.","am":"ዜሮ አረንጓዴ ብክነት፡ ሁሉም የተከረከሙ ቅጠሎች ወደ አፈር ማዳበሪያነት ይቀየራሉ።"}'::jsonb,
  '{"en":"Biophilic architectural designs that lower ambient microclimate temperatures around buildings, cutting air conditioning energy demands.","am":"የህንፃዎችን ሙቀት የሚቀንሱና የተፈጥሮ አየርን የሚያቀዘቅዙ የስነ-ህይወት ዲዛይኖች።"}'::jsonb,
  '[
    {"value":"60%","label":{"en":"Water Savings with Smart Drip","am":"የውሃ ቁጠባ በዘመናዊ ጠብታ መስኖ"}},
    {"value":"100%","label":{"en":"Organic Soil Enrichment","am":"የተፈጥሮ ማዳበሪያ አጠቃቀም"}},
    {"value":"50k+","label":{"en":"Native Seedlings Propagated","am":"የተተከሉ አገር በቀል ችግኞች"}},
    {"value":"15+","label":{"en":"Hectares Restored Ecologically","am":"በዘላቂነት የተለሙ ሄክታሮች"}}
  ]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Verification
SELECT
  (SELECT count(*) FROM public.site_settings) AS site_settings_count,
  (SELECT count(*) FROM public.company_profile) AS company_profile_count,
  (SELECT count(*) FROM public.profiles) AS profiles_count;
