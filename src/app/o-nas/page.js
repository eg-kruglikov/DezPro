import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "О нас | DezPro",
  description: "О компании DezPro: Москва и Московская область.",
  alternates: { canonical: "https://dezpro.online/o-nas/" },
};

export default function AboutPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/o-nas/", label: "О нас" },
          ]}
        />
        <h1 className={styles.title}>О компании</h1>
        <p className={styles.text}>
          DezPro — сервис дезинсекции, дезинфекции и дератизации по Москве и
          Московской области. Сайт собираем с нуля под SEO: отдельные страницы
          под интенты, города и услуги.
        </p>
      </div>
    </main>
  );
}

