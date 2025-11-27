import React from "react";
import styles from "./content.module.css";

type ContentAreaProps = {
  children?: React.ReactNode;
};

const Content = ({ children }: ContentAreaProps) => {
  return <div className={styles.contentArea}>{children}</div>;
};

export default Content;
