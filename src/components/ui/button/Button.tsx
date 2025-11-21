"use client";

import styles from "./button.module.css";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isWidthFull?: boolean;
  isCenter?: boolean;
}

export default function Button({
  onClick,
  children,
  type = "button",
  variant = "primary",
  size = "md",
  isWidthFull = false,
  isCenter = false,
}: ButtonProps) {
  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
        ${isWidthFull ? styles.fullWidth : ""}
        ${isCenter ? styles.center : ""}
      `}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
