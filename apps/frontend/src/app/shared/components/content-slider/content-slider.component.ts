import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    input,
    output,
    viewChild,
} from '@angular/core';

@Component({
    selector: 'app-content-slider',
    standalone: true,
    templateUrl: './content-slider.component.html',
    styleUrl: './content-slider.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSliderComponent {
    private readonly viewport =
        viewChild.required<ElementRef<HTMLElement>>('viewport');

    public readonly enabled = input(true);
    public readonly label = input('Прокрутка карточек');
    public readonly pageChange = output<number>();

    public scroll(direction: -1 | 1): void {
        if (!this.enabled()) {
            return;
        }

        const viewport = this.viewport().nativeElement;
        viewport.scrollBy({
            left: direction * viewport.clientWidth * 0.88,
            behavior: 'smooth',
        });
    }

    public scrollToPage(pageIndex: number): void {
        const viewport = this.viewport().nativeElement;
        viewport.scrollTo({
            left: pageIndex * viewport.clientWidth,
            behavior: 'smooth',
        });
    }

    protected syncPage(): void {
        const viewport = this.viewport().nativeElement;
        const page = Math.round(viewport.scrollLeft / viewport.clientWidth);
        this.pageChange.emit(page);
    }
}
