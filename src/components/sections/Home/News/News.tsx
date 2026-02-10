"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { NEWS_DATA } from "@/data/news";

import styles from "./News.module.scss";
import { Locale } from "@/lib/locales";
import Container from "@/components/layout/Container/Container";

export const NEWS_SLIDER_CONFIG = {
  autoplayInterval: 500000,
  transitionDuration: 800,
  pauseOnHover: true,
  slidesPerView: 3,
  spaceBetween: 28,
  loop: true,
  breakpoints: {
    640: {
      slidesPerView: 2.2,
    },
    1024: {
      slidesPerView: 3.2,
    },
    1280: {
      slidesPerView: 4,
    },
  },
};

interface NewsProps {
  locale?: Locale; // Optional if needed for localization later
}

export const News = () => {
  return (
    <section className={styles.news}>
      <Container >
        <h2 className={styles.news__title}>WHATS NEW?</h2>

        <div className={styles.sliderWrapper}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={NEWS_SLIDER_CONFIG.spaceBetween}
            slidesPerView={NEWS_SLIDER_CONFIG.slidesPerView}
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
                  <div className={styles.slide__card}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.slide__image}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.slide__content}>
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
      </Container>
    </section>
  );
};
