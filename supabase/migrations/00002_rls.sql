-- ============================================================================
-- Landscape Solution PLC — 00002: Row Level Security
-- Public: read published content only; insert inbound requests only.
-- Staff (editor): manage CMS content. Admin: everything.
-- ============================================================================

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','editor')
  );
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  );
$$;

revoke all on all tables in schema public from anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
-- The anon (public/browser) role needs the table-level privilege; RLS policies
-- below still govern which rows are visible/insertable, so this stays secure.
grant select, insert on all tables in schema public to anon;
grant usage on schema public to anon;

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.company_profile enable row level security;
alter table public.sustainability_content enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.partners enable row level security;
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.quote_requests enable row level security;
alter table public.consultation_requests enable row level security;
alter table public.media enable row level security;

-- profiles -------------------------------------------------------------------
create policy "profiles: users read own" on public.profiles
  for select using (id = auth.uid() or public.is_admin());
create policy "profiles: admin manages" on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());
create policy "profiles: staff read team" on public.profiles
  for select using (public.is_staff());

-- single-row content (settings / company profile / sustainability) ------------
create policy "settings: public read" on public.site_settings
  for select using (true);
create policy "settings: admin write" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

create policy "company: public read" on public.company_profile
  for select using (true);
create policy "company: staff write" on public.company_profile
  for all using (public.is_staff()) with check (public.is_staff());

create policy "sustainability: public read" on public.sustainability_content
  for select using (true);
create policy "sustainability: staff write" on public.sustainability_content
  for all using (public.is_staff()) with check (public.is_staff());

-- services -------------------------------------------------------------------
create policy "services: public read published" on public.services
  for select using (is_published or public.is_staff());
create policy "services: staff write" on public.services
  for all using (public.is_staff()) with check (public.is_staff());

-- projects -------------------------------------------------------------------
create policy "projects: public read published" on public.projects
  for select using (is_published or public.is_staff());
create policy "projects: staff write" on public.projects
  for all using (public.is_staff()) with check (public.is_staff());

create policy "project_images: public read published project images" on public.project_images
  for select using (
    public.is_staff() or exists (
      select 1 from public.projects pr
      where pr.id = project_id and pr.is_published
    )
  );
create policy "project_images: staff write" on public.project_images
  for all using (public.is_staff()) with check (public.is_staff());

-- blog -----------------------------------------------------------------------
create policy "blog_categories: public read" on public.blog_categories
  for select using (true);
create policy "blog_categories: staff write" on public.blog_categories
  for all using (public.is_staff()) with check (public.is_staff());

create policy "blog_posts: public read published" on public.blog_posts
  for select using (is_published or public.is_staff());
create policy "blog_posts: staff write" on public.blog_posts
  for all using (public.is_staff()) with check (public.is_staff());

-- testimonials / partners ----------------------------------------------------
create policy "testimonials: public read published" on public.testimonials
  for select using (is_published);
create policy "testimonials: staff full" on public.testimonials
  for all using (public.is_staff()) with check (public.is_staff());

create policy "partners: public read published" on public.partners
  for select using (is_published);
create policy "partners: staff full" on public.partners
  for all using (public.is_staff()) with check (public.is_staff());

-- jobs / applications ----------------------------------------------------------
create policy "jobs: public read open published" on public.jobs
  for select using ((is_published and not is_closed) or public.is_staff());
create policy "jobs: staff write" on public.jobs
  for all using (public.is_staff()) with check (public.is_staff());

create policy "applications: anyone may apply" on public.job_applications
  for insert with check (
    exists (select 1 from public.jobs j where j.id = job_id and j.is_published and not j.is_closed)
  );
create policy "applications: staff manage" on public.job_applications
  for all using (public.is_staff()) with check (public.is_staff());

-- inbound requests: anonymous can create but never read ----------------------
create policy "contact_inquiries: anyone may submit" on public.contact_inquiries
  for insert with check (true);
create policy "contact_inquiries: staff manage" on public.contact_inquiries
  for all using (public.is_staff()) with check (public.is_staff());

create policy "quote_requests: anyone may submit" on public.quote_requests
  for insert with check (true);
create policy "quote_requests: staff manage" on public.quote_requests
  for all using (public.is_staff()) with check (public.is_staff());

create policy "consultation_requests: anyone may submit" on public.consultation_requests
  for insert with check (true);
create policy "consultation_requests: staff manage" on public.consultation_requests
  for all using (public.is_staff()) with check (public.is_staff());

-- media library: staff only --------------------------------------------------
create policy "media: staff manage" on public.media
  for all using (public.is_staff()) with check (public.is_staff());
