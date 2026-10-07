import { redirect } from "next/navigation";

export default function AdminApplicationsRedirect() {
  redirect("/admin/careers?tab=applications");
}
