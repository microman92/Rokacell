import { IMAGES } from '@/assets/images';
import type { HeroSlide } from '@/interfaces/hero';

export const HERO_SLIDES: HeroSlide[] = [
  // ---------------- SLIDE 1 — Thermal insulation (background hero)
  {
    id: 'thermal',
    title: ['EFFICIENT THERMAL INSULATION'],
    description: 'ELASTOMERIC RUBBER FOAM PRODUCTS',
    bg: {
      src: IMAGES.home.hero.bg.insulation,
      alt: 'Efficient thermal insulation background',
    },
  },

  // ---------------- SLIDE 2 — Product composition with overlays
  {
    id: 'quality',
    title: ['THE BENCHMARK OF', 'QUALITY IN INSULATION'],
    description:
      'ROKACELL tubes and rolls — reliable protection against heat loss and condensation in any operating conditions.',
    bg: {
      src: IMAGES.home.hero.overlay.insulationsLogo,
      alt: 'Rokacell insulation products background',
    },
    overlays: [
      {
        kind: 'image',
        src: IMAGES.home.hero.overlay.copperPipes,
        alt: 'Copper pipe insulation Rokacell',
        width: 780,
        height: 520,
        className: 'pipes',
      },
      {
        kind: 'image',
        src: IMAGES.home.hero.overlay.blackRoll,
        alt: 'Elastomeric rubber roll insulation',
        width: 620,
        height: 460,
        className: 'rollLeft',
      },
      {
        kind: 'image',
        src: IMAGES.home.hero.overlay.foilRoll,
        alt: 'Foil insulation roll',
        width: 620,
        height: 460,
        className: 'rollRight',
      },
    ],
  },

  // ---------------- SLIDE 3 — Video slide (about production / city / brand)
  {
    id: 'video',
    title: ['INTERNATIONAL COOPERATION', 'OF ROKACELL'],
    description: 'Expanding production geography and strengthening partnerships.',
    // overlays: [
    //   {
    //     kind: 'video',
    //     src: '/video/rokacell-promo.mp4',
    //     poster: IMAGES.home.hero.videoPoster,
    //     className: 'heroVideo',
    //   },
    // ],
  },

];
