export const IMAGES = {
  // Главная / Hero
  home: {
    hero: {
      logo: '/svg/Logo-rokacell.svg',
      bg: {
        exhibition: '/img/vystavka-stroitelnyh-materialov-rokacell-bg.png', // 1.7MB
        energyEfficiency: '/img/insulations-bg.png', // 130KB
        insulation: '/img/rokacell-effektivnaya-teploizolyaciya-elastomerniy-kauchuk.png', // 3.6MB
        // 280KB
      },

      overlay: {
        // Изображения поверх фона
        pipeInsulation: '/img/rokacell-trubnaya-teploizolyaciya-produkty.png',
        insulationsLogo: '/img/insulations-logo.svg',
        copperPipes: '/img/teploizolyaciya-mednyh-trub-rokacell.png',
        foilRoll: '/img/folgirovannaya-rulonnaya-izolyaciya.png',
        aluCoating: '/img/izolyaciya-s-zaschitnym-pokrytiem-alyu.png',
        rubberSheet: '/img/kauchukovaya-izolyaciya-listovaya-chernaya.png',
        blackRoll: '/img/izolyaciya-s-zaschitnym-pokrytiem-alyu.png', // Проверить, возможно дубль или замена
      },
    },

    // Блок “application areas” / области применения
    applicationAreas: {
      hotels: '/img/uteplenie-oteley-rokacell.png',
      businessCenters: '/img/izolyaciya-biznes-centrov.png',
      hospitals: '/img/teploizolyaciya-bolnic-i-klinik.png',
      construction: '/img/stroitelstvo-jilyh-kompleksov.png',
      factories: '/img/promyshlennaya-izolyaciya-fabrik.png',
      shoppingMalls: '/img/uteplitel-dlya-torgovyh-centrov.png',
    },

    // Примеры инженерных систем
    engineering: {
      hvacPipes: '/img/industries__img.png',
      ventilationDucts: '/img/izolyaciya-vozduhovodov-ventilyacii.png',

      rollMaterial: '/img/rokacell-rulonnaya-teploizolyaciya-material.png',
      consultation: '/img/konsultaciya-po-tehnicheskoy-izolyacii.png',
    },

    // Блок с калькулятором на главной (если отличается)
    calculate: '/img/home-calculate.png',
  },

  // About Company
  about: {
    HeroBg: '/img/rokacell-hvac-teploizolyaciya-trub.png',
    heroVisual: '/img/rokacell-hero-background-energy-efficiency.png',
    plant: '/img/rokacell-proizvodstvo-zavod-tashkent.png',
    companyPolicy: '/img/rokacell-korporativnaya-politika-kompanii.png',
    warmBusiness: '/img/rokacell-energoeffektivnost-teplovogo-biznesa.png',
    upArrow: '/svg/up-arrow.svg',
    downArrow: '/svg/down-arrow.svg',
  },

  // Products
  products: {
    hero: '/img/rokacell-effektivnaya-teploizolyaciya-produkciya.png',

    // Items from public/img/products
    items: {
      aluminiumTape: '/img/products/aluminium-self-adhesive-tape.png',
      pvcTape: '/img/products/pvc-self-adhesive-tape.png',
      rubberTape: '/img/products/rokaflex-rubber-tape.png',
      glue: '/img/products/rokaflex-adhesive.png',

      roll: {
        af: '/img/products/rokaflex-roll-af.png',
        afsa: '/img/products/rokaflex-roll-afsa.png',
        ag: '/img/products/rokaflex-roll-ag.png',
        agsa: '/img/products/rokaflex-roll-agsa.png',
        sa: '/img/products/rokaflex-roll-sa.png',
        std: '/img/products/rokaflex-roll-std.png',
      },

      tube: {
        af: '/img/products/rokaflex-tube-af.png',
        ag: '/img/products/rokaflex-tube-ag.png',
        std: '/img/products/rokaflex-tube-std.png',
      }
    }
  },

  // News
  news: {
    tashkent: '/img/news/rokacell-tashkent.png',
    kazakhstan: '/img/news/rokacell-kazakhstan.png',
    moscow: '/img/news/rokacell-moskow.png',
    kazan: '/img/news/news-kazan.png',
  },

  // Calculator
  calculator: {
    hero: '/img/kalkulyator-ekonomii-energii-rokacell.png',
    access: '/img/rokacell-dostup-kalkulyator-teploizolyacii.png',
  },

  // Logistics
  logistics: {
    hero: '/img/rokacell-logistika-dostavka-produkcii.png',
    truck45m3: '/img/rokacell-gruzovoy-avtomobil-45m3-dostavka.png',
    truck88m3: '/img/rokacell-gruzovoy-avtomobil-88m3-logistika.png',
    container40hc: '/img/rokacell-konteyner-40hc-mezhdunarodnaya-dostavka.png',
  },


  // Branches
  branches: {
    bg: '/img/branches-bg.png',
    tashkent: '/img/rockacell-uzbekistna-tashkent.png',
    almaty: '/img/rokacell-almaty-kazakhstan.png',
    moscow: '/img/rokacell-russia-moskva.png',
  },

  // Icons / SVG
  icons: {
    logo: '/svg/Logo-rokacell.svg',
    durability: '/svg/dolgovochnost-rokacell.svg',
    ecology: '/svg/ekologichnost-teploizolyacii.svg',
    energyEfficiency: '/svg/energoeffektivnost-uteplitelya.svg',
    fireSafety: '/svg/pojarobezopasnost-materiala.svg',
    facebook: '/svg/facebook-rokacell-community.svg',
    instagram: '/svg/rokacell-instagram-official.svg',
  },

  // Documents
  documents: {
    certificates: '/img/rokacell-tehnicheskaya-dokumentaciya-i-sertifikaty.svg',
    tubePassport: '/img/rokacell-tehnicheskiy-pasport-trubnoy-izolyacii.svg',
    rollPassport: '/img/rokacell-tehnicheskiy-pasport-rulonnoy-izolyacii.svg',
  },

  // Misc
  misc: {
    videoPlaceholder: '/img/video.png',
  }

} as const;
