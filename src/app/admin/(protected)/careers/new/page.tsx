import CareerJobEditor from "@/components/admin/CareerJobEditor";

export const metadata = { title: "Post Job Opening | Admin Portal" };

export default function NewCareerPage() {
  return (
    <div className="py-4">
      <CareerJobEditor />
    </div>
  );
}
