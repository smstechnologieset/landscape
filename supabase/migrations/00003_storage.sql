-- ============================================================================
-- Landscape Solution PLC — 00003: Storage buckets + storage RLS
-- Public buckets: site assets, content images, partner logos, general media.
-- Private buckets: documents (brochures), career-applications (resumes).
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('site-assets', 'site-assets', true, 5242880,
    array['image/png','image/jpeg','image/webp','image/svg+xml','image/x-icon','application/pdf']),
  ('project-images', 'project-images', true, 10485760,
    array['image/png','image/jpeg','image/webp']),
  ('service-images', 'service-images', true, 10485760,
    array['image/png','image/jpeg','image/webp']),
  ('blog-images', 'blog-images', true, 10485760,
    array['image/png','image/jpeg','image/webp']),
  ('partner-logos', 'partner-logos', true, 2097152,
    array['image/png','image/svg+xml','image/jpeg','image/webp']),
  ('general-media', 'general-media', true, 10485760,
    array['image/png','image/jpeg','image/webp','application/pdf']),
  ('documents', 'documents', false, 20971520,
    array['application/pdf']),
  ('attachments', 'attachments', false, 10485760,
    array['application/pdf','image/png','image/jpeg','image/webp']),
  ('career-applications', 'career-applications', false, 10485760,
    array['application/pdf','application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do nothing;

-- Public read on public buckets
create policy "public buckets: public read" on storage.objects
  for select using (
    bucket_id in ('site-assets','project-images','service-images','blog-images','partner-logos','general-media')
  );

-- Staff can manage all app buckets
create policy "staff manage all buckets" on storage.objects
  for all using (
    bucket_id in ('site-assets','project-images','service-images','blog-images',
                  'partner-logos','general-media','documents','attachments','career-applications')
    and public.is_staff()
  ) with check (
    bucket_id in ('site-assets','project-images','service-images','blog-images',
                  'partner-logos','general-media','documents','attachments','career-applications')
    and public.is_staff()
  );

-- Anyone may upload a resume into career-applications (private bucket)
create policy "anyone may upload resume" on storage.objects
  for insert with check (bucket_id = 'career-applications');

-- Anyone may attach a file to a quote request (private bucket)
create policy "anyone may upload quote attachment" on storage.objects
  for insert with check (bucket_id = 'attachments');
