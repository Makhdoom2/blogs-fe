import api from "@/api/client/axios";
import { ENDPOINTS } from "@/api/endpoints";
import { RegisterDto, LoginDto, AuthResponse, ApiResponse } from "@/api/types";

export const authService = {
  // register user
  register: async (data: RegisterDto): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  },

  // login user
  login: async (data: LoginDto): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, data);
    return response.data;
  },

  // logout user
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post(ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
};
