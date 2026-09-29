-- ============================================================================
-- LANDSCAPE SOLUTION PLC — COMPLETE SUPABASE DATABASE SETUP & SEED
-- Run this script in the Supabase Dashboard -> SQL Editor (or via psql)
-- Project: https://supabase.com/dashboard/project/mbyuestjedfvdvsaqfho/sql/new
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

-- Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  company_name text NOT NULL DEFAULT 'Landscape Solution PLC',
  phone text NOT NULL DEFAULT '+251 11 667 8901',
  email text NOT NULL DEFAULT 'info@landscapesolution.et',
  whatsapp text NOT NULL DEFAULT '251911234567',
  address text NOT NULL DEFAULT 'Bole Sub-City, Addis Ababa, Ethiopia',
  google_maps_url text NOT NULL DEFAULT '',
  facebook_url text NOT NULL DEFAULT 'https://facebook.com',
  instagram_url text NOT NULL DEFAULT 'https://instagram.com',
  linkedin_url text NOT NULL DEFAULT 'https://linkedin.com',
  youtube_url text NOT NULL DEFAULT '',
  default_language text NOT NULL DEFAULT 'en' CHECK (default_language IN ('en','am')),
  logo_url text DEFAULT '/images/logo.png',
  favicon_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Company Profile
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
  brochure_url text,
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

-- Ensure UNIQUE constraints exist on existing tables if previously created without them
DO $$ BEGIN
  ALTER TABLE public.services ADD CONSTRAINT services_slug_key UNIQUE (slug);
EXCEPTION WHEN others THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
EXCEPTION WHEN others THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.project_images ADD CONSTRAINT project_images_proj_img_key UNIQUE (project_id, image_url);
EXCEPTION WHEN others THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.blog_categories ADD CONSTRAINT blog_categories_slug_key UNIQUE (slug);
EXCEPTION WHEN others THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.blog_posts ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);
EXCEPTION WHEN others THEN null; END $$;

DO $$ BEGIN
  ALTER TABLE public.jobs ADD CONSTRAINT jobs_slug_key UNIQUE (slug);
EXCEPTION WHEN others THEN null; END $$;


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
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.email, ''),
    'editor'
  )
  ON CONFLICT (id) DO NOTHING;
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
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "profiles: read" ON public.profiles;
CREATE POLICY "profiles: read" ON public.profiles FOR SELECT USING (id = auth.uid() OR public.is_staff());
DROP POLICY IF EXISTS "profiles: manage" ON public.profiles;
CREATE POLICY "profiles: manage" ON public.profiles FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Settings & Company Policies
DROP POLICY IF EXISTS "settings: read" ON public.site_settings;
CREATE POLICY "settings: read" ON public.site_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "settings: write" ON public.site_settings;
CREATE POLICY "settings: write" ON public.site_settings FOR ALL USING (public.is_staff()) WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS "company: read" ON public.company_profile;
CREATE POLICY "company: read" ON public.company_profile FOR SELECT USING (true);
DROP POLICY IF EXISTS "company: write" ON public.company_profile;
CREATE POLICY "company: write" ON public.company_profile FOR ALL USING (public.is_staff()) WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS "sustainability: read" ON public.sustainability_content;
CREATE POLICY "sustainability: read" ON public.sustainability_content FOR SELECT USING (true);
DROP POLICY IF EXISTS "sustainability: write" ON public.sustainability_content;
CREATE POLICY "sustainability: write" ON public.sustainability_content FOR ALL USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Services Policies
DROP POLICY IF EXISTS "services: public read" ON public.services;
CREATE POLICY "services: public read" ON public.services FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "services: staff write" ON public.services;
CREATE POLICY "services: staff write" ON public.services FOR ALL USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Projects Policies
DROP POLICY IF EXISTS "projects: public read" ON public.projects;
CREATE POLICY "projects: public read" ON public.projects FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "projects: staff write" ON public.projects;
CREATE POLICY "projects: staff write" ON public.projects FOR ALL USING (public.is_staff()) WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS "project_images: public read" ON public.project_images;
CREATE POLICY "project_images: public read" ON public.project_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "project_images: staff write" ON public.project_images;
CREATE POLICY "project_images: staff write" ON public.project_images FOR ALL USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Blog Policies
DROP POLICY IF EXISTS "blog_categories: read" ON public.blog_categories;
CREATE POLICY "blog_categories: read" ON public.blog_categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "blog_posts: public read" ON public.blog_posts;
CREATE POLICY "blog_posts: public read" ON public.blog_posts FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "blog_posts: staff write" ON public.blog_posts;
CREATE POLICY "blog_posts: staff write" ON public.blog_posts FOR ALL USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Careers Policies
DROP POLICY IF EXISTS "jobs: public read" ON public.jobs;
CREATE POLICY "jobs: public read" ON public.jobs FOR SELECT USING (is_published = true OR public.is_staff());
DROP POLICY IF EXISTS "jobs: staff write" ON public.jobs;
CREATE POLICY "jobs: staff write" ON public.jobs FOR ALL USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Inquiries Policies
DROP POLICY IF EXISTS "inquiries: public insert" ON public.contact_inquiries;
CREATE POLICY "inquiries: public insert" ON public.contact_inquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "inquiries: staff read" ON public.contact_inquiries;
CREATE POLICY "inquiries: staff read" ON public.contact_inquiries FOR SELECT USING (public.is_staff());
DROP POLICY IF EXISTS "inquiries: staff update" ON public.contact_inquiries;
CREATE POLICY "inquiries: staff update" ON public.contact_inquiries FOR UPDATE USING (public.is_staff()) WITH CHECK (public.is_staff());
DROP POLICY IF EXISTS "inquiries: staff delete" ON public.contact_inquiries;
CREATE POLICY "inquiries: staff delete" ON public.contact_inquiries FOR DELETE USING (public.is_staff());

DROP POLICY IF EXISTS "quotes: public insert" ON public.quote_requests;
CREATE POLICY "quotes: public insert" ON public.quote_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "quotes: staff read" ON public.quote_requests;
CREATE POLICY "quotes: staff read" ON public.quote_requests FOR SELECT USING (public.is_staff());

-- 5. SEED DATA

-- Link Admin user profile
INSERT INTO public.profiles (id, full_name, email, role)
VALUES (
  '3a69e462-c476-4d59-9469-cf17ef01a06a',
  'System Administrator',
  'admin@landscapesolution.et',
  'admin'
) ON CONFLICT (id) DO UPDATE SET role = 'admin', full_name = 'System Administrator';

-- Site Settings
INSERT INTO public.site_settings (id, company_name, phone, email, whatsapp, address, default_language, logo_url)
VALUES (
  1,
  'Landscape Solution PLC',
  '+251 11 667 8901 / +251 91 123 4567',
  'info@landscapesolution.et',
  '251911234567',
  'Bole Sub-City, Addis Ababa, Ethiopia',
  'en',
  '/images/logo.png'
) ON CONFLICT (id) DO UPDATE SET
  company_name = excluded.company_name,
  phone = excluded.phone,
  email = excluded.email,
  whatsapp = excluded.whatsapp,
  address = excluded.address;

