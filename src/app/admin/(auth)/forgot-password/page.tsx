"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { requestPasswordReset, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export default function ForgotPasswordPage() {
  const [state, action, pending] = useFormState(requestPasswordReset, initial);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-950 p-4">
      <div className="card w-full max-w-md p-8">
        <h1 className="mb-2 text-center text-2xl font-bold text-brand-900">Reset password</h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Enter your admin email and we will send you a reset link.
        </p>
        {state.success ? (
          <div role="status" className="rounded-md bg-green-50 p-4 text-sm text-green-800">
            If an account exists for that email, a reset link has been sent.
          </div>
        ) : (
          <form action={action} className="space-y-4">
            {state.error && (
              <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
            )}
            <div>
              <label htmlFor="fp-email" className="label">Email</label>
              <input id="fp-email" name="email" type="email" required className="input" />
            </div>
            <button type="submit" disabled={pending} className="btn-primary w-full">
              {pending ? "Sending…" : "Send reset link"}
            </button>
          </form>
        )}
        <p className="mt-4 text-center text-sm">
          <Link href="/admin/login" className="text-brand-700 hover:underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
