import api from "@/api/client/axios";
import { ENDPOINTS } from "@/api/endpoints";
import {
  CreatePostDto,
  UpdatePostDto,
  Post,
  ApiResponse,
  PaginatedPosts,
} from "@/api/types";

export const postsService = {
  // get all posts
  getAll: async (options: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedPosts> => {
    const params: Record<string, any> = {};
    if (options.page) params.page = options.page;
    if (options.limit) params.limit = options.limit;
    if (options.search) params.search = options.search;

    const response = await api.get(ENDPOINTS.POSTS.BASE, { params });
    return response.data;
  },

  // get single post
  getPost: async (id: string): Promise<Post> => {
    const response = await api.get(ENDPOINTS.POSTS.BY_ID(id));
    return response.data;
  },

  // create post
  createPost: async (data: CreatePostDto): Promise<ApiResponse<Post>> => {
    const response = await api.post(ENDPOINTS.POSTS.BASE, data);
    return response.data;
  },

  // update post
  updatePost: async (
    id: string,
    data: UpdatePostDto
  ): Promise<ApiResponse<Post>> => {
    const response = await api.put(ENDPOINTS.POSTS.BY_ID(id), data);
    return response.data;
  },

  // delete post
  deletePost: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(ENDPOINTS.POSTS.BY_ID(id));
    return response.data;
  },

  // publish/unpublish post
  togglePublish: async (id: string): Promise<ApiResponse<Post>> => {
    const response = await api.put(ENDPOINTS.POSTS.PUBLISH(id));
    return response.data;
  },
};
