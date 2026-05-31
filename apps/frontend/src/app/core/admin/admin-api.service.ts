import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type {
    AdminAbout,
    AdminBenefit,
    AdminDirection,
    AdminReview,
} from './admin.models';
import { API_URL } from '../api/api-url';

const ADMIN_API_URL = `${API_URL}/admin`;

@Injectable({ providedIn: 'root' })
export class AdminApiService {
    private readonly http = inject(HttpClient);

    public getAbout() {
        return this.http.get<AdminAbout | null>(`${ADMIN_API_URL}/about`);
    }

    public updateAbout(payload: AdminAbout) {
        return this.http.put<AdminAbout>(`${ADMIN_API_URL}/about`, payload);
    }

    public getBenefits() {
        return this.http.get<AdminBenefit[]>(`${ADMIN_API_URL}/benefits`);
    }

    public createBenefit(payload: Omit<AdminBenefit, 'id'>) {
        return this.http.post<AdminBenefit>(`${ADMIN_API_URL}/benefits`, payload);
    }

    public updateBenefit(id: string, payload: Omit<AdminBenefit, 'id'>) {
        return this.http.put<AdminBenefit>(`${ADMIN_API_URL}/benefits/${id}`, payload);
    }

    public deleteBenefit(id: string) {
        return this.http.delete(`${ADMIN_API_URL}/benefits/${id}`);
    }

    public getDirections() {
        return this.http.get<AdminDirection[]>(`${ADMIN_API_URL}/directions`);
    }

    public createDirection(payload: Omit<AdminDirection, 'id'>) {
        return this.http.post<AdminDirection>(`${ADMIN_API_URL}/directions`, payload);
    }

    public updateDirection(id: string, payload: Omit<AdminDirection, 'id'>) {
        return this.http.put<AdminDirection>(
            `${ADMIN_API_URL}/directions/${id}`,
            payload,
        );
    }

    public deleteDirection(id: string) {
        return this.http.delete(`${ADMIN_API_URL}/directions/${id}`);
    }

    public getReviews() {
        return this.http.get<AdminReview[]>(`${ADMIN_API_URL}/reviews`);
    }

    public createReview(payload: Omit<AdminReview, 'id'>) {
        return this.http.post<AdminReview>(`${ADMIN_API_URL}/reviews`, payload);
    }

    public updateReview(id: string, payload: Omit<AdminReview, 'id'>) {
        return this.http.put<AdminReview>(`${ADMIN_API_URL}/reviews/${id}`, payload);
    }

    public deleteReview(id: string) {
        return this.http.delete(`${ADMIN_API_URL}/reviews/${id}`);
    }
}
