"use client";

import { useState, useMemo, useCallback, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container/Container";
import { PRODUCTS, PRODUCT_TABS, type Product } from "@/data/products";
import { type Category } from "@/services/categories";

import ProductModal from "./ProductModal";
import type { ProductSwiperProps } from "./ProductSwiper";
import styles from "./Products.module.scss";
import { Heading } from "@/components/ui/Heading/Heading";
import { Dictionary } from "@/lib/i18n";


const ProductSwiper = dynamic<ProductSwiperProps>(
  () => import("./ProductSwiper") as Promise<{ default: ComponentType<ProductSwiperProps> }>,
  {
    ssr: false,
    loading: () => <div className={styles.products__swiperPlaceholder} />,
  }
);

interface ProductsProps {

  variant?: "home" | "page";

  defaultTab?: string;

  showTitle?: boolean;
  dict?: Dictionary["products"];


  products?: Product[];
  categories?: Category[];
}

export default function Products({
  variant = "home",
  defaultTab = "rolls",
  showTitle = true,
  dict,
  products = PRODUCTS,
  categories = PRODUCT_TABS as unknown as Category[],
}: ProductsProps) {

  const initialTab = defaultTab === "rolls" ? (categories?.[0]?.id || "rolls") : defaultTab;
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;
    return products.filter((product) => product.category === activeTab);
  }, [activeTab, products]);


  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const sectionClassName =
    variant === "page" ? `${styles.products} ${styles["products__page"]}` : styles.products;

  return (
    <section className={sectionClassName}>
      <Container>
        <motion.div
          className={styles.products__top}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {showTitle && (
            <Heading variant="black" tag="h2" className={styles.products__title}>
              {dict?.title || "OUR PRODUCTS"}
            </Heading>
          )}

          { }
          <nav className={styles.tabs} role="tablist" aria-label="Product categories">
            {categories.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="products-grid"
                className={`${styles.tabs__btn} ${activeTab === tab.id ? styles["tabs__btn--active"] : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {dict?.tabs?.[tab.id as keyof typeof dict.tabs] || tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        { }
        <div className={styles.products__swiperWrapper}>
          <ProductSwiper
            products={filteredProducts}
            onProductClick={handleProductClick}
            readMoreText={dict?.readMore}
          />
        </div>
      </Container>

      { }
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={handleCloseModal}
      />
    </section>
  );
}
