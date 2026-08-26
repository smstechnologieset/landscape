"use client";

import { whatsappLink } from "@/lib/utils";

export default function WhatsAppButton({
  number,
  label,
  compact = false,
  floating = false
}: {
  number: string;
  label?: string;
  compact?: boolean;
  floating?: boolean;
}) {
  if (!number) return null;

  if (floating) {
    return (
      <a
        href={whatsappLink(number)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-700"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5 13.9c-.2.7-1.2 1.3-1.9 1.4-.5.1-1.1.2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.2.1.4.1.4.2.1.2.1.8-.1 1.4Z" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={whatsappLink(number)}
      target="_blank"
      rel="noopener noreferrer"
      className={compact ? "btn-whatsapp !px-3 !py-1.5 text-xs" : "btn-whatsapp"}
    >
      {label ?? "WhatsApp"}
    </a>
  );
}
