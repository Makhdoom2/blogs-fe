import React from "react";
import styles from "./content.module.css";

type CardProps = {
  title: string;
  content: string | React.ReactNode;
};

export const Card = ({ title, content }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardContent}>{content}</div>
    </div>
  );
};

type ContentAreaProps = {
  children?: React.ReactNode;
};

const Content = ({ children }: ContentAreaProps) => {
  return <div className={styles.contentArea}>{children}</div>;
};

export default Content;
