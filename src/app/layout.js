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
