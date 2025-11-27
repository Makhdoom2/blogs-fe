import CreatePostScreen from "@/components/views/post/postCreateEdit/PostCreate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts | Create",
};

export default function CreatePost() {
  return <CreatePostScreen />;
}
