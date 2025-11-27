"use client";

import styles from "./postDetailSkeleton.module.css";

export default function PostDetailSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonBackButton}></div>

      <div className={styles.skeletonImage}></div>

      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonAuthor}></div>

      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonTextShort}></div>
    </div>
  );
}
