import { redirect } from "next/navigation";

export default function AdminSustainabilityRedirect() {
  redirect("/admin/company-profile?tab=sustainability");
}
