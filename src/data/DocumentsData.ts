import { IMAGES } from "@/assets/images";

interface CertificateItem {
  id: number;
  title: string;
  preview: string;
  downloadUrl: string;
}



export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 1,
    title: "Certificate of conformity. Uzbekistan",
    preview: IMAGES.documents.certificates.conformityUzEng,
    downloadUrl: "/docs/Сертификат ISO Узб.pdf",
  },
  {
    id: 2,
    title: "Certificate of conformity. Uzbekistan",
    preview: IMAGES.documents.certificates.conformityUzRu,
    downloadUrl: "/docs/Сертификат соответствие OzMSt узб.pdf",
  },
  {
    id: 3,
    title: "Certificate of conformity. Russia",
    preview: IMAGES.documents.certificates.conformityRu2,
    downloadUrl: "/docs/Сертификат  соответствия Россия.pdf",
  },
  {
    id: 4,
    title: "Certificate of conformity. Russia",
    preview: IMAGES.documents.certificates.conformityRu,
    downloadUrl: "/docs/Сертификат Россия.pdf",
  },
];

interface PassportItem {
  id: number;
  title: string;
  icon: string;
  downloadUrl: string;
}

export const PASSPORT_DATA: PassportItem[] = [
  {
    id: 1,
    title: "Passport for rolls",
    icon: IMAGES.documents.rollPassport,
    downloadUrl: "/docs/паспорт для рулонов.pdf",
  },
  {
    id: 2,
    title: "Passport for tubes",
    icon: IMAGES.documents.tubePassport,
    downloadUrl: "/docs/паспорт для трубок.pdf",
  },
];