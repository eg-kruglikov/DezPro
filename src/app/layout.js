import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "DezPro — профессиональная дезинфекция",
  description: "Услуги по дезинфекции, обработке помещений, борьбе с насекомыми и грызунами",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <header style={{ padding: "20px", background: "#f2cb05" }}>
          <nav style={{ display: "flex", gap: "20px" }}>
            <Link href="/">Главная</Link>
            <Link href="/contacts">Контакты</Link>
          </nav>
        </header>
        {children}
        <footer style={{ padding: "20px", marginTop: "40px", background: "#222", color: "#fff" }}>
          <p>© 2025 DezPro</p>
        </footer>
      </body>
    </html>
  );
}
