import styles from "./formSide.module.css";

const FormSide = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.formSide}>
      <div className={styles.formBox}>{children}</div>
    </div>
  );
};

export default FormSide;