-- Company Profile
INSERT INTO public.company_profile (
  id, about, mission, vision, values, company_story, company_description, hero_title, hero_description
) VALUES (
  1,
  '{"en":"Landscape Solution PLC is an Ethiopian company established in 2026 in Addis Ababa, dedicated to contributing to national green development initiatives. We combine innovative technology, creative design, technical expertise, and sustainable practices.","am":"ላንድስኬፕ ሶሉሽን ኃ.የተ.የግ.ማህበር በ2026 በአዲስ አበባ የተቋቋመ የኢትዮጵያ ኩባንያ ሲሆን፣ ለአገራዊ የአረንጓዴ ልማት ጥረቶች የላቀ አስተዋጽኦ ያበረክታል።"}',
  '{"en":"To deliver innovative, aesthetically pleasing, and ecologically sustainable landscape solutions that enhance living environments and foster biodiversity.","am":"የኑሮ አካባቢን የሚያሻሽሉ፣ የተፈጥሮ ውበትንና ስነ-ምህዳራዊ ዘላቂነትን የሚያረጋግጡ ፈጠራ የታከለባቸው የመልክአ ምድር መፍትሄዎችን መስጠት።"}',
  '{"en":"To be the premier landscape architecture and environmental services firm in East Africa by 2030, recognized for excellence, innovation, and environmental stewardship.","am":"እስከ 2030 በምስራቅ አፍሪካ ቀዳሚና ተመራጭ የመልክአ ምድር አርክቴክቸር እና የአካባቢ ጥበቃ አገልግሎት ሰጪ ኩባንያ መሆን።"}',
  '{"en":"Sustainability, Quality, Innovation, Community Engagement, Integrity, Biodiversity Conservation","am":"ዘላቂነት፣ ጥራት፣ ፈጠራ፣ የማህበረሰብ ተሳትፎ፣ ታማኝነት፣ የብዝሃ-ሕይወት ጥበቃ"}',
  '{"en":"Landscape Solution PLC was established in Addis Ababa to contribute directly to Ethiopia''s ambitious urban greening and climate resilience initiatives. We deliver turn-key solutions from botanical nursery cultivation to large-scale urban park execution.","am":"ላንድስኬፕ ሶሉሽን የተቋቋመው ለኢትዮጵያ የአረንጓዴ ልማትና የአየር ንብረት ለውጥ መቋቋም ጥረቶች የበኩሉን አስተዋጽኦ ለማበርከት ነው።"}',
  '{"en":"Professional landscaping company dedicated to creating aesthetically pleasing, functional, and sustainable indoor and outdoor environments across Ethiopia.","am":"በመላ ኢትዮጵያ ውበት ያላቸው፣ ተግባራዊ እና ዘላቂ የሆኑ የውስጥና የውጪ የተፈጥሮ አካባቢዎችን በመፍጠር ረገድ የተሰማራ ፕሮፌሽናል የመልክአ ምድር ኩባንያ።"}',
  '{"en":"Professional Landscape Solutions for a Greener Future","am":"ለአረንጓዴ የወደፊት ዘመናዊ የመልክአ ምድር መፍትሄዎች"}',
  '{"en":"Dedicated to creating aesthetically pleasing, functional, and sustainable indoor and outdoor environments across Ethiopia through innovation, technical expertise, and environmental responsibility.","am":"በፈጠራ፣ በቴክኒካል ብቃት እና በአካባቢያዊ ኃላፊነት በመላ ኢትዮጵያ ውብ፣ ተግባራዊ እና ዘላቂ የሆኑ የተፈጥሮ አካባቢዎችን እንገነባለን።"}'
) ON CONFLICT (id) DO UPDATE SET
  about = excluded.about, mission = excluded.mission, vision = excluded.vision,
  values = excluded.values, hero_title = excluded.hero_title, hero_description = excluded.hero_description;

