// next.config.mjs
import { createRequire } from "module";
import createNextPWA from "next-pwa";

const require = createRequire(import.meta.url);
/** Базовые правила Workbox из next-pwa (шрифты, картинки, общий NetworkFirst и т.д.) */
const nextPwaDefaultRuntimeCaching = require("next-pwa/cache.js");

/**
 * Чанки Next.js нельзя долго отдавать из StaleWhileRevalidate: после деплоя
 * старый JS + новый сервер дают "Failed to find Server Action".
 * Первое совпадение в runtimeCaching побеждает — эти правила идут перед дефолтными.
 */
const nextJsRuntimeCachingFirst = [
  {
    urlPattern: /\/_next\/static\/.*/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "next-static",
      networkTimeoutSeconds: 5,
      expiration: {
        maxEntries: 128,
        maxAgeSeconds: 60 * 60,
      },
    },
  },
  {
    urlPattern: /\/_next\/data\/.*/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "next-data-network-first",
      networkTimeoutSeconds: 5,
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 60 * 60,
      },
    },
  },
];

const withPWA = createNextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [...nextJsRuntimeCachingFirst, ...nextPwaDefaultRuntimeCaching],
});

const config = {
  output: "standalone",
  images: {
    unoptimized: true,
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
  },
  basePath: "",
  assetPrefix: "",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
  async headers() {
    return [
      {
        source: "/yandex_0d0d70e2020418fa.html",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/uslugi/dezinkseciya",
        destination: "/uslugi/dezinsekciya/",
        permanent: true,
      },
      {
        source: "/uslugi/dezinkseciya/",
        destination: "/uslugi/dezinsekciya/",
        permanent: true,
      },
      {
        source: "/uslugi/dezinkseciya/:path*",
        destination: "/uslugi/dezinsekciya/:path*",
        permanent: true,
      },
      {
        source: "/diy/dezinkseciya",
        destination: "/diy/dezinsekciya/",
        permanent: true,
      },
      {
        source: "/diy/dezinkseciya/",
        destination: "/diy/dezinsekciya/",
        permanent: true,
      },
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
      {
        source: "/yandex_0d0d70e2020418fa.html/",
        destination: "/yandex_0d0d70e2020418fa.html",
        permanent: true,
      },
    ];
  },
};

export default withPWA(config);
