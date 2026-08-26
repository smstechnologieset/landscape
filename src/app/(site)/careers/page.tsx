import Link from "next/link";
import { EmptyState } from "@/components/SectionHeading";
import { getJobs } from "@/lib/queries";
import { t } from "@/lib/types";

export const metadata = {
  title: "Careers",
  description: "Join the Landscape Solution PLC team."
};

const EMPLOYMENT_LABELS: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  internship: "Internship"
};

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <div className="container-page py-16">
      <h1 className="mb-10 text-center text-4xl font-extrabold text-brand-900">Careers</h1>

      {jobs.length === 0 ? (
        <EmptyState message="There are no open positions right now. Check back soon!" />
      ) : (
        <ul className="mx-auto max-w-3xl space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-brand-900">{t(job.title, "en")}</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {[job.department, job.location, EMPLOYMENT_LABELS[job.employment_type]]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <Link href={`/careers/${job.id}`} className="btn-secondary">
                  View & Apply
                </Link>
              </div>
              {job.application_deadline && (
                <p className="mt-2 text-xs text-gray-500">
                  Apply before {job.application_deadline}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
