-- ============================================================================
-- Landscape Solution PLC — 00001: core schema
-- Localization convention: user-editable content fields that need EN + AM
-- are stored as jsonb of shape {"en": "...", "am": "..."} (type localised_text).
-- ============================================================================

create type public.user_role as enum ('admin', 'editor');
create type public.inquiry_status as enum ('new', 'read', 'contacted', 'archived');
create type public.quote_status as enum ('new', 'reviewing', 'contacted', 'quoted', 'won', 'closed');
create type public.consultation_status as enum ('pending', 'approved', 'rejected', 'rescheduled', 'completed');
create type public.application_status as enum ('new', 'reviewing', 'shortlisted', 'rejected', 'hired');

-- ---------------------------------------------------------------------------
-- profiles (linked 1-1 with auth.users, created by trigger)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  avatar_url text,
  role public.user_role not null default 'editor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- settings / company content
-- ---------------------------------------------------------------------------
create table public.site_settings (
  id int primary key default 1 check (id = 1),
  company_name text not null default 'Landscape Solution PLC',
  phone text not null default '',
  email text not null default '',
  whatsapp text not null default '',
  address text not null default '',
  google_maps_url text not null default '',
  facebook_url text not null default '',
  instagram_url text not null default '',
  linkedin_url text not null default '',
  youtube_url text not null default '',
  default_language text not null default 'en' check (default_language in ('en','am')),
  logo_url text,
  favicon_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_profile (
  id int primary key default 1 check (id = 1),
  about jsonb not null default '{}'::jsonb,
  mission jsonb not null default '{}'::jsonb,
  vision jsonb not null default '{}'::jsonb,
  values jsonb not null default '{}'::jsonb,
  company_story jsonb not null default '{}'::jsonb,
  company_description jsonb not null default '{}'::jsonb,
  hero_title jsonb not null default '{}'::jsonb,
  hero_description jsonb not null default '{}'::jsonb,
  brochure_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sustainability_content (
  id int primary key default 1 check (id = 1),
  title jsonb not null default '{}'::jsonb,
  introduction jsonb not null default '{}'::jsonb,
  water_conservation jsonb not null default '{}'::jsonb,
  native_plants jsonb not null default '{}'::jsonb,
  environmental_responsibility jsonb not null default '{}'::jsonb,
  eco_friendly_practices jsonb not null default '{}'::jsonb,
  waste_reduction jsonb not null default '{}'::jsonb,
  sustainable_design jsonb not null default '{}'::jsonb,
  initiatives jsonb not null default '[]'::jsonb,
  statistics jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
create table public.services (
  id bigint generated always as identity primary key,
  title jsonb not null,
  slug text not null unique,
  short_description jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  icon text,
  featured_image text,
  features jsonb not null default '[]'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_services_published on public.services (is_published, sort_order);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table public.projects (
  id bigint generated always as identity primary key,
  title jsonb not null,
  slug text not null unique,
  category text not null default '',
  location text not null default '',
  client text not null default '',
  completion_date date,
  short_description jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  challenge jsonb not null default '{}'::jsonb,
  solution jsonb not null default '{}'::jsonb,
  results jsonb not null default '{}'::jsonb,
  featured_image text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_projects_published on public.projects (is_published);
create index idx_projects_category on public.projects (category);

create table public.project_images (
  id bigint generated always as identity primary key,
  project_id bigint not null references public.projects(id) on delete cascade,
  image_url text not null,
  alt_text text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index idx_project_images_project on public.project_images (project_id, sort_order);

-- ---------------------------------------------------------------------------
-- blog
-- ---------------------------------------------------------------------------
create table public.blog_categories (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id bigint generated always as identity primary key,
  title jsonb not null,
  slug text not null unique,
  excerpt jsonb not null default '{}'::jsonb,
  content jsonb not null default '{}'::jsonb,
  featured_image text,
  author_id uuid references public.profiles(id) on delete set null,
  category_id bigint references public.blog_categories(id) on delete set null,
  tags text[] not null default '{}',
  published_at timestamptz,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_blog_posts_published on public.blog_posts (is_published, published_at desc);
create index idx_blog_posts_category on public.blog_posts (category_id);

-- ---------------------------------------------------------------------------
-- testimonials / partners
-- ---------------------------------------------------------------------------
create table public.testimonials (
  id bigint generated always as identity primary key,
  customer_name text not null,
  company text not null default '',
  position text not null default '',
  testimonial jsonb not null default '{}'::jsonb,
  photo_url text,
  rating int not null default 5 check (rating between 1 and 5),
  is_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partners (
  id bigint generated always as identity primary key,
  name text not null,
  logo_url text,
  website_url text,
  description text not null default '',
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- careers
-- ---------------------------------------------------------------------------
create table public.jobs (
  id bigint generated always as identity primary key,
  title jsonb not null,
  department text not null default '',
  location text not null default '',
  employment_type text not null default 'full_time',
  description jsonb not null default '{}'::jsonb,
  responsibilities jsonb not null default '[]'::jsonb,
  requirements jsonb not null default '[]'::jsonb,
  application_deadline date,
  is_published boolean not null default false,
  is_closed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.job_applications (
  id bigint generated always as identity primary key,
  job_id bigint not null references public.jobs(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null default '',
  cover_letter text not null default '',
  resume_url text not null default '',
  status public.application_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index idx_job_applications_job on public.job_applications (job_id);

-- ---------------------------------------------------------------------------
-- inbound requests
-- ---------------------------------------------------------------------------
create table public.contact_inquiries (
  id bigint generated always as identity primary key,
  full_name text not null,
  email text not null,
  phone text not null default '',
  subject text not null default '',
  message text not null,
  status public.inquiry_status not null default 'new',
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quote_requests (
  id bigint generated always as identity primary key,
  full_name text not null,
  company text not null default '',
  email text not null,
  phone text not null default '',
  whatsapp text not null default '',
  service_id bigint references public.services(id) on delete set null,
  project_location text not null default '',
  project_type text not null default '',
  project_size text not null default '',
  budget_range text not null default '',
  desired_timeline text not null default '',
  description text not null default '',
  attachment_url text,
  status public.quote_status not null default 'new',
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.consultation_requests (
  id bigint generated always as identity primary key,
  full_name text not null,
  email text not null,
  phone text not null default '',
  preferred_date date not null,
  preferred_time text not null default '',
  consultation_type text not null default 'on_site',
  project_details text not null default '',
  message text not null default '',
  status public.consultation_status not null default 'pending',
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- media library
-- ---------------------------------------------------------------------------
create table public.media (
  id bigint generated always as identity primary key,
  file_name text not null,
  storage_path text not null,
  bucket text not null,
  mime_type text not null default '',
  file_size bigint not null default 0,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- triggers: updated_at + profile creation on signup
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['profiles','site_settings','company_profile','sustainability_content',
    'services','projects','blog_posts','testimonials','partners','jobs','job_applications',
    'contact_inquiries','quote_requests','consultation_requests']
  loop
    execute format('create trigger trg_%s_updated_at before update on public.%I
      for each row execute function public.set_updated_at()', t, t);
  end loop;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), coalesce(new.email, ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
