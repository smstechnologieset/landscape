import { redirect } from "next/navigation";

export default function AdminConsultationsRedirect() {
  redirect("/admin/inquiries?type=consultations");
}
