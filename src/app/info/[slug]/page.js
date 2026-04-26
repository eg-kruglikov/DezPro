import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../info-page.module.css";
import infoArticles, { getInfoArticle } from "../../data/infoArticles";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import FAQ from "../../components/FAQ/FAQ";
import StructuredData from "../../components/StructuredData";
import { articleJsonLd, breadcrumbJsonLd } from "../../lib/jsonld";

const SITE = "https://dezpro.online";

export async function generateStaticParams() {
  return infoArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getInfoArticle(slug);
  if (!article) return {};

  const url = `${SITE}/info/${slug}/`;
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription,
      url,
      siteName: "DezPro",
      locale: "ru_RU",
      type: "article",
    },
  };
}

export default async function InfoArticlePage({ params }) {
  const { slug } = await params;
  const article = getInfoArticle(slug);
  if (!article) return notFound();

  const url = `${SITE}/info/${slug}/`;
  const articleLd = articleJsonLd({
    headline: article.title,
    description: article.metaDescription,
    url,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    type: "Article",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Главная", url: `${SITE}/` },
    { name: "Информация", url: `${SITE}/info/` },
    { name: article.title, url },
  ]);

  return (
    <main>
      <StructuredData data={[articleLd, breadcrumbLd]} />
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/info/", label: "Информация" },
            { href: `/info/${slug}/`, label: article.title },
          ]}
        />
        <h1 className={styles.title}>{article.title}</h1>

        {article.intro?.map((p, i) => (
          <p key={`intro-${i}`} className={styles.text}>
            {p}
          </p>
        ))}

        {article.sections?.map((sec) => (
          <section key={sec.heading}>
            <h2 className={styles.subtitle}>{sec.heading}</h2>
            {sec.body.map((line, i) => (
              <p key={`${sec.heading}-${i}`} className={styles.text}>
                {line}
              </p>
            ))}
          </section>
        ))}

        {article.relatedLinks?.length > 0 && (
          <>
            <h2 className={styles.subtitle}>Дальше по теме</h2>
            <ul className={styles.list}>
              {article.relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {article.ctaService && (
          <p className={styles.text} style={{ marginTop: "1.5rem" }}>
            <Link className={styles.btn} href={article.ctaService}>
              {article.ctaLabel || "Заказать обработку"}
            </Link>
          </p>
        )}

        {article.faq?.length > 0 && <FAQ items={article.faq} />}
      </div>
    </main>
  );
}
