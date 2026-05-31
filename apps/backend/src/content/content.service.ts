import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
    public constructor(private readonly prisma: PrismaService) {}

    public async getPublicContent() {
        const [about, benefits, directions, reviews] = await Promise.all([
            this.prisma.aboutContent.findFirst({
                include: {
                    facts: {
                        where: { isActive: true },
                        orderBy: { order: 'asc' },
                    },
                },
            }),
            this.prisma.benefit.findMany({
                where: { isActive: true },
                orderBy: { order: 'asc' },
            }),
            this.prisma.direction.findMany({
                where: { isActive: true },
                orderBy: { order: 'asc' },
                include: {
                    items: {
                        where: { isActive: true },
                        orderBy: { order: 'asc' },
                    },
                },
            }),
            this.prisma.review.findMany({
                where: { isActive: true },
                orderBy: { order: 'asc' },
            }),
        ]);

        return { about, benefits, directions, reviews };
    }
}
