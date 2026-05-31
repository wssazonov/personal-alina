import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContentService } from '../../core/content/content.service';
import { ContentSliderComponent } from '../../shared/components/content-slider/content-slider.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-benefits',
    standalone: true,
    imports: [RevealOnScrollDirective, IconComponent, ContentSliderComponent],
    templateUrl: './benefits.component.html',
    styleUrl: './benefits.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenefitsComponent {
    private readonly content = inject(ContentService);
    protected readonly items = this.content.benefits;
}
