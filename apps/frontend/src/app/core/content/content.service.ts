import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { ABOUT_METRICS } from '../../shared/data/metrics.data';
import { BENEFITS } from '../../shared/data/benefits.data';
import { DIRECTIONS } from '../../shared/data/directions.data';
import { REVIEWS } from '../../shared/data/reviews.data';
import type {
    LandingContent,
    Metric,
} from '../../shared/models/landing.models';
import { API_URL } from '../api/api-url';

interface ApiFact {
    id: string;
    icon: string;
    title: string;
    text: string;
}

interface ApiBenefit {
    id: string;
    icon: string;
    title: string;
    text: string;
}

interface ApiDirection {
    id: string;
    icon: string;
    title: string;
    items: readonly { id: string; text: string }[];
}

interface ApiReview {
    id: string;
    text: string;
    studentName: string;
    studentClass: string;
    imageUrl?: string;
    icon: string;
}

interface PublicContentResponse {
    about: {
        title: string;
        text: string;
        facts: readonly ApiFact[];
    } | null;
    benefits: readonly ApiBenefit[];
    directions: readonly ApiDirection[];
    reviews: readonly ApiReview[];
}

const FALLBACK_CONTENT: LandingContent = {
    about: {
        title: 'Обо мне',
        text: [
            'Привет! Я Алина — репетитор по математике и информатике.',
            'Уже 9 лет помогаю ученикам 9–11 классов уверенно готовиться к ЕГЭ, понимать сложные темы и достигать высоких результатов.',
            'Мой подход — это структурные занятия, мотивация и поддержка на каждом этапе подготовки.',
        ].join('\n\n'),
        facts: ABOUT_METRICS,
    },
    benefits: BENEFITS,
    directions: DIRECTIONS,
    reviews: REVIEWS,
};

@Injectable({ providedIn: 'root' })
export class ContentService {
    private readonly http = inject(HttpClient);
    private readonly state = signal<LandingContent | null>(null);

    public readonly isLoading = signal(true);
    public readonly hasContent = computed(() => this.state() !== null);
    public readonly about = computed(() => this.state()?.about ?? null);
    public readonly benefits = computed(() => this.state()?.benefits ?? []);
    public readonly directions = computed(() => this.state()?.directions ?? []);
    public readonly reviews = computed(() => this.state()?.reviews ?? []);

    public constructor() {
        this.refresh();
    }

    public refresh(): void {
        this.isLoading.set(true);
        this.http
            .get<PublicContentResponse>(`${API_URL}/content/public`)
            .subscribe({
                next: (response) => {
                    this.state.set(this.mapResponse(response));
                    this.isLoading.set(false);
                },
                error: () => {
                    this.state.set(FALLBACK_CONTENT);
                    this.isLoading.set(false);
                },
            });
    }

    private mapResponse(response: PublicContentResponse): LandingContent {
        const about = response.about
            ? {
                  title: response.about.title,
                  text: response.about.text,
                  facts: response.about.facts.map((fact) => this.mapFact(fact)),
              }
            : FALLBACK_CONTENT.about;

        return {
            about,
            benefits: response.benefits.map((benefit) => ({
                id: benefit.id,
                icon: this.normalizeIcon(benefit.icon),
                title: benefit.title,
                description: benefit.text,
            })),
            directions: response.directions.map((direction) => ({
                id: direction.id,
                icon: this.normalizeIcon(direction.icon),
                title: direction.title,
                points: direction.items.map((item) => item.text),
            })),
            reviews: response.reviews.map((review) => ({
                id: review.id,
                text: review.text,
                author: review.studentName,
                grade: review.studentClass,
                imageUrl: review.imageUrl,
                icon: this.normalizeIcon(review.icon),
            })),
        };
    }

    private mapFact(fact: ApiFact): Metric {
        return {
            id: fact.id,
            icon: this.normalizeIcon(fact.icon),
            title: fact.title,
            subtitle: fact.text,
        };
    }

    private normalizeIcon(icon: string): string {
        const aliases: Readonly<Record<string, string>> = {
            book: 'book-open',
            document: 'clipboard-check',
            math: 'square-root',
            user: 'user-round',
            file: 'file-text',
        };

        return aliases[icon] ?? icon;
    }
}
