import type { Benefit } from '../models/landing.models';

export const BENEFITS: readonly Benefit[] = [
    {
        id: 1,
        title: 'Высокие баллы',
        description:
            'Ученики сдают ЕГЭ на 80+ и 90+ баллов, поступают в топовые вузы.',
        icon: 'target',
    },
    {
        id: 2,
        title: 'Понятная теория',
        description: 'Объясняю сложное простыми словами, без воды.',
        icon: 'book-open',
    },
    {
        id: 3,
        title: 'Много практики',
        description:
            'Регулярное решение заданий в формате ЕГЭ и домашних работ.',
        icon: 'clipboard-check',
    },
    {
        id: 4,
        title: 'Поддержка',
        description:
            'Всегда на связи, помогаю не только с предметом, но и с мотивацией.',
        icon: 'heart',
    },
] as const;
