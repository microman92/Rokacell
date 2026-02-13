import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Строгий режим React для выявления потенциальных проблем
  reactStrictMode: true,

  // Оптимизация изображений
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Оптимизация production сборки
  poweredByHeader: false,
  compress: true,

  // Experimental features для улучшения производительности
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  sassOptions: {
    prependData: `@use "src/styles/mixins.scss" as *;`,
  },

};

export default nextConfig;
