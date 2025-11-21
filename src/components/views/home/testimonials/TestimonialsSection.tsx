import styles from "./testimonials.module.css";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Writer",
    message:
      "Publishing here has transformed the way I share my stories. So smooth and modern!",
  },
  {
    name: "Mark Smith",
    role: "Reader",
    message:
      "I find the most interesting content here every day. Highly recommended!",
  },
  {
    name: "Sophia Lee",
    role: "Writer",
    message:
      "The interface is beautiful and distraction-free. I love writing here!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          What People <span className="text-gradient">Say About Us</span>
        </h2>
        <p className={styles.subHeading}>
          Hear from our readers and writers about their experiences on the
          platform.
        </p>

        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <div key={index} className={styles.card}>
              <p className={styles.message}>"{t.message}"</p>
              <p className={styles.name}>{t.name}</p>
              <p className={styles.role}>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
