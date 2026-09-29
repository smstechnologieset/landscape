import Link from "next/link";
import Image from "next/image";
import { getStoredServices } from "@/lib/data-store";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import { deleteServiceAction } from "@/app/actions/admin-crud";

export const metadata = { title: "Manage Services | Admin Portal" };

export default async function AdminServicesPage() {
  const services = await getStoredServices();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Services Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, and organize all landscape and ecological services displayed on the website.
          </p>
        </div>
        <Link href="/admin/services/new" className="btn-primary !text-xs !py-2.5 font-semibold shadow-sm">
          + Add New Service
        </Link>
      </div>

      <div className="card overflow-hidden bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Service Details</th>
                <th className="px-5 py-3.5">Category Group</th>
                <th className="px-5 py-3.5">Key Capabilities</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                        <Image
                          src={s.featured_image || "/images/service_planning.jpg"}
                          alt={s.title.en}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-brand-950">{s.title.en}</div>
                        {s.title.am && <div className="text-xs text-gray-500 mt-0.5">{s.title.am}</div>}
                        <div className="text-[11px] text-gray-400 font-mono mt-0.5">/{s.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-gray-700">
                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-gray-800">
                      {s.categoryGroup}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-600">
                    <span className="font-semibold text-brand-800">{s.features?.length || 0}</span> capabilities configured
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          s.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {s.is_published ? "Published" : "Draft"}
                      </span>
                      {s.is_featured && (
                        <span className="rounded-full bg-sprout-100 text-sprout-800 px-2 py-0.5 text-[11px] font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/services/${s.slug || s.id}`}
                        className="text-xs font-semibold text-brand-700 hover:text-brand-900 transition hover:underline"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        id={String(s.id)}
                        itemTitle={s.title.en}
                        onDelete={deleteServiceAction}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                    No services found. Click &quot;Add New Service&quot; to create one.
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
