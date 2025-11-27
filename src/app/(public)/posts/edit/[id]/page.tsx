import EditPostScreen from "@/components/views/post/postCreateEdit/PostEdit";
import TokenProtectedRoute from "@/utils/protectedRoute/TokenProtectedRoute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts | Edit",
};
const PostEdit = () => {
  return (
    <TokenProtectedRoute>
      <EditPostScreen />
    </TokenProtectedRoute>
  );
};

export default PostEdit;
