"use client";

import React from "react";
import styles from "./heading.module.css";

interface HeadingProps {
  as: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Heading = ({ as, children, variant = "primary" }: HeadingProps) => {
  const Component = as;

  return (
    <Component className={`${styles.heading} ${styles[variant]}`}>
      {children}
    </Component>
  );
};

export default Heading;
