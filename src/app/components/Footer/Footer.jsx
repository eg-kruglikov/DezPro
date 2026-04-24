import Link from "next/link";
import styles from "./Footer.module.css";
import company from "../../data/company";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.col}>
          <p className={styles.brand}>{company.brand}</p>
          <p className={styles.legal}>{company.shortLegalName}</p>
          <p className={styles.muted}>
            ИНН {company.inn} · ОГРН {company.ogrn}
          </p>
        </div>
        <div className={styles.col}>
          <p className={styles.label}>Место деятельности</p>
          <p className={styles.text}>{company.addressActual}</p>
        </div>
        <div className={styles.col}>
          <p className={styles.label}>Документы</p>
          <p className={styles.links}>
            <Link href="/sertifikaty/">Лицензия и выписка</Link>
            {" · "}
            <Link href="/contacts/">Контакты</Link>
            {" · "}
            <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
