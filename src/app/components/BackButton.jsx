"use client";

import Link from "next/link";
import styles from "./BackButton.module.css";

export default function BackButton() {
  return (
    <Link href="/#services" className={styles.backButton}>
      ← К списку услуг
    </Link>
  );
}
