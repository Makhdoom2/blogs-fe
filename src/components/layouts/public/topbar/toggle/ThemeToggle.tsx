"use client";

import { useTheme } from "next-themes";
import styles from "./themeToggle.module.css";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <span className={styles.slider}>
        <span className={styles.icon}>{theme === "light" ? "🌙" : "☀️"}</span>
      </span>
    </label>
  );
}
