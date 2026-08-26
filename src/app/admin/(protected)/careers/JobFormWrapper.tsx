import ResourceForm, { type FieldConfig } from "@/components/admin/ResourceForm";
import { saveJob } from "@/app/actions/admin";

const fields: FieldConfig[] = [
  { name: "title", label: "Job Title", type: "localized", required: true },
  { name: "department", label: "Department", type: "text" },
  { name: "location", label: "Location", type: "text" },
  {
    name: "employment_type",
    label: "Employment Type",
    type: "select",
    options: [
      { value: "full_time", label: "Full-time" },
      { value: "part_time", label: "Part-time" },
      { value: "contract", label: "Contract" },
      { value: "internship", label: "Internship" }
    ]
  },
  { name: "description", label: "Description", type: "localized_textarea" },
  { name: "responsibilities", label: "Responsibilities", type: "lines" },
  { name: "requirements", label: "Requirements", type: "lines" },
  { name: "application_deadline", label: "Application Deadline", type: "date" },
  { name: "is_published", label: "Published", type: "checkbox" },
  { name: "is_closed", label: "Closed (no new applications)", type: "checkbox" }
];

export default function JobForm({ initial, id }: { initial?: Record<string, unknown>; id?: number }) {
  return (
    <ResourceForm
      fields={fields}
      initial={initial ?? { is_published: false, is_closed: false }}
      action={saveJob}
      cancelHref="/admin/careers"
      submitLabel={id ? "Update Job" : "Create Job"}
    />
  );
}
