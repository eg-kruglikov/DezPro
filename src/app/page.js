import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { servicesList } from "./data/services.js";

export const metadata = {
  title: "DezPro — профессиональная дезинфекция и дезинсекция",
  description:
    "Услуги по дезинфекции, дезинсекции, дератизации. Быстро, безопасно, с гарантией. Telegram и WhatsApp для заявок.",
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section
        className={styles.hero}
        style={{
          backgroundImage: `url(/hero.png)`,
          backgroundPosition: "15% center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.heroContent}>
          <h1>
            <span className={styles.brand}>DezPro</span> — за чистоту и
            безопасность
          </h1>
          <p>
            Профессиональная дезинфекция и дезинсекция. Быстро, безопасно, с
            гарантией.
          </p>
        </div>
      </section>

      {/* Услуги */}
      <section className={styles.services}>
        <div className={styles.container}>
          <h2>Наши услуги</h2>
          <div className={styles.grid}>
            {servicesList.map((service, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardText}>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className={styles.btnSmall}
                  >
                    Подробнее
                  </Link>
                </div>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${service.img})` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
