"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaTh, FaBars, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./post.module.css";
import PostsSkeleton from "./PostSkeleton";
import { usePosts } from "@/api/hooks/usePosts";
import {
  setPosts,
  setPage,
  setTotal,
  setSearch,
} from "@/store/slices/postsSlice";
import { smoothScrollTo } from "@/utils/scroll/SmoothScroll";
import debounce from "lodash.debounce";
import Button from "@/components/ui/button/Button";

export default function PostsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const dispatch = useDispatch();
  const router = useRouter();

  const { posts, page, limit, total, search } = useSelector(
    (state: any) => state.posts
  );
  const { useGetPosts } = usePosts();

  const { data, isLoading } = useGetPosts(page, limit, search);

  // Update Redux with fetched data
  useEffect(() => {
    if (data?.posts) {
      dispatch(setPosts(data.posts));
      dispatch(setTotal(data.total));
    }
  }, [data, dispatch]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearch(value));
      }, 500),
    [dispatch]
  );

  // Handle search input change
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  // cncel debounce on unmount

  const handleCreatePost = () => {
    router.push("/posts/create");
  };
  const handleCardClick = (id: string) => router.push(`/posts/${id}`);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));

      smoothScrollTo(0, 800);
    }
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const token = useSelector((state: any) => state.auth.token);

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
        <h1 className={styles.heading}>All Blogs</h1>

        <div className={styles.topControls}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search posts..."
            defaultValue={search}
            onChange={handleSearch}
          />
          <div className={styles.viewToggle}>
            <button
              className={view === "grid" ? styles.active : ""}
              onClick={() => setView("grid")}
              title="Grid View"
            >
              <FaTh />
            </button>
            <button
              className={view === "list" ? styles.active : ""}
              onClick={() => setView("list")}
              title="List View"
            >
              <FaBars />
            </button>
          </div>
          {token && (
            <Button onClick={handleCreatePost} variant="secondary" size="sm">
              Publish Post
            </Button>
          )}
        </div>

        {isLoading ? (
          <PostsSkeleton view={view} count={limit} />
        ) : (
          <>
            <div className={view === "grid" ? styles.grid : styles.list}>
              {posts.map((post: any) => (
                <div
                  key={post._id}
                  className={styles.card}
                  onClick={() => handleCardClick(post._id)}
                >
                  <img
                    className={styles.image}
                    src={
                      post.imageUrl ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={post.title}
                  />
                  <div className={styles.content}>
                    <h3 className={styles.title}>{post.title}</h3>
                    <p className={styles.author}>By {post.author.email}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                {/* Previous Button */}
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Prev
                </button>

                {/* Page Number Buttons */}
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={page === i + 1 ? styles.activePage : ""}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
