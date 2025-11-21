"use client";
import BlogSlider from "@/components/common/blogSlider/BlogSlider";

import AboutSection from "@/components/views/home/about/AboutSection";
import CTASection from "@/components/views/home/ctaSection/CTASection";
import HeroSection from "@/components/views/home/hero/HeroSection";
import ProjectInfoSection from "@/components/views/home/projectInfoSection/ProjectInfoSection";
import TestimonialsSection from "@/components/views/home/testimonials/TestimonialsSection";

export default function Home() {
  const dummyPosts = [
    {
      _id: "1",
      title: "Exploring the New Features of Next.js 15",
      imageUrl: "https://via.placeholder.com/400x200?text=Next.js",
      authorName: "John Doe",
    },
    {
      _id: "2",
      title: "How to Build Scalable APIs with NestJS",
      imageUrl: "https://via.placeholder.com/400x200?text=NestJS",
      authorName: "Jane Smith",
    },
    {
      _id: "3",
      title: "Using React Query for Async State Management",
      imageUrl: "https://via.placeholder.com/400x200?text=React+Query",
      authorName: "Alice Johnson",
    },
    {
      _id: "4",
      title: "Mastering Redux Toolkit for Large Applications",
      imageUrl: "https://via.placeholder.com/400x200?text=Redux+Toolkit",
      authorName: "Bob Martin",
    },
    {
      _id: "5",
      title: "Creating Rich Text Editors with React Hook Form",
      imageUrl: "https://via.placeholder.com/400x200?text=Rich+Text+Editor",
      authorName: "Sara Lee",
    },
    {
      _id: "6",
      title: "Optimizing Frontend Performance in Next.js Apps",
      imageUrl: "", // will fallback to placeholder
      authorName: "Michael Brown",
    },
  ];

  return (
    <>
      <HeroSection />
      <AboutSection />
      <BlogSlider posts={dummyPosts} />
      <TestimonialsSection />
      <CTASection />
      <ProjectInfoSection />
    </>
  );
}
