import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Акции | DezPro — Москва и МО",
  description:
    "Акции и спецпредложения на услуги DezPro в Москве и Московской области.",
  alternates: { canonical: "https://dezpro.online/aktsii/" },
};

export default function DealsPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/aktsii/", label: "Акции" },
          ]}
        />
        <h1 className={styles.title}>Акции</h1>
        <p className={styles.text}>
          Здесь будут актуальные скидки и спецпредложения.
        </p>
      </div>
    </main>
  );
}

