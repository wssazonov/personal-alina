import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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

    protected goTo(index: number): void {
        this.activeIndex.set(index);
    }

    protected getInitial(name: string): string {
        return name.charAt(0);
    }
}
