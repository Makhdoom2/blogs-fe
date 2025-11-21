import styles from "./about.module.css";

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          About <span className="text-gradient">Our Platform</span>
        </h2>

        <p className={styles.description}>
          We created this platform to empower writers, creators, and thinkers.
          Whether you're here to read engaging stories or publish your own, our
          mission is to provide a smooth, elegant, and distraction-free
          experience.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>For Readers</h3>
            <p>
              Discover a world of ideas, stories, and insights from creators all
              around the globe.
            </p>
          </div>

          <div className={styles.card}>
            <h3>For Writers</h3>
            <p>
              Share your knowledge and experiences with a beautiful, modern
              writing interface.
            </p>
          </div>

          <div className={styles.card}>
            <h3>For Everyone</h3>
            <p>
              Join a growing community built around creativity, learning, and
              meaningful conversations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
