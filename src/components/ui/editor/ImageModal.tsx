"use client";

import { useState } from "react";
import styles from "./imagemodal.module.css";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  onSubmit,
}: ImageModalProps) {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Insert Image</h3>
        <input
          type="text"
          placeholder="Enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.modalInput}
        />
        <div className={styles.modalButtons}>
          <button
            type="button"
            className={`${styles.modalButton} ${styles.cancelButton}`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.modalButton} ${styles.insertButton}`}
            onClick={() => {
              if (url.trim()) {
                onSubmit(url);
                setUrl("");
              }
            }}
          >
            Insert
          </button>
        </div>
      </div>
    </div>
  );
}