-- Sustainability Content
INSERT INTO public.sustainability_content (
  id, title, introduction, water_conservation, native_plants, environmental_responsibility,
  eco_friendly_practices, waste_reduction, sustainable_design, initiatives, statistics
) VALUES (
  1,
  '{"en":"Environmental Responsibility & Green Development","am":"የአካባቢ ጥበቃ ኃላፊነት እና አረንጓዴ ልማት"}',
  '{"en":"Ethiopia is actively implementing green development initiatives to address climate change, deforestation, and environmental degradation. Landscape Solution PLC was founded to advance these commitments through science-backed landscaping and ecological stewardship.","am":"ኢትዮጵያ የአየር ንብረት ለውጥን፣ የደን መጨፍጨፍንና የአካባቢ መራቆትን ለመቅረፍ የአረንጓዴ ልማት ስራዎችን እያከናወነች ትገኛለች።"}',
  '{"en":"Precision drip irrigation, automated smart scheduling, and drought-tolerant plant palettes optimize every drop of water in urban and nursery environments.","am":"ዘመናዊ የጠብታ መስኖዎች እና ውሃ ቆጣቢ እፅዋት የውሃ ብክነትን በከፍተኛ ደረጃ ይቀንሳሉ።"}',
  '{"en":"Dedicated production and preservation of indigenous Ethiopian flora, native ornamentals, shade trees, and medicinal species.","am":"አገር በቀል የኢትዮጵያ እፅዋትን፣ የደን ዛፎችንና የመድኃኒት ቅመሞችን በጥራት ማፍላትና መጠበቅ።"}',
  '{"en":"Integrating professional landscape expertise with deep ecological ethics to foster healthier communities and biodiversity.","am":"የመልክአ ምድር የሙያ ብቃትን ከአካባቢ ጥበቃ ስነ-ምግባር ጋር በማቀናጀት ጤናማ ማህበረሰብን መገንባት።"}',
  '{"en":"Climate-smart landscaping, integrated organic pest management, and zero-chemical soil cultivation protocols.","am":"የአየር ንብረት ተስማሚ አሰራር፣ የተፈጥሮ ተባይ መከላከያ እና ኬሚካል አልባ የአፈር አያያዝ።"}',
  '{"en":"Recycling 100% of green biomass and landscape clippings into nutrient-dense organic compost.","am":"የአትክልት ተረፈ-ምርቶችን በሙሉ መልሶ በመጠቀም ወደ ተፈጥሮ ማዳበሪያነት መቀየር።"}',
  '{"en":"Architectural spatial layouts engineered for natural stormwater filtration, solar orientation, and micro-climate cooling.","am":"የተፈጥሮ ዝናብ ውሃን በአግባቡ የሚይዙ እና የከባቢ አየር ቅዝቃዜን የሚፈጥሩ የዲዛይን እሳቤዎች።"}',
  '[{"en":"Active contribution to Ethiopia''s national Green Legacy initiatives","am":"ለአገራዊው የአረንጓዴ አሻራ መርሃ-ግብር ንቁ አስተዋጽኦ ማበርከት"},{"en":"Large-scale indigenous seedling propagation and distribution","am":"አገር በቀል ችግኞችን በስፋት ማፍላትና ማሰራጨት"},{"en":"Bio-engineered slope stabilization on degraded soils","am":"በተራቆቱ መሬቶች ላይ የተፈጥሮ የአፈር መሸርሸር መከላከያ መስራት"},{"en":"Youth and community vocational trainings in sustainable horticulture","am":"ለወጣቶችና ለማህበረሰቡ ዘላቂ የሆርቲካልቸር ስልጠና መስጠት"}]'::jsonb,
  '[{"label":{"en":"Documented Services","am":"ዋና ዋና አገልግሎቶች"},"value":"11"},{"label":{"en":"Core Objectives","am":"ዋነኛ ግቦች"},"value":"12"},{"label":{"en":"Founded","am":"የተመሰረተበት"},"value":"2026"},{"label":{"en":"Vision Target","am":"የራዕይ ዘመን"},"value":"2030"}]'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  title = excluded.title, introduction = excluded.introduction,
  water_conservation = excluded.water_conservation, native_plants = excluded.native_plants,
  initiatives = excluded.initiatives, statistics = excluded.statistics;

-- Services (The 11 Official Services from web_information.md)
INSERT INTO public.services (slug, category_group, title, short_description, description, featured_image, features, is_featured, is_published, sort_order)
VALUES
('landscape-planning-design', 'Landscape & Design',
  '{"en":"Landscape Planning and Design","am":"የመልክአ ምድር ፕላን እና ዲዛይን"}',
  '{"en":"Master planning, 2D/3D visualization, planting schemes, hardscape architecture, and sustainable drainage solutions for residential, commercial, and institutional projects across Ethiopia.","am":"ለግል መኖሪያ ቤቶች፣ ለንግድና ለመንግስታዊ ተቋማት ዘመናዊ የመልክአ ምድር ፕላን፣ የ2D/3D ዲዛይን እና ዘላቂ የፍሳሽ ማስወገጃ ንድፎች።"}',
  '{"en":"Comprehensive landscape architecture and master planning combining aesthetic excellence, ecological functionality, and climate resilience. From residential estates to large urban developments, our multidisciplinary team provides turnkey planning services from concept sketches to construction documents.","am":"የመልክአ ምድር አርክቴክቸር እና ማስተር ፕላን አገልግሎት። ውበትን፣ ተግባራዊነትን እና ዘላቂነትን በማቀናጀት ከፅንሰ-ሃሳብ እስከ ሙሉ ግንባታ ሰነድ ድረስ እንሰራለን።"}',
  '/images/service_planning.jpg',
  '["Site Analysis & Topographical Assessment","Comprehensive Conceptual Master Planning","2D Technical Plans & Photorealistic 3D Modeling","Biophilic & Climate-Adapted Planting Palettes","Hardscape, Pathway & Lighting Layouts","Sustainable Urban Drainage Systems (SuDS)"]'::jsonb,
  true, true, 1),

('landscape-construction-implementation', 'Landscape & Design',
  '{"en":"Landscape Construction and Implementation","am":"የመልክአ ምድር ግንባታ እና አተገባበር"}',
  '{"en":"Turnkey civil earthworks, natural stone masonry, paving, pergolas, bespoke water features, and softscape planting execution built to rigorous structural standards.","am":"የመሬት ዝግጅት፣ የተፈጥሮ ድንጋይ ንጣፍ፣ ፔርጎላ፣ የውሃ ፏፏቴዎችና የተሟላ የተከላ ግንባታ።"}',
  '{"en":"End-to-end landscape construction transforming architectural designs into enduring reality. Our dedicated civil teams, horticulturists, and craftsmen execute precision grading, high-end stone masonry, custom architectural structures, and lush softscape installations.","am":"የመልክአ ምድር ንድፎችን ወደ ተጨባጭ እውነታ የሚቀይር የግንባታ አገልግሎት። የድንጋይ ንጣፍ፣ ግንቦች፣ የመዝናኛ ስፍራዎች እና የተከላ ስራዎችን በጥራት እናከናውናለን።"}',
  '/images/service_construction.jpg',
  '["Precision Grading, Excavation & Soil Prep","High-End Stone Paving & Retaining Walls","Custom Timber Pergolas, Gazebos & Decking","Bespoke Water Features & Reflection Pools","Specimen Tree Hoisting & Precision Planting","Architectural Landscape Illumination Wiring"]'::jsonb,
  true, true, 2),

('landscape-maintenance', 'Landscape & Design',
  '{"en":"Commercial & Residential Landscape Maintenance","am":"የንግድ እና የመኖሪያ መልክአ ምድር ጥገና"}',
  '{"en":"Scheduled turf management, precision pruning, integrated organic pest control, seasonal aeration, and complete groundskeeping for estates, embassies, and hotels.","am":"የሳር ሜዳ እንክብካቤ፣ የዛፎች ቅርጽ ማስተካከል፣ ተፈጥሯዊ የተባይ መከላከያ እና የሆቴልና ኤምባሲ ግቢ ጥበቃ።"}',
  '{"en":"Long-term grounds maintenance programs keeping commercial campuses, embassies, and luxury residential estates immaculate, flourishing, and safe throughout Ethiopia''s alternating rainy and dry seasons.","am":"የንግድ ተቋማት፣ ኤምባሲዎች እና መኖሪያ ቤቶች የመልክአ ምድር ውበት ዘወትር ተጠብቆ እንዲቆይ የሚያስችል ወቅታዊና ዘላቂ የጥገና አገልግሎት።"}',
  '/images/service_maintenance.jpg',
  '["Mowing, Edging & Lawn De-thatching","Seasonal Specimen Pruning & Hedge Shaping","Integrated Organic Pest & Disease Management","Soil Aeration, Conditioning & Mulch Replenishment","Automated Irrigation System Audit & Winterization","Quarterly Plant Health & Vigor Evaluations"]'::jsonb,
  true, true, 3),

('environmental-restoration', 'Water & Environment',
  '{"en":"Environmental Restoration & Soil Bio-Engineering","am":"የአካባቢ መልሶ ማቋቋም እና የስነ-ምህዳር ጥበቃ"}',
  '{"en":"Erosion control, slope stabilization using vetiver grass and live brush-layering, degraded site reclamation, and native habitat restoration across Ethiopia.","am":"የአፈር መሸርሸር መከላከያ፣ የተራቆቱ መሬቶችን መልሶ ማልማት እና የተፈጥሮ ስነ-ምህዳር ጥበቃ።"}',
  '{"en":"Restoring degraded landscapes through proven bio-engineering techniques, indigenous reforestation, and watershed protection. We solve complex slope instability and erosion problems using living plant systems.","am":"በተፈጥሮ እፅዋት እና በባዮ-ኢንጂነሪንግ ቴክኖሎጂዎች የተራቆቱ መሬቶችን፣ የወንዝ ዳርቻዎችን እና ተዳፋት ቦታዎችን መልሶ ማቋቋም ስራ።"}',
  '/images/service_restoration.jpg',
  '["Erosion Control & Watershed Protection","Deep-Rooted Slope Bio-Engineering (Vetiver & Live Staking)","Degraded Quarry & Industrial Site Reclamation","Riparian Buffer & Riverbank Stabilization","Native Flora Re-introduction Protocols","Long-Term Biodiversity & Succession Monitoring"]'::jsonb,
  true, true, 4),

('irrigation-systems', 'Water & Environment',
  '{"en":"Advanced Irrigation & Water Management Systems","am":"ዘመናዊ የመስኖ እና የውሃ አያያዝ ስርዓት"}',
  '{"en":"Precision drip irrigation, automated smart controllers, rainwater harvesting tanks, greywater recycling, and pressure-regulated spray zones minimizing water usage.","am":"ውሃ ቆጣቢ የጠብታ መስኖ፣ አውቶማቲክ ተቆጣጣሪዎች፣ የዝናብ ውሃ አሰባሰብ እና የፍሳሽ ውሃ መልሶ ጥቅም ላይ ማዋል ስራ።"}',
  '{"en":"Engineered water delivery systems that maximize water conservation while guaranteeing optimal plant vitality across residential and commercial landscapes.","am":"የውሃ ብክነትን በከፍተኛ ደረጃ የሚቀንሱ እና እፅዋት አስፈላጊውን እርጥበት እንዲያገኙ የሚያስችሉ ዘመናዊ የመስኖ ቴክኖሎጂዎች።"}',
  '/images/service_irrigation.jpg',
  '["Smart Weather-Based Automated Controllers","Subsurface & Precision Drip Systems","Rainwater Harvesting & Underground Cisterns","Commercial Turf Pop-up Sprinkler Networks","Soil Moisture Sensor Integration","Filtration, Fertigation & Backflow Prevention"]'::jsonb,
  false, true, 5),

('urban-greening', 'Water & Environment',
  '{"en":"Urban Greening and Environmental Services","am":"የከተማ አረንጓዴ ልማት እና የአካባቢ ጥበቃ አገልግሎት"}',
  '{"en":"Urban corridor greening, green roof installations, living green walls, streetscape canopy design, and microclimate mitigation contributing to Ethiopia''s Green Legacy.","am":"የከተማ ጎዳናዎች አረንጓዴ ልማት፣ የጣሪያ ላይ የአትክልት ስራ (Green Roof)፣ የህንፃ ግድግዳ አረንጓዴ ልማት።"}',
  '{"en":"Accelerating Ethiopia''s urban green transition by transforming concrete infrastructure into living biophilic systems that lower urban heat island effects.","am":"የከተማ አካባቢዎችን ወደ አረንጓዴና ምቹ ስፍራዎች የሚቀይሩ የጎዳና ላይ ዛፎች ተከላ፣ የጣሪያና የግድግዳ አረንጓዴ ስራዎች።"}',
  '/images/service_urban_greening.jpg',
  '["Green Roof Design, Waterproofing & Planting","Modular Living Walls & Vertical Gardens","Street Tree Planting & Root Barrier Systems","Roadway Green Corridor Infrastructure","Urban Heat Island Mitigation Modeling","Permeable Pavement & Bioswale Integration"]'::jsonb,
  false, true, 6),

('commercial-nursery', 'Plants & Gardens',
  '{"en":"Commercial Nursery & Plant Propagation","am":"የንግድ ችግኝ ማፍያ እና የእፅዋት እርባታ"}',
  '{"en":"Large-scale propagation of Ethiopian native trees, ornamental shrubs, groundcovers, flowering perennials, and indoor acclimatized tropical plants in our nursery.","am":"አገር በቀል ዛፎች፣ የጌጣጌጥ አበቦች፣ የጥላ እፅዋት እና የቤት ውስጥ እፅዋትን በስፋት የማፍላትና የማሰራጨት ስራ።"}',
  '{"en":"State-of-the-art nursery facility propagating robust, acclimatized seedlings and mature specimen plants for landscaping projects throughout Ethiopia.","am":"ለተለያዩ የመልክአ ምድር ፕሮጀክቶች የሚሆኑ ጠንካራና ጥራት ያላቸውን አገር በቀልና የውጭ ዝርያ እፅዋትን የሚያቀርብ ዘመናዊ ችግኝ ጣቢያ።"}',
  '/images/service_nursery.jpg',
  '["Indigenous Ethiopian Tree Seedling Propagation","Acclimatized Ornamental Shrubs & Palms","Drought-Tolerant Turfgrass Sod Production","Interior Acclimatized Tropical Pot Plants","Bulk Commercial Supply for Contractors","Custom Contract Growing for Large Developments"]'::jsonb,
  false, true, 7),

('botanic-garden-development', 'Plants & Gardens',
  '{"en":"Botanic Garden Development & Plant Collections","am":"የእፅዋት ማዕከል (ቦታኒክ ጋርደን) ልማት"}',
  '{"en":"Scientific planning, taxonomic curation, thematic garden zones, visitor interpretive trails, and conservation living collections for universities and institutions.","am":"ለዩኒቨርሲቲዎች፣ ለምርምር ማዕከላትና ለህዝብ መናፈሻዎች ሳይንሳዊ የእፅዋት ስብስቦችና የቦታኒክ ጋርደን ልማት።"}',
  '{"en":"Specialized botanical landscape architecture designing living museums of plant diversity that serve conservation, academic research, and public enjoyment.","am":"የተለያዩ የእፅዋት ዝርያዎችን በአንድ ስፍራ በመሰብሰብ ለጥናት፣ ለምርምር እና ለህዝብ መዝናኛነት የሚያገለግሉ የእፅዋት ማዕከላት ዲዛይንና ግንባታ።"}',
  '/images/service_botanic.jpg',
  '["Taxonomic & Phytogeographic Spatial Planning","Thematic Display Zones (Medicinal, Succulent, Montane)","Herbarium & Living Plant Accession Tagging","Accessible Educational Trails & Braille Signage","Controlled Environment Glasshouse Landscaping","Rare & Endangered Species Ex-Situ Conservation"]'::jsonb,
  false, true, 8),

('plant-identification-survey', 'Professional Services',
  '{"en":"Plant Identification and Floristic Inventory","am":"የእፅዋት ዝርያ መለያ እና የፍሎራ ቅኝት ጥናት"}',
  '{"en":"Botanical baseline surveys, floristic inventories, invasive species mapping, and ecological documentation for environmental impact assessments (EIA).","am":"የቦታኒክ ቅኝት፣ የአካባቢ ተፅዕኖ ግምገማ (EIA)፣ ወራሪ እፅዋትን የመለየትና የብዝሃ-ሕይወት ሪፖርት ማዘጋጀት።"}',
  '{"en":"Rigorous field botany services identifying, georeferencing, and documenting native and introduced plant species to support ecological compliance and conservation.","am":"በሳይንሳዊ መንገድ የእፅዋትን ዝርያዎች በመለየት፣ የመረጃ ቋት በማዘጋጀትና የአካባቢ ጥበቃ መስፈርቶችን እንዲያሟሉ የማማከር አገልግሎት።"}',
  '/images/service_plant_id.jpg',
  '["Field Botanical Baseline Surveys for EIA","Herbarium-Standard Plant Identification","Invasive Weed Mapping & Containment Plans","Species Diversity (Shannon-Wiener) Indices","Ethnobotanical & Medicinal Use Documentation","Digital GIS-Integrated Flora Mapping"]'::jsonb,
  false, true, 9),

('tree-risk-assessment', 'Professional Services',
  '{"en":"Tree Risk Assessment and Arboricultural Survey","am":"የዛፎች ደህንነት ምርመራ እና እንክብካቤ ጥናት"}',
  '{"en":"Visual Tree Assessment (VTA), decay detection, structural stability evaluations, and preservation plans during civil infrastructure development.","am":"የዛፎችን ጥንካሬና ደህንነት በቴክኖሎጂ መመርመር፣ አደጋ እንዳያደርሱ መከላከልና በግንባታ ወቅት ጥበቃ ማድረግ።"}',
  '{"en":"Professional arboricultural inspections protecting public safety and valuable mature urban trees during construction, development, and estate management.","am":"በከተሞችና በግቢዎች ውስጥ ያሉ ትልልቅ ዛፎች አደጋ እንዳያስከትሉ ሳይንሳዊ ምርመራ በማድረግ የመፍትሄ እርምጃዎችን እንሰጣለን።"}',
  '/images/who_we_are.jpg',
  '["Visual Tree Assessment (VTA) Protocols","Internal Trunk Decay & Cavity Sounding","Construction Site Tree Protection Plans (TPP)","High-Risk Tree Crown Reduction & Cable Bracing","Urban Tree Inventory with GPS Mapping","Arboricultural Hazard Reports for Municipalities"]'::jsonb,
  false, true, 10),

('organic-compost-production', 'Plants & Gardens',
  '{"en":"Organic Compost Production and Soil Health","am":"የተፈጥሮ ማዳበሪያ (ኮምፖስት) ማምረትና የአፈር ማበልፀግ"}',
  '{"en":"Zero-waste green biomass recycling, organic soil amendments, microbial teas, and soil health management for lush turf and thriving landscapes.","am":"የአትክልት ተረፈ-ምርቶችን ወደ ተፈጥሮ ማዳበሪያነት መቀየር፣ የአፈር ለምነትን ማሳደግና ኬሚካል አልባ የምግብ ንጥረ-ነገር ዝግጅት።"}',
  '{"en":"Transforming municipal and estate green waste into nutrient-dense, weed-seed-free organic compost that restores soil structure and biological vitality.","am":"የአካባቢ ተረፈ-ምርቶችን መልሶ በመጠቀም ጥራት ያለው የተፈጥሮ ማዳበሪያ ማምረትና የተራቆተ አፈርን የማበልፀግ ስራ።"}',
  '/images/service_compost.jpg',
  '["Aerobic Thermophilic Windrow Composting","100% Pathogen & Weed-Seed Sterilization","Microbial Compost Tea Brewing for Foliar Health","Custom Soil Blends (Cactus, Turf, Forest Floor)","Heavy Clay & Sandy Soil Bio-Remediation","Bulk Organic Fertilizer Supply in Addis Ababa"]'::jsonb,
  false, true, 11)
ON CONFLICT (slug) DO UPDATE SET
  title = excluded.title,
  short_description = excluded.short_description,
  description = excluded.description,
  featured_image = excluded.featured_image,
  features = excluded.features,
  category_group = excluded.category_group;

-- Projects (Portfolio with Slideshow Galleries)
INSERT INTO public.projects (slug, category, tag, location, client, year, title, short_description, description, featured_image, is_featured, is_published, sort_order)
VALUES
('cbe-plaza-green-grounds', 'Commercial', 'Landscape Architecture & Master Planning • Addis Ababa, Ethiopia',
  'Addis Ababa, Ethiopia', 'Commercial Bank of Ethiopia', '2026',
  '{"en":"Commercial Bank of Ethiopia Plaza & Green Grounds","am":"የኢትዮጵያ ንግድ ባንክ ዋና መሥሪያ ቤት የመልክአ ምድር ልማት"}',
  '{"en":"Turnkey exterior and interior corporate landscape design for East Africa''s tallest commercial headquarters.","am":"በምስራቅ አፍሪካ ግዙፉ የንግድ ባንክ ዋና መሥሪያ ቤት ውብ የመልክአ ምድር ዲዛይንና ግንባታ።"}',
  '{"en":"A landmark urban corporate landscape in the heart of Addis Ababa featuring tiered basalt stone water plazas, climate-smart drip irrigation, and shaded pedestrian gathering zones designed to complement the skyscraper''s iconic architecture.","am":"በአዲስ አበባ ልብ ውስጥ የሚገኘው ይህ ፕሮጀክት የተፈጥሮ ባዛልት ድንጋይ ንጣፎችን፣ ዘመናዊ የውሃ ፏፏቴዎችን እና ውብ አረንጓዴ መናፈሻዎችን ያካተተ ነው።"}',
  '/images/services/landscape-planning-design.png', true, true, 1),

('riverside-green-corridor', 'Public & Urban', 'Urban Greening & Riverbank Bio-Engineering • Addis Ababa, Ethiopia',
  'Addis Ababa, Ethiopia', 'City Administration', '2026',
  '{"en":"Addis Ababa Riverside Green Corridor Restoration","am":"የአዲስ አበባ ወንዝ ዳርቻ አረንጓዴ ኮሪደር መልሶ ማቋቋም"}',
  '{"en":"Ecological riverbank stabilization and 3.5 km public linear greenway restoring native riparian vegetation.","am":"የወንዝ ዳርቻን በአገር በቀል እፅዋት መልሶ ማቋቋምና ዘመናዊ የእግረኛና የሳይክል መሄጃ አረንጓዴ ስፍራ መገንባት።"}',
  '{"en":"Comprehensive ecological restoration project transforming degraded urban riverbanks into a flourishing green corridor with bio-engineered slope reinforcement, porous walking paths, and community recreational spaces.","am":"የተራቆቱ የወንዝ ዳርቻዎችን ከአፈር መሸርሸር የሚከላከሉ የባዮ-ኢንጂነሪንግ ስራዎችን በመጠቀም የተሰራ የተዋጣለት የከተማ አረንጓዴ ፕሮጀክት።"}',
  '/images/services/environmental-restoration.png', true, true, 2),

('entoto-mountain-eco-lodge', 'Hospitality', 'Ecological Landscape Design & Native Reforestation • Entoto, Ethiopia',
  'Entoto Hills, Addis Ababa', 'Eco-Hospitality Partners', '2026',
  '{"en":"Entoto Mountain Forest Lodge & Ecological Trail","am":"የእንጦጦ ተራራ ኢኮ-ሎጅ እና የተፈጥሮ የእግር መንገድ"}',
  '{"en":"Highland biophilic landscape preserving existing eucalyptus and juniper canopies with indigenous understory planting.","am":"በእንጦጦ ተራራ ላይ የተገነባ የተፈጥሮ ዛፎችን የጠበቀ እና ውብ አገር በቀል እፅዋትን ያካተተ የመዝናኛ ስፍራ።"}',
  '{"en":"Harmonizing luxury eco-tourism with ecological conservation on the Entoto ridge, incorporating natural timber walkways, wild perennial rockeries, and rainwater capture reservoirs.","am":"የተፈጥሮ ጫካውን ሚዛን ሳይረብሽ የተገነባ፣ የተፈጥሮ ድንጋይና እንጨትን ያካተተ እና ለጎብኝዎች ልዩ ሰላምና እርጋታ የሚሰጥ ማራኪ መልክአ ምድር።"}',
  '/images/services/landscape-construction.png', true, true, 3),

('bole-international-rooftop-terrace', 'Commercial', 'Rooftop Garden & Biophilic Living Terrace • Bole, Addis Ababa',
  'Bole Sub-City, Addis Ababa', 'Private Developer', '2026',
  '{"en":"Bole Business Center Rooftop Oasis & Living Terrace","am":"የቦሌ ቢዝነስ ሴንተር የጣሪያ ላይ መናፈሻ እና ሳሎን"}',
  '{"en":"Engineered lightweight green roof terrace featuring drought-tolerant succulents, micro-spray irrigation, and scenic pergolas.","am":"በዘመናዊ ህንፃ ጣሪያ ላይ የተሰራ አነስተኛ ክብደት ያለው ውብ የአትክልት ስፍራ እና ማረፊያ።"}',
  '{"en":"An innovative urban green roof utilizing lightweight engineered growing media, automated precision fertigation, and acoustic plant buffers that shield rooftop visitors from bustling urban sounds.","am":"በህንፃው ጣሪያ ላይ ያለውን የፀሐይ ሙቀት የሚከላከል፣ ዝናብ ውሃን በአግባቡ የሚይዝ እና ለቢሮ ሰራተኞች ማረፊያ የሚሆን ዘመናዊ የጣሪያ መናፈሻ።"}',
  '/images/services/urban-greening.png', true, true, 4),

('biodiversity-conservatory-arboretum', 'Institutional', 'Botanical Collection & Native Species Conservation • Addis Ababa',
  'Addis Ababa, Ethiopia', 'Ethiopian Biodiversity Institute', '2026',
  '{"en":"National Botanical Conservatory & Native Arboretum","am":"ብሔራዊ የቦታኒክ ማዕከል እና አገር በቀል ዛፎች አርቦሬተም"}',
  '{"en":"Specialized botanical master plan housing over 250 endangered Ethiopian plant species and educational walkways.","am":"ከ250 በላይ ብርቅዬና አገር በቀል የኢትዮጵያ እፅዋትን የያዘ ሳይንሳዊ የቦታኒክ ማዕከል ማስተር ፕላን።"}',
  '{"en":"Developed in collaboration with conservation scientists, this public botanic garden showcases Ethiopia''s incredible biodiversity through micro-climatic zoning, interpretive educational signage, and sustainable water bodies.","am":"በተለያዩ የአየር ንብረት ቀጠናዎች የሚበቅሉ የኢትዮጵያ እፅዋትን በአንድ ላይ የሚያሳይ እና ለትምህርትና ምርምር የሚያገለግል የላቀ ፕሮጀክት።"}',
  '/images/services/botanic-gardens.png', true, true, 5),

('rift-valley-resort-restoration', 'Hospitality', 'Lake Shoreline Bio-Engineering & Native Nursery • Rift Valley',
  'Rift Valley, Ethiopia', 'Rift Valley Eco-Resorts', '2026',
  '{"en":"Rift Valley Eco-Resort & Shoreline Buffer Restoration","am":"የስምጥ ሸለቆ ኢኮ-ሪዞርት እና የሐይቅ ዳርቻ ጥበቃ"}',
  '{"en":"Wetland habitat rehabilitation, lake buffer planting, and 12-hectare master planned resort grounds.","am":"የሐይቅ ዳርቻ የአፈር መሸርሸርን መከላከል እና የ12 ሄክታር ሪዞርት ውብ የመልክአ ምድር ልማት።"}',
  '{"en":"Integrating native wetland reeds, acacia wood hardscaping, and large-scale indigenous tree nursery integration to protect the delicate lake ecosystem while providing world-class hospitality grounds.","am":"የሐይቁን የተፈጥሮ ስነ-ምህዳር እየጠበቀ ጎብኝዎችን የሚያስደስት የተሟላ የሪዞርት መልክአ ምድር ልማት።"}',
  '/images/services/commercial-nursery.png', true, true, 6)
ON CONFLICT (slug) DO UPDATE SET
  title = excluded.title,
  short_description = excluded.short_description,
  description = excluded.description,
  featured_image = excluded.featured_image,
  tag = excluded.tag,
  location = excluded.location;

-- Project Images for Slideshows
INSERT INTO public.project_images (project_id, image_url, alt_text, sort_order)
SELECT p.id, img.url, img.alt, img.ord
FROM public.projects p
CROSS JOIN LATERAL (
  VALUES
    (p.featured_image, 'Main Cover View', 1),
    ('/images/hero_landscape.jpg', 'Panoramic Landscape Overview', 2),
    ('/images/who_we_are.jpg', 'Architectural Detail & Green Grounds', 3),
    ('/images/service_planning.jpg', 'Design & Execution Highlights', 4)
) AS img(url, alt, ord)
ON CONFLICT (project_id, image_url) DO NOTHING;

-- Blog Categories
INSERT INTO public.blog_categories (name, slug, description)
VALUES
('{"en":"Urban Greening","am":"የከተማ አረንጓዴ ልማት"}', 'urban-greening', '{"en":"Urban ecology and architecture in Ethiopia","am":"የከተማ ስነ-ምህዳር"}'),
('{"en":"Water & Irrigation","am":"የመስኖ ቴክኖሎጂ"}', 'water-irrigation', '{"en":"Precision water conservation","am":"ውሃ ቆጣቢ ቴክኖሎጂ"}'),
('{"en":"Soil & Science","am":"የአፈር ሳይንስ"}', 'soil-science', '{"en":"Soil health and organic composting","am":"የአፈር ለምነት"}'),
('{"en":"Native Biodiversity","am":"አገር በቀል እፅዋት"}', 'native-biodiversity', '{"en":"Indigenous Ethiopian flora and conservation","am":"አገር በቀል ብዝሃ-ሕይወት"}')
ON CONFLICT (slug) DO NOTHING;

-- Blog Posts
INSERT INTO public.blog_posts (slug, title, category_id, excerpt, body, featured_image, author_name, author_role, reading_time, is_featured, is_published)
VALUES
('revitalizing-addis-ababa-urban-greening',
  '{"en":"Revitalizing Addis Ababa: The Role of Sustainable Urban Greening & Native Flora","am":"አዲስ አበባን ማለምለም፡ የዘላቂ ከተማ አረንጓዴ ልማት እና የአገር በቀል እፅዋት ሚና"}',
  (SELECT id FROM public.blog_categories WHERE slug = 'urban-greening' LIMIT 1),
  '{"en":"As urbanization accelerates across East Africa, integrating climate-smart green spaces into urban master planning is no longer a luxury — it is an environmental necessity.","am":"በምስራቅ አፍሪካ የከተሞች መስፋፋት እየፈጠነ በመጣበት በአሁኑ ወቅት፣ አረንጓዴ ስፍራዎችን በከተማ ፕላን ውስጥ ማካተት የቅንጦት ሳይሆን የግድ አስፈላጊ ነው።"}',
  '{"en":"### Urban Challenges and the Green Imperative\n\nAddis Ababa is currently undergoing unprecedented infrastructural expansion. However, rapid paved surfaces lead to the **urban heat island effect**, worsened air pollution, and stormwater runoff flash floods. \n\nAt **Landscape Solution PLC**, our mission aligns directly with Ethiopia''s national **Green Legacy Initiative**.\n\n### The Superpower of Indigenous Ethiopian Flora\n\nUnlike imported ornamental species that demand excessive watering and chemical treatments, indigenous Ethiopian plants such as *Juniperus procera* (Tid), *Podocarpus falcatus* (Zigba), and *Olea europaea subsp. cuspidata* (Weyra) have evolved over millenia to thrive in our distinct two-season climate.\n\n1. **Deep Drought Resilience:** Established native trees endure the dry season with minimal supplemental irrigation.\n2. **Biodiversity Anchors:** Native trees host local pollinator species and native birds.\n3. **Stormwater Infiltration:** Deep root architectures break up compacted volcanic soil, recharging natural groundwater aquifers.\n\n### Designing for Tomorrow\n\nBy uniting architectural foresight with rigorous botanical science, Landscape Solution PLC creates urban green corridors that endure for generations.","am":"### የከተሞች ፈተና እና የአረንጓዴ ልማት አስፈላጊነት\n\nአዲስ አበባ ፈጣን የመሰረተ ልማት ግንባታ እያካሄደች ትገኛለች። ይሁን እንጂ የኮንክሪት ንጣፎች መጨመር የከተማውን ሙቀት ከፍ እያደረገው ይገኛል።\n\nላንድስኬፕ ሶሉሽን ፒኤልሲ ይህንን ችግር ለመፍታት ከአገራዊው የአረንጓዴ አሻራ መርሃ-ግብር ጋር የተጣጣሙ ስራዎችን ያከናውናል።"}',
  '/images/services/urban-greening.png',
  'Landscape Solution Editorial Team', 'Urban Ecology Specialists', '5 min read', true, true),

('water-smart-landscaping-ethiopia',
  '{"en":"Water-Smart Landscaping: High-Efficiency Drip Irrigation in Ethiopian Climates","am":"ውሃ ቆጣቢ የመልክአ ምድር ስራ፡ ዘመናዊ የጠብታ መስኖ በኢትዮጵያ የአየር ንብረት"}',
  (SELECT id FROM public.blog_categories WHERE slug = 'water-irrigation' LIMIT 1),
  '{"en":"How modern precision micro-irrigation, sensor integration, and rainwater harvesting can reduce landscape water demand by up to 60%.","am":"ዘመናዊ የጠብታ መስኖዎች እና የዝናብ ውሃ አሰባሰብ ዘዴዎች የውሃ ብክነትን እስከ 60 በመቶ እንዴት እንደሚቀንሱ።"}',
  '{"en":"### Rethinking Irrigation in Ethiopia\n\nWater is one of our most precious natural resources. Traditional overhead sprinkler systems lose up to 45% of water to evaporation and wind drift during warm sunny afternoons.\n\n### Precision Subsurface & Drip Technologies\n\nModern automated drip emitters deliver measured moisture directly to root zones where plants absorb it immediately. \n\nKey advantages of smart irrigation include:\n\n* **Zero Evaporative Waste:** Applying water beneath root mulch preserves moisture for days.\n* **Smart Rain Delay Sensors:** Automatically pause programmed cycles during heavy rainfalls.\n* **Zero Fungal Leaf Mildew:** Keeping foliage dry prevents destructive fungal outbreaks.","am":"### በኢትዮጵያ የመስኖ አጠቃቀምን ማዘመን\n\nውሃ ውድ የተፈጥሮ ሀብታችን ነው። የተለመዱ የመስኖ ዘዴዎች እስከ 45% የሚሆነውን ውሃ በፀሐይ ትነት ያባክናሉ። ዘመናዊ የጠብታ መስኖ በቀጥታ ለእፅዋቱ ስር እርጥበት በመስጠት የውሃ ብክነትን ይከላከላል።"}',
  '/images/services/advanced-irrigation.png',
  'Dawit Haile', 'Lead Irrigation Engineer', '4 min read', true, true),

('soil-health-organic-compost-landscaping',
  '{"en":"Soil Health in Landscape Architecture: Why Organic Compost Outperforms Synthetic Additives","am":"የአፈር ጤንነት በመልክአ ምድር ግንባታ፡ የተፈጥሮ ኮምፖስት ከኬሚካል ማዳበሪያ ለምን እንደሚበልጥ"}',
  (SELECT id FROM public.blog_categories WHERE slug = 'soil-science' LIMIT 1),
  '{"en":"Healthy landscapes begin underground. Discover how 100% locally produced organic compost revitalizes compacted urban soils and builds long-term drought resilience.","am":"ጤናማ የመልክአ ምድር ስራ ከመሬት በታች ካለው አፈር ይጀምራል። የተፈጥሮ ኮምፖስት አፈርን እንዴት እንደሚያበለፅግ ይወቁ።"}',
  '{"en":"### The Living Foundation of Great Landscapes\n\nIn many urban developments, construction machinery compacts topsoil into an impenetrable, lifeless clay. Synthetic fertilizers offer short-term nutrient spikes but degrade soil microbiology over time.\n\n### Why Microbial Organic Compost is Superior\n\n* **Restores Soil Structure:** Organic matter increases aeration in heavy black clay (Koticha) and moisture retention in sandy soils.\n* **Living Microbial Activity:** Beneficial mycorrhizal fungi establish symbiotic bonds with roots, unlocking essential phosphorus.\n* **Zero Chemical Runoff:** Protects urban streams and groundwater aquifers from nitrate contamination.","am":"### የአፈርን የተፈጥሮ ለምነት ማደስ\n\nየተፈጥሮ ኮምፖስት አፈር እርጥበት እንዲይዝ፣ አየር እንዲዘዋወርበትና እፅዋት ጤናማ ሆነው እንዲያድጉ ያደርጋል።"}',
  '/images/service_compost.jpg',
  'Dr. Aster Kebede', 'Senior Agronomist & Soil Scientist', '6 min read', false, true),

('biodiversity-conservation-indigenous-plants',
  '{"en":"Biodiversity Conservation: Integrating Indigenous Ethiopian Plants in Modern Compounds","am":"የብዝሃ-ሕይወት ጥበቃ፡ አገር በቀል የኢትዮጵያ እፅዋትን በዘመናዊ ግቢዎች ውስጥ ማካተት"}',
  (SELECT id FROM public.blog_categories WHERE slug = 'native-biodiversity' LIMIT 1),
  '{"en":"Transforming residential compounds, corporate campuses, and diplomatic estates into vibrant wildlife sanctuaries with native botanicals.","am":"የመኖሪያ ግቢዎችን እና የድርጅት ህንፃዎችን በአገር በቀል እፅዋት በማስዋብ የተፈጥሮ ማረፊያ ማድረግ።"}',
  '{"en":"### Living Beyond Just Green Lawns\n\nFor decades, commercial landscaping relied on monoculture grass lawns and non-native exotics that provided little ecological value to native pollinators.\n\nToday, visionary architects and homeowners are embracing Ethiopian flora: flowering *Erythrina brucei* (Korch), aromatic *Salvia*, and sculptural aloes that create vibrant, dynamic landscapes that celebrate Ethiopian heritage.","am":"አገር በቀል እፅዋትን በግቢዎች ውስጥ ማካተት ውበትን ብቻ ሳይሆን ለአካባቢው ስነ-ምህዳር መጠበቅ የላቀ ጠቀሜታ አለው።"}',
  '/images/services/plant-identification.png',
  'Solomon Berhanu', 'Chief Landscape Architect', '4 min read', false, true)
ON CONFLICT (slug) DO UPDATE SET
  title = excluded.title, excerpt = excluded.excerpt, body = excluded.body, featured_image = excluded.featured_image;

-- Jobs (Careers)
INSERT INTO public.jobs (slug, department, location, employment_type, experience_level, title, description, responsibilities, requirements, benefits, is_featured, is_published)
VALUES
('senior-landscape-architect', 'Design & Master Planning', 'Addis Ababa, Ethiopia', 'Full-Time', 'Senior Level (5+ Years)',
  '{"en":"Senior Landscape Architect & Master Planner","am":"ከፍተኛ የመልክአ ምድር አርክቴክት እና ማስተር ፕላነር"}',
  '{"en":"We are seeking a creative and technically experienced Senior Landscape Architect to lead concept design, master planning, and construction documentation for premium commercial, civic, and residential projects across Ethiopia.","am":"በኢትዮጵያ ለሚከናወኑ ዋና ዋና የመልክአ ምድር ፕሮጀክቶች ዲዛይንና ማስተር ፕላን የሚመራ ከፍተኛ ባለሙያ እንፈልጋለን።"}',
  '["Lead multi-disciplinary design teams from preliminary sketches to detailed construction sets", "Conduct comprehensive site analyses, grading schemes, and planting palette selections", "Collaborate directly with government authorities, private developers, and civil engineers", "Present photorealistic 3D concepts and landscape proposals to senior executive clients", "Provide ongoing site supervision and quality assurance during active construction phases"]'::jsonb,
  '["B.Sc. or M.Sc. in Landscape Architecture, Urban Design, or Architecture", "5+ years documented professional experience in landscape master planning", "Proficiency with AutoCAD, Rhino/Sketchup, Lumion, and Adobe Creative Cloud", "Strong knowledge of Ethiopian native flora, ecology, and construction methodologies", "Excellent bilingual communication skills in English and Amharic"]'::jsonb,
  '["Competitive corporate salary with annual performance bonus", "Comprehensive health coverage and transport allowance", "Direct leadership role on national landmark development projects", "Sponsored attendance at regional African landscape architecture symposia"]'::jsonb,
  true, true),

('horticulture-nursery-manager', 'Nursery & Plant Propagation', 'Addis Ababa & Surrounding Sites', 'Full-Time', 'Mid-Senior Level (3+ Years)',
  '{"en":"Horticulture & Commercial Nursery Operations Manager","am":"የሆርቲካልቸር እና የችግኝ ጣቢያ ስራ አስኪያጅ"}',
  '{"en":"Oversee day-to-day operations of our multi-hectare production nursery, plant propagation programs, indigenous seed collection, and inventory logistics.","am":"የችግኝ ማፍያ ጣቢያችንን፣ የእፅዋት እርባታንና ስርጭትን በበላይነት የሚመራ የሆርቲካልቸር ባለሙያ።"}',
  '["Manage production cycles of indigenous tree seedlings, ornamental shrubs, and turf sod", "Implement integrated organic pest management and scientific soil fertilization schedules", "Coordinate propagation teams, irrigation technicians, and seasonal nursery staff", "Maintain rigorous digital inventory records and supply logistics for project sites", "Spearhead trials for drought-tolerant Ethiopian native species and seed saving"]'::jsonb,
  '["Degree in Horticulture, Plant Science, Forestry, or related agricultural discipline", "3+ years hands-on management experience in commercial nurseries or greenhouse facilities", "Deep practical expertise in grafting, cuttings, seed stratification, and soil formulation", "Demonstrated leadership ability managing field teams and delivery schedules", "Proficiency in inventory logging and basic supply chain management"]'::jsonb,
  '["Attractive salary package with performance-based production bonuses", "Full medical insurance and company field vehicle provision", "Professional development opportunities in modern horticultural technologies", "Supportive, purpose-driven environmental company culture"]'::jsonb,
  true, true),

('irrigation-systems-engineer', 'Water & Engineering', 'Addis Ababa, Ethiopia', 'Full-Time', 'Mid-Level (3+ Years)',
  '{"en":"Irrigation & Water Systems Project Engineer","am":"የመስኖ እና የውሃ ስርዓት መሃንዲስ"}',
  '{"en":"Design, hydraulic calculation, procurement, and on-site commissioning of automated drip and smart irrigation networks for commercial and public developments.","am":"ዘመናዊ የመስኖ ቴክኖሎጂዎችን፣ የውሃ ማጠራቀሚያዎችንና አውቶማቲክ ስርዓቶችን የሚዘረጋ የመስኖ መሃንዲስ።"}',
  '["Develop hydraulic calculations, pipe sizing, zoning layouts, and pumping station schematics", "Program smart weather-based irrigation controllers, rain sensors, and solenoid manifolds", "Supervise trenching, pipe laying, pressure testing, and backfill on active job sites", "Prepare detailed material take-offs (MTO) and cost estimates for project bidding", "Train client facilities teams on routine preventative maintenance and winterization"]'::jsonb,
  '["B.Sc. in Water Resources Engineering, Agricultural Engineering, or Civil Engineering", "3+ years practical experience in automated landscape or agricultural irrigation systems", "Familiarity with Hunter, Rain Bird, or Netafim equipment specifications", "Fluency in CAD drafting for plumbing/hydraulic layouts", "Valid Ethiopian driving license and willingness to travel to regional project sites"]'::jsonb,
  '["Competitive monthly compensation plus project completion allowances", "Health insurance and mobile phone allowance", "Hands-on engineering role with state-of-the-art water conservation tech", "Career advancement path to Lead Engineering Director"]'::jsonb,
  false, true),

('landscape-construction-supervisor', 'Construction & Implementation', 'Addis Ababa & Regional Sites', 'Full-Time', 'Experienced Field Lead',
  '{"en":"Site Landscape Construction Supervisor","am":"የመልክአ ምድር ግንባታ ሳይት ተቆጣጣሪ"}',
  '{"en":"Supervise on-site civil works, hardscape stone paving, retaining walls, earthwork grading, and softscape planting teams for strict quality compliance.","am":"በሳይት ላይ የግንባታ ስራዎችን፣ የድንጋይ ንጣፎችንና የተከላ ስራዎችን የሚከታተልና ጥራትን የሚያረጋግጥ ሳይት ሱፐርቫይዘር።"}',
  '["Oversee daily on-site civil earthworks, masonry stone masons, and planting crews", "Ensure construction matches landscape architectural drawings, grades, and tolerances", "Manage daily material deliveries, equipment rentals, and tool inventories", "Enforce strict occupational health and safety (OHS) standards on construction sites", "Conduct daily progress reporting to Project Directors and clients"]'::jsonb,
  '["Diploma or Degree in Civil Engineering, Building Construction, or Horticulture", "4+ years on-site supervisory experience in landscape civil works or building construction", "Deep practical familiarity with stonework, concrete, drainage, and planting techniques", "Strong verbal command and motivational leadership skills with site labor teams", "Detail-oriented mindset with high standards for craftsmanship and finishes"]'::jsonb,
  '["Competitive salary package with site allowance", "Comprehensive health coverage and safety gear provision", "Steady career growth across high-profile landmark Ethiopian projects"]'::jsonb,
  false, true)
ON CONFLICT (slug) DO UPDATE SET
  title = excluded.title, description = excluded.description,
  responsibilities = excluded.responsibilities, requirements = excluded.requirements, benefits = excluded.benefits;

-- Contact Inquiries (Pre-seeded realistic inquiries for Admin inbox)
INSERT INTO public.contact_inquiries (full_name, email, phone, organization, service_of_interest, subject, message, status, is_read, created_at)
SELECT v.full_name, v.email, v.phone, v.organization, v.service_of_interest, v.subject, v.message, v.status::public.inquiry_status, v.is_read, v.created_at
FROM (VALUES
  ('Abebe Kebede', 'abebe.kebede@mudi.gov.et', '+251 91 123 4567',
   'Ministry of Urban Development & Infrastructure', 'Urban Greening and Environmental Services',
   'Sub-city Green Corridor Master Plan Consultation',
   'We are developing an ecological master plan for a 15-hectare urban park along the newly expanded roadway in Addis Ababa. We reviewed your documented projects and would like to invite Landscape Solution PLC for an initial technical presentation and site evaluation next Tuesday.',
   'new', false, now() - interval '3 hours'),

  ('Sara Yohannes', 'sara.y@boleluxury.com', '+251 92 345 6789',
   'Bole Luxury Residence Developers', 'Landscape Planning and Design',
   'Terrace Landscape & Biophilic Design Proposal',
   'We have a 4-phase premium residential compound in Bole Sub-city requiring sustainable landscaping, water-efficient drip irrigation, and outdoor recreational stone paving. Please provide your portfolio presentation and schedule a site survey.',
   'new', false, now() - interval '18 hours'),

  ('Dawit Tefera', 'dawit@riftvalleyresorts.et', '+251 93 456 7890',
   'Rift Valley Eco-Resort', 'Botanic Garden Development',
   'Indigenous Flora Nursery & Lake Buffer Restoration',
   'Our resort is expanding along the lakeshore and we are committed to native plant biodiversity and wetland erosion control. We would like to contract your nursery cultivation and landscape team for 5,000 indigenous trees and shoreline bio-engineering.',
   'read', true, now() - interval '48 hours')
) AS v(full_name, email, phone, organization, service_of_interest, subject, message, status, is_read, created_at)
WHERE NOT EXISTS (
  SELECT 1 FROM public.contact_inquiries ci WHERE ci.email = v.email
);

-- Verification query
SELECT
  (SELECT count(*) FROM public.services) AS services_count,
  (SELECT count(*) FROM public.projects) AS projects_count,
  (SELECT count(*) FROM public.blog_posts) AS blogs_count,
  (SELECT count(*) FROM public.jobs) AS jobs_count,
  (SELECT count(*) FROM public.contact_inquiries) AS inquiries_count;
