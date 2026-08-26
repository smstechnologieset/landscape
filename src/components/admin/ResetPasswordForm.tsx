"use client";

import { useFormState } from "react-dom";
import { updatePassword, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export default function ResetPasswordForm() {
  const [state, action, pending] = useFormState(updatePassword, initial);

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{state.error}</p>
      )}
      {state.success && (
        <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-green-800">
          Password updated. You can now sign in with the new password.
        </p>
      )}
      <div>
        <label htmlFor="new-password" className="label">New password</label>
        <input id="new-password" name="password" type="password" required minLength={8} autoComplete="new-password" className="input" />
      </div>
      <div>
        <label htmlFor="confirm-password" className="label">Confirm password</label>
        <input id="confirm-password" name="confirm" type="password" required minLength={8} autoComplete="new-password" className="input" />
      </div>
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
