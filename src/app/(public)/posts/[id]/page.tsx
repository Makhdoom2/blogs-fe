import PostDetailView from "@/components/views/post/postDetail/PostDetail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts | Detail",
};
const page = () => {
  return <PostDetailView />;
};

export default page;
