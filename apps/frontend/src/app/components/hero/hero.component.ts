import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HERO_METRICS } from '../../shared/data/metrics.data';
import type { Metric } from '../../shared/models/landing.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [RevealOnScrollDirective, IconComponent],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
    protected readonly metrics = signal<readonly Metric[]>(HERO_METRICS);
}
