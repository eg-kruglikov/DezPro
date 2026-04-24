import "./globals.css";
import { Anton } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import YandexMetrika from "./components/YandexMetrika";
import StructuredData from "./components/StructuredData";
import company from "./data/company";

const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata = {
  title: {
    default: "DezPro — дезинсекция, дезинфекция, дератизация | Москва и МО",
    template: "%s | DezPro",
  },
  description:
    "ООО «ДЕЗ ПРО» (DezPro): лицензированная дезинсекция, дезинфекция и дератизация по Москве и Московской области. ИНН 0800024233.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://dezpro.online/",
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
    streetAddress:
      "Центральный проезд, д. 27, корп. 3, пом. 1.02",
    postalCode: "141282",
  },
  telephone: company.phoneTel,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={anton.variable}>
      <head>
        <meta name="yandex-verification" content="0d0d70e2020418fa" />
        <link rel="icon" type="image/png" sizes="any" href="/icon.png" />
        <StructuredData data={organizationJsonLd} />
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
