import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminServicesPage() {
  const supabase = createClient();
  const { data: services } = await supabase
    .from("services")
    .select("id,title,slug,is_featured,is_published,sort_order")
    .order("sort_order");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-900">Services</h1>
        <Link href="/admin/services/new" className="btn-primary">+ New Service</Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title (EN)</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(services ?? []).map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 font-medium">{(s.title as { en: string }).en}</td>
                <td className="px-4 py-3 text-gray-500">{s.slug}</td>
                <td className="px-4 py-3">{s.sort_order}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {s.is_published ? "Published" : "Draft"}
                  </span>
                  {s.is_featured && (
                    <span className="ml-1 rounded-full bg-accent-400/20 px-2 py-0.5 text-xs font-semibold text-accent-600">Featured</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${s.id}`} className="mr-3 text-xs font-semibold text-brand-700 hover:underline">Edit</Link>
                  <DeleteButton resource="services" id={s.id} />
                </td>
              </tr>
            ))}
            {!services?.length && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No services yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
