'use client';

import { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Product } from '@/data/products';
import ProductCard from './ProductCard';
import styles from './Products.module.scss';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export interface ProductSwiperProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

// Split products into groups for mobile slider
function chunkProducts(products: Product[], size: number = 3): Product[][] {
  const chunks: Product[][] = [];
  for (let i = 0; i < products.length; i += size) {
    chunks.push(products.slice(i, i + size));
  }
  return chunks;
}

export default function ProductSwiper({ products, onProductClick }: ProductSwiperProps) {
  const productChunks = useMemo(() => chunkProducts(products, 3), [products]);

  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      spaceBetween={16}
      pagination={{ clickable: true }}
      className={styles.products__swiper}
    >
      {productChunks.map((chunk, chunkIndex) => (
        <SwiperSlide key={chunkIndex} className={styles.products__slide}>
          <div className={styles.products__slideGrid}>
            {chunk.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
              />
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
