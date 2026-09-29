import Link from "next/link";
import Image from "next/image";
import { getStoredProjects } from "@/lib/data-store";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import { deleteProjectAction } from "@/app/actions/admin-crud";

export const metadata = { title: "Manage Projects | Admin Portal" };

export default async function AdminProjectsPage() {
  const projects = await getStoredProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Project Portfolio Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage executed projects, upload cover and slideshow photo galleries, titles, and taglines.
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary !text-xs !py-2.5 font-semibold shadow-sm">
          + Add New Project
        </Link>
      </div>

      <div className="card overflow-hidden bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Cover & Project Title</th>
                <th className="px-5 py-3.5">Category & Location Tag</th>
                <th className="px-5 py-3.5">Gallery Photos</th>
                <th className="px-5 py-3.5">Year</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-20 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                        <Image
                          src={p.coverImage || "/images/hero_landscape.jpg"}
                          alt={p.title.en}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-brand-950">{p.title.en}</div>
                        {p.title.am && <div className="text-xs text-gray-500 mt-0.5">{p.title.am}</div>}
                        <div className="text-[11px] text-gray-400 font-mono mt-0.5">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-semibold text-sprout-800 bg-sprout-50 border border-sprout-200 px-2.5 py-1 rounded-md inline-block max-w-xs truncate">
                      {p.category.en} • {p.location}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-600">
                    <span className="font-bold text-brand-900">{p.galleryImages.length}</span> photo(s) in slideshow
                  </td>
                  <td className="px-5 py-4 text-xs font-semibold text-gray-600">
                    {p.year || "2026"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="text-xs font-semibold text-brand-700 hover:text-brand-900 transition hover:underline"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        id={p.id}
                        itemTitle={p.title.en}
                        onDelete={deleteProjectAction}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                    No portfolio projects found. Click &quot;Add New Project&quot; to publish one.
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
