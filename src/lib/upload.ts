import { uploadImageAction } from "@/app/actions/admin-crud";
import { MAX_UPLOAD_BYTES } from "@/lib/utils";

/** Upload a file from the browser to Supabase Storage with validation via Server Action. */
export async function uploadFile(
  bucket: string,
  file: File,
  allowedTypes: readonly string[]
): Promise<{ path: string | null; url?: string | null; error?: string }> {
  if (!allowedTypes.includes(file.type)) {
    return { path: null, error: "File type not allowed." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { path: null, error: "File is too large (max 10 MB)." };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucket);

  const res = await uploadImageAction(formData);
  if (!res.success || !res.url) {
    return { path: null, error: res.error || "Upload failed. Please try again." };
  }

  return { path: res.url, url: res.url };
}
