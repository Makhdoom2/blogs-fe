"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.accent}></div>

      <div className={styles.socialRow}>
        <FaGithub
          className={styles.icon}
          onClick={() => window.open("https://github.com/Makhdoom2", "_blank")}
        />
        <FaLinkedin
          className={styles.icon}
          onClick={() =>
            window.open("https://www.linkedin.com/in/makhdoom-umbel/", "_blank")
          }
        />
      </div>

      <div className={styles.contactRow}>
        <div
          className={styles.contactItem}
          onClick={() => window.open("https://wa.me/923165679686", "_blank")}
        >
          <MdPhone />
          <span>+92 316 5679686</span>
        </div>

        <div
          className={styles.contactItem}
          onClick={() =>
            (window.location.href = "mailto:makhdoommuhammad1@gmail.com")
          }
        >
          <MdEmail />
          <span>makhdoommuhammad1@gmail.com</span>
        </div>

        <div
          className={styles.contactItem}
          onClick={() =>
            window.open(
              "https://www.google.com/maps/search/?api=1&query=Islamabad+Pakistan",
              "_blank"
            )
          }
        >
          <MdLocationOn />
          <span>Islamabad, Pakistan</span>
        </div>
      </div>

      <div className={styles.copy}>
        © {new Date().getFullYear()} Notena — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
