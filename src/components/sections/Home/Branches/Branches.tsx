"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./Branches.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import Container from "@/components/layout/Container/Container";
import { BRANCHES } from "./branches.data";
import BranchPhotoSlide from "./slides/BranchPhotoSlide";
import BranchProductSlide from "./slides/BranchProductSlide";

// Map variant to component
const SLIDE_COMPONENTS = {
  photo: BranchPhotoSlide,
  products: BranchProductSlide,
} as const;

export default function Branches() {
  return (
    <section className={styles.branches}>
      <Container>
        <h2 className={styles.branches__title}>Our branches</h2>

        <Swiper
          className={styles.branches__swiper}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 50000000 }}
          pagination={{ clickable: true }}
        >
          {BRANCHES.map((branch) => {
            const SlideComponent = SLIDE_COMPONENTS[branch.variant];
            return (
              <SwiperSlide key={branch.city}>
                <SlideComponent data={branch as never} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </section>
  );
}

export { BRANCHES };
