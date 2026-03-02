"use client";

import styles from "./News.module.scss";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Heading from "@/components/ui/Heading/Heading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import type { NewsItem } from "@/data/news";
import { NewsCard } from "@/components/ui/NewsCard/NewsCard";

import { Locale } from "@/lib/locales";
import Container from "@/components/layout/Container/Container";
import { Dictionary } from "@/lib/i18n";

export const NEWS_SLIDER_CONFIG = {
  autoplayInterval: 500000,
  transitionDuration: 800,
  pauseOnHover: true,
  spaceBetween: 28,
  loop: true,
  breakpoints: {
    375: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 2.5,
    },
    1440: {
      slidesPerView: 3.3,
    },
  },
};

interface NewsProps {
  locale?: Locale;
  variant?: "home" | "about";
  dict?: Dictionary["news"];
  news?: NewsItem[];
  title?: string;
  noPaddingTop?: boolean;
}

export const News = ({ variant, dict, news = [], title, noPaddingTop }: NewsProps) => {
  const isAboutPage = variant === "about";

  const displayTitle = title || dict?.title || "WHATS NEW?";

  return (
    <section className={cn(styles.news, noPaddingTop && styles["news--no-padding-top"])}>
      <Container className={styles.news__container}>
        <Heading variant="black" tag="h2" className={styles.news__title}>
          {displayTitle}
        </Heading>
      </Container>

      {!isAboutPage && (
        <div className={styles.news__swiper}>
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
            {news.map((item, index) => (
              <SwiperSlide key={item.id} className={styles.slide}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Link href={`/news/${item.id}`} className={styles.slide__link}>
                    <NewsCard item={item} isDynamicCard={noPaddingTop} />
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      {isAboutPage && (
        <Container className={styles.news__wrapper}>
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.news__item}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={`/news/${item.id}`} className={styles.news__link}>
                <NewsCard item={item} isDynamicCard={noPaddingTop} />
              </Link>
            </motion.div>
          ))}
        </Container>
      )}
    </section>
  );
};
