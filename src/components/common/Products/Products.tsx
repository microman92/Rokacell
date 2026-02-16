'use client';

import { useState, useMemo, useCallback, type ComponentType } from 'react';
import dynamic from 'next/dynamic';
import Container from '@/components/layout/Container/Container';
import { PRODUCTS, PRODUCT_TABS, type TabId, type Product } from '@/data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import type { ProductSwiperProps } from './ProductSwiper';
import styles from './Products.module.scss';

// Lazy-load Swiper only when needed (mobile only, heavy dependency)
const ProductSwiper = dynamic<ProductSwiperProps>(
  () => import('./ProductSwiper') as Promise<{ default: ComponentType<ProductSwiperProps> }>,
  {
    ssr: false,
    loading: () => <div className={styles.products__swiperPlaceholder} />,
  }
);

interface ProductsProps {
  /** Controls visual variant: 'home' shows as a section, 'page' as full-page content */
  variant?: 'home' | 'page';
  /** Default active tab on mount */
  defaultTab?: TabId;
  /** Whether to show the section title */
  showTitle?: boolean;
}

export default function Products({
  variant = 'home',
  defaultTab = 'rolls',
  showTitle = true,
}: ProductsProps) {
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return PRODUCTS;
    return PRODUCTS.filter((product) => product.category === activeTab);
  }, [activeTab]);

  // Stable callback — passed to memoized ProductCard without creating new refs per item
  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const sectionClassName = variant === 'page'
    ? `${styles.products} ${styles['products__page']}`
    : styles.products;

  return (
    <section className={sectionClassName}>
      <Container>
        <div className={styles.products__top}>
          {showTitle && (
            <h2 className={styles.products__title}>OUR PRODUCTS</h2>
          )}

          {/* Tabs */}
          <nav className={styles.tabs} role="tablist" aria-label="Product categories">
            {PRODUCT_TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="products-grid"
                className={`${styles.tabs__btn} ${activeTab === tab.id ? styles['tabs__btn--active'] : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Desktop: Grid Layout - Hidden on mobile via CSS */}
        <div
          id="products-grid"
          role="tabpanel"
          className={styles.products__grid}
          aria-label={`${activeTab} products`}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>

        {/* Mobile: Swiper — lazy-loaded, hidden on desktop via CSS */}
        <div className={styles.products__swiperWrapper}>
          <ProductSwiper
            products={filteredProducts}
            onProductClick={handleProductClick}
          />
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
