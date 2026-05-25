import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    private readonly brand = signal('© Алина');
    protected readonly copyright = computed(() => this.brand());
}
