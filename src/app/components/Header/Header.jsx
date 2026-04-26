import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";
import company from "../../data/company";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" aria-label="DezPro — на главную">
            <Image src="/logo.png" alt="DezPro" width={80} height={80} />
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Главное меню">
          <Link href="/uslugi/">Услуги</Link>
          <Link href="/uslugi/dezinsekciya/moskva/" className={styles.moscow}>
            Москва
          </Link>
          <Link href="/moskovskaya-oblast/">МО</Link>
          <Link href="/tseny/">Цены</Link>
          <Link href="/contacts/">Контакты</Link>
        </nav>
        <a
          href={`tel:${company.phoneTel}`}
          className={styles.phone}
          aria-label={`Позвонить ${company.phoneDisplay}`}
        >
          <span className={styles.phoneIcon} aria-hidden="true">
            ☎
          </span>
          <span className={styles.phoneText}>{company.phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
}
