import { EmptyState, SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/Cards";
import { getServices } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";

export const metadata = {
  title: "Services",
  description: "Landscaping services: design, irrigation, maintenance and more."
};

export default async function ServicesPage() {
  const dict = getDictionary("en");
  const services = await getServices();

  return (
    <div className="container-page py-16">
      <SectionHeading title={dict.nav.services} />
      {services.length === 0 ? (
        <EmptyState message={dict.common.empty} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </div>
  );
}
