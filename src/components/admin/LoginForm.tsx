"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { login, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export default function LoginForm() {
  const [state, action, pending] = useFormState(login, initial);

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" />
      </div>
      <div>
        <label htmlFor="password" className="label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="current-password"
          className="input"
        />
      </div>
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <p className="text-center text-sm">
        <Link href="/admin/forgot-password" className="text-brand-700 hover:underline">
          Forgot password?
        </Link>
      </p>
    </form>
  );
}
