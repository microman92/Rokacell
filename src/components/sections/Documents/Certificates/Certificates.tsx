"use client";
import Container from "@/components/layout/Container/Container";
import styles from "./Certificates.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CERTIFICATES_DATA } from "@/data/DocumentsData";



export default function Certificates() {
  return (
    <section className={styles.certificates}>
      <Container>
        <h2 className={styles.certificates__title}>Certificates</h2>
      </Container>

      <div className={styles.certificates__bg}>
        <Container>
          <Swiper
            spaceBetween={10}
            slidesPerView={1.2}
            breakpoints={{
              576: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2.2,
              },
              992: {
                slidesPerView: 3.2,
              },
              1440: {
                slidesPerView: 4,
              },
            }}
            className={styles.certificates__grid}
          >
            {CERTIFICATES_DATA.map((item) => (
              <SwiperSlide key={item.id} className={styles.certificates__card}>
                <h3 className={styles.certificates__card_title}>{item.title}</h3>

                <div className={styles.certificates__card_preview}>
                  <img src={item.preview} alt={item.title} />
                </div>

                <a href={item.downloadUrl} download className={styles.certificates__card_download}>
                  Download
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6667 17.6283L5.76833 11.7317L6.94833 10.5317L10.8333 14.4167V0H12.5V14.4167L16.3833 10.5333L17.565 11.7317L11.6667 17.6283ZM2.69333 23.3333C1.92556 23.3333 1.285 23.0767 0.771666 22.5633C0.258333 22.05 0.00111111 21.4089 0 20.64V16.6017H1.66667V20.64C1.66667 20.8967 1.77333 21.1322 1.98667 21.3467C2.2 21.5611 2.435 21.6678 2.69167 21.6667H20.6417C20.8972 21.6667 21.1322 21.56 21.3467 21.3467C21.5611 21.1333 21.6678 20.8978 21.6667 20.64V16.6017H23.3333V20.64C23.3333 21.4078 23.0767 22.0483 22.5633 22.5617C22.05 23.075 21.4089 23.3322 20.64 23.3333H2.69333Z"
                      fill="#2070AA"
                    />
                  </svg>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </section>
  );
}
