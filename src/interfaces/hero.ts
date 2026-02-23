


export type HeroImageOverlay = {
  kind: 'image';

  
  src: string;

  
  alt: string;

  
  width: number;
  height: number;

  
  className?: string;
};


export type HeroVideoOverlay = {
  kind: 'video';

  
  src: string;

  
  poster?: string;

  
  className?: string;
};


export type HeroOverlay =
  | HeroImageOverlay
  | HeroVideoOverlay;




export type HeroSlide = {
  
  id: string;

  
  title: string[];

  
  description?: string;

  
  bg?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };

  
  overlays?: HeroOverlay[];
};
