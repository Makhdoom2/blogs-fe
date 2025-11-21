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

export interface Post {
  id: string;
  title: string;
  contentHTML: string;
  imageUrl?: string;
  published: boolean;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

// user types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPermissionDto {
  role: "user" | "admin";
  isActive: boolean;
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
