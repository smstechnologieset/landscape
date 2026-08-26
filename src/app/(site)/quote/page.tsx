import QuoteForm from "@/components/forms/QuoteForm";
import { getServices } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";

export const metadata = {
  title: "Request a Quote",
  description: "Tell us about your project and receive a tailored quote."
};

export default async function QuotePage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const services = await getServices();

  return (
    <div className="container-page py-16">
      <h1 className="mb-4 text-center text-4xl font-extrabold text-brand-900">{dict.cta.quote}</h1>
      <p className="mx-auto mb-10 max-w-xl text-center text-gray-600">
        Fill in the details below and our team will get back to you promptly.
      </p>

      <div className="card mx-auto max-w-2xl p-6 sm:p-8">
        <QuoteForm
          locale={locale}
          services={services.map((s) => ({ id: s.id, title: t(s.title, locale) }))}
        />
      </div>
    </div>
  );
}
