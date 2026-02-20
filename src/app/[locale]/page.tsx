import HeroSection from "@/components/sections/Home/hero/HeroSection";
import FeaturesStrip from "@/components/sections/Home/FeaturesStrip/FeaturesStrip";
import Industries from "@/components/sections/Home/Industries/Industries";
import Products from "@/components/common/Products";
import Branches from "@/components/sections/Home/Branches/Branches";
import CalculateSavings from "@/components/sections/Home/CalculateSavings";
import { News } from "@/components/common/News/News";
import AboutVideo from "@/components/sections/Home/AboutVideo/AboutVideo";
import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";

export default async function Page({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="main">
      <HeroSection dict={dict.hero} />
      <FeaturesStrip locale={locale} />
      <Industries locale={locale} />
      <Products dict={dict.products} />
      <AboutVideo dict={dict.aboutVideo} />
      <Branches dict={dict.branches} />
      <CalculateSavings dict={dict.calculateSavings} />
      <News variant="home" dict={dict.news} />
    </main>
  );
}
