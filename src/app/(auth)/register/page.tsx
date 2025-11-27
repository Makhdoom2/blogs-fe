import Register from "@/components/views/auth/Register";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return <Register />;
}
