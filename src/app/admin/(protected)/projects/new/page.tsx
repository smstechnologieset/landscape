import ProjectForm from "../ProjectFormWrapper";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">New Project</h1>
      <div className="card p-6"><ProjectForm /></div>
    </div>
  );
}
