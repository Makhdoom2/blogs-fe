import { useEffect, useState } from "react";
import styles from "./hero.module.css";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleRead = () => {
    router.push("/posts");
  };

  const handlePublish = () => {
    router.push("/post/create");
  };

  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Discover Ideas. <span className="text-gradient">Share Stories.</span>
        </h1>

        <p className={styles.tagline}>
          A modern platform to read, write, and explore powerful content.
        </p>

        <div className={styles.actions}>
          <button className="btn-primary" onClick={handleRead}>
            Start Reading
          </button>

          {token ? (
            <button className={styles.secondaryButton} onClick={handlePublish}>
              Publish
            </button>
          ) : (
            <button className={styles.secondaryButton} onClick={handleLogin}>
              Login to Publish
            </button>
          )}
        </div>
      </div>

      <div className={styles.bgGlow}></div>
    </section>
  );
}
