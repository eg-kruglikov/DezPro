import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

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
          <h1>DezPro — за чистоту и безопасность</h1>
          <p>
            Профессиональная дезинфекция и дезинсекция. Быстро, безопасно, с
            гарантией.
          </p>
          <div className={styles.buttons}>
            <a
              href="https://t.me/your_username"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              <img src="/telegram.svg" alt="Telegram" width="20" height="20" />
              <span>Написать в Telegram</span>
            </a>
            <a
              href="https://wa.me/79998887766"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              <img src="/whatsapp.svg" alt="WhatsApp" width="20" height="20" />
              <span>Написать в WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section className={styles.services}>
        <div className={styles.container}>
          <h2>Наши услуги</h2>
          <div className={styles.grid}>
            {[
              {
                title: "Дезинсекция",
                desc: "Избавление от насекомых: тараканы, клопы, муравьи.",
                img: "/services/cockroach.png",
                slug: "dezinkseciya",
              },
              {
                title: "Дезинфекция",
                desc: "Обработка от бактерий, вирусов, плесени.",
                img: "/services/disinfection.png",
                slug: "dezinfekciya",
              },
              {
                title: "Дератизация",
                desc: "Уничтожение крыс и мышей.",
                img: "/services/rat.png",
                slug: "deratizaciya",
              },
              {
                title: "Для организаций",
                desc: "Обработка офисов, кафе, гостиниц.",
                img: "/services/office.png",
                slug: "dlya-organizacij",
              },
              {
                title: "Уничтожение запахов",
                desc: "После пожара, затоплений, квартир.",
                img: "/services/smell.png",
                slug: "unichtozhenie-zapahov",
              },
              {
                title: "Прочие услуги",
                desc: "Обработка автомобилей, участков, акарицидная обработка.",
                img: "/services/car.png",
                slug: "prochie-uslugi",
              },
            ].map((service, i) => (
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
