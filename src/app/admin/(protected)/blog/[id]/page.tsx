import { notFound } from "next/navigation";
import { getStoredBlogPostById } from "@/lib/data-store";
import BlogEditor from "@/components/admin/BlogEditor";

export const metadata = { title: "Edit Article | Admin Portal" };

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const post = await getStoredBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-4">
      <BlogEditor initialPost={post} />
    </div>
  );
}
