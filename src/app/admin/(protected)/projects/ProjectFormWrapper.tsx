import ResourceForm, { type FieldConfig } from "@/components/admin/ResourceForm";
import { saveProject } from "@/app/actions/admin";

const fields: FieldConfig[] = [
  { name: "title", label: "Title", type: "localized", required: true },
  { name: "slug", label: "Slug (auto if empty)", type: "text" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "residential", label: "Residential" },
      { value: "commercial", label: "Commercial" },
      { value: "public", label: "Public" }
    ]
  },
  { name: "location", label: "Location", type: "text" },
  { name: "client", label: "Client", type: "text" },
  { name: "completion_date", label: "Completion Date", type: "date" },
  { name: "short_description", label: "Short Description", type: "localized" },
  { name: "description", label: "Description", type: "localized_textarea" },
  { name: "challenge", label: "Challenge", type: "localized_textarea" },
  { name: "solution", label: "Solution", type: "localized_textarea" },
  { name: "results", label: "Results", type: "localized_textarea" },
  { name: "featured_image", label: "Featured Image", type: "image", bucket: "project-images" },
  { name: "is_featured", label: "Featured on homepage", type: "checkbox" },
  { name: "is_published", label: "Published", type: "checkbox" },
  { name: "seo_title", label: "SEO Title", type: "text" },
  { name: "seo_description", label: "SEO Description", type: "textarea" }
];

export default function ProjectForm({ initial, id }: { initial?: Record<string, unknown>; id?: number }) {
  return (
    <ResourceForm
      fields={fields}
      initial={initial ?? { is_published: false }}
      action={saveProject}
      cancelHref="/admin/projects"
      submitLabel={id ? "Update Project" : "Create Project"}
    />
  );
}
