import Link from "next/link";
import "./globals.css";
import Header from "./components/Header/Header";
import YandexMetrika from "./components/YandexMetrika";

export const metadata = {
  title: "DezPro — профессиональная дезинфекция",
  description:
    "Услуги по дезинфекции, обработке помещений, борьбе с насекомыми и грызунами",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        {/* 🔹 Подключение шрифта Anton */}
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
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
