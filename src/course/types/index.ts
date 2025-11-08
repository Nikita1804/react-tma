export interface User {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    type: 'article' | 'video' | 'announcement' | 'webinar' | 'update';
    status: 'draft' | 'published' | 'scheduled';
    image?: string;
    date: string;
    views: number;
    tags: string[];
}

export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    rating: number;
    students: number;
    duration: string;
    image: string;
    lessons: number;
}

export interface TeamMember {
    id: number;
    name: string;
    level: number;
    status: 'active' | 'inactive';
    joinDate: string;
    revenue: number;
}