"use client";

import { createClient } from "@/lib/supabase/client";
import { safeFileName, MAX_UPLOAD_BYTES } from "@/lib/utils";

/** Upload a file from the browser to Supabase Storage with validation. */
export async function uploadFile(
  bucket: string,
  file: File,
  allowedTypes: readonly string[]
): Promise<{ path: string | null; error?: string }> {
  if (!allowedTypes.includes(file.type)) {
    return { path: null, error: "File type not allowed." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { path: null, error: "File is too large (max 10 MB)." };
  }

  const supabase = createClient();
  const path = `uploads/${new Date().getFullYear()}/${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false
  });

  if (error) return { path: null, error: "Upload failed. Please try again." };
  return { path };
}
