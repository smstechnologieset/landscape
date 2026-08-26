import ResourceForm, { type FieldConfig } from "@/components/admin/ResourceForm";
import { savePartner } from "@/app/actions/admin";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "logo_url", label: "Logo", type: "image", bucket: "partner-logos" },
  { name: "website_url", label: "Website URL", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "is_published", label: "Published", type: "checkbox" }
];

export default function PartnerForm({ initial, id }: { initial?: Record<string, unknown>; id?: number }) {
  return (
    <ResourceForm
      fields={fields}
      initial={initial ?? { is_published: true, sort_order: 0 }}
      action={savePartner}
      cancelHref="/admin/partners"
      submitLabel={id ? "Update Partner" : "Create Partner"}
    />
  );
}
