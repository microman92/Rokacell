import { IMAGES } from '@/assets/images';
import type { HeroSlide } from '@/interfaces/hero';

/**
 * Hero Slider Data
 *
 * 4 слайда для секции Hero на главной странице:
 * 1. Thermal Insulation — продуктовый слайд с фоновым изображением
 * 2. Quality Benchmark — демонстрация продукции (3 рулона + лого)
 * 3. International Cooperation — карта СНГ с партнёрами
 * 4. Exhibitions — участие на международных выставках
 */

export const HERO_SLIDES: HeroSlide[] = [
  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 1 — Efficient Thermal Insulation
  // Тёмный фон с продуктом (эластомерная теплоизоляция)
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'thermal',
    title: ['EFFICIENT THERMAL INSULATION'],
    description: 'ELASTOMERIC RUBBER FOAM PRODUCTS',
    bg: {
      src: IMAGES.home.hero.bg.insulation,
      alt: 'Rokacell efficient thermal insulation background with product',
      width: 1920,
      height: 1080,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 2 — The Benchmark of Quality in Insulation
  // Тёмный фон с 3 рулонами продукции + логотип Rokacell справа
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'quality',
    title: ['THE BENCHMARK OF', 'QUALITY IN INSULATION'],
    description:
      'ROKACELL TUBES AND ROLLS — RELIABLE PROTECTION AGAINST HEAT LOSS AND CONDENSATION IN ANY OPERATING CONDITIONS',
    bg: {
      src: IMAGES.home.hero.bg.energyEfficiency,
      alt: 'Dark background with geometric lines',
      width: 1920,
      height: 1080,
    },
    overlays: [
      // Чёрный эластомерный рулон (левый)
      {
        kind: 'image',
        src: IMAGES.home.hero.overlay.blackRoll,
        alt: 'Black elastomeric rubber roll insulation',
        width: 300,
        height: 400,
        className: 'rollBlack',
      },
      // Стандартный рулон (центральный)
      {
        kind: 'image',
        src: IMAGES.home.hero.overlay.rubberSheet,
        alt: 'Rubber sheet insulation',
        width: 300,
        height: 400,
        className: 'rollCenter',
      },
      // Фольгированный рулон (правый)
      {
        kind: 'image',
        src: IMAGES.home.hero.overlay.foilRoll,
        alt: 'Foil covered insulation roll',
        width: 300,
        height: 400,
        className: 'rollFoil',
      },
      // Логотип Rokacell справа
      {
        kind: 'image',
        src: IMAGES.home.hero.overlay.insulationsLogo,
        alt: 'Rokacell Insulation logo',
        width: 400,
        height: 150,
        className: 'brandLogo',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 3 — International Cooperation of Rokacell
  // Карта СНГ с линиями партнёрских связей
  // Страны: Russia, Kazakhstan, Kyrgyzstan, Tajikistan, Georgia, Armenia, Azerbaijan, Iran
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'cooperation',
    title: ['INTERNATIONAL', 'COOPERATION OF ROKACELL'],
    bg: {
      src: IMAGES.home.hero.bg.international,
      alt: 'Map showing Rokacell international cooperation in CIS region',
      width: 1920,
      height: 1080,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SLIDE 4 — Rokacell Products at Leading International Exhibitions
  // Фото со стенда компании на строительной выставке
  // ═══════════════════════════════════════════════════════════════════════════════
  {
    id: 'exhibitions',
    title: ['ROKACELL PRODUCTS AT LEADING', 'INTERNATIONAL EXHIBITIONS'],
    description:
      'ROKACELL REGULARLY PARTICIPATES IN LEADING INTERNATIONAL EXHIBITIONS OF CONSTRUCTION AND INSULATION MATERIALS, SHOWCASING INNOVATIVE PRODUCTS AND ESTABLISHING NEW PARTNERSHIPS IN THE CIS REGION AND BEYOND.',
    bg: {
      src: IMAGES.home.hero.bg.exhibition,
      alt: 'Rokacell exhibition stand at international construction materials fair',
      width: 1920,
      height: 1080,
    },
  },
];

/**
 * Цветовая схема слайдов (для пагинации и анимаций)
 * Можно использовать для динамической смены цвета или индикаторов
 */
export const HERO_SLIDE_THEMES = {
  thermal: {
    accent: '#f5a623', // оранжевый (индикатор текущего слайда)
    textColor: '#ffffff',
  },
  quality: {
    accent: '#f5a623',
    textColor: '#ffffff',
  },
  cooperation: {
    accent: '#f5a623',
    textColor: '#ffffff',
  },
  exhibitions: {
    accent: '#f5a623',
    textColor: '#ffffff',
  },
} as const;

/**
 * Настройки автоплея слайдера
 */
export const HERO_SLIDER_CONFIG = {
  autoplayInterval: 6000, // 6 секунд между слайдами
  transitionDuration: 800, // длительность анимации перехода (ms)
  pauseOnHover: true, // пауза при наведении
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,

} as const;
