import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { servicesList } from "./data/services.js";

export const metadata = {
  title: "DezPro — профессиональная дезинфекция и дезинсекция в Москве и области",
  description:
    "Профессиональная дезинфекция, дезинсекция и дератизация в Москве и Московской области. Уничтожение насекомых, грызунов, вирусов и бактерий. Быстро, безопасно, с гарантией. Выезд в день обращения.",
  keywords:
    "дезинфекция Москва, дезинсекция Москва, дератизация Москва, уничтожение тараканов, уничтожение клопов, обработка от насекомых, дезинфекция квартир, дезинфекция офисов, служба дезинфекции",
  alternates: {
    canonical: "https://dezpro.online/",
  },
  openGraph: {
    title: "DezPro — профессиональная дезинфекция в Москве и области",
    description:
      "Профессиональная дезинфекция, дезинсекция и дератизация. Быстро, безопасно, с гарантией.",
    url: "https://dezpro.online",
    images: [
      {
        url: "https://dezpro.online/hero.webp",
        width: 1200,
        height: 630,
        alt: "DezPro — профессиональная дезинфекция",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <Image
          src="/hero.webp"
          alt="Профессиональная дезинфекция DezPro"
          fill
          priority
          quality={80}
          sizes="100vw"
          fetchPriority="high"
          style={{
            objectFit: "cover",
            objectPosition: "15% center",
          }}
          className={styles.bg}
        />
        <div className={styles.overlay} />
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
      <section id="services" className={styles.services}>
        <div className={styles.container}>
          <h2>Услуги и советы по самостоятельной обработке</h2>

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

      {/* Лицензии */}
      <section id="licenses" className={styles.licenses}>
        <div className={styles.container}>
          <h2>Лицензии и документы</h2>
          <p className={styles.subtitle}>
            Мы работаем легально и имеем все необходимые разрешения.
            Ознакомьтесь с нашей лицензией Роспотребнадзора.
          </p>
          <div className={styles.licenseBlock}>
            <Image
              src="/license-preview.webp"
              alt="Лицензия Роспотребнадзора"
              className={styles.licenseImage}
              width={300}
              height={400}
            />
            <div className={styles.buttons}>
              <a
                href="/docs/license.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                📄 Скачать лицензию (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
