import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    forwardRef,
    inject,
    input,
    signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

const ICON_ALIASES: Readonly<Record<string, string>> = {
    book: 'book-open',
    document: 'clipboard-check',
    file: 'file-text',
    math: 'square-root',
    user: 'user-round',
};

@Component({
    selector: 'app-icon-picker',
    standalone: true,
    imports: [IconComponent],
    templateUrl: './icon-picker.component.html',
    styleUrl: './icon-picker.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IconPickerComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPickerComponent implements ControlValueAccessor {
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private onChange: (value: string) => void = () => undefined;
    private onTouched: () => void = () => undefined;

    public readonly options = input.required<readonly string[]>();
    protected readonly selectedIcon = signal('');
    protected readonly isOpen = signal(false);
    protected readonly isDisabled = signal(false);

    public writeValue(value: string | null): void {
        this.selectedIcon.set(value ?? '');
    }

    public registerOnChange(callback: (value: string) => void): void {
        this.onChange = callback;
    }

    public registerOnTouched(callback: () => void): void {
        this.onTouched = callback;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled.set(isDisabled);
        if (isDisabled) {
            this.isOpen.set(false);
        }
    }

    @HostListener('document:click', ['$event'])
    protected closeOnOutsideClick(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target as Node)) {
            this.isOpen.set(false);
        }
    }

    protected toggle(): void {
        if (!this.isDisabled()) {
            this.isOpen.update((isOpen) => !isOpen);
        }
    }

    protected select(icon: string): void {
        if (this.isDisabled()) {
            return;
        }

        this.selectedIcon.set(icon);
        this.isOpen.set(false);
        this.onChange(icon);
        this.onTouched();
    }

    protected markAsTouched(): void {
        this.onTouched();
    }

    protected previewIcon(icon: string): string {
        return ICON_ALIASES[icon] ?? icon;
    }
}
