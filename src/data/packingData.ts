import { IMAGES } from "@/assets/images";

export interface SpecValue {
  dim?: string; // e.g. "100cm"
  qty: string;  // e.g. "170–180 pcs" or just the value if no dimension
}

export interface Spec {
  label: string;
  values: SpecValue[];
}

export interface PackingItem {
  key: string; // unique key
  title: string;
  subtitle?: string; // e.g. "Compact transportation option"
  image: string;
  specs: Spec[];
}

export interface PackingCategory {
  title: string;
  description: string;
  items: PackingItem[];
}

export const PACKING_DATA: PackingCategory[] = [
  {
    title: 'ROKAFLEX ROLLS',
    description: 'ROLLS ARE PACKED IN LDPE FILM AND AVAILABLE IN TWO WIDTH OPTIONS — 100 CM AND 120 CM. DEPENDING ON THE TRANSPORT, DIFFERENT LOADING CAPACITIES ARE POSSIBLE. THE CAPACITY INFORMATION IS PROVIDED BELOW.',
    items: [
      {
        key: 'rolls-truck-45',
        title: 'FREIGHT TRUCK 45 M³',
        subtitle: 'Compact transportation option',
        image: IMAGES.logistics.truck45m3,
        specs: [
          {
            label: 'Roll width:',
            values: [
              { dim: '100cm', qty: '170–180 pcs' },
              { dim: '120cm', qty: '140–150 pcs' }
            ]
          },
          {
            label: 'Roll volume:',
            values: [{ qty: '0.255–0.305m³' }]
          }
        ]
      },
      {
        key: 'rolls-truck-88',
        title: 'FREIGHT TRUCK 88 M³',
        subtitle: 'Increased capacity',
        image: IMAGES.logistics.truck88m3,
        specs: [
          {
            label: 'Roll width:',
            values: [
              { dim: '100cm', qty: '325–335 pcs' },
              { dim: '120cm', qty: '270–280 pcs' }
            ]
          },
          {
            label: 'Roll volume:',
            values: [{ qty: '0.255–0.305m³' }]
          }
        ]
      },
      {
        key: 'rolls-container-40',
        title: '40HC CONTAINER',
        subtitle: 'International Supplies',
        image: IMAGES.logistics.container40hc,
        specs: [
          {
            label: 'Roll width:',
            values: [
              { dim: '100cm', qty: '280–290 pcs' },
              { dim: '120cm', qty: '230–240 pcs' }
            ]
          },
          {
            label: 'Roll volume:',
            values: [{ qty: '0.255–0.305m³' }]
          }
        ]
      }
    ]
  },
  {
    title: 'ROKAFLEX TUBES',
    description: 'TUBES ARE PACKED IN CARDBOARD BOXES MEASURING 320 × 390 × 2090 MM. THE VOLUME OF ONE BOX IS 0.27 M³. THE TRANSPORT CAPACITY IS INDICATED BELOW.',
    items: [
      {
        key: 'tubes-truck-45',
        title: 'FREIGHT TRUCK 45 M³',
        subtitle: 'Compact transportation option',
        image: IMAGES.logistics.truck45m3,
        specs: [
          {
            label: 'Box volume:',
            values: [{ qty: '0.27 m³' }]
          },
          {
            label: 'Quantity:',
            values: [{ qty: '160–170 pcs' }]
          }
        ]
      },
      {
        key: 'tubes-truck-88',
        title: 'FREIGHT TRUCK 88 M³',
        subtitle: 'Increased capacity',
        image: IMAGES.logistics.truck88m3,
        specs: [
          {
            label: 'Box volume:',
            values: [{ qty: '0.27 m³' }]
          },
          {
            label: 'Quantity:',
            values: [{ qty: '305–315 pcs.' }]
          }
        ]
      },
      {
        key: 'tubes-container-40',
        title: '40HC CONTAINER',
        subtitle: 'International Supplies',
        image: IMAGES.logistics.container40hc,
        specs: [
          {
            label: 'Box volume:',
            values: [{ qty: '0.27 m³' }]
          },
          {
            label: 'Quantity:',
            values: [{ qty: '275–285 pcs.' }]
          }
        ]
      }
    ]
  }
];
