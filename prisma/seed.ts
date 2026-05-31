import 'dotenv/config';
import { hash } from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../apps/backend/src/generated/prisma/client';

const databaseUrl = process.env['DATABASE_URL'];
const adminLogin = process.env['ADMIN_LOGIN'] ?? 'alinamath';
const adminPassword = process.env['ADMIN_PASSWORD'] ?? 'Laima2010';

if (!databaseUrl) {
    throw new Error('DATABASE_URL is required to seed the database.');
}

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const aboutId = 'b2bea913-5842-42eb-a925-8f24cd132ec1';

async function main(): Promise<void> {
    const passwordHash = await hash(adminPassword, 12);

    await prisma.user.upsert({
        where: { login: adminLogin },
        update: {},
        create: { login: adminLogin, passwordHash },
    });

    await prisma.aboutContent.upsert({
        where: { id: aboutId },
        update: {},
        create: {
            id: aboutId,
            title: 'Обо мне',
            text: [
                'Привет! Я Алина — репетитор по математике и информатике.',
                'Уже 9 лет помогаю ученикам 9–11 классов уверенно готовиться к ЕГЭ, понимать сложные темы и достигать высоких результатов.',
                'Мой подход — это структурные занятия, мотивация и поддержка на каждом этапе подготовки.',
            ].join('\n\n'),
            facts: {
                create: [
                    { icon: 'user', title: 'Преподаю', text: '9 лет', order: 1 },
                    { icon: 'calendar', title: 'Сдаю ЕГЭ', text: 'ежегодно', order: 2 },
                    { icon: 'star', title: '100 баллов', text: 'на ЕГЭ', order: 3 },
                ],
            },
        },
    });

    if ((await prisma.benefit.count()) === 0) {
        await prisma.benefit.createMany({
            data: [
                { icon: 'target', title: 'Высокие баллы', text: 'Ученики сдают ЕГЭ на 80+ и 90+ баллов, поступают в топовые вузы.', order: 1 },
                { icon: 'book', title: 'Понятная теория', text: 'Объясняю сложное простыми словами, без воды.', order: 2 },
                { icon: 'document', title: 'Много практики', text: 'Регулярное решение заданий в формате ЕГЭ и домашних работ.', order: 3 },
                { icon: 'heart', title: 'Поддержка', text: 'Всегда на связи, помогаю не только с предметом, но и с мотивацией.', order: 4 },
            ],
        });
    }

    if ((await prisma.direction.count()) === 0) {
        await prisma.direction.create({
            data: {
                icon: 'math',
                title: 'Математика (профиль)',
                order: 1,
                items: {
                    create: [
                        { text: 'Все темы с нуля до уверенного уровня', order: 1 },
                        { text: 'Подготовка ко второй части', order: 2 },
                        { text: 'Разбор сложных задач', order: 3 },
                        { text: 'Теория + практика + разбор ошибок', order: 4 },
                    ],
                },
            },
        });
        await prisma.direction.create({
            data: {
                icon: 'code',
                title: 'Информатика',
                order: 2,
                items: {
                    create: [
                        { text: 'Программирование Python', order: 1 },
                        { text: 'Алгоритмы и логика', order: 2 },
                        { text: 'Все задания ЕГЭ: теория и практика', order: 3 },
                        { text: 'Разбор типовых заданий', order: 4 },
                    ],
                },
            },
        });
    }

    if ((await prisma.review.count()) === 0) {
        await prisma.review.createMany({
            data: [
                { text: 'Алина объясняет так, что сразу становится понятно! Благодаря её занятиям я сдал ЕГЭ по математике на 92 балла.', studentName: 'Илья', studentClass: '11 класс', icon: 'quote', order: 1 },
                { text: 'Информатика раньше казалась сложной, но теперь я уверенно решаю все задания. Результат — 95 баллов!', studentName: 'Полина', studentClass: '11 класс', icon: 'quote', order: 2 },
                { text: 'Очень нравятся занятия: всё по делу, доброжелательная атмосфера и постоянная поддержка.', studentName: 'Артём', studentClass: '11 класс', icon: 'quote', order: 3 },
            ],
        });
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (error: unknown) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
