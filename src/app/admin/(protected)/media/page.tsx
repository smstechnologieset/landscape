import { createClient } from "@/lib/supabase/server";
import MediaUploader from "@/components/admin/MediaUploader";

const PUBLIC_BUCKETS = [
  "site-assets",
  "project-images",
  "service-images",
  "blog-images",
  "partner-logos",
  "general-media"
];

export default async function AdminMediaPage() {
  const supabase = createClient();
  const { data: media } = await supabase
    .from("media")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Media Library</h1>

      <MediaUploader />

      <h2 className="mb-3 font-semibold">Public URLs of recent uploads</h2>
      {!media?.length ? (
        <p className="card p-8 text-center text-gray-500">
          Nothing recorded yet. Uploads made through content forms are stored directly in
          their buckets.
        </p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">File</th>
                <th className="px-4 py-3">Bucket</th>
                <th className="px-4 py-3">URL / Path</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {media.map((m) => {
                const isPublic = PUBLIC_BUCKETS.includes(m.bucket);
                const url = isPublic
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${m.bucket}/${m.storage_path}`
                  : m.storage_path;
                return (
                  <tr key={m.id}>
                    <td className="px-4 py-3 font-medium">{m.file_name}</td>
                    <td className="px-4 py-3">{m.bucket}</td>
                    <td className="max-w-sm truncate px-4 py-3 text-gray-500">{url}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
