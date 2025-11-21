"use client";

import styles from "./button.module.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  onClick,
  children,
  type = "button",
  variant = "primary",
  size = "md",
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
