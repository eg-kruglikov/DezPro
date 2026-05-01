"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import styles from "./Header.module.css";
import company from "../../data/company";

const NAV = [
  { href: "/uslugi/", label: "Услуги" },
  { href: "/uslugi/dezinsekciya/moskva/", label: "Москва", highlight: true },
  { href: "/moskovskaya-oblast/", label: "МО" },
  { href: "/info/", label: "Информация" },
  { href: "/tseny/", label: "Цены" },
  { href: "/contacts/", label: "Контакты" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" aria-label="DezPro — на главную">
            <Image src="/logo.png" alt="DezPro" width={80} height={80} />
          </Link>
        </div>

        <nav className={styles.navDesktop} aria-label="Главное меню">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.highlight ? styles.moscow : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={`tel:${company.phoneTel}`}
          className={`${styles.phone} ${styles.phoneDesktop}`}
          aria-label={`Позвонить ${company.phoneDisplay}`}
        >
          <span className={styles.phoneIcon} aria-hidden="true">
            ☎
          </span>
          <span className={styles.phoneText}>{company.phoneDisplay}</span>
        </a>

        <div className={styles.mobileTools}>
          <button
            type="button"
            className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ""}`}
            aria-expanded={menuOpen}
            aria-controls="header-drawer"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={styles.menuIcon} aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
          <a
            href={`tel:${company.phoneTel}`}
            className={`${styles.phone} ${styles.phoneMobile}`}
            aria-label={`Позвонить ${company.phoneDisplay}`}
          >
            <span className={styles.phoneIcon} aria-hidden="true">
              ☎
            </span>
            <span className={styles.phoneText}>{company.phoneDisplay}</span>
          </a>
        </div>
      </div>

      <div
        id="header-drawer"
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Разделы</span>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={closeMenu}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>
        <nav className={styles.drawerNav} aria-label="Мобильное меню">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.highlight ? styles.drawerLinkHighlight : styles.drawerLink
              }
              onClick={closeMenu}
            >
              {item.highlight && (
                <span className={styles.drawerDot} aria-hidden />
              )}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Закрыть меню"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
