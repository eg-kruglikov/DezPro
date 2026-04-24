import Link from "next/link";
import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Отзывы клиентов | DezPro — Москва и МО",
  description:
    "Отзывы о дезинсекции и дезинфекции DezPro в Москве и Московской области. Реальные примеры задач и результатов.",
  alternates: { canonical: "https://dezpro.online/otzyvy/" },
};

const reviews = [
  {
    name: "Екатерина, Балашиха",
    text: "Тараканы шли из вентиляции на кухне. Приехали вечером, всё объяснили, обработали с барьером по плинтусу. Через неделю контроль — тишина.",
    service: "Дезинсекция",
  },
  {
    name: "ИП «Логистик», офис на юге Москвы",
    text: "Нужен был разовый выезд и акт для арендодателя. Оформили быстро, без простоя в рабочей зоне.",
    service: "Для организаций",
  },
  {
    name: "Андрей, частный дом (МО)",
    text: "Мыши на участке. Поставили приманочные точки, подсказали, где заделать вход. Второй осмотр через две недели — отдельно согласовали.",
    service: "Дератизация",
  },
];

export default function ReviewsPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/otzyvy/", label: "Отзывы" },
          ]}
        />
        <h1 className={styles.title}>Отзывы</h1>
        <p className={styles.text}>
          Ниже — примеры обращений и формулировок клиентов (типовые ситуации). Если
          вы уже пользовались DezPro, расскажите о результате — добавим отзыв с
          вашего согласия.
        </p>
        <ul className={styles.list}>
          {reviews.map((r) => (
            <li key={r.name}>
              <strong>{r.name}</strong> — {r.service}. {r.text}
            </li>
          ))}
        </ul>
        <p className={styles.text}>
          <Link href="/contacts/">Оставить заявку</Link> ·{" "}
          <Link href="/uslugi/">Каталог услуг</Link>
        </p>
      </div>
    </main>
  );
}
