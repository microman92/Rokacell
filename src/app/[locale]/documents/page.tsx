import { IMAGES } from "@/assets/images";
import PageHero from "@/components/common/pageHero/PageHero";
import Passport from "@/components/sections/Documents/Passport/Passport";
import Certificates from "@/components/sections/Documents/Certificates/Certificates";
import Quality from "@/components/sections/Documents/Quality/Quality";

import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";

export default async function DocumentsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const heroData = {
    title: dict.documents?.hero?.title || "",
    description: dict.documents?.hero?.description || "",
    overlayImage: IMAGES.documents.documentsLogo,
  };

  return (
    <main className="main">
      <PageHero {...heroData} variant="documents" />
      <Passport dict={dict.documents} />
      <Certificates dict={dict.documents} />
      <Quality dict={dict.documents} />
    </main>
  );
}
