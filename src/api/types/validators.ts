import { z } from "zod";

// Auth validators
export const RegisterSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
  role: z.enum(["user", "admin"]),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

// Post validators
export const CreatePostSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(3, "Title must be at least 3 characters"),
  contentHTML: z
    .string()
    .nonempty("Content is required")
    .min(15, "Content must be at least 15 characters"),
  imageUrl: z.string().optional(),
});

export const UpdatePostSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(3, "Title must be at least 3 characters"),
  contentHTML: z
    .string()
    .nonempty("Content is required")
    .min(15, "Content must be at least 15 characters"),
  imageUrl: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type LoginFormData = z.infer<typeof LoginSchema>;
export type CreatePostFormData = z.infer<typeof CreatePostSchema>;
export type UpdatePostFormData = z.infer<typeof UpdatePostSchema>;
