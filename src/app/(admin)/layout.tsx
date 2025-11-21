import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import React from "react";

interface AdminRootLayoutProps {
  children: React.ReactNode;
}

const AdminRootLayout: React.FC<AdminRootLayoutProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default AdminRootLayout;
