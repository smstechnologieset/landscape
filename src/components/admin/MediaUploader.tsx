"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { safeFileName, MAX_UPLOAD_BYTES, ALLOWED_IMAGE_TYPES } from "@/lib/utils";

export default function MediaUploader() {
  const [status, setStatus] = useState<{ kind: "idle" | "busy" | "ok" | "err"; msg?: string }>({ kind: "idle" });
  const inputRef = useRef<HTMLInputElement>(null);
  const bucketRef = useRef<HTMLSelectElement>(null);

  async function upload() {
    const file = inputRef.current?.files?.[0];
    const bucket = bucketRef.current?.value;
    if (!file || !bucket) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type as never) && file.type !== "application/pdf") {
      setStatus({ kind: "err", msg: "Only PNG, JPEG, WebP or PDF allowed." });
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setStatus({ kind: "err", msg: "File too large (max 10 MB)." });
      return;
    }

    setStatus({ kind: "busy" });
    const supabase = createClient();
    const path = `library/${safeFileName(file.name)}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, {
      contentType: file.type
    });

    if (error) {
      setStatus({ kind: "err", msg: "Upload failed." });
      return;
    }
    setStatus({ kind: "ok", msg: `Uploaded to ${bucket}/${path}` });
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="card mb-6 p-5">
      <h2 className="mb-3 font-semibold">Upload media</h2>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div>
          <label htmlFor="media-bucket" className="label">Bucket</label>
          <select id="media-bucket" ref={bucketRef} className="input">
            <option value="site-assets">site-assets</option>
            <option value="project-images">project-images</option>
            <option value="service-images">service-images</option>
            <option value="blog-images">blog-images</option>
            <option value="partner-logos">partner-logos</option>
            <option value="general-media">general-media</option>
            <option value="documents">documents</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="media-file" className="label">File</label>
          <input id="media-file" ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,application/pdf" className="input" />
        </div>
        <button onClick={upload} disabled={status.kind === "busy"} className="btn-primary">
          {status.kind === "busy" ? "Uploading…" : "Upload"}
        </button>
      </div>
      {status.kind === "err" && <p role="alert" className="field-error">{status.msg}</p>}
      {status.kind === "ok" && (
        <p role="status" className="mt-2 text-xs text-green-700">
          {status.msg} — copy this path into the relevant image field.
        </p>
      )}
    </div>
  );
}
