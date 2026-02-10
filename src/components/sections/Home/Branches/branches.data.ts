import { IMAGES } from "@/assets/images";

// Types for branch slides with discriminated union
export type BaseBranch = {
  city: string;
  address: string;
  email: string;
  phones: string[];
};

export type PhotoBranch = BaseBranch & {
  variant: 'photo';
  image: string;
};

export type ProductBranch = BaseBranch & {
  variant: 'products';
  image: string;
  logo: string;
};

export type Branch = PhotoBranch | ProductBranch;

// Branches data
export const BRANCHES: Branch[] = [
  {
    variant: 'photo',
    image: IMAGES.about.plant,
    city: "TASHKENT, UZBEKISTAN",
    address: "17 Obikhaet Street, Sergeli District",
    email: "info@rokacell.com",
    phones: ["+998 95 778-71-32", "+998 77 292-00-99"],
  },
  {
    variant: 'products',
    image: IMAGES.branches.almaty,
    logo: IMAGES.icons.logo,
    city: "ALMATY, KAZAKHSTAN",
    address: "Zhetysu district, Turar Ryskulov Avenue 61E.",
    email: "infokz@rokacell.com",
    phones: ["+7 707 422-89-58"],
  },
  {
    variant: 'products',
    image: IMAGES.branches.moscow,
    logo: IMAGES.icons.logo,
    city: "MOSCOW, RUSSIAN FEDERATION",
    address: "",
    email: "inforu@rokacell.com",
    phones: ["+7 925 078-01-11"],
  },
];
