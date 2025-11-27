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
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Login: React.FC = () => {
  const router = useRouter();

  const auth = useSelector((state: RootState) => state.auth);

  // redirect logged in
  useEffect(() => {
    if (auth.token) {
      auth?.user?.role === "admin"
        ? router.push("/admin/users")
        : router.push("/home");
    }
  }, [auth.user, router]);

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

        <Button
          type="submit"
          variant="primary"
          isWidthFull
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className={styles.extraOptions}>
        <p>
          Don't have an account?{" "}
          <span onClick={() => router.push("/register")}>Create one</span>
        </p>

        <p className={styles.exploreMore}>
          or <span onClick={() => router.push("/home")}>Explore More →</span>
        </p>
      </div>
    </>
  );
};

export default Login;
