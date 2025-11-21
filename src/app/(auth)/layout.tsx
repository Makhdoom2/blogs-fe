import AuthLayout from "@/components/layouts/auth/AuthLayout";
import React from "react";

interface AuthRootLayoutProps {
  children: React.ReactNode;
}

const AuthRootLayout: React.FC<AuthRootLayoutProps> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AuthRootLayout;
