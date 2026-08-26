import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProjectForm from "../ProjectFormWrapper";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const supabase = createClient();
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Edit Project</h1>
      <div className="card p-6"><ProjectForm initial={data} id={id} /></div>

      <section aria-label="Project images" className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Gallery</h2>
        <p className="text-sm text-gray-500">
          Gallery images are managed in the Media library; add their URLs via the database
          table <code>project_images</code> or re-use the featured image.
        </p>
      </section>
    </div>
  );
}
