// next.config.mjs
import createNextPWA from "next-pwa";

const withPWA = createNextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const config = {
  output: "standalone",
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
  },
  basePath: "",
  assetPrefix: "",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
  async redirects() {
    return [
      {
        source: "/robots.txt/",
        destination: "/robots.txt",
        permanent: true,
      },
      {
        source: "/sitemap.xml/",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/icon.png/",
        destination: "/icon.png",
        permanent: true,
      },
      {
        source: "/apple-icon.png/",
        destination: "/apple-icon.png",
        permanent: true,
      },
      {
        source: "/favicon.ico/",
        destination: "/favicon.ico",
        permanent: true,
      },
    ];
  },
};

export default withPWA(config);
