'use client';

import { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Container from '@/components/layout/Container/Container';
import { PRODUCTS, PRODUCT_TABS, type TabId, type Product } from '@/data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import styles from './Products.module.scss';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Split products into groups of 3 for mobile slider
function chunkProducts(products: Product[], size: number = 3): Product[][] {
  const chunks: Product[][] = [];
  for (let i = 0; i < products.length; i += size) {
    chunks.push(products.slice(i, i + size));
  }
  return chunks;
}

export default function Products() {
  const [activeTab, setActiveTab] = useState<TabId>('rolls');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') {
      return PRODUCTS;
    }
    return PRODUCTS.filter((product) => product.category === activeTab);
  }, [activeTab]);

  // Chunk products for mobile slider (3 per slide)
  const productChunks = useMemo(() => {
    return chunkProducts(filteredProducts, 3);
  }, [filteredProducts]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className={styles.products}>
      <Container>
        <div className={styles.products__top}>
          <h2 className={styles.products__title}>OUR PRODUCTS</h2>


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
              onClick={() => handleProductClick(product)}
            />
          ))}
        </div>

        {/* Mobile: Swiper with 3 products per slide - Hidden on desktop via CSS */}
        <div className={styles.products__swiperWrapper}>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            pagination={{
              clickable: true,
            }}
            className={styles.products__swiper}
          >
            {productChunks.map((chunk, chunkIndex) => (
              <SwiperSlide key={chunkIndex} className={styles.products__slide}>
                <div className={styles.products__slideGrid}>
                  {chunk.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={handleCloseModal}
      />
    </section >
  );
}
