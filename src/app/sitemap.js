export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://dezpro.online";
  const now = new Date().toISOString();

  // eslint-disable-next-line global-require
  const services = require("./data/services").default;
  // eslint-disable-next-line global-require
  const cities = require("./data/cities").default;
  // eslint-disable-next-line global-require
  const pestsByService = require("./data/pests").default;

  const urls = [
    { path: "/", priority: 1.0 },
    { path: "/uslugi", priority: 0.8 },
    { path: "/tseny", priority: 0.8 },
    { path: "/aktsii", priority: 0.7 },
    { path: "/otzyvy", priority: 0.7 },
    { path: "/sertifikaty", priority: 0.7 },
    { path: "/o-nas", priority: 0.7 },
    { path: "/dlya-yuridicheskih-lic", priority: 0.7 },
    { path: "/moskovskaya-oblast", priority: 0.8 },
    { path: "/contacts", priority: 0.8 },
  ];

  for (const s of services) {
    urls.push({ path: `/uslugi/${s.slug}`, priority: 0.8 });

    for (const c of cities) {
      urls.push({ path: `/uslugi/${s.slug}/${c.slug}`, priority: 0.6 });
    }

    const pests = pestsByService[s.slug] || [];
    for (const p of pests) {
      urls.push({ path: `/uslugi/${s.slug}/${p.slug}`, priority: 0.7 });
    }
  }

  return urls.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority,
  }));
}

