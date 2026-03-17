import Link from "next/link";
import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Для организаций | DezPro — Москва и МО",
  description:
    "Обработка для организаций: договор, акт, удобный график. Москва и Московская область.",
  alternates: { canonical: "https://dezpro.online/dlya-yuridicheskih-lic/" },
};

export default function BusinessPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/dlya-yuridicheskih-lic/", label: "Для организаций" },
          ]}
        />
        <h1 className={styles.title}>Для организаций</h1>
        <p className={styles.text}>
          Для юрлиц: договор, акт выполненных работ, рекомендации по регламенту.
        </p>
        <p className={styles.text}>
          Каталог услуг: <Link href="/uslugi">/uslugi</Link>. Связь:{" "}
          <Link href="/contacts">контакты</Link>.
        </p>
      </div>
    </main>
  );
}

