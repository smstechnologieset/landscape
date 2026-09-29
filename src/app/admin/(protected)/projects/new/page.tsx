import ProjectEditor from "@/components/admin/ProjectEditor";

export const metadata = { title: "New Project | Admin Portal" };

export default function NewProjectPage() {
  return (
    <div className="py-4">
      <ProjectEditor />
    </div>
  );
}
