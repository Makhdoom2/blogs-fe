import React, { ReactNode } from "react";
import styles from "./publicLayout.module.css";
import Topbar from "./topbar/Topbar";
import Footer from "./footer/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Topbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
