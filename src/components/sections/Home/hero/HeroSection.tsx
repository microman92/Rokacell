"use client";

import styles from "./Hero.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Slide components
import ThermalSlide from "./slides/ThermalSlide";
import QualitySlide from "./slides/QualitySlide";
import CooperationSlide from "./slides/CooperationSlide";
import ExhibitionSlide from "./slides/ExhibitionSlide";

export const HERO_SLIDER_CONFIG = {
  autoplayInterval: 6000000, // 6 секунд между слайдами
  transitionDuration: 800, // длительность анимации перехода (ms)
  pauseOnHover: true, // пауза при наведении
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
};

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
