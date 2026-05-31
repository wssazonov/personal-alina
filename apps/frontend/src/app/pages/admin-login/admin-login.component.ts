import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly formBuilder = inject(FormBuilder).nonNullable;

    protected readonly isSubmitting = signal(false);
    protected readonly errorMessage = signal('');
    protected readonly form = this.formBuilder.group({
        login: ['', Validators.required],
        password: ['', Validators.required],
    });

    public submit(): void {
        if (this.form.invalid || this.isSubmitting()) {
            this.form.markAllAsTouched();
            return;
        }

        this.errorMessage.set('');
        this.isSubmitting.set(true);
        const { login, password } = this.form.getRawValue();

        this.authService
            .login(login, password)
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
                next: () => void this.router.navigate(['/admin']),
                error: () =>
                    this.errorMessage.set(
                        'Не удалось войти. Проверьте логин и пароль.',
                    ),
            });
    }
}
