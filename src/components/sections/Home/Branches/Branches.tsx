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
import { Dictionary } from "@/lib/i18n";

interface BranchesProps {
  dict?: Dictionary['branches'];
}

export default function Branches({ dict }: BranchesProps) {
  return (
    <section className={styles.branches}>
      <Container className={styles.branches__inner}>
        <Heading variant="black" tag="h2" className={styles.branches__title}>
          {dict?.title || "НАШИ ФИЛИАЛЫ"}
        </Heading>

        <Swiper
          className={styles.branches__swiper}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500 }}
          speed={1000}
          pagination={{ clickable: true }}
        >
          {BRANCHES.map((branch) => {
            const translatedBranch = { ...branch };
            
            const t = dict?.[branch.id as keyof Omit<NonNullable<Dictionary['branches']>, 'title'>];

            if (t) {
              if (t.city) translatedBranch.city = t.city;
              if (t.address !== undefined) translatedBranch.address = t.address;
            }

            return (
              <SwiperSlide key={branch.id}>
                <Contacts data={translatedBranch as never} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </section>
  );
}

export { BRANCHES };

