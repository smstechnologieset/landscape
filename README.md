# Landscape Solution PLC — Website & Admin CMS

Production-ready corporate website and content management system for **Landscape Solution PLC**, built with **Next.js + TypeScript + Tailwind CSS + Supabase**.

> All seed content is **fictional demo data** and must be replaced with real company information before launch (see *Client Content Required* below).

---

## Technology Stack

| Layer     | Technology                                              |
|-----------|---------------------------------------------------------|
| Frontend  | Next.js 14 (App Router), TypeScript, Tailwind CSS       |
| Backend   | Supabase (PostgreSQL, Auth, Storage, Edge Functions)    |
| Database  | Supabase PostgreSQL with Row Level Security             |
| Email     | Resend via `send-email` Supabase Edge Function          |
| Validation| Zod (server-side, all inbound forms)                    |

There is **no** separate Express/NestJS server and **no** Prisma — Supabase is the sole backend.

---

## Project Structure

```
src/
  app/
    (site)/               # Public website routes
      page.tsx            # Home
      about/ services/ portfolio/ sustainability/ blog/
      careers/ contact/ quote/ consultation/ testimonials/ partners/
      privacy/ terms/
    admin/
      (auth)/             # login, forgot-password, reset-password
      (protected)/        # dashboard + all CMS modules (auth required)
    actions/              # Server actions (forms, auth, admin CRUD)
  components/             # Design system + site/admin components
  lib/
    supabase/             # browser / server / service-role clients
    queries.ts            # public read queries (RLS-safe)
    i18n.ts locale.ts     # EN + AM dictionaries, locale helper
    validation.ts         # Zod schemas
    types.ts              # DB types incl. LocalizedText
supabase/
  migrations/             # SQL migrations (schema → RLS → storage)
  seed.sql                # Demo seed data
  functions/send-email/   # Transactional email Edge Function
middleware.ts             # Session refresh + /admin protection
```

---

## Quick Start (Local Development)

