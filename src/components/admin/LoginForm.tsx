"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import { login, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export default function LoginForm() {
  const [state, action, pending] = useFormState(login, initial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-4">
      <form action={action} className="space-y-4">
        {state?.error && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-xs text-red-700 font-medium">
            {state.error}
          </p>
        )}

        <div>
          <label htmlFor="email" className="label text-xs font-semibold uppercase tracking-wider text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="input"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="label text-xs font-semibold uppercase tracking-wider text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="input"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full py-2.5 font-semibold text-sm shadow-md"
        >
          {pending ? "Signing into Portal…" : "Sign In to Admin Dashboard"}
        </button>
      </form>
    </div>
  );
}
