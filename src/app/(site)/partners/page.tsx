import { EmptyState, SectionHeading } from "@/components/SectionHeading";
import { PartnerLogo } from "@/components/Cards";
import { getPartners } from "@/lib/queries";

export const metadata = {
  title: "Partners",
  description: "Organizations we work with."
};

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="container-page py-16">
      <SectionHeading title="Our Partners" />
      {partners.length === 0 ? (
        <EmptyState message="No partners listed yet." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <PartnerLogo key={p.id} partner={p} />
          ))}
        </div>
      )}
    </div>
  );
}
