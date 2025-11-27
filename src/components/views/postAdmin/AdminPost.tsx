"use client";

import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { FiTrash2 } from "react-icons/fi"; // delete icon

import styles from "./post.module.css";
import { usePosts } from "@/api/hooks/usePosts";
import Table, { Column } from "@/components/ui/table/Table";
import Toggle from "@/components/ui/toggle/Toggle";
import Input from "@/components/ui/Input/Input";
import { Post } from "@/api/types";
import { FaTrash } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

export default function AdminPostsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const { useGetPosts, togglePublish, deletePost } = usePosts();

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
        setPage(1);
      }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const { data, isLoading, refetch } = useGetPosts(
    page,
    limit,
    debouncedSearch
  );

  useEffect(() => {
    refetch();
  }, [page, limit, debouncedSearch]);

  const handleTogglePublish = (postId: string) => {
    togglePublish.mutate(postId, { onSuccess: () => refetch() });
  };

  const handleDeletePost = (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost.mutate(postId, { onSuccess: () => refetch() });
    }
  };

  const columns: Column<Post>[] = [
    {
      key: "title",
      header: "Title",
      sortable: true,
      render: (value) => (
        <div className={styles.titleCell} title={value}>
          {value}
        </div>
      ),
    },
    {
      key: "author",
      header: "Author",
      sortable: true,
      render: (value) => value.email,
    },
    {
      key: "published",
      header: "Published",
      render: (_, row) => (
        <div className={styles.statusColumn}>
          <span
            className={`${styles.statusPill} ${
              row.published ? styles.statusActive : styles.statusBlocked
            }`}
          >
            {row.published ? "Published" : "Draft"}
          </span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      sortable: true,
      render: (value) =>
        value
          ? new Date(value).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "-",
    },
    {
      key: "action",
      header: "Action",
      render: (_, row) => (
        <div className={styles.actionCell}>
          <Toggle
            checked={row.published}
            onChange={() => handleTogglePublish(row._id)}
          />
          <button
            onClick={() => window.open(`/posts/${row._id}`, "_blank")}
            className={styles.viewButton}
            aria-label="View post"
            title="View post"
          >
            <FiEye />
          </button>
          <button
            onClick={() => {
              setSelectedPostId(row._id);
              setShowDeleteModal(true);
            }}
            className={styles.deleteButton}
            aria-label="Delete post"
            title="Delete post"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  // console.log("Posts data:", data);

  const totalPages = data ? Math.ceil(data.total / limit) : 0;
  // console.log("TESTING ", totalPages);
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages.map((p, idx) =>
      p === "..." ? (
        <span key={idx} style={{ padding: "0.5rem" }}>
          ...
        </span>
      ) : (
        <button
          key={idx}
          className={`${styles.pageButton} ${page === p ? styles.active : ""}`}
          onClick={() => setPage(Number(p))}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <div className={styles.searchField}>
            <Input
              placeholder="Search by title or content"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <Table
        data={(data?.posts || []).map((post) => ({ ...post }))}
        columns={columns}
        loading={isLoading}
        emptyMessage="No posts found."
      />

      <div className={styles.pagination}>
        <button
          className={`${styles.pageButton} ${page <= 1 ? styles.disabled : ""}`}
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        {renderPagination()}
        <button
          className={`${styles.pageButton} ${
            page >= totalPages ? styles.disabled : ""
          }`}
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {showDeleteModal && selectedPostId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Delete Post?</h3>
            <p>This action cannot be undone.</p>

            <div className={styles.modalActions}>
              <button
                className={styles.btnSecondary}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className={styles.btnDanger}
                onClick={() => {
                  deletePost.mutate(selectedPostId, {
                    onSuccess: () => {
                      setShowDeleteModal(false);
                      refetch();
                    },
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
