import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/landing/landing-page.component').then(
                ({ LandingPageComponent }) => LandingPageComponent,
            ),
    },
    {
        path: 'admin/login',
        loadComponent: () =>
            import('./pages/admin-login/admin-login.component').then(
                ({ AdminLoginComponent }) => AdminLoginComponent,
            ),
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/admin/admin.component').then(
                ({ AdminComponent }) => AdminComponent,
            ),
    },
    { path: '**', redirectTo: '' },
];
