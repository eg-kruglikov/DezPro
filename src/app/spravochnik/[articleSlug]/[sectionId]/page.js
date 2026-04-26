import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import diyArticles from "@/app/data/diyArticles";
import DiySectionText from "@/app/components/DiySectionText";
import StructuredData from "@/app/components/StructuredData";
import { articleJsonLd, breadcrumbJsonLd } from "@/app/lib/jsonld";
import {
  findDiySectionPage,
  getFilledDiySectionPages,
} from "@/app/lib/diySections";
import diyStyles from "@/app/diy/[slug]/page.module.css";
import styles from "../../spravochnik.module.css";

export async function generateStaticParams() {
  return getFilledDiySectionPages(diyArticles).map((p) => ({
    articleSlug: p.articleSlug,
    sectionId: p.sectionId,
  }));
}

export async function generateMetadata({ params }) {
  const { articleSlug, sectionId } = await params;
  const found = findDiySectionPage(diyArticles, articleSlug, sectionId);
  if (!found) {
    return { title: "Материал не найден" };
  }
  const { article, section } = found;
  const title = `${section.heading} | ${article.title}`;
  const description = `${section.heading}. Материал из справочника DezPro: ${article.title.toLowerCase()}.`;
  const url = `https://dezpro.online/spravochnik/${articleSlug}/${sectionId}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "DezPro",
      locale: "ru_RU",
      type: "article",
    },
  };
}

export default async function SpravochnikSectionPage({ params }) {
  const { articleSlug, sectionId } = await params;
  const found = findDiySectionPage(diyArticles, articleSlug, sectionId);
  if (!found) notFound();

  const { article, section } = found;

  const SITE = "https://dezpro.online";
  const url = `${SITE}/spravochnik/${articleSlug}/${sectionId}/`;
  const articleLd = articleJsonLd({
    headline: section.heading,
    description: `${section.heading}. Материал из справочника DezPro: ${article.title.toLowerCase()}.`,
    url,
    imageUrl: section.img ? `${SITE}${section.img}` : undefined,
    type: "Article",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Главная", url: `${SITE}/` },
    { name: "Справочник", url: `${SITE}/spravochnik/` },
    { name: article.title, url: `${SITE}/diy/${article.slug}/` },
    { name: section.heading, url },
  ]);

  return (
    <main className={diyStyles.articlePage}>
      <StructuredData data={[articleLd, breadcrumbLd]} />
      <div className={diyStyles.container}>
        <div className={styles.backRow}>
          <Link className={styles.backLink} href="/spravochnik/">
            ← К справочнику
          </Link>
        </div>
        <p className={styles.meta}>{article.title}</p>
        <h1 className={diyStyles.title}>{section.heading}</h1>
        <DiySectionText text={section.text} />
        {section.img ? (
          <Image
            src={section.img}
            alt={section.heading}
            className={diyStyles.image}
            width={600}
            height={400}
          />
        ) : null}
        <div className={styles.actions}>
          <Link className={styles.btnPrimary} href={article.serviceLink}>
            Заказать услугу
          </Link>
          <Link
            className={styles.btn}
            href={`/diy/${article.slug}/`}
          >
            Полная статья «своими руками»
          </Link>
        </div>
      </div>
    </main>
  );
}
