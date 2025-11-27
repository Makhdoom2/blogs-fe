import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "@/api/services/posts.service";
import { toastSuccess } from "@/utils/toast/toast";

export const usePosts = () => {
  const queryClient = useQueryClient();

  // get all posts query
  const useGetPosts = (page: number, limit: number, search: string) => {
    return useQuery({
      queryKey: ["posts", page, limit, search],
      queryFn: () => postsService.getAll({ page, limit, search }),
      // keepPreviousData: true,
    });
  };

  // get single post query
  const useGetPost = (id: string) => {
    return useQuery({
      queryKey: ["post", id],
      queryFn: () => postsService.getPost(id),
      enabled: !!id,
    });
  };

  // create post mutation
  const createPostMutation = useMutation({
    mutationFn: postsService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // toastSuccess("Post created successfully!");
      toastSuccess(
        "Post created! Your post will be visible after admin review."
      );
    },
  });

  // update post mutation
  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      postsService.updatePost(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
      toastSuccess("Post updated successfully!");
    },
  });

  // delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: postsService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toastSuccess("Post deleted successfully!");
    },
  });

  // toggle publish mutation
  const togglePublishMutation = useMutation({
    mutationFn: postsService.togglePublish,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      toastSuccess("Post status updated!");
    },
  });

  return {
    useGetPosts,
    useGetPost,
    createPost: createPostMutation,
    updatePost: updatePostMutation,
    deletePost: deletePostMutation,
    togglePublish: togglePublishMutation,
  };
};
