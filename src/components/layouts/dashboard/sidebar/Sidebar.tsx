"use client";
import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect if current screen is mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Overlay only visible on mobile */}
      {isMobile && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.visible : ""}`}
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`${styles.sidebar} ${
          isMobile && !isOpen ? styles.mobileHidden : ""
        }`}
      >
        <div className={styles.logo}>Notena</div>

        <nav className={styles.menu}>
          <div className={`${styles.menuItem} active`}>Dashboard</div>
          <div className={styles.menuItem}>Analytics</div>
          <div className={styles.menuItem}>Users</div>
          <div className={styles.menuItem}>Settings</div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
