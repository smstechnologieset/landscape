-- ============================================================================
-- Landscape Solution PLC — Fix Missing Testimonials & Partners Tables
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/coksxzifntucyotsarvs/sql)
-- ============================================================================

-- 1. Testimonials Table
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

-- 2. Partners Table
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

-- 3. Grants
GRANT ALL ON TABLE public.testimonials TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.testimonials TO authenticated;
GRANT SELECT ON TABLE public.testimonials TO anon;

GRANT ALL ON TABLE public.partners TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.partners TO authenticated;
GRANT SELECT ON TABLE public.partners TO anon;

GRANT USAGE, SELECT ON SEQUENCE public.testimonials_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.partners_id_seq TO anon, authenticated;

-- 4. Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials: public read" ON public.testimonials;
CREATE POLICY "testimonials: public read" ON public.testimonials 
  FOR SELECT USING (is_published = true OR public.is_staff());

DROP POLICY IF EXISTS "testimonials: staff manage" ON public.testimonials;
CREATE POLICY "testimonials: staff manage" ON public.testimonials 
  FOR ALL USING (public.is_staff());

DROP POLICY IF EXISTS "partners: public read" ON public.partners;
CREATE POLICY "partners: public read" ON public.partners 
  FOR SELECT USING (is_published = true OR public.is_staff());

DROP POLICY IF EXISTS "partners: staff manage" ON public.partners;
CREATE POLICY "partners: staff manage" ON public.partners 
  FOR ALL USING (public.is_staff());

-- 5. Seed Initial Testimonials
INSERT INTO public.testimonials (customer_name, company, position, testimonial, photo_url, rating, is_featured, is_published)
VALUES 
(
  'Dawit Hailemariam',
  'Atlas Commercial Developments',
  'Senior Project Director',
  '{"en":"Landscape Solution PLC completely transformed our commercial frontage and parking plaza with precision drip irrigation and drought-resilient indigenous flora. Their execution was punctual and aesthetically unmatched.","am":"ላንድስኬፕ ሶሉሽን የንግድ ማዕከላችንን የመልክአ ምድር ገጽታ በዘመናዊ የጠብታ መስኖ እና አገር በቀል ዛፎች ውብ አድርጎታል:: የቡድኑ ሙያዊ ብቃት እና ስራውን በተያዘለት ጊዜ ማጠናቀቁ እጅግ የሚያስመሰግን ነው::"}'::jsonb,
  '/images/who_we_are.jpg',
  5,
  true,
  true
),
(
  'Sara Mengistu',
  'Bole Luxury Residence',
  'Property Owner & Architect',
  '{"en":"The botanical selection and lawn establishment for our residential villa exceeded our expectations. Their nursery stock health and plant care expertise is truly state-of-the-art in Addis Ababa.","am":"ለመኖሪያ ቪላችን የተመረጡት እፅዋትና የተዘረጋው የሳር ሜዳ ከጠበቅነው በላይ ውብ ሆኖልናል:: የችግኝ ጥራታቸውና የመንከባከብ እውቀታቸው በአዲስ አበባ እጅግ የላቀ ነው::"}'::jsonb,
  '/images/service_botanic.jpg',
  5,
  true,
  true
),
(
  'Engineer Yared Tadesse',
  'Oromia Agro-Industrial Complex',
  'Infrastructure Lead',
  '{"en":"Their bio-engineering slope stabilization and stormwater runoff containment prevented severe erosion at our industrial premises. Dependable technical team with deep environmental stewardship.","am":"በፋብሪካችን አካባቢ የሰሩት የተፈጥሮ የአፈር መሸርሸር መከላከያ እና የዝናብ ውሃ አያያዝ ስራ ከፍተኛ አደጋን አስቀርቶልናል:: ጥልቅ የአካባቢ ጥበቃ እውቀት ያላቸው ታማኝ ባለሙያዎች ናቸው::"}'::jsonb,
  '/images/service_construction.jpg',
  5,
  true,
  true
)
ON CONFLICT DO NOTHING;

-- 6. Seed Initial Partners
INSERT INTO public.partners (name, logo_url, website_url, description, sort_order, is_published)
VALUES 
(
  'Sur Construction PLC',
  '/images/logo.png',
  'https://surconstruction.com',
  'Corporate office building partner and prominent infrastructure constructor in Ethiopia.',
  1,
  true
),
(
  'Ethiopian Green Legacy Initiative',
  '/images/logo.png',
  NULL,
  'Institutional alignment with national afforestation, urban greening, and seedling propagation campaigns.',
  2,
  true
),
(
  'Addis Ababa Urban Beautification Office',
  '/images/logo.png',
  NULL,
  'Civic cooperation for roadside green corridors, scenic roundabouts, and public park enhancements.',
  3,
  true
)
ON CONFLICT DO NOTHING;

-- 7. Force PostgREST schema cache reload immediately
NOTIFY pgrst, 'reload schema';
