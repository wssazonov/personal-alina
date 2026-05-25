import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    OnDestroy,
    OnInit,
    computed,
    inject,
    input,
    signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Directive({
    selector: '[appRevealOnScroll]',
    standalone: true,
    host: {
        class: 'reveal-on-scroll',
        '[class.is-visible]': 'isVisible()',
    },
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
    private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly changeDetector = inject(ChangeDetectorRef);
    private readonly hasAppeared = signal(false);
    protected readonly isVisible = computed(() => this.hasAppeared());
    protected readonly threshold = input(0.2);
    private observer?: IntersectionObserver;

    public ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            this.hasAppeared.set(true);
            return;
        }

        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    this.hasAppeared.set(true);
                    this.changeDetector.markForCheck();
                    this.observer?.disconnect();
                }
            },
            { threshold: this.threshold() },
        );

        this.observer.observe(this.hostElement.nativeElement);
    }

    public ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
