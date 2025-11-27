"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import styles from "./protectedRoute.module.css";

interface TokenProtectedRouteProps {
  children: ReactNode;
}

export default function TokenProtectedRoute({
  children,
}: TokenProtectedRouteProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/home");
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
