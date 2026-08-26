import TestimonialForm from "../TestimonialFormWrapper";

export default function NewTestimonialPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">New Testimonial</h1>
      <div className="card p-6"><TestimonialForm /></div>
    </div>
  );
}
