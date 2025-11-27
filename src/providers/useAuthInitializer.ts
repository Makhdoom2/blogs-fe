"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

export function useAuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role: any = localStorage.getItem("role");
    const expiresAt = localStorage.getItem("expiresAt");
    const userId = localStorage.getItem("userId");

    if (token && role && expiresAt) {
      dispatch(
        setCredentials({
          token,
          user: { role, id: userId || "", name: "", email: "" },
          expiresAt: Number(expiresAt),
        })
      );
    }
  }, [dispatch]);
}
