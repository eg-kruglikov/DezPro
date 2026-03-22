const PLACEHOLDER =
  /будет добавлена позже|будет добавлен\b|информация.*будет добавлена/i;

export function isDiySectionFilled(text) {
  if (!text || typeof text !== "string") return false;
  const t = text.trim();
  if (t.length < 80) return false;
  if (PLACEHOLDER.test(t)) return false;
  return true;
}

/** Плоский список страниц: одна URL на каждую заполненную секцию. */
export function getFilledDiySectionPages(diyArticles) {
  const pages = [];
  for (const article of diyArticles) {
    for (const section of article.sections || []) {
      if (!isDiySectionFilled(section.text)) continue;
      pages.push({
        articleSlug: article.slug,
        sectionId: section.id,
        articleTitle: article.title,
        heading: section.heading,
        text: section.text,
        img: section.img,
        serviceLink: article.serviceLink,
      });
    }
  }
  return pages;
}

export function findDiySectionPage(diyArticles, articleSlug, sectionId) {
  const article = diyArticles.find((a) => a.slug === articleSlug);
  if (!article) return null;
  const section = (article.sections || []).find((s) => s.id === sectionId);
  if (!section || !isDiySectionFilled(section.text)) return null;
  return { article, section };
}
