import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentService } from '../../core/content/content.service';
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
    private readonly content = inject(ContentService);
    protected readonly about = this.content.about;
    protected readonly paragraphs = computed(() =>
        this.about().text.split(/\n\s*\n/),
    );
}
