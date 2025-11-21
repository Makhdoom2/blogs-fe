import BrandSide from "./brandSide/BrandSide";
import FormSide from "./formSide/FormSide";

import styles from "./authLayout.module.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      <BrandSide />
      <FormSide>{children}</FormSide>
    </div>
  );
};

export default AuthLayout;
