/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://dezpro.online",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  exclude: ["/private/*"],

  transform: async (config, path) => {
    let priority = 0.7;

    if (path === "/") {
      priority = 1.0;
    } else if (path === "/about" || path === "/contacts") {
      priority = 0.8;
    } else if (path.startsWith("/services")) {
      priority = 0.7;
    }

    return {
      loc: path, // абсолютный URL будет подставлен автоматически
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
