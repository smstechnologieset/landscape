import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ResourceForm from "@/components/admin/ResourceForm";
import { savePost } from "@/app/actions/admin";
import { blogFields } from "../blogFields";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const supabase = createClient();
  const [{ data: post }, { data: categories }] = await Promise.all([
    supabase.from("blog_posts").select("*").eq("id", id).maybeSingle(),
    supabase.from("blog_categories").select("id,name")
  ]);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Edit Post</h1>
      <div className="card p-6">
        <ResourceForm
          fields={blogFields((categories ?? []).map((c) => ({ value: String(c.id), label: c.name })))}
          initial={post}
          action={savePost}
          cancelHref="/admin/blog"
          submitLabel="Update Post"
        />
      </div>
    </div>
  );
}
