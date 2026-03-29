
export const siteConfig = {
  name: "Тёплые Кадры",
  telegramUrl: "https://t.me/framesouuul",
  vkUrl: "https://vk.com/karataevasss",
  email: "karataevaaleksandra446@gmail.com",
  city: "Бологое",
  year: "2026",
};

export const navLinks = [
  { label: "фото", href: "#gallery" },
  { label: "обо мне", href: "#about" },
  { label: "услуги", href: "#services" },
];

export const heroContent = {
  headlinePart1: "Сохраню твои",
  headlineItalic: "настоящие",
  headlinePart2: "эмоции",
  subheadline:
    "Портретная съёмка в Бологое и окрестностях. Без постановки — просто будь собой.",
  ctaPrimary: "Смотреть фото ↓",
  ctaSecondary: "Написать мне",
};

export const aboutContent = {
  label: "НЕМНОГО ОБО МНЕ",
  headlinePart1: "Привет! Я",
  headlineItalic: "Саша",
  paragraph1:
    "Мне 17, и я учусь снимать людей такими, какие они есть — без натянутых улыбок и неловких поз.",
  paragraph2:
    "Больше всего люблю естественный свет, прогулки и те случайные моменты, когда человек забывает про камеру. Именно тогда получаются лучшие кадры. Снимаю в Бологое и готова выехать в ближайшие города.",
  ctaLabel: "Написать в Telegram →",
  ctaUrl: "https://t.me/framesouuul",
};

export interface Service {
  title: string;
  titleItalic?: boolean;
  details: string[];
  price: string;
  badge?: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    title: "Мини-съёмка",
    titleItalic: true,
    details: ["· ~30 минут", "· 1 локация", "· 10 обработанных фото"],
    price: "от 500 ₽",
    featured: false,
  },
  {
    title: "Полная съёмка",
    titleItalic: true,
    details: [
      "· 1 – 1.5 часа",
      "· 1-2 локации",
      "· 25+ обработанных фото",
    ],
    price: "от 1 200 ₽",
    badge: "популярное",
    featured: true,
  },
];

export const servicesContent = {
  label: "ДЛЯ ВАС",
  headlinePart1: "Сколько",
  headlineItalic: "стоит",
  footnote:
    "Если хочется чего-то особенного — напишите, обсудим и придумаем вместе ♡",
};

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Напишите мне",
    description:
      "Расскажите, что хотите — портрет, пару, подарок подруге. Выберем дату и место.",
  },
  {
    number: "02",
    title: "Встретимся",
    description:
      "Погуляем, поснимаем в комфортном темпе. Подскажу позы, но без «стой ровно и не дыши».",
  },
  {
    number: "03",
    title: "Заберёте фото",
    description:
      "Обработанные фото получите за 3–5 дней. Скину ссылку на облако.",
  },
];

export const processContent = {
  label: "КАК ВСЁ УСТРОЕНО",
  headlinePart1: "Три",
  headlineItalic: "простых",
  headlinePart2: "шага",
};

export interface Testimonial {
  quote: string;
  author: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Я вообще не умею фоткаться, но Сашка как-то умудрилась сделать так, что я себе понравилась.",
    author: "— Диана",
  },
  {
    quote:
      "Хотела фотки для ВК, а получила кадры, которые не стыдно на аватарку поставить наконец.",
    author: "— Полина",
  },
  {
    quote:
      "Сделали съёмку с парнем на годовщину. Мы просто гуляли, а она щёлкала. Теперь это наши любимые фото.",
    author: "— Настя",
  },
];

export const testimonialsContent = {
  label: "ОТЗЫВЫ",
  headlinePart1: "Что",
  headlineItalic: "говорят",
};

export const footerContent = {
  headline1: "Давайте создавать",
  headlineItalic: "вместе",
  headline2: "?",
  paragraph:
    "Напишите мне — обсудим идею, подберём локацию и дату. Без обязательств.",
  emailLabel: "или напишите на",
};

export interface GalleryItem {
  id: number;
  aspectRatio: string;
  caption: string;
  comment: string;
  gridSpan?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    aspectRatio: "3/4",
    caption: "портрет",
    comment: "REPLACE: gallery-1.jpg — close-up portrait, warm light, soft bokeh",
  },
  {
    id: 2,
    aspectRatio: "4/3",
    caption: "прогулка",
    comment: "REPLACE: gallery-2.jpg — couple walking in golden hour light",
  },
  {
    id: 3,
    aspectRatio: "3/4",
    caption: "крупный план",
    comment: "REPLACE: gallery-3.jpg — portrait in natural setting, dappled light",
  },
  {
    id: 4,
    aspectRatio: "4/5",
    caption: "история пары",
    comment: "REPLACE: gallery-4.jpg — couple portrait, soft background",
  },
  {
    id: 5,
    aspectRatio: "3/4",
    caption: "естественный свет",
    comment: "REPLACE: gallery-5.jpg — portrait in soft light, warm tones",
  },
  {
    id: 6,
    aspectRatio: "4/3",
    caption: "живой кадр",
    comment: "REPLACE: gallery-6.jpg — outdoor session, natural movement",
  },
  {
    id: 7,
    aspectRatio: "3/4",
    caption: "улыбка",
    comment: "REPLACE: gallery-7.jpg — candid portrait moment, laughing",
  },
  {
    id: 8,
    aspectRatio: "4/5",
    caption: "нежный момент",
    comment: "REPLACE: gallery-8.jpg — couple in city park, warm edit",
  },
];