1. **Create a Supabase project** at [supabase.com](https://supabase.com).
2. **Run migrations** (in order) via the Supabase Dashboard *SQL Editor* or the CLI:
   ```bash
   supabase link --project-ref <your-ref>
   supabase db push           # applies supabase/migrations/*.sql
   supabase db reset          # alternative: local reset incl. seed
   ```
   Files are applied in order:
   - `00001_core_schema.sql` — tables, indexes, triggers (`updated_at`, profile-on-signup)
   - `00002_rls.sql` — row level security on every table + policies
   - `00003_storage.sql` — buckets + storage policies
3. **Seed demo content** (optional):
   ```bash
   psql <connection-string> -f supabase/seed.sql
   ```
   or paste `supabase/seed.sql` into the Dashboard SQL editor.
4. **Configure environment** — copy `.env.example` to `.env.local` and fill in values from *Supabase → Project Settings → API*.
5. **Install & run**
   ```bash
   npm install
   npm run dev        # http://localhost:3000
   ```

### Environment Variables

See `.env.example`. Never commit real secrets. Only `NEXT_PUBLIC_*` variables reach the browser; `SUPABASE_SERVICE_ROLE_KEY` is used exclusively in server-only code (`src/lib/supabase/admin.ts`).

Email secrets (`RESEND_API_KEY`) live in **Supabase Edge Function secrets**, not in this repo:

```bash
supabase secrets set RESEND_API_KEY=re_xxx EMAIL_FROM="Landscape Solution PLC <no-reply@yourdomain.com>" EMAIL_TO=info@yourdomain.com
supabase functions deploy send-email
```

---

## Creating the First Admin

No credentials are stored in source code. After deploying:

1. Visit `/admin/login` → click **Forgot password?** (or use Supabase Dashboard → Authentication → *Invite user* with an admin email).
2. Complete the password flow from the emailed link.
3. Sign up creates a profile with the default role `editor`.
4. Promote yourself to `admin` **once**, using the Dashboard SQL editor:
   ```sql
   update public.profiles set role = 'admin' where email = 'you@yourdomain.com';
   ```
5. Subsequent admins/editors can be managed in **Admin → Admin Users** (admin-only).

---

## Security Model

- **RLS on every table.** Anonymous users can only `INSERT` into inquiry/quote/consultation/application tables and never read them.
- Published content rows are world-readable; drafts require staff claims.
- Role helpers `is_staff()` / `is_admin()` are `security definer` SQL functions — authorization is enforced by the database, not the UI.
- `/admin/*` is protected twice: Next.js middleware redirect + server-side layout check + per-action `requireStaff()/requireAdmin()` checks.
- File uploads validate MIME type + size (10 MB cap); filenames are replaced with UUIDs.
- Resumes (`career-applications`) and quote attachments (`attachments`) live in **private buckets**; admins access them through short-lived signed URLs.
- The service-role key and email API key are never sent to the browser.

## Storage Buckets

| Bucket              | Public | Purpose                        |
|---------------------|--------|--------------------------------|
| site-assets         | yes    | logo, favicon, misc assets     |
| project-images      | yes    | portfolio images               |
| service-images      | yes    | service featured images        |
| blog-images         | yes    | blog featured images           |
| partner-logos       | yes    | partner logos                  |
| general-media       | yes    | testimonials photos, etc.      |
| documents           | no     | company brochure (PDF)         |
| attachments         | no     | quote-request attachments      |
| career-applications | no     | applicant resumes              |

## Internationalization (EN / AM)

- UI strings: typed dictionaries in `src/lib/i18n.ts`; switcher in the header writes the `ls_locale` cookie.
- Content: localized fields are stored as JSONB `{"en": "...", "am": "..."}` so each language is added without schema duplication. Admin forms provide side-by-side English/Amharic inputs.
- Amharic translations ship for navigation, CTAs, forms, and system messages; Amharic *content* is entered by admins.

## SEO

Dynamic metadata (title/description/OpenGraph/Twitter/canonical) for services, projects, blog posts and careers; `sitemap.xml` and `robots.txt` generated from the database; semantic HTML and alt text throughout.

---

## Deployment

1. Push this repository to GitHub.
2. Create a Supabase production project; run the three migrations + seed as above.
3. Deploy on Vercel (or any Node host):
   - Framework preset: **Next.js**
   - Set every variable from `.env.example` in the project's Environment Variables (`NEXT_PUBLIC_SITE_URL` = final domain).
4. In Supabase → Authentication → URL Configuration, set:
   - Site URL: your production domain
   - Redirect URLs: include `https://<domain>/admin/reset-password`
5. Deploy the Edge Function and its secrets (see Email section).
6. Create the first admin (section above), then replace demo content.

## Scripts

```bash
npm run dev         # development server
npm run build       # production build (verified passing)
npm start           # serve production build
npm run lint        # eslint (verified clean)
npm run typecheck   # tsc --noEmit (verified clean)
```

---

## Remaining Issues / Notes

- Rich text editing uses plain textarea accepting HTML for blog content (sanitized display context is admin-trusted). A WYSIWYG editor can be added later.
- Rate limiting relies on provider-level protections (Vercel/Supabase); application-level throttling can be layered if abuse becomes a concern.
- The consultation module intentionally has **no external calendar integration** (out of scope).
- Payments/e-commerce/ERP integrations are explicitly out of scope.

## Client Content Required Before Launch

- Real company profile: about, mission, vision, values, story, hero copy (EN + AM)
- Real services, projects, testimonials, partners (replacing all demo records)
- Company brochure PDF (upload to the private `documents` bucket, set URL in Company Profile)
- Logo/favicon, social media URLs, Google Maps embed URL
- Approved Privacy Policy and Terms of Service text (placeholders currently shipped)
- Verified WhatsApp business number and notification email address
#   l a n d s c a p e  
 