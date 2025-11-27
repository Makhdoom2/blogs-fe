"use client";
import styles from "./postSkeleton.module.css";

interface PostsSkeletonProps {
  view: "grid" | "list";
  count?: number;
}

export default function PostsSkeleton({ view, count = 6 }: PostsSkeletonProps) {
  return (
    <div className={view === "grid" ? styles.grid : styles.list}>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className={styles.skeletonCard}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonAuthor}></div>
            </div>
          </div>
        ))}
    </div>
  );
}
