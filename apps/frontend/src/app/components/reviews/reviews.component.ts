import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { ContentService } from '../../core/content/content.service';
import { ContentSliderComponent } from '../../shared/components/content-slider/content-slider.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [RevealOnScrollDirective, ContentSliderComponent],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
    private readonly content = inject(ContentService);
    private readonly slider = viewChild(ContentSliderComponent);
    protected readonly reviews = this.content.reviews;
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
        this.slider()?.scrollToPage(index);
    }

    protected getInitial(name: string): string {
        return name.charAt(0);
    }
}
