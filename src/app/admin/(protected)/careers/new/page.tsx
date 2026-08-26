import JobForm from "../JobFormWrapper";

export default function NewJobPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">New Job Listing</h1>
      <div className="card p-6"><JobForm /></div>
    </div>
  );
}
