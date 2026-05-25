import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BENEFITS } from '../../shared/data/benefits.data';
import type { Benefit } from '../../shared/models/landing.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
    selector: 'app-benefits',
    standalone: true,
    imports: [RevealOnScrollDirective],
    templateUrl: './benefits.component.html',
    styleUrl: './benefits.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenefitsComponent {
    protected readonly items = signal<readonly Benefit[]>(BENEFITS);
}
