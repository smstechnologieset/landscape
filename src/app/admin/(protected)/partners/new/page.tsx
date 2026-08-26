import PartnerForm from "../PartnerFormWrapper";

export default function NewPartnerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">New Partner</h1>
      <div className="card p-6"><PartnerForm /></div>
    </div>
  );
}
