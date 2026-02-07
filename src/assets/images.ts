export const IMAGES = {
  // Главная / Hero
  home: {
    hero: {
      logo: '/svg/Logo-rokacell.svg',
      bg: {
        exhibition: '/img/vystavka-stroitelnyh-materialov-rokacell-bg.png',
        international: '/img/map.png',
        energyEfficiency: '/img/insulations-bg.png',
        insulation: '/img/rokacell-effektivnaya-teploizolyaciya-elastomerniy-kauchuk.png',
      },

      overlay: {
        // Изображения поверх фона (рулоны, логотипы и т.д.)
        pipeInsulation: '/img/rokacell-trubnaya-teploizolyaciya-produkty.png',
        insulationsLogo: '/img/insulations-logo.svg',
        copperPipes: '/img/teploizolyaciya-mednyh-trub-rokacell.png',
        foilRoll: '/img/folgirovannaya-rulonnaya-izolyaciya.png',
        aluCoating: '/img/izolyaciya-s-zaschitnym-pokrytiem-alyu.png',
        rubberSheet: '/img/kauchukovaya-izolyaciya-listovaya-chernaya.png',
        blackRoll: '/img/rokacell-kauchukovaya-izolyaciya-rulon-cherny.png',
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

    // Примеры инженерных систем (картинки под секции/баннеры)
    engineering: {
      hvacPipes: '/img/rokacell-hvac-teploizolyaciya-trub.png',
      ventilationDucts: '/img/izolyaciya-vozduhovodov-ventilyacii.png',
      heatingPipelines: '/img/teploizolyaciya-truboprovodov-otopleniya.png',
      rollMaterial: '/img/rokacell-rulonnaya-teploizolyaciya-material.png',
    },
  },

  // About
  about: {
    team: '/img/rokacell-company-team-about-us.png',
    plant: '/img/rokacell-proizvodstvo-zavod-tashkent.png',
    qualityControl: '/img/rokacell-kontrol-kachestva-proizvodstva.png',
  },

  // Products page (баннеры/фоны, НЕ карточки товаров из будущей CMS)
  products: {
    hero: '/img/rokacell-effektivnaya-teploizolyaciya-produkciya.png',
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

  // Policy / корпоративные блоки
  policy: {
    companyPolicy: '/img/rokacell-korporativnaya-politika-kompanii.png',
    warmBusiness: '/img/rokacell-energoeffektivnost-teplovogo-biznesa.png',
  },

  // Branches / контакты (города)
  branches: {
    tashkent: '/img/rockacell-uzbekistna-tashkent.png',
    almaty: '/img/rokacell-almaty-kazakhstan.png',
    moscow: '/img/rokacell-russia-moskva.png',
  },

  // Documents (документные svg лежат в public/img)
  documents: {
    certificates: '/img/rokacell-tehnicheskaya-dokumentaciya-i-sertifikaty.svg',
    tubePassport: '/img/rokacell-tehnicheskiy-pasport-trubnoy-izolyacii.svg',
    rollPassport: '/img/rokacell-tehnicheskiy-pasport-rulonnoy-izolyacii.svg',
  },
} as const;
