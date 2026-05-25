import type { Format } from '../models/landing.models';

export const FORMATS: readonly Format[] = [
    {
        id: 1,
        title: 'Индивидуальные занятия',
        description: '1 на 1 с учеником',
        icon: '◉',
    },
    {
        id: 2,
        title: 'Онлайн',
        description: 'Удобно из любой точки мира',
        icon: '◌',
    },
    {
        id: 3,
        title: 'Гибкий график',
        description: 'Подберем удобное время',
        icon: '◈',
    },
    {
        id: 4,
        title: 'Материалы',
        description: 'Авторские конспекты, задания и шпаргалки',
        icon: '▤',
    },
] as const;
