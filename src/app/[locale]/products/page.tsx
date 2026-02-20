import PageHero from "@/components/common/pageHero/PageHero";
import Products from "@/components/common/Products";
import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";

export default async function ProductsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const heroData = {
    title: (
      <>
        {dict.products?.hero?.titlePart1}
        <span>{dict.products?.hero?.titleHighlight}</span>
        {dict.products?.hero?.titlePart2}
      </>
    ),
    description: dict.products?.hero?.description || "",
  };

  return (
    <main className="main">
      <PageHero {...heroData} variant="products" />
      <Products variant="page" defaultTab="rolls" dict={dict.products} />
      <p className="products__text">{dict.products?.description}</p>
    </main>
  );
}
