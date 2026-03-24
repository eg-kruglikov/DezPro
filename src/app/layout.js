import "./globals.css";
import { Anton } from "next/font/google";
import Header from "./components/Header/Header";
import YandexMetrika from "./components/YandexMetrika";

const anton = Anton({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-anton",
});

export const metadata = {
  title: "DezPro",
  description: "DezPro",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://dezpro.online/",
  },
  verification: {
    yandex: "0d0d70e2020418fa",
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

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={anton.variable}>
      <head>
        <link rel="icon" type="image/png" sizes="any" href="/icon.png" />
      </head>
      <body>
        <Header />
        <main style={{ marginTop: "80px" }}>{children}</main>
        <YandexMetrika />
      </body>
    </html>
  );
}
