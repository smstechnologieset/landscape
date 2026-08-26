import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-950 p-4">
      <div className="card w-full max-w-md p-8">
        <h1 className="mb-1 text-center text-2xl font-bold text-brand-900">Landscape Solution</h1>
        <p className="mb-6 text-center text-sm text-gray-500">Admin dashboard sign in</p>
        <LoginForm />
      </div>
    </div>
  );
}
