import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CONTACT_LINKS } from '../../shared/data/metrics.data';
import type { ContactLink } from '../../shared/models/landing.models';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

@Component({
    selector: 'app-contacts',
    standalone: true,
    imports: [RevealOnScrollDirective],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
    protected readonly links = signal<readonly ContactLink[]>(CONTACT_LINKS);
}
