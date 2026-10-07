import { redirect } from "next/navigation";

export default function AdminPartnersRedirect() {
  redirect("/admin/company-profile?tab=partners");
}
