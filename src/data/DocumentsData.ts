import { IMAGES } from "@/assets/images";

interface CertificateItem {
  id: number;
  titleKey: "conformityUz" | "conformityRu";
  preview: string;
  downloadUrl: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 1,
    titleKey: "conformityUz",
    preview: IMAGES.documents.certificates.conformityUzEng,
    downloadUrl: "/docs/Сертификат ISO Узб.pdf",
  },
  {
    id: 2,
    titleKey: "conformityUz",
    preview: IMAGES.documents.certificates.conformityUzRu,
    downloadUrl: "/docs/Сертификат соответствие OzMSt узб.pdf",
  },
  {
    id: 3,
    titleKey: "conformityRu",
    preview: IMAGES.documents.certificates.conformityRu2,
    downloadUrl: "/docs/Сертификат  соответствия Россия.pdf",
  },
  {
    id: 4,
    titleKey: "conformityRu",
    preview: IMAGES.documents.certificates.conformityRu,
    downloadUrl: "/docs/Сертификат Россия.pdf",
  },
];

interface PassportItem {
  id: number;
  titleKey: "rolls" | "tubes";
  icon: string;
  downloadUrl: string;
}

export const PASSPORT_DATA: PassportItem[] = [
  {
    id: 1,
    titleKey: "rolls",
    icon: IMAGES.documents.rollPassport,
    downloadUrl: "/docs/паспорт для рулонов.pdf",
  },
  {
    id: 2,
    titleKey: "tubes",
    icon: IMAGES.documents.tubePassport,
    downloadUrl: "/docs/паспорт для трубок.pdf",
  },
];
