import EditPostScreen from "@/components/views/post/postCreateEdit/PostEdit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts | Edit",
};
const PostEdit = () => {
  return <EditPostScreen />;
};

export default PostEdit;
