"use client";

import styles from "./News.module.scss";
import Link from "next/link";
import Heading from "@/components/ui/Heading/Heading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { NEWS_DATA } from "@/data/news";
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
    640: {
      slidesPerView: 2.2,
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
  locale?: Locale; // Optional if needed for localization later
  variant?: "home" | "about";
  dict?: Dictionary['news'];
}

export const News = ({ variant, dict }: NewsProps) => {

  const isAboutPage = variant === "about";

  return (
    <section className={styles.news}>
      <Container className={styles.news__container}>
        <Heading variant="black" tag="h2" className={styles.news__title}>
          {dict?.title || "WHATS NEW?"}
        </Heading>
      </Container>

      {!isAboutPage &&
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
            {NEWS_DATA.map((item) => (
              <SwiperSlide key={item.id} className={styles.slide}>
                <Link href={`/news/${item.slug}`} className={styles.slide__link}>
                  <NewsCard item={item} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      }
      {isAboutPage &&

        <Container className={styles.news__wrapper}>

          {NEWS_DATA.map((item) => (
            <div key={item.id} className={styles.news__item}>
              <Link href={`/news/${item.slug}`} className={styles.news__link}>
                <NewsCard item={item} />
              </Link>
            </div>
          ))}

        </Container>
      }


    </section>
  );
};

