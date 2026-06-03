export interface Article {
    id: number;
    title: string;
    excerpt: string;
    content?: string;
    publishedAt: string;
    link: string;
    category?: string;
    categoryId?: number;
    author?: string;
    imageUrl?: string;
    readTime?: number;
    likes?: number;
    isBookmarked?: boolean;
}

export interface Category {
    id: number;
    name: string;
    icon: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
}
