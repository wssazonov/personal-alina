export interface Metric {
    id: number;
    title: string;
    subtitle: string;
    icon: string;
}

export interface Benefit {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export interface Direction {
    id: number;
    title: string;
    icon: string;
    points: readonly string[];
}

export interface Format {
    id: number;
    title: string;
    description: string;
    icon: string;
}

export interface Review {
    id: number;
    text: string;
    author: string;
    grade: string;
}

export interface ContactLink {
    id: number;
    title: string;
    value: string;
    url: string;
}
