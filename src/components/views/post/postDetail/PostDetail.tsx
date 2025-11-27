"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import styles from "./postDetail.module.css";
import PostDetailSkeleton from "./PostDetailSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import { usePosts } from "@/api/hooks/usePosts";
import { Post } from "@/api/types";
// import { toastError } from "@/utils/toast/toast";

export default function PostDetailView() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { useGetPost, deletePost } = usePosts();

  // const postsFromRedux = useSelector((state: RootState) => state.posts.posts);
  const auth = useSelector((state: RootState) => state.auth);
  const [post, setPost] = useState<Post | null>(null);

  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useGetPost(id);

  // Check Redux first, fallback to hook
  useEffect(() => {
    if (!id) return;
    // console.log("Looking for post with id:", id);
    // console.log("Posts from Redux:", postsFromRedux);
    // console.log("Data from hook:", data);
    // const foundInRedux = postsFromRedux?.find((p) => (p._id ?? p._id) === id);
    // if (foundInRedux) {
    //   setPost({ ...foundInRedux, _id: foundInRedux._id ?? foundInRedux._id! });
    // } else if (data) {
    //   setPost(data);
    // }

    if (data) {
      setPost(data);
    }
  }, [
    id,
    // postsFromRedux,
    data,
  ]);
  if (!post || isLoading) return <PostDetailSkeleton />;

  // permissions
  const isAuthor = auth.user?.id === post?.author?._id;
  const isAdmin = auth.user?.role === "admin";

  const canEdit = isAuthor;
  const canDelete = isAuthor || isAdmin;

  const handleEdit = () => router.push(`/posts/edit/${post._id}`);

  const confirmDelete = async () => {
    try {
      await deletePost.mutateAsync(post._id);
      router.push("/posts");
    } catch (err) {
      console.error(err);
      // alert("Failed to delete post");
      // toastError(" Failed to delete post");
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/posts");
    }
  };
  return (
    <>
      <button className={styles.backButton} onClick={handleBack}>
        <FaArrowLeft /> Back
      </button>

      <div className={styles.container}>
        {post.imageUrl && (
          <img
            className={styles.coverImage}
            src={post.imageUrl}
            alt={post.title}
          />
        )}

        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.author}>By {post?.author?.email}</p>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post?.contentHTML }}
        />

        {(canEdit || canDelete) && (
          <div className={styles.actions}>
            {canEdit && (
              <button className={styles.iconButton} onClick={handleEdit}>
                <FaEdit />
              </button>
            )}
            {canDelete && (
              <button
                className={`${styles.iconButton} ${styles.danger}`}
                onClick={() => setShowModal(true)}
              >
                <FaTrash />
              </button>
            )}
          </div>
        )}

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Delete Post?</h3>
              <p>This action cannot be undone.</p>

              <div className={styles.modalActions}>
                <button
                  className={styles.btnSecondary}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className={styles.btnDanger} onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
