import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" aria-label="DezPro — на главную">
            <Image src="/logo.png" alt="DezPro" width={80} height={80} />
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/uslugi">Услуги</Link>
          <Link href="/tseny">Цены</Link>
          <Link href="/moskovskaya-oblast">Московская область</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>
      </div>
    </header>
  );
}
