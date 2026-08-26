import { createClient } from "@/lib/supabase/server";
import { updateApplicationStatus } from "@/app/actions/admin";

const STATUSES = ["new", "reviewing", "shortlisted", "rejected", "hired"] as const;

export default async function AdminApplicationsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("job_applications")
    .select("*, jobs(title)")
    .order("created_at", { ascending: false });

  // Resumes live in a private bucket — generate short-lived signed URLs.
  const signedUrls: Record<number, string> = {};
  for (const a of data ?? []) {
    if (!a.resume_url) continue;
    if (/^https?:\/\//.test(a.resume_url)) {
      signedUrls[a.id] = a.resume_url;
      continue;
    }
    const { data: signed } = await supabase.storage
      .from("career-applications")
      .createSignedUrl(a.resume_url, 600);
    if (signed) signedUrls[a.id] = signed.signedUrl;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Job Applications</h1>

      {!data?.length && <p className="card p-8 text-center text-gray-500">No applications yet.</p>}

      <div className="space-y-4">
        {(data ?? []).map((a) => (
          <article key={a.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-brand-900">
                  {a.full_name}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    applied for {(a.jobs?.title as { en?: string })?.en ?? `job #${a.job_id}`}
                  </span>
                </h2>
                <p className="text-sm text-gray-500">
                  <a href={`mailto:${a.email}`} className="text-brand-700 hover:underline">{a.email}</a>
                  {a.phone && <> · {a.phone}</>} · {new Date(a.created_at).toLocaleString("en-GB")}
                </p>
              </div>
              <form action={updateApplicationStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={a.id} />
                <label htmlFor={`as-${a.id}`} className="sr-only">Status</label>
                <select id={`as-${a.id}`} name="status" defaultValue={a.status} className="input !w-auto !py-1 text-xs">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="btn-secondary !px-2.5 !py-1 text-xs">Update</button>
              </form>
            </div>

            {a.cover_letter && (
              <p className="mt-3 whitespace-pre-line border-t pt-3 text-sm text-gray-700">{a.cover_letter}</p>
            )}

            {signedUrls[a.id] && (
              <a
                href={signedUrls[a.id]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-semibold text-brand-700 hover:underline"
              >
                Download resume ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
