import localFont from 'next/font/local';


export const openSans = localFont({
  src: [
    {
      path: '../fonts/OpenSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/OpenSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/OpenSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-open-sans',
  display: 'swap',
});


export const robotoCondensed = localFont({
  src: [
    {
      path: '../fonts/RobotoCondensed-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-roboto-condensed',
  display: 'swap',
});


export const inter = localFont({
  src: [
    {
      path: '../fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});
