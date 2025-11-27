export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: number;
  expiresIn: number;
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
}

// post types
export interface CreatePostDto {
  title: string;
  contentHTML: string;
  imageUrl?: string;
}

export interface UpdatePostDto {
  title: string;
  contentHTML: string;
  imageUrl?: string;
}
interface authorInfo {
  _id: string;
  name: string;
  email: string;
}
export interface Post {
  _id: string;
  title: string;
  contentHTML: string;
  author: authorInfo;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// user types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUsers {
  total: number;
  page: number;
  limit: number;
  users: User[];
}

// common types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

//posts
export interface PaginatedPosts {
  total: number;
  page: number;
  limit: number;
  posts: Post[];
}
