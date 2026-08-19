export interface Metric {
    id: string | number;
    title: string;
    subtitle: string;
    icon: string;
}

export interface Benefit {
    id: string | number;
    title: string;
    description: string;
    icon: string;
}

export interface Direction {
    id: string | number;
    title: string;
    icon: string;
    points: readonly string[];
}

export interface Format {
    id: string | number;
    title: string;
    description: string;
    icon: string;
}

export interface Review {
    id: string | number;
    text: string;
    author: string;
    grade: string;
    imageUrl?: string;
    reviewImageUrl?: string;
    icon?: string;
}

export interface ContactLink {
    id: number;
    title: string;
    value: string;
    url: string;
}

export interface About {
    title: string;
    text: string;
    facts: readonly Metric[];
}

export interface LandingContent {
    about: About;
    benefits: readonly Benefit[];
    directions: readonly Direction[];
    reviews: readonly Review[];
}
