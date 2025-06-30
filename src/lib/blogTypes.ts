// src/types/blogTypes.ts

export type BlogComment = {
  id: string;
  author: string;
  content: string;
  date: string;
  reactions: {
    like: number;
    dislike: number;
  };
  replies?: BlogComment[]; // Nested replies with same structure
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  tags?: string[];
  labels?: string[];
  author?: string;
  image?: string; // Primary featured image
  images?: string[]; // Inline additional media
  video?: string; // Optional: local or YouTube
  highlight?: boolean;
  approved?: boolean;
  reactions?: {
    up: number;
    down: number;
    favorite: number;
  };
  comments?: BlogComment[];
};

export type BlogCategory = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
};
