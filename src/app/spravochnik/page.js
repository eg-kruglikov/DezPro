import Link from "next/link";
import diyArticles from "@/app/data/diyArticles";
import infoArticles from "@/app/data/infoArticles";
import { getFilledDiySectionPages } from "@/app/lib/diySections";
import styles from "./spravochnik.module.css";
import home from "../homepage.module.css";

export const metadata = {
  title: "Тематический справочник",
  description:
    "Отдельные материалы по дезинсекции, дезинфекции, дератизации и смежным темам — по разделам.",
  alternates: {
    canonical: "https://dezpro.online/spravochnik/",
  },
};

function excerpt(text, max = 118) {
  const line = text.split("\n").find((l) => l.trim().length > 0) || "";
  const t = line.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

export default function SpravochnikPage() {
  const pages = getFilledDiySectionPages(diyArticles);
  const byArticle = new Map();
  for (const p of pages) {
    if (!byArticle.has(p.articleSlug)) byArticle.set(p.articleSlug, []);
    byArticle.get(p.articleSlug).push(p);
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={home.h2}>Тематический справочник</h1>
        <p className={styles.lead}>
          Ниже — отдельные страницы по каждому разделу из наших материалов
          «своими руками»: так проще читать и делиться ссылкой на конкретную
          тему.
        </p>

        {infoArticles.length > 0 && (
          <section className={styles.group}>
            <h2 className={styles.groupTitle}>Информация о вредителях</h2>
            <div className={styles.grid}>
              {infoArticles.map((a) => (
                <Link
                  key={a.slug}
                  className={styles.card}
                  href={`/info/${a.slug}/`}
                >
                  <p className={styles.cardTitle}>{a.title}</p>
                  <p className={styles.cardHint}>{a.metaDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {diyArticles.map((article) => {
          const list = byArticle.get(article.slug);
          if (!list?.length) return null;
          return (
            <section key={article.slug} className={styles.group}>
              <h2 className={styles.groupTitle}>{article.title}</h2>
              <div className={styles.grid}>
                {list.map((item) => (
                  <Link
                    key={`${article.slug}-${item.sectionId}`}
                    className={styles.card}
                    href={`/spravochnik/${article.slug}/${item.sectionId}/`}
                  >
                    <p className={styles.cardTitle}>{item.heading}</p>
                    <p className={styles.cardHint}>{excerpt(item.text)}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
