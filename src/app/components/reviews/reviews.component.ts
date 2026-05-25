import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { REVIEWS } from '../../shared/data/reviews.data';
import type { Review } from '../../shared/models/landing.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [RevealOnScrollDirective],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
    protected readonly reviews = signal<readonly Review[]>(REVIEWS);
    protected readonly activeIndex = signal(0);
    protected readonly paginationDots = computed(() => {
        const pagesCount = Math.ceil(this.reviews().length / 3);

        if (pagesCount <= 1) {
            return [];
        }

        return Array.from({ length: pagesCount }, (_, index) => index);
    });

    protected goTo(index: number): void {
        this.activeIndex.set(index);
    }

    protected getInitial(name: string): string {
        return name.charAt(0);
    }
}
