"use client";

import React, { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormData } from "@/api/types/validators";
import { useAuth } from "@/api/hooks/useAuth";

import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/button/Button";
import styles from "@/components/common/form/form.module.css";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      role === "admin" ? router.push("/admin/dashboard") : router.push("/home");
    }
  }, [router]);

  const { login: loginMutation, isLoading } = useAuth();

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <h2 className={styles.title}>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} type="email" placeholder="john@example.com" />
            )}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} type="password" placeholder="••••••••" />
            )}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" variant="primary" isWidthFull>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </>
  );
};

export default Login;
