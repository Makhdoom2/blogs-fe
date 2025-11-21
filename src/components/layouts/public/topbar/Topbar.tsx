"use client";

import React, { useState } from "react";
import styles from "./topbar.module.css";
import ThemeToggle from "./toggle/ThemeToggle";

const Topbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.topbar}>
        <div className={styles.logo}>Notena</div>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <ThemeToggle />
        </nav>

        {/* Hamburger */}
        <div
          className={`${styles.hamburger} ${open ? styles.active : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Aurora Accent Line */}
        <div className={styles.accent}></div>
      </header>

      {/* Mobile Menu outside header */}
      <div className={`${styles.mobileNav} ${open ? styles.show : ""}`}>
        <a href="#" onClick={() => setOpen(false)}>
          Home
        </a>
        <a href="#" onClick={() => setOpen(false)}>
          About
        </a>
        <a href="#" onClick={() => setOpen(false)}>
          Contact
        </a>
        <ThemeToggle />
      </div>
    </>
  );
};

export default Topbar;
