import ServiceForm from "../ServiceFormWrapper";

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">New Service</h1>
      <div className="card p-6">
        <ServiceForm />
      </div>
    </div>
  );
}
