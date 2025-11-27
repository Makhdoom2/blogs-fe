"use client";
import BlogSlider from "@/components/common/blogSlider/BlogSlider";

import AboutSection from "@/components/views/home/about/AboutSection";
import CTASection from "@/components/views/home/ctaSection/CTASection";
import HeroSection from "@/components/views/home/hero/HeroSection";
import ProjectInfoSection from "@/components/views/home/projectInfoSection/ProjectInfoSection";
import TestimonialsSection from "@/components/views/home/testimonials/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BlogSlider />
      <TestimonialsSection />
      <CTASection />
      <ProjectInfoSection />
    </>
  );
}
