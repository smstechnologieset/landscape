import { redirect } from "next/navigation";

export default function AdminTestimonialsRedirect() {
  redirect("/admin/company-profile?tab=testimonials");
}
