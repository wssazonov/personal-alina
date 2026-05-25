import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    private readonly currentYear = signal(new Date().getFullYear());
    protected readonly copyright = computed(
        () => `© Алина ${this.currentYear()}`,
    );
}
