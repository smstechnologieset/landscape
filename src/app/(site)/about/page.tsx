import { SectionHeading } from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { getCompanyProfile } from "@/lib/queries";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/types";

export const metadata = { title: "About Us" };

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const profile = await getCompanyProfile();

  return (
    <div className="container-page py-16">
      <SectionHeading title={dict.nav.about} />
      <Reveal>
        <div className="prose-content mx-auto max-w-3xl">
          <p>{t(profile?.about, locale)}</p>
          <h2>{t({ en: "Our Mission", am: "ተልኣኮች" }, locale)}</h2>
          <p>{t(profile?.mission, locale)}</p>
          <h2>{t({ en: "Our Vision", am: "ራዕይ" }, locale)}</h2>
          <p>{t(profile?.vision, locale)}</p>
          <h2>{t({ en: "Our Values", am: "እሴቶቻችን" }, locale)}</h2>
          <p>{t(profile?.values, locale)}</p>
          <h2>{t({ en: "Our Story", am: "ታሪካችን" }, locale)}</h2>
          <p>{t(profile?.company_story, locale)}</p>
        </div>
      </Reveal>

      {profile?.brochure_url && (
        <p className="mt-10 text-center">
          <a href={profile.brochure_url} className="btn-primary transition hover:scale-105" download>
            {dict.cta.download}
          </a>
        </p>
      )}
    </div>
  );
}
