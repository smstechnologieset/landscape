import { notFound } from "next/navigation";
import { getStoredProjectById } from "@/lib/data-store";
import ProjectEditor from "@/components/admin/ProjectEditor";

export const metadata = { title: "Edit Project | Admin Portal" };

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getStoredProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-4">
      <ProjectEditor initialProject={project} />
    </div>
  );
}
