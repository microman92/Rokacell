// ---------- Overlay types ----------

// Картинка поверх фона
export type HeroImageOverlay = {
  kind: 'image';

  // путь к картинке
  src: string;

  // alt для accessibility
  alt: string;

  // реальные размеры (для next/image)
  width: number;
  height: number;

  // css module class
  className?: string;
};

// Видео поверх фона
export type HeroVideoOverlay = {
  kind: 'video';

  // путь к mp4
  src: string;

  // превью пока видео грузится
  poster?: string;

  // css module class
  className?: string;
};

// Все возможные overlay
export type HeroOverlay =
  | HeroImageOverlay
  | HeroVideoOverlay;


// ---------- Slide type ----------

export type HeroSlide = {
  // уникальный id слайда
  id: string;

  // Заголовок (каждая строка = новая строка)
  title: string[];

  // Подзаголовок (может отсутствовать)
  description?: string;

  // Фон слайда (может отсутствовать, как у video slide)
  bg?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };

  // Элементы поверх фона
  overlays?: HeroOverlay[];
};
