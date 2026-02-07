'use client';

import styles from "./Hero.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { HERO_SLIDER_CONFIG } from "@/lib/content/heroSlides";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Slide components
import ThermalSlide from "./slides/ThermalSlide";
import QualitySlide from "./slides/QualitySlide";
import CooperationSlide from "./slides/CooperationSlide";
import ExhibitionSlide from "./slides/ExhibitionSlide";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1 className="visuallyHidden">
        Rokacell - Эффективная теплоизоляция, ИЗДЕЛИЯ ИЗ ВСПЕНЕННОГО ЭЛАСТОМЕРНОГО КАУЧУКА
      </h1>

      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={HERO_SLIDER_CONFIG.slidesPerView}
        spaceBetween={HERO_SLIDER_CONFIG.spaceBetween}
        loop={HERO_SLIDER_CONFIG.loop}
        autoplay={{
          delay: HERO_SLIDER_CONFIG.autoplayInterval,
          disableOnInteraction: false,
          pauseOnMouseEnter: HERO_SLIDER_CONFIG.pauseOnHover,
        }}
        pagination={{
          clickable: true,
        }}
        speed={HERO_SLIDER_CONFIG.transitionDuration}
        className={styles.swiper}
      >
        <SwiperSlide className={styles.slide}>
          <ThermalSlide />
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <QualitySlide />
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <CooperationSlide />
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <ExhibitionSlide />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
