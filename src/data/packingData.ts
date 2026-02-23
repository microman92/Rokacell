import { IMAGES } from "@/assets/images";

export interface SpecValue {
  dim?: string; 
  value: string; 
  unit?: "pcs" | "m3"; 
}

export interface Spec {
  labelKey: string; 
  values: SpecValue[];
}

export interface PackingItem {
  key: string; 
  titleKey: string; 
  subtitleKey?: string; 
  image: string;
  specs: Spec[];
}

export interface PackingCategory {
  categoryKey: "rolls" | "tubes";
  items: PackingItem[];
}

export const PACKING_DATA: PackingCategory[] = [
  {
    categoryKey: "rolls",
    items: [
      {
        key: "rolls-truck-45",
        titleKey: "truck45",
        subtitleKey: "compact",
        image: IMAGES.logistics.truck45m3,
        specs: [
          {
            labelKey: "rollWidth",
            values: [
              { dim: "100cm", value: "170–180", unit: "pcs" },
              { dim: "120cm", value: "140–150", unit: "pcs" },
            ],
          },
          {
            labelKey: "rollVolume",
            values: [{ value: "0.255–0.305", unit: "m3" }],
          },
        ],
      },
      {
        key: "rolls-truck-88",
        titleKey: "truck88",
        subtitleKey: "increased",
        image: IMAGES.logistics.truck88m3,
        specs: [
          {
            labelKey: "rollWidth",
            values: [
              { dim: "100cm", value: "325–335", unit: "pcs" },
              { dim: "120cm", value: "270–280", unit: "pcs" },
            ],
          },
          {
            labelKey: "rollVolume",
            values: [{ value: "0.255–0.305", unit: "m3" }],
          },
        ],
      },
      {
        key: "rolls-container-40",
        titleKey: "container40",
        subtitleKey: "international",
        image: IMAGES.logistics.container40hc,
        specs: [
          {
            labelKey: "rollWidth",
            values: [
              { dim: "100cm", value: "280–290", unit: "pcs" },
              { dim: "120cm", value: "230–240", unit: "pcs" },
            ],
          },
          {
            labelKey: "rollVolume",
            values: [{ value: "0.255–0.305", unit: "m3" }],
          },
        ],
      },
    ],
  },
  {
    categoryKey: "tubes",
    items: [
      {
        key: "tubes-truck-45",
        titleKey: "truck45",
        subtitleKey: "compact",
        image: IMAGES.logistics.truck45m3,
        specs: [
          {
            labelKey: "boxVolume",
            values: [{ value: "0.27", unit: "m3" }],
          },
          {
            labelKey: "quantity",
            values: [{ value: "160–170", unit: "pcs" }],
          },
        ],
      },
      {
        key: "tubes-truck-88",
        titleKey: "truck88",
        subtitleKey: "increased",
        image: IMAGES.logistics.truck88m3,
        specs: [
          {
            labelKey: "boxVolume",
            values: [{ value: "0.27", unit: "m3" }],
          },
          {
            labelKey: "quantity",
            values: [{ value: "305–315", unit: "pcs" }],
          },
        ],
      },
      {
        key: "tubes-container-40",
        titleKey: "container40",
        subtitleKey: "international",
        image: IMAGES.logistics.container40hc,
        specs: [
          {
            labelKey: "boxVolume",
            values: [{ value: "0.27", unit: "m3" }],
          },
          {
            labelKey: "quantity",
            values: [{ value: "275–285", unit: "pcs" }],
          },
        ],
      },
    ],
  },
];
