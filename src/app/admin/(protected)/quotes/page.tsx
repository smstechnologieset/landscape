import { createClient } from "@/lib/supabase/server";
import { updateQuoteStatus } from "@/app/actions/admin";

const STATUSES = ["new", "reviewing", "contacted", "quoted", "won", "closed"] as const;

export default async function AdminQuotesPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("quote_requests")
    .select("*, services(title)")
    .order("created_at", { ascending: false });

  // Attachments live in a private bucket — generate short-lived signed URLs.
  const signedUrls: Record<number, string> = {};
  for (const q of data ?? []) {
    if (!q.attachment_url) continue;
    if (/^https?:\/\//.test(q.attachment_url)) {
      signedUrls[q.id] = q.attachment_url;
      continue;
    }
    const { data: signed } = await supabase.storage
      .from("attachments")
      .createSignedUrl(q.attachment_url, 600);
    if (signed) signedUrls[q.id] = signed.signedUrl;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Quote Requests</h1>

      {!data?.length && <p className="card p-8 text-center text-gray-500">No quote requests yet.</p>}

      <div className="space-y-4">
        {(data ?? []).map((q) => (
          <article key={q.id} className={`card p-5 ${q.status === "new" ? "border-brand-400" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-brand-900">
                  {q.full_name}
                  {(q as { company: string }).company && ` — ${(q as { company: string }).company}`}
                  {q.status === "new" && (
                    <span className="ml-2 rounded-full bg-accent-400/20 px-2 py-0.5 text-xs font-bold text-accent-600">NEW</span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">
                  <a href={`mailto:${q.email}`} className="text-brand-700 hover:underline">{q.email}</a>
                  {q.phone && <> · {q.phone}</>}
                  {q.whatsapp && <> · WhatsApp: {q.whatsapp}</>} ·{" "}
                  {new Date(q.created_at).toLocaleString("en-GB")}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Service: {(q.services?.title as { en?: string })?.en ?? "—"} · Location:{" "}
                  {q.project_location || "—"} · Type: {q.project_type || "—"} · Size:{" "}
                  {q.project_size || "—"} · Budget: {q.budget_range || "—"} · Timeline:{" "}
                  {q.desired_timeline || "—"}
                </p>
              </div>
            </div>

            <p className="mt-3 whitespace-pre-line text-sm text-gray-700">{q.description}</p>

            {signedUrls[q.id] && (
              <a href={signedUrls[q.id]} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-semibold text-brand-700 hover:underline">
                View attachment ↗
              </a>
            )}

            <form action={updateQuoteStatus} className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3">
              <input type="hidden" name="id" value={q.id} />
              <label htmlFor={`qs-${q.id}`} className="sr-only">Status</label>
              <select id={`qs-${q.id}`} name="status" defaultValue={q.status} className="input !w-auto !py-1 text-xs">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <label htmlFor={`qn-${q.id}`} className="sr-only">Admin notes</label>
              <input id={`qn-${q.id}`} name="admin_notes" defaultValue={q.admin_notes} placeholder="Internal notes…" className="input !w-auto max-w-xs flex-1 !py-1 text-xs" />
              <button className="btn-secondary !px-2.5 !py-1 text-xs">Update</button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
