import Link from "next/link";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/forms/ApplicationForm";
import { getJobById } from "@/lib/queries";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const job = await getJobById(Number(params.id)).catch(() => null);
  return { title: job ? t(job.title, "en") : "Job not found" };
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const locale = await getLocale();
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const job = await getJobById(id);
  if (!job) notFound();

  const asList = (arr: unknown): string[] =>
    Array.isArray(arr)
      ? arr.map((v) => (typeof v === "string" ? v : t(v as { en: string }, "en")))
      : [];

  return (
    <div className="container-page py-16">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/careers" className="hover:text-brand-700">Careers</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{t(job.title, locale)}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-900">{t(job.title, locale)}</h1>
          <p className="mt-2 text-sm text-gray-600">
            {[job.department, job.location].filter(Boolean).join(" · ")}
          </p>

          <div className="prose-content mt-6">
            <p>{t(job.description, locale)}</p>
            {asList(job.responsibilities).length > 0 && (
              <>
                <h2>Responsibilities</h2>
                <ul>{asList(job.responsibilities).map((r, i) => <li key={i}>{r}</li>)}</ul>
              </>
            )}
            {asList(job.requirements).length > 0 && (
              <>
                <h2>Requirements</h2>
                <ul>{asList(job.requirements).map((r, i) => <li key={i}>{r}</li>)}</ul>
              </>
            )}
            {job.application_deadline && (
              <p className="text-sm text-gray-500">Apply before {job.application_deadline}.</p>
            )}
          </div>
        </div>

        <section aria-label="Apply for this position" className="card h-fit p-6">
          <h2 className="mb-4 text-xl font-bold text-brand-900">Apply Now</h2>
          <ApplicationForm jobId={job.id} locale={locale} />
        </section>
      </div>
    </div>
  );
}
