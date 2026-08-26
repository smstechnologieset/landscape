export function whatsappLink(number: string, text?: string): string {
  const digits = (number || "").replace(/[^\d]/g, "");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${q}`;
}

export function formatDate(date: string | null | undefined, locale = "en"): string {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString(locale === "am" ? "am-ET" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return date;
  }
}

/** Safe upload path: never trust user filenames. */
export function safeFileName(original: string): string {
  const ext = original.includes(".") ? original.slice(original.lastIndexOf(".")).toLowerCase() : "";
  const random = crypto.randomUUID();
  return `${random}${ext}`;
}

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;
export const ALLOWED_DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
] as const;

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB
