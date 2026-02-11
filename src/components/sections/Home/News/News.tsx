"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { NEWS_DATA } from "@/data/news";
import { NewsCard } from "@/components/ui/NewsCard/NewsCard";

import styles from "./News.module.scss";
import { Locale } from "@/lib/locales";

export const NEWS_SLIDER_CONFIG = {
  autoplayInterval: 500000,
  transitionDuration: 800,
  pauseOnHover: true,
  spaceBetween: 28,
  loop: true,
  breakpoints: {
    640: {
      slidesPerView: 2.2,
    },
    1024: {
      slidesPerView: 3.2,
    },
    1200: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 3.3,
    },
  },
};

interface NewsProps {
  locale?: Locale; // Optional if needed for localization later
}

export const News = () => {
  return (
    <section className={styles.news}>

      <h2 className={styles.news__title}>WHATS NEW?</h2>

      <div className={styles.sliderWrapper}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={NEWS_SLIDER_CONFIG.spaceBetween}
          loop={NEWS_SLIDER_CONFIG.loop}
          speed={NEWS_SLIDER_CONFIG.transitionDuration}
          autoplay={{
            delay: NEWS_SLIDER_CONFIG.autoplayInterval,
            disableOnInteraction: false,
            pauseOnMouseEnter: NEWS_SLIDER_CONFIG.pauseOnHover,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={NEWS_SLIDER_CONFIG.breakpoints}
          className={styles.swiper}
        >
          {NEWS_DATA.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <Link href={`/news/${item.slug}`} className={styles.slide__link}>
                <NewsCard item={item} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
};
