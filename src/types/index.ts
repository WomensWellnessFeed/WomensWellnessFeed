export interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  readTime: number;
  likes: number;
  isBookmarked: boolean;
}

export interface Category {
  id: string;
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
