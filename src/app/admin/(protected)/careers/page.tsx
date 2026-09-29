import Link from "next/link";
import { getStoredJobs } from "@/lib/data-store";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import { deleteJobAction } from "@/app/actions/admin-crud";

export const metadata = { title: "Manage Careers | Admin Portal" };

export default async function AdminCareersPage() {
  const jobs = await getStoredJobs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Career Openings Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Post job vacancies, set employment types, responsibilities, and qualifications.
          </p>
        </div>
        <Link href="/admin/careers/new" className="btn-primary !text-xs !py-2.5 font-semibold shadow-sm">
          + Post Job Opening
        </Link>
      </div>

      <div className="card overflow-hidden bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Role Title</th>
                <th className="px-5 py-3.5">Department</th>
                <th className="px-5 py-3.5">Type & Location</th>
                <th className="px-5 py-3.5">Responsibilities</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-5 py-4">
                    <div className="font-bold text-brand-950">{job.title.en}</div>
                    {job.title.am && <div className="text-xs text-gray-500 mt-0.5">{job.title.am}</div>}
                    <div className="text-[11px] text-gray-400 font-mono mt-0.5">/{job.id}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                      {job.department.en}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs">
                    <div className="font-semibold text-brand-900">
                      {typeof job.type === "string" ? job.type : job.type.en}
                    </div>
                    <div className="text-gray-500 text-[11px]">
                      {typeof job.location === "string" ? job.location : job.location.en}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-600">
                    <span className="font-semibold text-brand-800">
                      {Array.isArray(job.responsibilities) ? job.responsibilities.length : job.responsibilities?.en?.length || 0}
                    </span> duties,{" "}
                    <span className="font-semibold text-brand-800">
                      {Array.isArray(job.requirements) ? job.requirements.length : job.requirements?.en?.length || 0}
                    </span> reqs
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/careers/${job.id}`}
                        className="text-xs font-semibold text-brand-700 hover:text-brand-900 transition hover:underline"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        id={job.id}
                        itemTitle={job.title.en}
                        onDelete={deleteJobAction}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                    No active job vacancies found. Click &quot;Post Job Opening&quot; to publish one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
