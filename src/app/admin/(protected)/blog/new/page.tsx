import { createClient } from "@/lib/supabase/server";
import ResourceForm from "@/components/admin/ResourceForm";
import { savePost } from "@/app/actions/admin";
import { blogFields } from "../blogFields";

export default async function NewPostPage() {
  const supabase = createClient();
  const { data: categories } = await supabase.from("blog_categories").select("id,name");

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">New Post</h1>
      <div className="card p-6">
        <ResourceForm
          fields={blogFields((categories ?? []).map((c) => ({ value: String(c.id), label: c.name })))}
          initial={{ is_published: false }}
          action={savePost}
          cancelHref="/admin/blog"
          submitLabel="Create Post"
        />
      </div>
    </div>
  );
}
