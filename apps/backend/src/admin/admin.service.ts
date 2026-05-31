import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    CreateBenefitDto,
    CreateDirectionDto,
    CreateReviewDto,
    UpdateAboutDto,
    UpdateBenefitDto,
    UpdateDirectionDto,
    UpdateReviewDto,
} from './dto/content.dto';

@Injectable()
export class AdminService {
    public constructor(private readonly prisma: PrismaService) {}

    public getAbout() {
        return this.prisma.aboutContent.findFirst({
            include: { facts: { orderBy: { order: 'asc' } } },
        });
    }

    public async updateAbout(dto: UpdateAboutDto) {
        const current = await this.prisma.aboutContent.findFirst();
        const facts = dto.facts.map(({ id, ...fact }) => ({
            ...fact,
            ...(id ? { id } : {}),
        }));

        if (!current) {
            return this.prisma.aboutContent.create({
                data: {
                    title: dto.title,
                    text: dto.text,
                    facts: { create: facts },
                },
                include: { facts: { orderBy: { order: 'asc' } } },
            });
        }

        return this.prisma.aboutContent.update({
            where: { id: current.id },
            data: {
                title: dto.title,
                text: dto.text,
                facts: {
                    deleteMany: {},
                    create: facts,
                },
            },
            include: { facts: { orderBy: { order: 'asc' } } },
        });
    }

    public getBenefits() {
        return this.prisma.benefit.findMany({ orderBy: { order: 'asc' } });
    }

    public createBenefit(dto: CreateBenefitDto) {
        return this.prisma.benefit.create({ data: dto });
    }

    public updateBenefit(id: string, dto: UpdateBenefitDto) {
        return this.prisma.benefit.update({ where: { id }, data: dto });
    }

    public deleteBenefit(id: string) {
        return this.prisma.benefit.delete({ where: { id } });
    }

    public getDirections() {
        return this.prisma.direction.findMany({
            orderBy: { order: 'asc' },
            include: { items: { orderBy: { order: 'asc' } } },
        });
    }

    public createDirection(dto: CreateDirectionDto) {
        const { items, ...direction } = dto;

        return this.prisma.direction.create({
            data: {
                ...direction,
                items: { create: items.map(({ id, ...item }) => item) },
            },
            include: { items: { orderBy: { order: 'asc' } } },
        });
    }

    public updateDirection(id: string, dto: UpdateDirectionDto) {
        const { items, ...direction } = dto;

        return this.prisma.direction.update({
            where: { id },
            data: {
                ...direction,
                ...(items
                    ? {
                          items: {
                              deleteMany: {},
                              create: items.map(({ id: itemId, ...item }) => ({
                                  ...item,
                                  ...(itemId ? { id: itemId } : {}),
                              })),
                          },
                      }
                    : {}),
            },
            include: { items: { orderBy: { order: 'asc' } } },
        });
    }

    public deleteDirection(id: string) {
        return this.prisma.direction.delete({ where: { id } });
    }

    public getReviews() {
        return this.prisma.review.findMany({ orderBy: { order: 'asc' } });
    }

    public createReview(dto: CreateReviewDto) {
        return this.prisma.review.create({
            data: {
                ...dto,
                imageUrl: dto.imageUrl || null,
            },
        });
    }

    public updateReview(id: string, dto: UpdateReviewDto) {
        return this.prisma.review.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.imageUrl !== undefined
                    ? { imageUrl: dto.imageUrl || null }
                    : {}),
            },
        });
    }

    public deleteReview(id: string) {
        return this.prisma.review.delete({ where: { id } });
    }
}
