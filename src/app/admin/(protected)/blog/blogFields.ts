import ResourceForm, { type FieldConfig } from "@/components/admin/ResourceForm";
import { savePost } from "@/app/actions/admin";

export function blogFields(categories: { value: string; label: string }[]): FieldConfig[] {
  return [
    { name: "title", label: "Title", type: "localized", required: true },
    { name: "slug", label: "Slug (auto if empty)", type: "text" },
    { name: "excerpt", label: "Excerpt", type: "localized" },
    { name: "content", label: "Content (HTML allowed)", type: "localized_textarea" },
    { name: "featured_image", label: "Featured Image", type: "image", bucket: "blog-images" },
    { name: "category_id", label: "Category", type: "select", options: [{ value: "", label: "— none —" }, ...categories] },
    { name: "tags", label: "Tags", type: "tags" },
    { name: "is_featured", label: "Featured", type: "checkbox" },
    { name: "is_published", label: "Published", type: "checkbox" },
    { name: "seo_title", label: "SEO Title", type: "text" },
    { name: "seo_description", label: "SEO Description", type: "textarea" }
  ];
}
