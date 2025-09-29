// src/app/diy/[slug]/page.js
import { notFound } from "next/navigation";
import diyArticles from "@/app/data/diyArticles";
import Link from "next/link";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return diyArticles.map((a) => ({
    slug: a.slug,
  }));
}

export default async function DiyArticle({ params }) {
  const slug = (await params).slug;
  const article = diyArticles.find((a) => a.slug === slug);

  if (!article) {
    return notFound();
  }

  return (
    <main className={styles.articlePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>{article.title}</h1>

        {article.sections.map((section, index) => (
          <section key={index} className={styles.section}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
            {section.img && (
              <img
                src={section.img}
                alt={section.heading}
                className={styles.image}
              />
            )}
          </section>
        ))}

        <div className={styles.ctaBlock}>
          <p>
            🚨 Но помните: даже самые лучшие домашние методы дают лишь временный
            результат. Для гарантии безопасности лучше доверить работу
            профессионалам.
          </p>
          <div className={styles.buttons}>
            <Link href={article.serviceLink} className={styles.backBtn}>
              ← Назад к услуге
            </Link>
            <Link href="/contacts" className={styles.ctaBtn}>
              Вызвать специалиста
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
