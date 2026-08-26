import { createClient } from "@/lib/supabase/server";
import { updateInquiryStatus } from "@/app/actions/admin";

const STATUSES = ["new", "read", "contacted", "archived"] as const;

export default async function AdminInquiriesPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Contact Inquiries</h1>

      {!data?.length && (
        <p className="card p-8 text-center text-gray-500">No inquiries yet.</p>
      )}

      <div className="space-y-4">
        {(data ?? []).map((q) => (
          <article key={q.id} className={`card p-5 ${q.status === "new" ? "border-brand-400" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-brand-900">
                  {q.subject || "(no subject)"}{" "}
                  {q.status === "new" && (
                    <span className="ml-1 rounded-full bg-accent-400/20 px-2 py-0.5 text-xs font-bold text-accent-600">NEW</span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">
                  {q.full_name} · <a href={`mailto:${q.email}`} className="text-brand-700 hover:underline">{q.email}</a>
                  {q.phone && <> · {q.phone}</>} · {new Date(q.created_at).toLocaleString("en-GB")}
                </p>
              </div>
              <form action={updateInquiryStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={q.id} />
                <label htmlFor={`st-${q.id}`} className="sr-only">Status</label>
                <select id={`st-${q.id}`} name="status" defaultValue={q.status} className="input !w-auto !py-1 text-xs">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="btn-secondary !px-2.5 !py-1 text-xs">Update</button>
              </form>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm text-gray-700">{q.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
