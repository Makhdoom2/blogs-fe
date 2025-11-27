import AdminPostsPage from "@/components/views/postAdmin/AdminPost";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Posts",
};

const Post = () => {
  return <AdminPostsPage />;
};

export default Post;
