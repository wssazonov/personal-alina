import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FORMATS } from '../../shared/data/formats.data';
import type { Format } from '../../shared/models/landing.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-format',
    standalone: true,
    imports: [RevealOnScrollDirective, IconComponent],
    templateUrl: './format.component.html',
    styleUrl: './format.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormatComponent {
    protected readonly formats = signal<readonly Format[]>(FORMATS);
}
