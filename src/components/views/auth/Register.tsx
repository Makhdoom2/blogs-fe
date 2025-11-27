"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterFormData } from "@/api/types/validators";
import { useAuth } from "@/api/hooks/useAuth";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/button/Button";
import styles from "@/components/common/form/form.module.css";
import { RegisterDto } from "@/api/types";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const { register: registerMutation, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    const payload: RegisterDto = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role ?? "user",
    };

    // console.log("Register payload:", payload);
    registerMutation.mutate(data);
  };

  return (
    <>
      <h2 className={styles.title}>Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="John Doe" />}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

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
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className={styles.extraOptions}>
        <p>
          Already have an account?{" "}
          <span onClick={() => router.push("/login")}>Login</span>
        </p>

        <p className={styles.exploreMore}>
          or <span onClick={() => router.push("/home")}>Explore more →</span>
        </p>
      </div>
    </>
  );
};

export default Register;
