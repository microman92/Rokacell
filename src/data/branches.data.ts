import { IMAGES } from "@/assets/images";

export type Branch = {
  id: string;
  variant: "photo" | "products";
  companyName?: string;
  city: string;
  address: string;
  emails: string[];
  website?: string;
  phones: string[];
  image: string;
  logo?: string;
};

export const BRANCHES: Branch[] = [
  {
    id: "tashkent",
    variant: "photo",
    image: IMAGES.branches.bg,
    logo: IMAGES.icons.logo,
    companyName: 'СП ООО "ROKA-CELL"',
    city: "TASHKENT, UZBEKISTAN",
    address: "17 Obikhaet Street, Sergeli District",
    emails: ["info@rokacell.com"],
    website: "www.rokacell.com",
    phones: ["+998 95 778-71-32", "+998 77 292-00-99"],
  },
  {
    id: "almaty",
    variant: "products",
    image: IMAGES.branches.almaty,
    logo: IMAGES.icons.logo,
    companyName: 'ТОО "ROKA-CELL"',
    city: "ALMATY, KAZAKHSTAN",
    address: "Zhetysu district, Turar Ryskulov Avenue 61E.",
    emails: ["infokz@rokacell.com"],
    website: "www.rokacell.kz",
    phones: ["+7 707 422-89-58"],
  },
  {
    id: "moscow",
    variant: "products",
    image: IMAGES.branches.moscow,
    logo: IMAGES.icons.logo,
    companyName: 'ООО "ROKA-CELL"',
    city: "MOSCOW, RUSSIAN FEDERATION",
    address: "",
    emails: ["inforu@rokacell.com"],
    website: "www.rokacell.ru",
    phones: ["+7 925 078-01-11"],
  },
  {
    id: "baku",
    variant: "products",
    image: IMAGES.branches.moscow, // Fallback image since we don't have one for Baku
    logo: IMAGES.icons.logo,
    companyName: "NET YAPI PAZARLAMA MMC",
    city: "BAKU, AZERBAIJAN",
    address: "AZ1052 BAKU, BINEGADI AHMED RECEBLI 62 A",
    emails: [
      "netyapi@netyapi.az",
      "sales@netyapi.az",
      "sales2@netyapi.az",
      "finance@netyapi.az",
      "finance2@netyapi.az"
    ],
    website: "www.netyapi.az",
    phones: [
      "+99 (412) 564 74 60",
      "+99 (412) 561 69 76",
      "+99 (450) 247 58 02",
      "+99 (450) 247 58 03",
      "+99 (450) 247 58 04",
      "+99 (450) 247 58 05",
    ],
  },
];
