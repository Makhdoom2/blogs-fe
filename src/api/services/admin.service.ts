import api from "@/api/client/axios";
import { ENDPOINTS } from "@/api/endpoints";
import {
  User,
  ApiResponse,
  PaginatedResponse,
  PaginatedUsers,
} from "@/api/types";

export const adminService = {
  // get all users with query params
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isBlocked?: boolean;
  }): Promise<PaginatedUsers> => {
    const queryParams = new URLSearchParams();

    if (params?.page !== undefined)
      queryParams.append("page", String(params.page));
    if (params?.limit !== undefined)
      queryParams.append("limit", String(params.limit));
    if (params?.search) queryParams.append("search", params.search);
    if (params?.role) queryParams.append("role", params.role);
    if (params?.isBlocked !== undefined)
      queryParams.append("isBlocked", String(params.isBlocked));

    const response = await api.get(
      `${ENDPOINTS.ADMIN.USERS}?${queryParams.toString()}`
    );
    return response.data;
  },

  // toggle block/unblock user
  toggleUserBlock: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.patch(ENDPOINTS.ADMIN.USER_PERMISSION(id));
    return response.data;
  },
};
