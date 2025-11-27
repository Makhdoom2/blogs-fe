import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/services/auth.service";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/utils/toast/toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

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
      const { token, user, expiresAt } = response;
      //testing
      // console.log("testing", user);
      // const testExpiresAt = Math.floor(Date.now() / 1000) + 180;
      // let expiresAt = testExpiresAt;

      dispatch(setCredentials({ token, user, expiresAt }));
      toastSuccess("Login successful!");

      if (user.role === "admin") {
        router.push("/admin/users");
      } else {
        router.push("/home");
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
