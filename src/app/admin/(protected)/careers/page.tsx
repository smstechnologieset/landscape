import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminCareersPage() {
  const supabase = createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("id,title,department,is_published,is_closed")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-900">Job Listings</h1>
        <Link href="/admin/careers/new" className="btn-primary">+ New Job</Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title (EN)</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(jobs ?? []).map((j) => (
              <tr key={j.id}>
                <td className="px-4 py-3 font-medium">{(j.title as { en: string }).en}</td>
                <td className="px-4 py-3 text-gray-500">{j.department}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${j.is_published ? (j.is_closed ? "bg-red-100 text-red-700" : "bg-green-100 text-green-800") : "bg-gray-100 text-gray-600"}`}>
                    {j.is_published ? (j.is_closed ? "Closed" : "Open") : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/careers/${j.id}`} className="mr-3 text-xs font-semibold text-brand-700 hover:underline">Edit</Link>
                  <DeleteButton resource="jobs" id={j.id} />
                </td>
              </tr>
            ))}
            {!jobs?.length && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No jobs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
