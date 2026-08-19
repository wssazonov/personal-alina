import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.token();

    const authorizedRequest =
        token && request.url.includes('/api/admin')
            ? request.clone({
                  setHeaders: { Authorization: `Bearer ${token}` },
              })
            : request;

    return next(authorizedRequest).pipe(
        catchError((error: unknown) => {
            if (
                error instanceof HttpErrorResponse &&
                error.status === 401 &&
                request.url.includes('/api/admin')
            ) {
                authService.clearSession();
                void router.navigate(['/admin/login']);
            }

            return throwError(() => error);
        }),
    );
};
