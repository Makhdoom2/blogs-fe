import CreatePostScreen from "@/components/views/post/postCreateEdit/PostCreate";
import TokenProtectedRoute from "@/utils/protectedRoute/TokenProtectedRoute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts | Create",
};

export default function CreatePost() {
  return (
    <TokenProtectedRoute>
      <CreatePostScreen />
    </TokenProtectedRoute>
  );
}
