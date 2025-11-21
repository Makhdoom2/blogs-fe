"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import styles from "./dashboardLayout.module.css";
import Content from "./content/Content";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar automatically when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={styles.dashboardWrapper}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className={styles.mainContent}>
        <Header toggleSidebar={toggleSidebar} />
        <div className={styles.contentArea}>
          <Content>{children}</Content>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
