import "./globals.css";
import Header from "./components/Header/Header";
import YandexMetrika from "./components/YandexMetrika";
import StructuredData from "./components/StructuredData";

export const metadata = {
  title: "DezPro — профессиональная дезинфекция в Москве и области",
  description:
    "Профессиональная дезинфекция, дезинсекция и дератизация в Москве и Московской области. Быстро, безопасно, с гарантией. Выезд в день обращения.",
  keywords:
    "дезинфекция Москва, дезинсекция Москва, дератизация Москва, обработка от насекомых, уничтожение грызунов, дезинфекция квартир, дезинфекция офисов, служба дезинфекции",
  alternates: {
    canonical: "https://dezpro.online/",
  },
  openGraph: {
    title: "DezPro — профессиональная дезинфекция в Москве и области",
    description:
      "Профессиональная дезинфекция, дезинсекция и дератизация. Быстро, безопасно, с гарантией.",
    url: "https://dezpro.online",
    siteName: "DezPro",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://dezpro.online/hero.webp",
        width: 1200,
        height: 630,
        alt: "DezPro — профессиональная дезинфекция",
      },
    ],
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "DezPro",
  description:
    "Профессиональная дезинфекция, дезинсекция и дератизация в Москве и Московской области",
  url: "https://dezpro.online",
  telephone: "+79969960982",
  address: {
    "@type": "PostalAddress",
    streetAddress: "проезд Центральный, дом 27, корпус 3, помещение №1.02",
    addressLocality: "Ивантеевка",
    addressRegion: "Московская область",
    postalCode: "141282",
    addressCountry: "RU",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Москва",
    },
    {
      "@type": "State",
      name: "Московская область",
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "09:00",
    closes: "20:00",
  },
  sameAs: [
    "https://wa.me/79969960982",
    "https://t.me/+79969960982",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <StructuredData data={organizationSchema} />
      </head>
      <body>
        <Header />
        <main style={{ marginTop: "80px" }}>{children}</main>
        <footer
          style={{
            padding: "20px",
            marginTop: "40px",
            background: "#222",
            color: "#fff",
          }}
        >
          <p>© 2025 DezPro</p>
        </footer>

        <YandexMetrika />
      </body>
    </html>
  );
}
