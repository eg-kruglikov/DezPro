import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Отзывы | DezPro — Москва и МО",
  description: "Отзывы клиентов DezPro.",
  alternates: { canonical: "https://dezpro.online/otzyvy/" },
};

export default function ReviewsPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/otzyvy/", label: "Отзывы" },
          ]}
        />
        <h1 className={styles.title}>Отзывы</h1>
        <p className={styles.text}>
          Раздел в разработке. Отзывы добавим после наполнения сайта.
        </p>
      </div>
    </main>
  );
}

