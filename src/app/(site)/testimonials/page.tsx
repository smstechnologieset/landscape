import { EmptyState, SectionHeading } from "@/components/SectionHeading";
import { TestimonialCard } from "@/components/Cards";
import { getTestimonials } from "@/lib/queries";

export const metadata = {
  title: "Testimonials",
  description: "What our clients say about our work."
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="container-page py-16">
      <SectionHeading title="Testimonials" />
      {testimonials.length === 0 ? (
        <EmptyState message="No testimonials published yet." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((tm) => (
            <TestimonialCard key={tm.id} testimonial={tm} />
          ))}
        </div>
      )}
    </div>
  );
}
