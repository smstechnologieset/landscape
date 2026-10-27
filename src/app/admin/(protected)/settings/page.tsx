import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import SettingsTeamManager, { type UserProfileItem } from "@/components/admin/SettingsTeamManager";
import { COMPANY_INFO } from "@/lib/company-data";

export const metadata = { title: "Settings & Administration | Admin Portal" };

interface PageProps {
  searchParams?: {
    tab?: "settings" | "users";
  };
}

const DEFAULT_SETTINGS_FALLBACK: Record<string, string> = {
  company_name: "Landscape Solution PLC",
  phone: "+251 11 667 8901",
  alt_phone: "+251 91 123 4567",
  email: "contact@pinnaclelandscapesolution.com",
  whatsapp: "+251911234567",
  address: "Sur Construction Building, 8th Floor, Addis Ababa, Ethiopia",
  google_maps_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548483584877!2d38.78345237494578!3d9.013589991047127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850d998276f7%3A0xc6cb697e06a380e2!2sSur%20Construction!5e0!3m2!1sen!2set!4v1711200000000!5m2!1sen!2set",
  facebook_url: "https://facebook.com",
  instagram_url: "https://instagram.com",
  linkedin_url: "https://linkedin.com",
  youtube_url: "https://youtube.com",
  telegram_url: "https://t.me/pinnaclelandscape",
  tiktok_url: "https://tiktok.com",
  default_language: "en",
  logo_url: "/images/logo.png"
};

export default async function AdminSettingsPage({ searchParams }: PageProps) {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("ls_admin_session");

  let userEmail = sessionCookie?.value || "admin@pinnaclelandscapesolution.com";
  let userId = "e5bc68ee-f25d-4e4b-be1f-1ab71eb746a7";

  const supabase = createClient();
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      userEmail = user.email || userEmail;
      userId = user.id;
    }
  } catch {
    // Session cookie fallback
  }

  // Fetch settings & profiles with graceful fallbacks
  let settingsData = { ...DEFAULT_SETTINGS_FALLBACK };
  let profiles: UserProfileItem[] = [
    {
      id: userId,
      full_name: "System Administrator",
      email: "admin@pinnaclelandscapesolution.com",
      role: "admin",
      created_at: new Date().toISOString()
    }
  ];

  try {
    const [settingsRes, profilesRes] = await Promise.all([
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("profiles").select("id, full_name, email, role, created_at").order("created_at")
    ]);

    if (settingsRes.data) {
      settingsData = { ...DEFAULT_SETTINGS_FALLBACK, ...settingsRes.data };
    }

    if (profilesRes.data && profilesRes.data.length > 0) {
      profiles = profilesRes.data.map((p: any) => ({
        id: p.id,
        full_name: p.full_name || "Staff Member",
        email: p.email,
        role: p.role || "admin",
        created_at: p.created_at
      }));
    }
  } catch (err) {
    console.warn("[settings] Database fetch fallback:", err);
  }

  const defaultTab = searchParams?.tab === "users" ? "users" : "security";

  return (
    <div className="py-2">
      <SettingsTeamManager
        profiles={profiles}
        currentUserId={userId}
        currentUserEmail={userEmail}
        defaultTab={defaultTab}
      />
    </div>
  );
}
