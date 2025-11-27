"use client";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";
import ThemeToggle from "../../public/topbar/toggle/ThemeToggle";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  const pathname = usePathname();

  // map routes to readable titles
  const getTitle = () => {
    if (pathname === "/admin") return "Dashboard";
    if (pathname.startsWith("/admin/users")) return "Users";
    if (pathname.startsWith("/admin/posts")) return "Posts";

    return "/admin/users";
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>{getTitle()}</div>

      <div className={styles.right}>
        <ThemeToggle />
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

        {/* <div className={styles.profile}></div> */}
      </div>
    </header>
  );
};

export default Header;
