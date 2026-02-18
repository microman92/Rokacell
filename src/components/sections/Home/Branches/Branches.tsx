"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./Branches.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import Container from "@/components/layout/Container/Container";
import { BRANCHES } from "@/data/branches.data";
import Contacts from "@/components/common/Contacts/Contacts";
import { Heading } from "@/components/ui/Heading/Heading";




export default function Branches() {
  return (
    <section className={styles.branches}>
      <Container>
        <Heading variant="black" tag="h2" className={styles.branches__title}>Our branches</Heading>

        <Swiper
          className={styles.branches__swiper}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 50000000 }}
          pagination={{ clickable: true }}
        >
          {BRANCHES.map((branch) => (


            <SwiperSlide key={branch.city}>
              <Contacts data={branch as never} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}

export { BRANCHES };
