import styles from "./brandSide.module.css";

const BrandSide = () => {
  return (
    <div className={styles.brandSide}>
      <h1 className={styles.title}>Notena</h1>
      <p className={styles.subtitle}>Your space for thoughts and stories.</p>
    </div>
  );
};

export default BrandSide;
