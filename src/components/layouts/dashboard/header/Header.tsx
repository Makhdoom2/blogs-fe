"use client";
import React from "react";
import styles from "./header.module.css";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Dashboard</div>

      <div className={styles.right}>
        <div
          className={styles.hamburger}
          onClick={toggleSidebar}
          role="button"
          tabIndex={0}
          aria-label="Toggle sidebar"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggleSidebar();
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={styles.profile}></div>
      </div>
    </header>
  );
};

export default Header;
