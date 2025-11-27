"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import styles from "./protectedRoute.module.css";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}>Verifying...</div>
      </div>
    );
  }

  return <>{children}</>;
}
