import { createAdminClient } from "@/lib/supabase/admin";
import { getSiteSettings } from "@/lib/queries";
import MediaLibraryManager, { MediaItem } from "@/components/admin/MediaLibraryManager";

export const metadata = {
  title: "Website Images & Media Manager | Admin Portal"
};

export default async function AdminMediaPage() {
  const admin = createAdminClient();
  const settings = await getSiteSettings();
  const cloudFiles: MediaItem[] = [];

  // Gather uploaded files from buckets
  const buckets = ["site-assets", "general-media", "service-images", "project-images", "blog-images"];

  await Promise.all(
    buckets.map(async (bucket) => {
      try {
        const { data } = await admin.storage.from(bucket).list("", {
          limit: 30,
          sortBy: { column: "created_at", order: "desc" }
        });
        if (data) {
          data
            .filter((f) => !f.name.startsWith("."))
            .forEach((f) => {
              const { data: pubData } = admin.storage.from(bucket).getPublicUrl(f.name);
              cloudFiles.push({
                id: `${bucket}-${f.name}`,
                name: f.name,
                url: pubData.publicUrl,
                category: "uploaded",
                tag: `Bucket: ${bucket}`,
                bucket: bucket,
                dimensions: f.metadata?.size ? `${(f.metadata.size / 1024).toFixed(0)} KB` : undefined
              });
            });
        }
      } catch (err) {
        console.warn(`[AdminMediaPage] Could not fetch bucket ${bucket}:`, err);
      }
    })
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-brand-950 flex items-center gap-2">
          <span>🖼</span> Website Images & Media Library
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Directly inspect and replace live website images (Logo, Hero slides, About cover, Brochure) or upload new assets.
        </p>
      </div>

      <MediaLibraryManager initialCloudFiles={cloudFiles} currentSettings={settings} />
    </div>
  );
}
