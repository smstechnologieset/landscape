import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminTestimonialsPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from("testimonials")
    .select("id,customer_name,company,rating,is_published")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-900">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="btn-primary">+ New Testimonial</Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(items ?? []).map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-3 font-medium">{t.customer_name}</td>
                <td className="px-4 py-3 text-gray-500">{t.company}</td>
                <td className="px-4 py-3 text-accent-500">{"★".repeat(t.rating)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {t.is_published ? "Published" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/testimonials/${t.id}`} className="mr-3 text-xs font-semibold text-brand-700 hover:underline">Edit</Link>
                  <DeleteButton resource="testimonials" id={t.id} />
                </td>
              </tr>
            ))}
            {!items?.length && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No testimonials yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
