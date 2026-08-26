import { createClient } from "@/lib/supabase/server";
import { updateConsultationStatus } from "@/app/actions/admin";

const STATUSES = ["pending", "approved", "rejected", "rescheduled", "completed"] as const;

export default async function AdminConsultationsPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("consultation_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Consultation Requests</h1>

      {!data?.length && <p className="card p-8 text-center text-gray-500">No consultation requests yet.</p>}

      <div className="space-y-4">
        {(data ?? []).map((c) => (
          <article key={c.id} className={`card p-5 ${c.status === "pending" ? "border-brand-400" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-brand-900">
                  {c.full_name}
                  {c.status === "pending" && (
                    <span className="ml-2 rounded-full bg-accent-400/20 px-2 py-0.5 text-xs font-bold text-accent-600">PENDING</span>
                  )}
                </h2>
                <p className="text-sm text-gray-500">
                  <a href={`mailto:${c.email}`} className="text-brand-700 hover:underline">{c.email}</a>
                  {c.phone && <> · {c.phone}</>}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Preferred: <strong>{c.preferred_date}</strong> {c.preferred_time} · Type:{" "}
                  {c.consultation_type}
                </p>
              </div>
            </div>

            {(c.project_details || c.message) && (
              <div className="mt-3 space-y-1 whitespace-pre-line text-sm text-gray-700">
                {c.project_details && <p><strong>Project:</strong> {c.project_details}</p>}
                {c.message && <p>{c.message}</p>}
              </div>
            )}

            <form action={updateConsultationStatus} className="mt-4 flex flex-wrap items-center gap-2 border-t pt-3">
              <input type="hidden" name="id" value={c.id} />
              <label htmlFor={`cs-${c.id}`} className="sr-only">Status</label>
              <select id={`cs-${c.id}`} name="status" defaultValue={c.status} className="input !w-auto !py-1 text-xs">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <label htmlFor={`cn-${c.id}`} className="sr-only">Admin notes</label>
              <input id={`cn-${c.id}`} name="admin_notes" defaultValue={c.admin_notes} placeholder="Internal notes…" className="input !w-auto max-w-xs flex-1 !py-1 text-xs" />
              <button className="btn-secondary !px-2.5 !py-1 text-xs">Update</button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
