import Link from "next/link";
import ResetPasswordForm from "@/components/admin/ResetPasswordForm";

export const metadata = { title: "Set New Password", robots: { index: false, follow: false } };

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-950 p-4">
      <div className="card w-full max-w-md p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-brand-900">Set new password</h1>
        <ResetPasswordForm />
        <p className="mt-4 text-center text-sm">
          <Link href="/admin/login" className="text-brand-700 hover:underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
