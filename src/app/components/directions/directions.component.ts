import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DIRECTIONS } from '../../shared/data/directions.data';
import type { Direction } from '../../shared/models/landing.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-directions',
    standalone: true,
    imports: [RevealOnScrollDirective, IconComponent],
    templateUrl: './directions.component.html',
    styleUrl: './directions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionsComponent {
    protected readonly directions = signal<readonly Direction[]>(DIRECTIONS);
}
