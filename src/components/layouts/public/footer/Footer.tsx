"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Notena Accent */}
      <div className={styles.accent}></div>

      {/* Social Icons */}
      <div className={styles.socialRow}>
        <FaGithub
          className={styles.icon}
          onClick={() => window.open("https://github.com/", "_blank")}
        />
        <FaLinkedin
          className={styles.icon}
          onClick={() => window.open("https://www.linkedin.com", "_blank")}
        />
      </div>

      {/* Contact Actions */}
      <div className={styles.contactRow}>
        {/* WhatsApp */}
        <div
          className={styles.contactItem}
          onClick={() => window.open("https://wa.me/923000000000", "_blank")}
        >
          <MdPhone style={{ marginRight: 6 }} />
          +92 300 0000000
        </div>

        {/* Email */}
        <div
          className={styles.contactItem}
          onClick={() => (window.location.href = "mailto:example@email.com")}
        >
          <MdEmail style={{ marginRight: 6 }} />
          example@email.com
        </div>

        {/* Google Maps */}
        <div
          className={styles.contactItem}
          onClick={() =>
            window.open(
              "https://www.google.com/maps/search/?api=1&query=Islamabad+Pakistan",
              "_blank"
            )
          }
        >
          <MdLocationOn style={{ marginRight: 6 }} />
          Islamabad, Pakistan
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copy}>
        © {new Date().getFullYear()} Notena. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
