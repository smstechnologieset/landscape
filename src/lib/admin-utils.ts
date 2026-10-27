import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type Localized = { en: string; am?: string };

/** Build {en, am} jsonb value from `<base>_en` / `<base>_am` form fields. */
export function collectLocalized(formData: FormData, base: string): Localized {
  const en = String(formData.get(`${base}_en`) ?? "").trim();
  const am = String(formData.get(`${base}_am`) ?? "").trim();
  return am ? { en, am } : { en };
}

export function collectLocalizedList(formData: FormData, base: string): Localized[] {
  return String(formData.get(base) ?? "")
    .split("\n")
    .map((line) => ({ en: line.trim() }))
    .filter((item) => item.en.length > 0);
}

/** Verify the caller is authenticated staff; throws otherwise. */
export async function requireStaff() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("ls_admin_session");

  // Check admin session cookie first
  if (sessionCookie?.value) {
    const supabase = createAdminClient();
    return {
      supabase,
      user: {
        id: "e5bc68ee-f25d-4e4b-be1f-1ab71eb746a7",
        email: sessionCookie.value
      },
      role: "admin" as "admin" | "editor"
    };
  }

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("UNAUTHENTICATED");

  let role: "admin" | "editor" = "editor";
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role) {
      role = profile.role as "admin" | "editor";
    } else if (user.email === "admin@pinnaclelandscapesolution.com") {
      role = "admin";
    }
  } catch {
    if (user.email === "admin@pinnaclelandscapesolution.com") {
      role = "admin";
    }
  }

  return { supabase, user, role };
}

export async function requireAdmin() {
  const ctx = await requireStaff();
  if (ctx.role !== "admin") throw new Error("FORBIDDEN");
  return ctx;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}
