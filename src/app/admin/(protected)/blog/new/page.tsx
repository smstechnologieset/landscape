import BlogEditor from "@/components/admin/BlogEditor";

export const metadata = { title: "New Article | Admin Portal" };

export default function NewBlogPage() {
  return (
    <div className="py-4">
      <BlogEditor />
    </div>
  );
}
