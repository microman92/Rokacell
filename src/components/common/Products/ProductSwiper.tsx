"use client";

import { useMemo, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import styles from "./Products.module.scss";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export interface ProductSwiperProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

// Split products into groups for slider
function chunkProducts(products: Product[], size: number): Product[][] {
  const chunks: Product[][] = [];
  for (let i = 0; i < products.length; i += size) {
    chunks.push(products.slice(i, i + size));
  }
  return chunks;
}

export default function ProductSwiper({ products, onProductClick }: ProductSwiperProps) {
  const [chunkSize, setChunkSize] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768 ? 4 : 6
  );

  useEffect(() => {
    const handleResize = () => {
      setChunkSize(window.innerWidth <= 768 ? 4 : 6);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const productChunks = useMemo(() => chunkProducts(products, chunkSize), [products, chunkSize]);

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={16}
      slidesPerView={1}
      pagination={{ clickable: true }}
      className={styles.products__swiper}
    >
      {productChunks.map((chunk, chunkIndex) => (
        <SwiperSlide key={chunkIndex} className={styles.products__slide}>
          <div className={styles.products__slideGrid}>
            {chunk.map((product) => (
              <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
