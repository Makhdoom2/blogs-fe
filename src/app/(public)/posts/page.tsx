import PostsView from "@/components/views/post/Post";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};
const pages = () => {
  return <PostsView />;
};

export default pages;
