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
          <p className={styles.label} style={{ marginTop: "0.75rem" }}>
            Режим работы
          </p>
          <p className={styles.text}>{company.openingHoursDisplay}</p>
        </div>
        <div className={styles.col}>
          <p className={styles.label}>Документы</p>
          <p className={styles.links}>
            <Link href="/sertifikaty/">Лицензия и выписка</Link>
            {" · "}
            <Link href="/contacts/">Контакты</Link>
          </p>
          <p className={styles.label} style={{ marginTop: "0.75rem" }}>
            Полезное
          </p>
          <p className={styles.links}>
            <Link href="/info/">Информация</Link>
            {" · "}
            <Link href="/spravochnik/">Справочник</Link>
            {" · "}
            <Link href="/tseny/">Цены</Link>
          </p>
          <p className={styles.label} style={{ marginTop: "0.75rem" }}>
            Связаться
          </p>
          <p className={styles.links}>
            <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
