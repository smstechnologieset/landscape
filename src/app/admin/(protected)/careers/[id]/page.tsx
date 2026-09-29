import { notFound } from "next/navigation";
import { getStoredJobById } from "@/lib/data-store";
import CareerJobEditor from "@/components/admin/CareerJobEditor";

export const metadata = { title: "Edit Job Opening | Admin Portal" };

export default async function EditCareerPage({ params }: { params: { id: string } }) {
  const job = await getStoredJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="py-4">
      <CareerJobEditor initialJob={job} />
    </div>
  );
}
