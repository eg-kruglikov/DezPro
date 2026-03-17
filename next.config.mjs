// next.config.mjs
import createNextPWA from "next-pwa";

const withPWA = createNextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const config = {
  output: "export",
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
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/uslugi",
        permanent: true,
      },
      {
        source: "/services/:path*",
        destination: "/uslugi/:path*",
        permanent: true,
      },
    ];
  },
};

export default withPWA(config);
