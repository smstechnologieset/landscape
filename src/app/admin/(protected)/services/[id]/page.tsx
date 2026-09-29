import { notFound } from "next/navigation";
import { getStoredServiceById } from "@/lib/data-store";
import ServiceEditor from "@/components/admin/ServiceEditor";

export const metadata = { title: "Edit Service | Admin Portal" };

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getStoredServiceById(params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="py-4">
      <ServiceEditor initialService={service} />
    </div>
  );
}
