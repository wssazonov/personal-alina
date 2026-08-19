export interface AdminFact {
    id?: string;
    icon: string;
    title: string;
    text: string;
    order: number;
    isActive: boolean;
}

export interface AdminAbout {
    id?: string;
    title: string;
    text: string;
    facts: AdminFact[];
}

export interface AdminBenefit {
    id: string;
    icon: string;
    title: string;
    text: string;
    order: number;
    isActive: boolean;
}

export interface AdminDirectionItem {
    id?: string;
    text: string;
    order: number;
    isActive: boolean;
}

export interface AdminDirection {
    id: string;
    icon: string;
    title: string;
    order: number;
    isActive: boolean;
    items: AdminDirectionItem[];
}

export interface AdminReview {
    id: string;
    text: string;
    studentName: string;
    studentClass: string;
    imageUrl?: string;
    reviewImageUrl?: string;
    icon: string;
    order: number;
    isActive: boolean;
}
