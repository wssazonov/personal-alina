import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
    selector: 'app-contacts',
    standalone: true,
    imports: [RevealOnScrollDirective, IconComponent],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
}
