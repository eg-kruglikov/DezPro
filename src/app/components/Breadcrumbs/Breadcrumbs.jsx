import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

const SITE_URL = "https://dezpro.online";

export default function Breadcrumbs({ items }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.label,
      item: `${SITE_URL}${it.href}`,
    })),
  };

  return (
    <>
      <nav className={styles.nav} aria-label="Хлебные крошки">
        <ol className={styles.list}>
          {items.map((it, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={`${it.href}-${idx}`} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {it.label}
                  </span>
                ) : (
                  <Link className={styles.link} href={it.href}>
                    {it.label}
                  </Link>
                )}
                {!isLast && <span className={styles.sep}>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

