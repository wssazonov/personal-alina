import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/content/content.service';
import { ContentSliderComponent } from '../../shared/components/content-slider/content-slider.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-directions',
    standalone: true,
    imports: [RevealOnScrollDirective, IconComponent, ContentSliderComponent],
    templateUrl: './directions.component.html',
    styleUrl: './directions.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionsComponent {
    private readonly content = inject(ContentService);
    protected readonly directions = this.content.directions;
}
