import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";
import { toastSuccess } from "@/utils/toast/toast";

export const useAdmin = () => {
  const queryClient = useQueryClient();

  // get all users query
  const useGetUsers = (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isBlocked?: boolean;
  }) => {
    return useQuery({
      queryKey: ["admin", "users", params],
      queryFn: () => adminService.getUsers(params),
    });
  };

  // toggle user block/unblock mutation
  const toggleUserBlockMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => adminService.toggleUserBlock(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toastSuccess("User permissions updated successfully!");
    },
  });

  return {
    useGetUsers,
    toggleUserBlock: toggleUserBlockMutation,
  };
};
