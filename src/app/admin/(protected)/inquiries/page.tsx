import { redirect } from "next/navigation";

export default function AdminInquiriesPage({
  searchParams
}: {
  searchParams?: { type?: string };
}) {
  const type = searchParams?.type;
  redirect(type ? `/admin/contact?tab=inbox&type=${type}` : "/admin/contact?tab=inbox");
}
