import PageHero from "@/components/common/pageHero/PageHero";
import Products from "@/components/common/Products";
import { Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/i18n";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import JsonLd from "@/components/common/JsonLd/JsonLd";
import { productListSchema, breadcrumbSchema } from "@/lib/jsonld";
import { createPageMetadata } from "@/lib/seo";
import styles from "./products.module.scss";

export const revalidate = 60;
export const generateMetadata = createPageMetadata("products", "/products");

export default async function ProductsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const products = await getProducts(locale);
  const categories = await getCategories(locale);

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
      <JsonLd data={productListSchema()} />
      <JsonLd data={breadcrumbSchema([
        { name: "ROKACELL", url: `https://rokacell.com/${locale}` },
        { name: dict.products?.title || "Products", url: `https://rokacell.com/${locale}/products` },
      ])} />
      <PageHero {...heroData} variant="products" />
      <Products variant="page" defaultTab="rolls" dict={dict.products} products={products} categories={categories} />
      <p className={styles.productsText}>{dict.products?.description}</p>
    </main>
  );
}
