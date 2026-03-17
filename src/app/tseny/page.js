import Link from "next/link";
import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Цены | DezPro — Москва и МО",
  description:
    "Цены на дезинсекцию, дезинфекцию и дератизацию в Москве и Московской области. Ориентировочный прайс, выезд в день обращения.",
  alternates: { canonical: "https://dezpro.online/tseny/" },
};

export default function PricesPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/tseny/", label: "Цены" },
          ]}
        />
        <h1 className={styles.title}>Цены</h1>
        <p className={styles.text}>
          Ниже — ориентировочная стоимость. Точную сумму назовём после уточнения
          объекта и задачи.
        </p>

        <h2 className={styles.subtitle}>Дезинсекция</h2>
        <ul className={styles.list}>
          <li>1-комнатная квартира — от 2 500 ₽</li>
          <li>2-комнатная квартира — от 3 000 ₽</li>
          <li>3-комнатная квартира — от 3 500 ₽</li>
        </ul>

        <h2 className={styles.subtitle}>Дезинфекция</h2>
        <ul className={styles.list}>
          <li>Квартира — от 2 000 ₽</li>
          <li>Офис — от 2 500 ₽</li>
        </ul>

        <h2 className={styles.subtitle}>Дератизация</h2>
        <ul className={styles.list}>
          <li>Квартира — от 3 000 ₽</li>
          <li>Дом — от 4 500 ₽</li>
        </ul>

        <p className={styles.text}>
          <Link href="/contacts">Связаться</Link> для расчёта.
        </p>
      </div>
    </main>
  );
}

