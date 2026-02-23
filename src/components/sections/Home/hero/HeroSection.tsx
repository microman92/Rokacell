"use client";

import styles from "./Hero.module.scss";
import { Heading } from "@/components/ui/Heading/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";


import ThermalSlide from "./slides/ThermalSlide";
import QualitySlide from "./slides/QualitySlide";
import CooperationSlide from "./slides/CooperationSlide";
import ExhibitionSlide from "./slides/ExhibitionSlide";
import { Dictionary } from "@/lib/i18n";

export const HERO_SLIDER_CONFIG = {
  autoplayInterval: 4500, 
  transitionDuration: 800, 
  pauseOnHover: true, 
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
};

interface HeroSectionProps {
  dict?: Dictionary['hero'];
}

export default function HeroSection({ dict }: HeroSectionProps) {
  const slides = dict?.slides || [];

  return (
    <section className={styles.hero}>
      <Heading tag="h1" className="visuallyHidden">
        Rokacell - {slides[0]?.title || "Эффективная теплоизоляция"}, {slides[0]?.subtitle || "ИЗДЕЛИЯ ИЗ ВСПЕНЕННОГО ЭЛАСТОМЕРНОГО КАУЧУКА"}
      </Heading>

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
          <ThermalSlide dict={slides[0]} />
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <QualitySlide dict={slides[1]} />
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <CooperationSlide dict={slides[2]} />
        </SwiperSlide>

        <SwiperSlide className={styles.slide}>
          <ExhibitionSlide dict={slides[3]} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
