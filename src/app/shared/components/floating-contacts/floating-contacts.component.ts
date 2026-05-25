import { ChangeDetectionStrategy, Component } from '@angular/core';

interface FloatingAction {
    id: number;
    label: string;
    url: string;
}

@Component({
    selector: 'app-floating-contacts',
    standalone: true,
    templateUrl: './floating-contacts.component.html',
    styleUrl: './floating-contacts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingContactsComponent {
    protected readonly actions: readonly FloatingAction[] = [
        {
            id: 1,
            label: 'Telegram',
            url: 'https://t.me/AlinaAkishina',
        },
        {
            id: 2,
            label: 'WhatsApp',
            url: 'https://wa.me/79819505805',
        },
        {
            id: 3,
            label: 'Позвонить',
            url: 'tel:+79819505805',
        },
    ] as const;
}
