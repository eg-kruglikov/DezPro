import "./globals.css";
import { Anton, Manrope } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import YandexMetrika from "./components/YandexMetrika";
import StructuredData from "./components/StructuredData";
import company from "./data/company";
import { localBusinessJsonLd } from "./lib/jsonld";

const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-anton",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

const SITE_URL = "https://dezpro.online";
const DEFAULT_TITLE =
  "DezPro — дезинсекция, дезинфекция, дератизация | Москва и МО";
const DEFAULT_DESCRIPTION =
  "ООО «ДЕЗ ПРО» (DezPro): лицензированная дезинсекция, дезинфекция и дератизация по Москве и Московской области. ИНН 0800024233.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | DezPro",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "DezPro",
  authors: [{ name: company.shortLegalName, url: SITE_URL }],
  keywords: [
    "дезинсекция",
    "дезинфекция",
    "дератизация",
    "Москва",
    "Московская область",
    "лицензия Роспотребнадзора",
    "DezPro",
  ],
  icons: {
    icon: [{ url: "/icon.png", sizes: "any", type: "image/png" }],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "DezPro",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "DezPro — Дезинсекция, дезинфекция, дератизация",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.shortLegalName,
  legalName: company.fullLegalName,
  url: company.site,
  taxID: company.inn,
  identifier: [
    {
      "@type": "PropertyValue",
      propertyID: "OGRN",
      value: company.ogrn,
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Московская область",
    addressLocality: "Ивантеевка",
    streetAddress: "Центральный проезд, д. 27, корп. 3, пом. 1.02",
    postalCode: "141282",
  },
  telephone: company.phoneTel,
  logo: `${SITE_URL}/logo.png`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: company.brand,
  inLanguage: "ru-RU",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      className={`${anton.variable} ${manrope.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta name="yandex-verification" content="0d0d70e2020418fa" />
        <link rel="icon" type="image/png" sizes="any" href="/icon.png" />
        <StructuredData
          data={[organizationJsonLd, websiteJsonLd, localBusinessJsonLd()]}
        />
      </head>
      <body>
        <Header />
        <main style={{ marginTop: "80px" }}>{children}</main>
        <Footer />
        <YandexMetrika />
      </body>
    </html>
  );
}
