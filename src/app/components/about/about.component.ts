import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ABOUT_METRICS } from '../../shared/data/metrics.data';
import type { Metric } from '../../shared/models/landing.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RevealOnScrollDirective, IconComponent],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
    protected readonly metrics = signal<readonly Metric[]>(ABOUT_METRICS);
}
