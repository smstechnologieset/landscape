"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/admin-utils";

const TABLES = new Set([
  "services",
  "projects",
  "blog_posts",
  "testimonials",
  "partners",
  "jobs"
]);

const REVALIDATE: Record<string, string> = {
  services: "/admin/services",
  projects: "/admin/projects",
  blog_posts: "/admin/blog",
  testimonials: "/admin/testimonials",
  partners: "/admin/partners",
  jobs: "/admin/careers"
};

export async function deleteResource(fd: FormData): Promise<void> {
  const resource = String(fd.get("resource") ?? "");
  const id = Number(fd.get("id"));
  if (!TABLES.has(resource) || !Number.isInteger(id)) return;

  const { supabase } = await requireStaff();
  await supabase.from(resource).delete().eq("id", id);
  revalidatePath(REVALIDATE[resource] ?? "/admin");
}
