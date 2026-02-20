"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "@/hooks/useCurrentLocale";
import { href, ROUTES } from "@/lib/routes";
import styles from "./Navigation.module.scss";

import { Dictionary } from "@/lib/i18n";

interface NavigationProps {
  dict?: NonNullable<Dictionary["calculator"]>["navigation"];
}

const Navigation: React.FC<NavigationProps> = ({ dict }) => {
  const pathname = usePathname();
  const locale = useCurrentLocale();

  const navigationItems = [
    {
      category: dict?.categories?.pipes || "Pipes",
      items: [
        {
          path: ROUTES.CALC_PIPES_HEAT_LOSS,
          label: dict?.items?.pipesHeatLoss?.title || "Heat Loss Calculation for Pipes",
          desc:
            dict?.items?.pipesHeatLoss?.desc ||
            "Calculation of heat losses and economic efficiency of insulation",
        },
        {
          path: ROUTES.CALC_PIPES_CONDENSATION,
          label: dict?.items?.pipesCond?.title || "Condensation Prevention for Pipes",
          desc:
            dict?.items?.pipesCond?.desc ||
            "Determination of minimum insulation thickness to prevent condensation",
        },
      ],
    },
    {
      category: dict?.categories?.sheets || "Sheets",
      items: [
        {
          path: ROUTES.CALC_SHEETS_HEAT_LOSS,
          label: dict?.items?.sheetsHeatLoss?.title || "Heat Loss Calculation for Sheets",
          desc:
            dict?.items?.sheetsHeatLoss?.desc ||
            "Calculation of heat losses and economic efficiency of insulation",
        },
        {
          path: ROUTES.CALC_SHEETS_CONDENSATION,
          label: dict?.items?.sheetsCond?.title || "Condensation Prevention for Sheets",
          desc:
            dict?.items?.sheetsCond?.desc ||
            "Determination of minimum insulation thickness to prevent condensation",
        },
      ],
    },
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__container}>
        <div className={styles.navigation__header}>
          <h1 className={styles.navigation__header_title}>
            {dict?.title || "ROKAFLEX Calculators"}
          </h1>
          <p className={styles.navigation__header_subtitle}>
            {dict?.subtitle || "Thermal insulation and condensation prevention calculations"}
          </p>
        </div>

        <div className={styles.navigation__content}>
          {navigationItems.map((category) => (
            <div key={category.category} className={styles.navigation__category}>
              <h2 className={styles.navigation__category_title}>{category.category}</h2>
              <div className={styles.navigation__category_items}>
                {category.items.map((item) => (
                  <Link
                    key={item.path}
                    href={href(locale, item.path)}
                    className={`${styles.navigation__item} ${
                      pathname === href(locale, item.path) ? styles["navigation__item_active"] : ""
                    }`}
                  >
                    <div className={styles.navigation__item_content}>
                      <h3 className={styles.navigation__item_title}>{item.label}</h3>
                      <p className={styles.navigation__item_description}>{item.desc}</p>
                    </div>
                    <div className={styles.navigation__item_arrow}>→</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
