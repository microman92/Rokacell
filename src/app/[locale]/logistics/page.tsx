import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";
import { IMAGES } from "@/assets/images";
import PageHero from "@/components/common/pageHero/PageHero";
import PackingDetails from "@/components/sections/Logistics/PackingDetails/PackingDetails";

export default async function LogisticsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const heroData = {
    title: dict.logistics?.hero?.title || "",
    description: dict.logistics?.hero?.description || "",
    bgImage: IMAGES.logistics.hero,
  };

  return (
    <main className="main">
      <PageHero {...heroData} variant="logistics" />
      <PackingDetails dict={dict.logistics} />
    </main>
  );
}
