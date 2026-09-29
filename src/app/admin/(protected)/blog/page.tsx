import Link from "next/link";
import Image from "next/image";
import { getStoredBlogPosts } from "@/lib/data-store";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import { deleteBlogAction } from "@/app/actions/admin-crud";

export const metadata = { title: "Manage Blog | Admin Portal" };

export default async function AdminBlogPage() {
  const posts = await getStoredBlogPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Blog & Perspectives Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, and publish technical insights, ecological articles, and case studies.
          </p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary !text-xs !py-2.5 font-semibold shadow-sm">
          + Add New Article
        </Link>
      </div>

      <div className="card overflow-hidden bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
              <tr>
                <th className="px-5 py-3.5">Article Details</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Author</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                        <Image
                          src={post.image || "/images/service_plant_id.jpg"}
                          alt={post.title.en}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-brand-950 line-clamp-1">{post.title.en}</div>
                        <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{post.excerpt.en}</div>
                        <div className="text-[11px] text-gray-400 font-mono mt-0.5">/{post.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                      {post.category.en}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-600 truncate max-w-xs">
                    {post.author}
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                    <div>{post.date}</div>
                    <div className="text-[11px] text-gray-400">{post.readTime}</div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/blog/${post.slug || post.id}`}
                        className="text-xs font-semibold text-brand-700 hover:text-brand-900 transition hover:underline"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        id={post.id}
                        itemTitle={post.title.en}
                        onDelete={deleteBlogAction}
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-500 text-sm">
                    No blog articles found. Click &quot;Add New Article&quot; to write one.
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
