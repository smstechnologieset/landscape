import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminPartnersPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("partners")
    .select("id,name,sort_order,is_published")
    .order("sort_order");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-900">Partners</h1>
        <Link href="/admin/partners/new" className="btn-primary">+ New Partner</Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(items ?? []).map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{p.sort_order}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {p.is_published ? "Published" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/partners/${p.id}`} className="mr-3 text-xs font-semibold text-brand-700 hover:underline">Edit</Link>
                  <DeleteButton resource="partners" id={p.id} />
                </td>
              </tr>
            ))}
            {!items?.length && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No partners yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
