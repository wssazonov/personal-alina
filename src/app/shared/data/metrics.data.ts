import type { ContactLink, Metric } from '../models/landing.models';

export const HERO_METRICS: readonly Metric[] = [
    {
        id: 1,
        title: '9 лет',
        subtitle: 'преподавания',
        icon: 'graduation-cap',
    },
    {
        id: 2,
        title: '100 баллов',
        subtitle: 'на ЕГЭ',
        icon: 'hundred',
    },
    {
        id: 3,
        title: 'Индивидуальный',
        subtitle: 'подход',
        icon: 'user-round',
    },
] as const;

export const ABOUT_METRICS: readonly Metric[] = [
    {
        id: 1,
        title: 'Преподаю',
        subtitle: '9 лет',
        icon: 'graduation-cap',
    },
    {
        id: 2,
        title: 'Сдаю ЕГЭ',
        subtitle: 'ежегодно',
        icon: 'calendar',
    },
    {
        id: 3,
        title: '100 баллов',
        subtitle: 'на ЕГЭ',
        icon: 'hundred',
    },
] as const;

export const CONTACT_LINKS: readonly ContactLink[] = [
    {
        id: 1,
        title: 'Telegram',
        value: '@AlinaAkishina',
        url: 'https://t.me/AlinaAkishina',
    },
    {
        id: 2,
        title: 'WhatsApp',
        value: '+7 981 950-58-05',
        url: 'https://wa.me/79819505805',
    },
    {
        id: 3,
        title: 'Телефон',
        value: '+7 981 950-58-05',
        url: 'tel:+79819505805',
    },
    {
        id: 4,
        title: 'Telegram канал',
        value: '@alinamath_info',
        url: 'https://t.me/alinamath_info',
    },
    {
        id: 5,
        title: 'VK группа',
        value: 'egena100withalina',
        url: 'https://vk.ru/egena100withalina',
    },
    {
        id: 6,
        title: 'VK',
        value: 'id737631925',
        url: 'https://vk.ru/id737631925',
    },
] as const;
