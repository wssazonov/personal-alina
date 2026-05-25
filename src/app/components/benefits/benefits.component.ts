import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BENEFITS } from '../../shared/data/benefits.data';
import type { Benefit } from '../../shared/models/landing.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-benefits',
    standalone: true,
    imports: [RevealOnScrollDirective, IconComponent],
    templateUrl: './benefits.component.html',
    styleUrl: './benefits.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenefitsComponent {
    protected readonly items = signal<readonly Benefit[]>(BENEFITS);
}
