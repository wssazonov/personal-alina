import type { Direction } from '../models/landing.models';

export const DIRECTIONS: readonly Direction[] = [
    {
        id: 1,
        title: 'Математика (профиль)',
        icon: 'square-root',
        points: [
            'Все темы с нуля до уверенного уровня',
            'Подготовка ко второй части',
            'Разбор сложных задач',
            'Теория + практика + разбор ошибок',
        ],
    },
    {
        id: 2,
        title: 'Информатика',
        icon: 'code',
        points: [
            'Программирование Python',
            'Алгоритмы и логика',
            'Все задания ЕГЭ: теория и практика',
            'Разбор типовых заданий',
        ],
    },
] as const;
