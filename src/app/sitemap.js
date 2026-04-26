import diyArticles from "./data/diyArticles";
import infoArticles from "./data/infoArticles";
import { getFilledDiySectionPages } from "./lib/diySections";

export const dynamic = "force-static";

/**
 * Все URL отдаём с trailing slash — так настроен next.config (trailingSlash: true)
 * и canonical на страницах, чтобы избежать дублей в индексе.
 */
export default function sitemap() {
  const baseUrl = "https://dezpro.online";
  const now = new Date().toISOString();

  const services = require("./data/services").default;
  const cities = require("./data/cities").default;
  const pestsByService = require("./data/pests").default;
  const { getServiceExtras } = require("./data/serviceExtras");

  const urls = [
    { path: "/", priority: 1.0 },
    { path: "/uslugi/", priority: 0.8 },
    { path: "/tseny/", priority: 0.8 },
    { path: "/aktsii/", priority: 0.7 },
    { path: "/otzyvy/", priority: 0.7 },
    { path: "/sertifikaty/", priority: 0.7 },
    { path: "/o-nas/", priority: 0.7 },
    { path: "/dlya-yuridicheskih-lic/", priority: 0.7 },
    { path: "/moskovskaya-oblast/", priority: 0.8 },
    { path: "/contacts/", priority: 0.8 },
    { path: "/spravochnik/", priority: 0.5 },
    { path: "/info/", priority: 0.6 },
  ];

  for (const a of infoArticles) {
    urls.push({ path: `/info/${a.slug}/`, priority: 0.7 });
  }

  for (const a of diyArticles) {
    urls.push({ path: `/diy/${a.slug}/`, priority: 0.55 });
  }

  for (const p of getFilledDiySectionPages(diyArticles)) {
    urls.push({
      path: `/spravochnik/${p.articleSlug}/${p.sectionId}/`,
      priority: 0.4,
    });
  }

  for (const s of services) {
    urls.push({ path: `/uslugi/${s.slug}/`, priority: 0.85 });

    for (const c of cities) {
      const isMoscow = c.isMoscow === true;
      urls.push({
        path: `/uslugi/${s.slug}/${c.slug}/`,
        priority: isMoscow ? 0.85 : 0.6,
      });
    }

    const pests = pestsByService[s.slug] || [];
    for (const p of pests) {
      urls.push({ path: `/uslugi/${s.slug}/${p.slug}/`, priority: 0.7 });
    }

    for (const e of getServiceExtras(s.slug)) {
      urls.push({ path: `/uslugi/${s.slug}/${e.slug}/`, priority: 0.7 });
    }
  }

  return urls.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));
}
