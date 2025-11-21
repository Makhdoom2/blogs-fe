import PublicLayout from "@/components/layouts/public/PublicLayout";
import React from "react";

interface PublicRootLayoutProps {
  children: React.ReactNode;
}

const PublicRootLayout: React.FC<PublicRootLayoutProps> = ({ children }) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default PublicRootLayout;
