import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/services/auth.service";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/utils/toast/toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import { AuthResponse } from "../types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();

  // register mutation
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data: any) => {
      toastSuccess("Registration successful!");
      router.push("/login");
    },
  });

  // login mutation

  const loginMutation = useMutation({
    mutationFn: authService.login,

    onSuccess: (response: any) => {
      console.log("Login response:", response);
      const { token, user, expiresAt } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      dispatch(
        setCredentials({
          token,
          user,
          expiresAt,
        })
      );

      toastSuccess("Login successful!");

      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/test");
      }
    },
  });

  // logout mutation
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.clear();
      toastSuccess("Logged out successfully");
      // router.push("/login");
    },
  });

  return {
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
    isLoading: registerMutation.isPending || loginMutation.isPending,
  };
};
