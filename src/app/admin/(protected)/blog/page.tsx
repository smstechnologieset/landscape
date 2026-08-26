import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id,title,slug,is_featured,is_published,published_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-900">Blog Posts</h1>
        <Link href="/admin/blog/new" className="btn-primary">+ New Post</Link>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title (EN)</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {(posts ?? []).map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium">{(p.title as { en: string }).en}</td>
                <td className="px-4 py-3 text-gray-500">
                  {p.published_at ? new Date(p.published_at).toLocaleDateString("en-GB") : "—"}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blog/${p.id}`} className="mr-3 text-xs font-semibold text-brand-700 hover:underline">Edit</Link>
                  <DeleteButton resource="blog_posts" id={p.id} />
                </td>
              </tr>
            ))}
            {!posts?.length && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
