import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import {
  OFFICIAL_SERVICES,
  MOCK_PORTFOLIO_PROJECTS,
  MOCK_BLOG_POSTS,
  MOCK_JOB_OPENINGS
} from "../src/lib/company-data";

// 1. Read .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf8");
const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envContent.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);

if (!urlMatch || !keyMatch) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabaseUrl = urlMatch[1].trim();
const supabaseKey = keyMatch[1].trim();
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("--- Starting Seeding of Official Content to Supabase ---");

  // 1. SERVICES
  console.log(`\nSeeding ${OFFICIAL_SERVICES.length} Official Services...`);
  for (let i = 0; i < OFFICIAL_SERVICES.length; i++) {
    const s = OFFICIAL_SERVICES[i];
    const row = {
      slug: s.slug,
      title: s.title,
      category_group: s.categoryGroup || "Landscape & Design",
      short_description: s.short_description,
      description: s.description,
      features: s.features || [],
      benefits: s.benefits || [],
      faq: s.faq || [],
      featured_image: s.featured_image,
      icon: s.icon || "leaf",
      is_featured: s.is_featured ?? true,
      is_published: true,
      sort_order: s.sort_order || i + 1,
      seo_title: s.seo_title || (s.title as any)?.en || null,
      seo_description: s.seo_description || (s.short_description as any)?.en || null
    };

    const { error } = await supabase.from("services").upsert(row, { onConflict: "slug" });
    if (error) {
      console.error(`Error seeding service [${s.slug}]:`, error.message);
    } else {
      console.log(`✓ Service: ${s.title.en}`);
    }
  }

  // 2. PROJECTS & PROJECT IMAGES
  console.log(`\nSeeding ${MOCK_PORTFOLIO_PROJECTS.length} Portfolio Projects...`);
  for (let i = 0; i < MOCK_PORTFOLIO_PROJECTS.length; i++) {
    const p = MOCK_PORTFOLIO_PROJECTS[i];
    const slug = p.id;
    const projectRow = {
      slug,
      title: p.title,
      category: p.category.en,
      tag: p.category.en,
      location: p.location || "Addis Ababa, Ethiopia",
      client: "Landscape Solution Client",
      year: p.year || "2026",
      short_description: p.description,
      description: p.description,
      challenge: { en: "", am: "" },
      solution: { en: "", am: "" },
      results: { en: "", am: "" },
      featured_image: p.coverImage || p.galleryImages?.[0]?.url || "/images/hero_landscape.jpg",
      is_featured: true,
      is_published: true,
      sort_order: i + 1
    };

    const { data: insertedProject, error } = await supabase
      .from("projects")
      .upsert(projectRow, { onConflict: "slug" })
      .select("id")
      .single();

    if (error) {
      console.error(`Error seeding project [${slug}]:`, error.message);
      continue;
    }

    console.log(`✓ Project: ${p.title.en} (id: ${insertedProject.id})`);

    // Gallery images
    if (p.galleryImages && p.galleryImages.length > 0) {
      // Clear existing project images for this project
      await supabase.from("project_images").delete().eq("project_id", insertedProject.id);

      const imagesToInsert = p.galleryImages.map((img, idx) => ({
        project_id: insertedProject.id,
        image_url: img.url,
        alt_text: (img.caption as any)?.en || p.title.en,
        sort_order: idx + 1
      }));

      const { error: imgErr } = await supabase.from("project_images").insert(imagesToInsert);
      if (imgErr) {
        console.error(`  Error inserting gallery for [${slug}]:`, imgErr.message);
      } else {
        console.log(`  ✓ Inserted ${imagesToInsert.length} gallery images`);
      }
    }
  }

  // 3. BLOG CATEGORIES & POSTS
  console.log(`\nSeeding ${MOCK_BLOG_POSTS.length} Blog Posts...`);
  for (let i = 0; i < MOCK_BLOG_POSTS.length; i++) {
    const post = MOCK_BLOG_POSTS[i];
    const catName = post.category;
    const catSlug = catName.en.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Ensure category exists
    const { data: catData, error: catErr } = await supabase
      .from("blog_categories")
      .upsert(
        {
          name: catName,
          slug: catSlug,
          description: catName
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    const categoryId = catData?.id || null;

    const bodyEn = post.content.en.paragraphs.join("\n\n");
    const bodyAm = post.content.am.paragraphs.join("\n\n") || bodyEn;

    const postRow = {
      slug: post.slug || post.id,
      title: post.title,
      category_id: categoryId,
      excerpt: post.excerpt,
      body: { en: bodyEn, am: bodyAm },
      featured_image: post.image,
      author_name: post.author || "Landscape Solution Editorial Team",
      author_role: "Horticultural & Environmental Specialists",
      reading_time: post.readTime || "4 min read",
      is_featured: i === 0,
      is_published: true,
      published_at: new Date().toISOString()
    };

    const { error: postErr } = await supabase.from("blog_posts").upsert(postRow, { onConflict: "slug" });
    if (postErr) {
      console.error(`Error seeding blog post [${postRow.slug}]:`, postErr.message);
    } else {
      console.log(`✓ Blog Post: ${post.title.en}`);
    }
  }

  // 4. JOBS / CAREERS
  console.log(`\nSeeding ${MOCK_JOB_OPENINGS.length} Job Openings...`);
  for (let i = 0; i < MOCK_JOB_OPENINGS.length; i++) {
    const job = MOCK_JOB_OPENINGS[i];
    const jobRow = {
      slug: job.id,
      title: job.title,
      department: job.department.en,
      location: job.location.en,
      employment_type: job.type.en,
      experience_level: job.experience.en,
      summary: job.summary,
      description: job.summary,
      responsibilities: job.responsibilities.en,
      requirements: job.requirements.en,
      benefits: [
        "Competitive professional remuneration and performance bonuses",
        "Healthcare and workplace accident insurance coverage",
        "Continuous vocational skills workshops in sustainable landscaping",
        "Rapid career progression pathways across national green projects"
      ],
      deadline: "2026-12-31",
      is_featured: i === 0,
      is_published: true,
      is_closed: false
    };

    const { error: jobErr } = await supabase.from("jobs").upsert(jobRow, { onConflict: "slug" });
    if (jobErr) {
      console.error(`Error seeding job [${job.id}]:`, jobErr.message);
    } else {
      console.log(`✓ Job: ${job.title.en}`);
    }
  }

  console.log("\n--- Seeding Complete Successfully! ---");
}

seed().catch((err) => {
  console.error("Fatal Seeding Error:", err);
  process.exit(1);
});
