import { IMAGES } from '@/assets/images';

export interface NewsItem {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  content?: string;
  image?: any;
  slug: string;
  date: string;
  category?: string;
}

export const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'ROKACELL held a meeting with design engineers from Kazan',
    description:
      'ROKACELL hosted a group of design engineers from Kazan (Russia) at its production facility in Tashkent for an exchange of experience and discussion',
    image: IMAGES.news.kazan,
    slug: 'meeting-kazan-engineers',
    date: '2025-02-10',
  },
  {
    id: '2',
    title: 'ROKACELL at Aquaflame by Aquatherm Moscow 2025',
    description:
      'ROKACELL participated in the 29th international exhibition Aquaflame by Aquatherm Moscow, one of the key industry events in the field of heating',
    image: IMAGES.news.moscow,
    slug: 'aquaflame-moscow-2025',
    date: '2025-02-04',
  },
  {
    id: '3',
    title: 'ROKACELL at Aquatherm Almaty 2025, Kazakhstan',
    description:
      'ROKACELL participated in the international exhibition Aquatherm Almaty 2025, held in Almaty (Kazakhstan), which brought together leading specialists in',
    image: IMAGES.news.kazakhstan,
    slug: 'aquatherm-almaty-2025',
    date: '2025-09-02',
  },
  {
    id: '4',
    title: 'ROKACELL at AquaTherm Tashkent 2025',
    description:
      'ROKACELL participated in the international industry exhibition AquaTherm Tashkent 2025, held in Uzbekistan, which brought together leading',
    image: IMAGES.news.tashkent,
    slug: 'aquatherm-tashkent-2025',
    date: '2025-10-01',
  },
];
