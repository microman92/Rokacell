import { IMAGES } from "@/assets/images";

export type Branch = {
  id: string;
  variant: 'photo' | 'products';
  city: string;
  address: string;
  email: string;
  phones: string[];
  image: string;
  logo?: string;
};

// Branches data
export const BRANCHES: Branch[] = [
  {
    id: 'tashkent',
    variant: 'photo',
    image: IMAGES.about.plant,
    logo: IMAGES.icons.logo,
    city: "TASHKENT, UZBEKISTAN",
    address: "17 Obikhaet Street, Sergeli District",
    email: "info@rokacell.com",
    phones: ["+998 95 778-71-32", "+998 77 292-00-99"],
  },
  {
    id: 'almaty',
    variant: 'products',
    image: IMAGES.branches.almaty,
    logo: IMAGES.icons.logo,
    city: "ALMATY, KAZAKHSTAN",
    address: "Zhetysu district, Turar Ryskulov Avenue 61E.",
    email: "infokz@rokacell.com",
    phones: ["+7 707 422-89-58"],
  },
  {
    id: 'moscow',
    variant: 'products',
    image: IMAGES.branches.moscow,
    logo: IMAGES.icons.logo,
    city: "MOSCOW, RUSSIAN FEDERATION",
    address: "",
    email: "inforu@rokacell.com",
    phones: ["+7 925 078-01-11"],
  },
];
