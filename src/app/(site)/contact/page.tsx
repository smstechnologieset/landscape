import ContactForm from "@/components/forms/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSiteSettings } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

export const metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const settings = await getSiteSettings();

  return (
    <div className="container-page py-16">
      <h1 className="mb-10 text-center text-4xl font-extrabold text-brand-900">
        {dict.cta.contactUs}
      </h1>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <dl className="space-y-4 text-gray-700">
            <div>
              <dt className="font-semibold text-brand-900">Address</dt>
              <dd>{settings?.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-900">Phone</dt>
              <dd><a href={`tel:${settings?.phone}`} className="hover:text-brand-700">{settings?.phone}</a></dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-900">Email</dt>
              <dd><a href={`mailto:${settings?.email}`} className="hover:text-brand-700">{settings?.email}</a></dd>
            </div>
          </dl>

          <div className="mt-6 flex gap-3">
            <WhatsAppButton number={settings?.whatsapp || ""} label={dict.cta.whatsapp} />
          </div>

          {settings?.google_maps_url && (
            <iframe
              title="Company location on Google Maps"
              src={settings.google_maps_url}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-8 aspect-video w-full rounded-xl border"
              allowFullScreen
            />
          )}
        </div>

        <section aria-label="Contact form" className="card p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-brand-900">{dict.forms.send}</h2>
          <ContactForm locale={locale} />
        </section>
      </div>
    </div>
  );
}
