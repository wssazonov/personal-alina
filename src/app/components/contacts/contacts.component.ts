import { ChangeDetectionStrategy, Component } from '@angular/core';
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
}
