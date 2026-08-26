import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProjectsPage() {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id,title,slug,category,is_featured,is_published")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-900">Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary">+ New Project</Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title (EN)</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(projects ?? []).map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium">{(p.title as { en: string }).en}</td>
                <td className="px-4 py-3 capitalize text-gray-500">{p.category}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/projects/${p.id}`} className="mr-3 text-xs font-semibold text-brand-700 hover:underline">Edit</Link>
                  <DeleteButton resource="projects" id={p.id} />
                </td>
              </tr>
            ))}
            {!projects?.length && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No projects yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
