"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { NEWS_DATA } from "@/data/news";

import styles from "./News.module.scss";
import { Locale } from "@/lib/locales";

interface NewsProps {
  locale?: Locale; // Optional if needed for localization later
}

export const News: React.FC<NewsProps> = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>WHATS NEW?</h2>
        </div>

        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            speed={800}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className={styles.swiper}
          >
            {NEWS_DATA.map((item) => (
              <SwiperSlide key={item.id} className={styles.swiperSlide}>
                <Link href={`/news/${item.slug}`} className={styles.card}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.description}>
                      {item.description}
                      <span className={styles.more}>more...</span>
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
