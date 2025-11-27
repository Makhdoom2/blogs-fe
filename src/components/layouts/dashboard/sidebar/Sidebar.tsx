"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.css";
import { menuItems } from "./navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store"; // adjust path
import { logout } from "@/store/slices/authSlice";
import { FiLogOut } from "react-icons/fi";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
    if (isMobile) onClose();
  };

  return (
    <>
      {/* overlay only visible on mobile */}
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
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`${styles.menuItem} ${
                  pathname === item.path ? styles.active : ""
                }`}
              >
                {item.label}
              </div>
            </Link>
          ))}

          {/*user Info + logout  */}
          {user && (
            <div className={styles.userSection}>
              <button className={styles.logoutButton} onClick={handleLogout}>
                <FiLogOut style={{ marginRight: "0.5rem" }} />
                Logout
              </button>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
