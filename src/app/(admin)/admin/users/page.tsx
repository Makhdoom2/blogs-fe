import AdminUsersPage from "@/components/views/users/AdminUsersPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Users",
};

const UserPage = () => {
  return <AdminUsersPage />;
};

export default UserPage;
