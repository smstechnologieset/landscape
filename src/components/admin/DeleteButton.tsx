"use client";

import { deleteResource } from "@/app/actions/admin-helpers";

export default function DeleteButton({
  resource,
  id,
  label = "Delete"
}: {
  resource: string;
  id: number;
  label?: string;
}) {
  return (
    <form
      action={deleteResource}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this item? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="resource" value={resource} />
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-semibold text-red-700 hover:bg-red-50"
      >
        {label}
      </button>
    </form>
  );
}
