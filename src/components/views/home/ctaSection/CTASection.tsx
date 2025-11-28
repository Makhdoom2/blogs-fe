import { useRouter } from "next/navigation";
import styles from "./cta.module.css";

export default function CTASection() {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/register");
  };

  return (
    <>
      <section id="community" className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.heading}>
            Join the <span>Community Today</span>
          </h2>
          <p className={styles.subHeading}>
            Start reading amazing content or publish your own stories with ease.
          </p>
          <button className="btn-primary" onClick={handleSignup}>
            Sign Up Now
          </button>
        </div>
      </section>
    </>
  );
}
