import Link from "next/link";
import styles from "../info-page.module.css";
import services from "../data/services";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Услуги DezPro — Москва и Московская область",
  description:
    "Каталог услуг: дезинсекция, дезинфекция, дератизация, обработка для организаций и устранение запахов. Москва и Московская область.",
  alternates: { canonical: "https://dezpro.online/uslugi/" },
};

export default function UslugiIndexPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/uslugi/", label: "Услуги" },
          ]}
        />
        <h1 className={styles.title}>Услуги</h1>
        <p className={styles.text}>
          Это основной каталог. Дальше каждая услуга разветвляется на страницы
          «по вредителю» (например,{" "}
          <Link href="/uslugi/dezinsekciya/ot-klopov/">от клопов</Link>) и «по
          городу МО» (например,{" "}
          <Link href="/uslugi/dezinsekciya/balashikha/">в Балашихе</Link>).
        </p>

        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s.slug} className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Link href={`/uslugi/${s.slug}`}>{s.name}</Link>
              </h2>
              <p className={styles.cardText}>{s.short}</p>
              <Link className={styles.btn} href={`/uslugi/${s.slug}`}>
                Открыть страницу услуги
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

