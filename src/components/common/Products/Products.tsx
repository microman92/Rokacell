"use client";

import { useState, useMemo, useCallback, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container/Container";
import { PRODUCTS, PRODUCT_TABS, type TabId, type Product } from "@/data/products";

import ProductModal from "./ProductModal";
import type { ProductSwiperProps } from "./ProductSwiper";
import styles from "./Products.module.scss";
import { Heading } from "@/components/ui/Heading/Heading";
import { Dictionary } from "@/lib/i18n";

// Lazy-load Swiper only when needed (mobile only, heavy dependency)
const ProductSwiper = dynamic<ProductSwiperProps>(
  () => import("./ProductSwiper") as Promise<{ default: ComponentType<ProductSwiperProps> }>,
  {
    ssr: false,
    loading: () => <div className={styles.products__swiperPlaceholder} />,
  }
);

interface ProductsProps {
  /** Controls visual variant: 'home' shows as a section, 'page' as full-page content */
  variant?: "home" | "page";
  /** Default active tab on mount */
  defaultTab?: TabId;
  /** Whether to show the section title */
  showTitle?: boolean;
  dict?: Dictionary["products"];
}

export default function Products({
  variant = "home",
  defaultTab = "rolls",
  showTitle = true,
  dict,
}: ProductsProps) {
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return PRODUCTS;
    return PRODUCTS.filter((product) => product.category === activeTab);
  }, [activeTab]);

  // Stable callback — passed to memoized ProductCard without creating new refs per item
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

          {/* Tabs */}
          <nav className={styles.tabs} role="tablist" aria-label="Product categories">
            {PRODUCT_TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="products-grid"
                className={`${styles.tabs__btn} ${activeTab === tab.id ? styles["tabs__btn--active"] : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {dict?.tabs?.[tab.id] || tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Always display Swiper */}
        <div className={styles.products__swiperWrapper}>
          <ProductSwiper products={filteredProducts} onProductClick={handleProductClick} />
        </div>
      </Container>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={handleCloseModal}
      />
    </section>
  );
}
