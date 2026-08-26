import ResourceForm, { type FieldConfig } from "@/components/admin/ResourceForm";
import { saveService } from "@/app/actions/admin";

export const serviceFields: FieldConfig[] = [
  { name: "title", label: "Title", type: "localized", required: true },
  { name: "slug", label: "Slug (auto if empty)", type: "text" },
  { name: "short_description", label: "Short Description", type: "localized" },
  { name: "description", label: "Full Description", type: "localized_textarea" },
  {
    name: "icon",
    label: "Icon name",
    type: "select",
    options: [
      { value: "", label: "— none —" },
      { value: "leaf", label: "Leaf" },
      { value: "droplet", label: "Droplet" },
      { value: "sprout", label: "Sprout" },
      { value: "tree", label: "Tree" }
    ]
  },
  { name: "featured_image", label: "Featured Image", type: "image", bucket: "service-images" },
  { name: "features", label: "Features", type: "lines" },
  { name: "benefits", label: "Benefits", type: "lines" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_featured", label: "Featured on homepage", type: "checkbox" },
  { name: "is_published", label: "Published", type: "checkbox" },
  { name: "seo_title", label: "SEO Title", type: "text" },
  { name: "seo_description", label: "SEO Description", type: "textarea" }
];

export default function ServiceForm({ initial, id }: { initial?: Record<string, unknown>; id?: number }) {
  return (
    <ResourceForm
      fields={serviceFields}
      initial={initial ?? { is_published: false, sort_order: 0 }}
      action={saveService}
      cancelHref="/admin/services"
      submitLabel={id ? "Update Service" : "Create Service"}
    />
  );
}
