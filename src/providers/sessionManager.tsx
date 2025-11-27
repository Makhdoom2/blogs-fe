"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toastSuccess } from "@/utils/toast/toast";

export default function SessionManager({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const expiresAt = useSelector((state: any) => state.auth.expiresAt);
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    // no session
    if (!token || !expiresAt) return;

    // timeleft
    const expireTimeMs = expiresAt * 1000 - Date.now();

    if (expireTimeMs <= 0) {
      // already expired
      dispatch(logout());
      toastSuccess("Session expired");
      router.push("/login");
      return;
    }

    //set auto-logout timer
    const timer = setTimeout(() => {
      dispatch(logout());
      toastSuccess("Session expired");
      router.push("/login");
    }, expireTimeMs);

    return () => clearTimeout(timer);
  }, [expiresAt, token, dispatch, router]);

  return <>{children}</>;
}
