import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { getSiteSettings } from "@/lib/queries";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [locale, settings] = await Promise.all([getLocale(), getSiteSettings()]);
  const dict = getDictionary(locale);
  const whatsappNum =
    settings?.whatsapp && settings.whatsapp !== "251900000000"
      ? settings.whatsapp
      : "";

  return (
    <div className="flex min-h-screen flex-col">
      <Header dict={dict} whatsapp={whatsappNum} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer dict={dict} />
      {whatsappNum && <WhatsAppButton number={whatsappNum} floating />}
    </div>
  );
}
