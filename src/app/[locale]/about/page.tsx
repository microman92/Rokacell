import { IMAGES } from "@/assets/images";
import { News } from "@/components/common/News/News";
import PageHero from "@/components/common/pageHero/PageHero";
import AboutInfo from "@/components/sections/About/AboutInfo/AboutInfo";
import Policy from "@/components/sections/About/Policy/Policy";
import FactoryInfo from "@/components/sections/FactoryInfo/FactoryInfo";

import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const heroData = {
    title: dict.about?.hero?.title || "",
    description: dict.about?.hero?.description || "",
    bgImage: IMAGES.about.HeroBg,
    overlayImage: IMAGES.about.heroVisual,
  };

  return (
    <main className="main">
      <PageHero {...heroData} variant="about" />
      <AboutInfo dict={dict.about} />
      <FactoryInfo dict={dict.about} />
      <News variant="about" dict={dict.news} />
      <Policy dict={dict.about} />
    </main>
  );
}
