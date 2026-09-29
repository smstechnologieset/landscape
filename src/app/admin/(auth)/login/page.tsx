import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin Portal Sign In | Landscape Solution PLC", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  const cookieStore = cookies();
  if (cookieStore.has("ls_admin_session")) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-950 p-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sprout-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="card w-full max-w-md p-8 border border-brand-800/80 bg-white/95 backdrop-blur shadow-2xl relative z-10">
        <div className="flex justify-center mb-5">
          <div className="relative h-12 w-44">
            <Image
              src="/images/logo.png"
              alt="Landscape Solution PLC"
              fill
              sizes="176px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="text-center text-xl font-bold text-brand-900">Admin Control Portal</h1>
        <p className="mb-6 text-center text-xs text-gray-500">
          Sign in to manage Services, Portfolio, Blog, Careers & Inquiries
        </p>

        <LoginForm />

        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <Link href="/" className="text-xs text-brand-700 hover:text-brand-900 font-medium transition inline-flex items-center gap-1">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
