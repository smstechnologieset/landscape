"use client";

import Link from "next/link";
import { logout } from "@/app/actions/auth";

export default function AdminHeader({
  userName,
  role
}: {
  userName: string;
  role: "admin" | "editor";
}) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <p className="text-sm text-gray-500">
        Signed in as <span className="font-semibold text-brand-900">{userName}</span>{" "}
        <span className="rounded bg-brand-100 px-1.5 py-0.5 text-xs font-semibold uppercase text-brand-800">
          {role}
        </span>
      </p>
      <div className="flex items-center gap-3 text-sm">
        <Link href="/" target="_blank" className="text-brand-700 hover:underline">
          View site ↗
        </Link>
        <form action={logout}>
          <button type="submit" className="btn-secondary !px-3 !py-1.5">Log out</button>
        </form>
      </div>
    </header>
  );
}
