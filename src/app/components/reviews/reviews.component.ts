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
    protected readonly sliderTransform = computed(
        () => `translateX(-${this.activeIndex() * 100}%)`,
    );

    protected next(): void {
        const nextIndex = (this.activeIndex() + 1) % this.reviews().length;
        this.activeIndex.set(nextIndex);
    }

    protected previous(): void {
        const total = this.reviews().length;
        const prevIndex = (this.activeIndex() - 1 + total) % total;
        this.activeIndex.set(prevIndex);
    }

    protected goTo(index: number): void {
        this.activeIndex.set(index);
    }
}
