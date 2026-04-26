import Link from "next/link";
import styles from "../info-page.module.css";
import cities from "../data/cities";
import services from "../data/services";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Московская область — города",
  description:
    "Города Московской области: отдельные SEO-страницы по услугам и выезду.",
  alternates: { canonical: "https://dezpro.online/moskovskaya-oblast/" },
};

export default function MoskovskayaOblastPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/moskovskaya-oblast/", label: "Московская область" },
          ]}
        />
        <h1 className={styles.title}>Московская область</h1>
        <p className={styles.text}>
          По каждому городу МО формируем отдельные посадочные под услуги. Это
          помогает покрывать запросы «дезинсекция в [город]» и т.п.
        </p>

        <h2 className={styles.subtitle}>Города</h2>
        <ul className={styles.list}>
          {cities
            .filter((c) => !c.isMoscow)
            .map((c) => (
              <li key={c.slug}>
                {c.name}:{" "}
                <Link href={`/uslugi/dezinsekciya/${c.slug}/`}>дезинсекция</Link>,{" "}
                <Link href={`/uslugi/dezinfekciya/${c.slug}/`}>дезинфекция</Link>,{" "}
                <Link href={`/uslugi/deratizaciya/${c.slug}/`}>дератизация</Link>
              </li>
            ))}
        </ul>

        <h2 className={styles.subtitle}>Услуги</h2>
        <ul className={styles.list}>
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/uslugi/${s.slug}`}>{s.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

