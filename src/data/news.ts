import { NewsItem } from '@/types';
import { IMAGES } from '@/assets/images';

export const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'ROKACELL held a meeting with design engineers from Kazan',
    description:
      'ROKACELL hosted a group of design engineers from Kazan (Russia) at its production facility in Tashkent for an exchange of experience and discussion',
    image: IMAGES.home.hero.bg.exhibition,
    slug: 'meeting-kazan-engineers',
    date: '2025-02-10',
  },
  {
    id: '2',
    title: 'ROKACELL at Aquaflame by Aquatherm Moscow 2025',
    description:
      'ROKACELL participated in the 29th international exhibition Aquaflame by Aquatherm Moscow, one of the key industry events in the field of heating',
    image: IMAGES.branches.moscow,
    slug: 'aquaflame-moscow-2025',
    date: '2025-02-04',
  },
  {
    id: '3',
    title: 'ROKACELL at Aquatherm Almaty 2025, Kazakhstan',
    description:
      'ROKACELL participated in the international exhibition Aquatherm Almaty 2025, held in Almaty (Kazakhstan), which brought together leading specialists in',
    image: IMAGES.branches.almaty,
    slug: 'aquatherm-almaty-2025',
    date: '2025-09-02',
  },
  {
    id: '4',
    title: 'ROKACELL at AquaTherm Tashkent 2025',
    description:
      'ROKACELL participated in the international industry exhibition AquaTherm Tashkent 2025, held in Uzbekistan, which brought together leading',
    image: IMAGES.branches.tashkent,
    slug: 'aquatherm-tashkent-2025',
    date: '2025-10-01',
  },
  {
    id: '5',
    title: 'New Insulation Technologies 2026',
    description:
      'Discover the latest advancements in thermal insulation technology that ROKACELL is bringing to the market next year with improved efficiency.',
    image: IMAGES.home.hero.bg.insulation,
    slug: 'new-technologies-2026',
    date: '2026-01-15',
  },
];
