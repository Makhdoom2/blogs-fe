"use client";

import { ChangeEventHandler } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./input.module.css";

interface InputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: "text" | "email" | "password" | "number";
  register?: UseFormRegisterReturn;
}

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  register,
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...register}
    />
  );
}
