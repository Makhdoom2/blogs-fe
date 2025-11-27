import Home from "@/components/views/home/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};
export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
