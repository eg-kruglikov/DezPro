import Link from "next/link";
import styles from "../info-page.module.css";
import infoArticles from "../data/infoArticles";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import StructuredData from "../components/StructuredData";
import { breadcrumbJsonLd } from "../lib/jsonld";

const SITE = "https://dezpro.online";

export const metadata = {
  title: "Информационные материалы — клопы, тараканы, грызуны",
  description:
    "Развёрнутые материалы DezPro: укусы клопов, как выглядят насекомые, при какой температуре погибают, опасны ли для человека. Полезное про дезинсекцию и дератизацию в Москве и МО.",
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
          Подробные материалы по самым частым вопросам: укусы клопов и комаров,
          как отличить вредителей, чем они опасны, что делать при заражении.
          Если нужна обработка — см. раздел{" "}
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
