import ServiceEditor from "@/components/admin/ServiceEditor";

export const metadata = { title: "New Service | Admin Portal" };

export default function NewServicePage() {
  return (
    <div className="py-4">
      <ServiceEditor />
    </div>
  );
}
