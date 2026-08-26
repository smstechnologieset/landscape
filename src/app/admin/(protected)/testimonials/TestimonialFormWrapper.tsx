import ResourceForm, { type FieldConfig } from "@/components/admin/ResourceForm";
import { saveTestimonial } from "@/app/actions/admin";

const fields: FieldConfig[] = [
  { name: "customer_name", label: "Customer Name", type: "text", required: true },
  { name: "company", label: "Company", type: "text" },
  { name: "position", label: "Position", type: "text" },
  { name: "testimonial", label: "Testimonial", type: "localized_textarea", required: true },
  {
    name: "rating",
    label: "Rating",
    type: "select",
    options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} stars` }))
  },
  { name: "photo_url", label: "Photo URL", type: "image", bucket: "general-media" },
  { name: "is_featured", label: "Featured", type: "checkbox" },
  { name: "is_published", label: "Published", type: "checkbox" }
];

export default function TestimonialForm({ initial, id }: { initial?: Record<string, unknown>; id?: number }) {
  return (
    <ResourceForm
      fields={fields}
      initial={initial ?? { is_published: true, rating: 5 }}
      action={saveTestimonial}
      cancelHref="/admin/testimonials"
      submitLabel={id ? "Update Testimonial" : "Create Testimonial"}
    />
  );
}
