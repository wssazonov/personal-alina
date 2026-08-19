import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../api/api-url';

interface LoginResponse {
    accessToken: string;
}

const TOKEN_KEY = 'alina-admin-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly tokenState = signal(localStorage.getItem(TOKEN_KEY));

    public readonly token = this.tokenState.asReadonly();

    public login(login: string, password: string): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${API_URL}/auth/login`, {
                login,
                password,
            })
            .pipe(
                tap(({ accessToken }) => {
                    localStorage.setItem(TOKEN_KEY, accessToken);
                    this.tokenState.set(accessToken);
                }),
            );
    }

    public logout(): void {
        this.clearSession();
        void this.router.navigate(['/admin/login']);
    }

    public clearSession(): void {
        localStorage.removeItem(TOKEN_KEY);
        this.tokenState.set(null);
    }

    public isAuthenticated(): boolean {
        return Boolean(this.tokenState());
    }
}
