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
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import { getNews } from "@/services/news";
import JsonLd from "@/components/common/JsonLd/JsonLd";
import { organizationSchema, faqSchema } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 60;
export const generateMetadata = createPageMetadata("home");

export default async function Page({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const products = await getProducts(locale);
  const categories = await getCategories(locale);
  const news = await getNews(locale);

  return (
    <main className="main">
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={faqSchema(locale)} />
      <HeroSection dict={dict.hero} />
      <FeaturesStrip locale={locale} />
      <Industries locale={locale} />
      <Products dict={dict.products} products={products} categories={categories} />
      <AboutVideo dict={dict.aboutVideo} />
      <Branches dict={dict.branches} />
      <CalculateSavings dict={dict.calculateSavings} />
      <News variant="home" dict={dict.news} news={news} />
    </main>
  );
}
