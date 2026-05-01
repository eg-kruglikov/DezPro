import Link from "next/link";
import styles from "../info-page.module.css";
import infoArticles from "../data/infoArticles";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import StructuredData from "../components/StructuredData";
import { breadcrumbJsonLd } from "../lib/jsonld";

const SITE = "https://dezpro.online";

export const metadata = {
  title:
    "Информация о вредителях — клопы, тараканы, блохи, дезинсекция",
  description:
    "Материалы DezPro: укусы и признаки клопов, тараканы, блохи, кто кусает ночью, после обработки, размножение, как проходит дезинсекция. Москва и Московская область.",
  alternates: { canonical: `${SITE}/info/` },
};

export default function InfoIndexPage() {
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Главная", url: `${SITE}/` },
    { name: "Информация", url: `${SITE}/info/` },
  ]);

  return (
    <main>
      <StructuredData data={breadcrumbLd} />
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/info/", label: "Информация" },
          ]}
        />
        <h1 className={styles.title}>Информация о вредителях и обработке</h1>
        <p className={styles.text}>
          Статьи по клопам, тараканам, блохам и процедуре обработки: признаки,
          укусы, размножение, мифы («летают ли клопы»), что делать после
          дезинсекции. Если нужна обработка — разделы{" "}
          <Link href="/uslugi/">услуги</Link> и{" "}
          <Link href="/tseny/">цены</Link>.
        </p>

        <div className={styles.grid}>
          {infoArticles.map((a) => (
            <article key={a.slug} className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Link href={`/info/${a.slug}/`}>{a.title}</Link>
              </h2>
              <p className={styles.cardText}>{a.metaDescription}</p>
              <Link className={styles.btn} href={`/info/${a.slug}/`}>
                Читать
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
