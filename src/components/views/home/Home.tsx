"use client";
import BlogSlider from "@/components/common/blogSlider/BlogSlider";

import AboutSection from "@/components/views/home/about/AboutSection";
import CTASection from "@/components/views/home/ctaSection/CTASection";
import HeroSection from "@/components/views/home/hero/HeroSection";
import ProjectInfoSection from "@/components/views/home/projectInfoSection/ProjectInfoSection";
import TestimonialsSection from "@/components/views/home/testimonials/TestimonialsSection";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <HeroSection />
      <AboutSection />
      <BlogSlider />
      <TestimonialsSection />
      <CTASection />
      <ProjectInfoSection />
    </div>
  );
}
