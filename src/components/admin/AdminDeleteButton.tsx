"use client";

import { useTransition } from "react";

interface AdminDeleteButtonProps {
  id: string;
  itemTitle: string;
  onDelete: (id: string) => Promise<any>;
}

export default function AdminDeleteButton({ id, itemTitle, onDelete }: AdminDeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${itemTitle}"? This action cannot be undone.`)) {
      startTransition(async () => {
        await onDelete(id);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs font-semibold text-red-600 hover:text-red-800 transition disabled:opacity-50"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
