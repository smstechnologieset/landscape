import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TestimonialForm from "../TestimonialFormWrapper";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) notFound();

  const supabase = createClient();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">Edit Testimonial</h1>
      <div className="card p-6"><TestimonialForm initial={data} id={id} /></div>
    </div>
  );
}
