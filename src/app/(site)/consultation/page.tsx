import Image from "next/image";
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
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white shadow-md border border-brand-100">
          <div className="relative h-8 w-24">
            <Image src="/images/logo.png" alt="Landscape Solution PLC" fill sizes="96px" className="object-contain" priority />
          </div>
          <span className="h-4 w-px bg-gray-200" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-900">
            {locale === "am" ? "የምክክር ቀጠሮ" : "Professional Advisory"}
          </span>
        </div>
      </div>
      <h1 className="mb-4 text-center text-4xl font-extrabold text-brand-900 font-serif">
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
