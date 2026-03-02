"use client";

import { News } from "@/components/common/News/News";
import type { NewsItem } from "@/data/news";
import { Dictionary } from "@/lib/i18n";

interface OtherNewsSliderProps {
  news: NewsItem[];
  title: string;
  dict?: Dictionary["news"];
}

export const OtherNewsSlider = ({ news, title, dict }: OtherNewsSliderProps) => {
  return <News variant="home" news={news} title={title} dict={dict} noPaddingTop={true} />;
};
