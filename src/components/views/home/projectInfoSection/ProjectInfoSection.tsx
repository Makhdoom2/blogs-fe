import styles from "./projectInfo.module.css";

export default function ProjectInfoSection() {
  return (
    <section className={styles.projectInfoSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          About This <span className="text-gradient">Demo Project</span>
        </h2>

        <p className={styles.description}>
          This is a <strong>demo platform</strong> built to showcase my
          full-stack expertise. It uses a <strong>Next.js frontend</strong> with{" "}
          <strong>CSS Modules</strong>
          for styling and a <strong>NestJS backend</strong> for API handling.
          Key frontend features include <strong>Redux</strong> for state
          management,
          <strong>React Query</strong> for data fetching,{" "}
          <strong>React Hook Form</strong>
          for form handling, a <strong>Rich Text Editor</strong> for content
          creation, and <strong>App Routing</strong> with protected routes.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Tech Stack</h3>
            <ul>
              <li>Next.js (Frontend)</li>
              <li>CSS Modules</li>
              <li>Redux</li>
              <li>React Query</li>
              <li>React Hook Form</li>
              <li>Rich Text Editor</li>
              <li>NestJS (Backend)</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Users & Roles</h3>
            <ul>
              <li>Admin</li>
              <li>Regular User</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3>Features</h3>
            <ul>
              <li>Authentication & Authorization</li>
              <li>Route Guards / Protected Routes</li>
              <li>Responsive Design</li>
              <li>Clean UI with Gradient & Glow Effects</li>
            </ul>
          </div>
        </div>

        <p className={styles.note}>
          This project is purely a demo to showcase modern frontend & backend
          practices.
        </p>
      </div>
    </section>
  );
}
