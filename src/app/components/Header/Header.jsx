import Link from "next/link";
import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="DezPro" width={80} height={80} />
        </div>
        <nav className={styles.nav}>
          <Link href="/">Главная</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>
      </div>
    </header>
  );
}
