"use client";

import React, { useState } from "react";
import styles from "./topbar.module.css";
import ThemeToggle from "./toggle/ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";

const Topbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role;

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/home#about" },
    { name: "Community", path: "/home#community" },
  ];

  // dashboard admin
  if (role === "admin") {
    navItems.unshift({ name: "Dashboard", path: "/admin/users" });
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      <header className={styles.topbar}>
        <div
          className={styles.logo}
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        >
          Notena
        </div>

        {/* desktop Nav */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={pathname === item.path ? styles.activeLink : ""}
            >
              {item.name}
            </a>
          ))}

          <ThemeToggle />

          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span>{user.email}</span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        {/* hamburger */}
        <div
          className={`${styles.hamburger} ${open ? styles.active : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={styles.accent}></div>
      </header>

      {/* mobile Nav */}
      <div className={`${styles.mobileNav} ${open ? styles.show : ""}`}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            onClick={() => setOpen(false)}
            className={pathname === item.path ? styles.activeLink : ""}
          >
            {item.name}
          </a>
        ))}
        <ThemeToggle />

        {user && (
          <button
            onClick={handleLogout}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              background: "var(--color-primary)",
              color: "#fff",
              fontWeight: 500,
              width: "100%",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Topbar;
