import { getStoredJobs } from "@/lib/data-store";
import { createAdminClient } from "@/lib/supabase/admin";
import CareersHiringManager, { type ApplicationItem } from "@/components/admin/CareersHiringManager";

export const metadata = { title: "Careers & Hiring | Admin Portal" };

interface PageProps {
  searchParams?: {
    tab?: "jobs" | "applications";
  };
}

export default async function AdminCareersPage({ searchParams }: PageProps) {
  const supabase = createAdminClient();

  const [jobs, appsRes] = await Promise.all([
    getStoredJobs(),
    supabase
      .from("job_applications")
      .select("*, jobs(title)")
      .order("created_at", { ascending: false })
  ]);

  const appsData = appsRes.data || [];
  const applications: ApplicationItem[] = [];

  for (const a of appsData) {
    let resumeUrl = a.resume_url;
    if (resumeUrl && !/^https?:\/\//.test(resumeUrl)) {
      const { data: signed } = await supabase.storage
        .from("career-applications")
        .createSignedUrl(resumeUrl, 3600);
      if (signed?.signedUrl) {
        resumeUrl = signed.signedUrl;
      }
    }

    applications.push({
      id: a.id,
      fullName: a.full_name,
      email: a.email,
      phone: a.phone || undefined,
      jobTitle: (a.jobs?.title as { en?: string })?.en ?? (a.job_id ? `Job #${a.job_id}` : "General / Talent Network"),
      jobId: a.job_id,
      status: a.status || "new",
      coverLetter: a.cover_letter || undefined,
      resumeUrl: resumeUrl || undefined,
      portfolioUrl: a.portfolio_url || undefined,
      createdAt: a.created_at
    });
  }

  const defaultTab = searchParams?.tab === "applications" ? "applications" : "jobs";

  return (
    <div className="py-2">
      <CareersHiringManager
        jobs={jobs}
        applications={applications}
        defaultTab={defaultTab}
      />
    </div>
  );
}
