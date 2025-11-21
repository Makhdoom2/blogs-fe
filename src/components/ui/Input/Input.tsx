"use client";

import { ChangeEventHandler } from "react";
import styles from "./input.module.css";

interface InputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: "text" | "email" | "password" | "number";
}

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
