
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "DezPro — профессиональная дезинфекция и дезинсекция",
  description: "Услуги по дезинфекции, дезинсекции, дератизации. Быстро, безопасно, с гарантией. Telegram и WhatsApp для заявок.",
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>DezPro — за чистоту и безопасность</h1>
          <p>Профессиональная дезинфекция и дезинсекция. Быстро, безопасно, с гарантией.</p>
          <div className={styles.buttons}>
            <a href="https://t.me/your_username" target="_blank" className={styles.btnPrimary}>
              Написать в Telegram
            </a>
            <a href="https://wa.me/79998887766" target="_blank" className={styles.btnSecondary}>
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section className={styles.services}>
        <h2>Наши услуги</h2>
        <div className={styles.grid}>
          {[
            { title: "Дезинсекция", desc: "Избавление от насекомых: тараканы, клопы, муравьи." },
            { title: "Дезинфекция", desc: "Обработка от бактерий, вирусов, плесени." },
            { title: "Дератизация", desc: "Уничтожение крыс и мышей." },
            { title: "Для организаций", desc: "Обработка офисов, кафе, гостиниц." },
            { title: "Уничтожение запахов", desc: "После пожара, затоплений, квартир." },
            { title: "Прочие услуги", desc: "Обработка автомобилей, участков, акарицидная обработка." },
          ].map((service, i) => (
            <div key={i} className={styles.card}>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>ф
              <Link href="/contacts" className={styles.btnSmall}>
                Подробнее
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
