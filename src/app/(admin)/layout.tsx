import DashboardLayout from "@/components/layouts/dashboard/DashboardLayout";
import ProtectedRoute from "@/utils/protectedRoute/ProtectedRoute";
import React from "react";

interface AdminRootLayoutProps {
  children: React.ReactNode;
}

const AdminRootLayout: React.FC<AdminRootLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout>
      <ProtectedRoute>{children}</ProtectedRoute>
    </DashboardLayout>
  );
};

export default AdminRootLayout;
