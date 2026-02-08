"use client";
import styles from "./Branches.module.scss";

const BRANCHES = [
  {
    image: "/img/rokacell-proizvodstvo-zavod-tashkent.png",
    city: "TASHKENT, UZBEKISTAN",
    address: "17 Obikhaet Street, Sergeli District",
    email: "info@rokacell.com",
    phones: ["+998 95 778-71-32", "+998 77 292-00-99"],
  },
  {
    image: "/img/rokacell-almaty-branch.png",
    city: "ALMATY, KAZAKHSTAN",
    address: "Zhetysu district, Turar Ryskulov Avenue 61E.",
    email: "infokz@rokacell.com",
    phones: ["+7 707 422-89-58"],
  },
  {
    image: "/img/rokacell-moscow-branch.png",
    city: "MOSCOW, RUSSIAN FEDERATION",
    address: "",
    email: "inforu@rokacell.com",
    phones: ["+7 925 078-01-11"],
  },
];

export default function Branches() {
  return (
    <section className={styles.branches}>
      {/* Заголовок */}
      {/* Swiper слайдер */}
      {/* Карточки: image + info (city, address, email, phones) */}
    </section>
  );
}

export { BRANCHES };
