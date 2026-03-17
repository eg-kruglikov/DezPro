import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Сертификаты и документы | DezPro",
  description:
    "Документы и лицензии. DezPro работает по Москве и Московской области.",
  alternates: { canonical: "https://dezpro.online/sertifikaty/" },
};

export default function DocsPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/sertifikaty/", label: "Документы" },
          ]}
        />
        <h1 className={styles.title}>Сертификаты и документы</h1>
        <p className={styles.text}>
          Лицензия доступна для скачивания:{" "}
          <a href="/docs/license.pdf" target="_blank" rel="noopener noreferrer">
            license.pdf
          </a>
          .
        </p>
      </div>
    </main>
  );
}

