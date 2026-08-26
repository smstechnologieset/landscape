import ConsultationForm from "@/components/forms/ConsultationForm";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export const metadata = {
  title: "Book a Consultation",
  description: "Schedule an on-site, office or virtual consultation."
};

export default async function ConsultationPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="container-page py-16">
      <h1 className="mb-4 text-center text-4xl font-extrabold text-brand-900">
        {dict.cta.consultation}
      </h1>
      <p className="mx-auto mb-10 max-w-xl text-center text-gray-600">
        Choose your preferred date and we will confirm your appointment by phone or email.
      </p>

      <div className="card mx-auto max-w-2xl p-6 sm:p-8">
        <ConsultationForm locale={locale} />
      </div>
    </div>
  );
}
