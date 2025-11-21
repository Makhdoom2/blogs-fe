"use client";

import styles from "./checkbox.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.input}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
