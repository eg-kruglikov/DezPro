import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Контакты — DezPro | Дезинфекция в Москве и области",
  description:
    "Свяжитесь с DezPro: телефон +7 (996) 996-09-82. Адрес: г. Ивантеевка, Московская область. Выезд в день обращения по Москве и области.",
  keywords:
    "контакты DezPro, телефон службы дезинфекции, адрес дезинфекции Москва, дезинфекция Ивантеевка",
  alternates: {
    canonical: "https://dezpro.online/contacts/",
  },
  openGraph: {
    title: "Контакты — DezPro",
    description: "Свяжитесь с DezPro для заказа услуг дезинфекции в Москве и области",
    url: "https://dezpro.online/contacts",
  },
};

export default function ContactsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>На страже вашей безопасности</h1>
            <p className={styles.heroSubtitle}>
              DezPro — ваш надежный защитник
            </p>
            <p className={styles.heroDescription}>
              Профессиональные специалисты готовы прийти на помощь в любое
              время. Мы обеспечиваем полную защиту от вредителей и инфекций с
              использованием современного оборудования и проверенных методов.
            </p>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/images/specialist-hero.webp"
              alt="Специалист DezPro в защитном костюме"
              width={400}
              height={500}
              className={styles.specialistImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section className={styles.contactsSection}>
        <div className={styles.contactsContainer}>
          <h2 className={styles.contactsTitle}>Контакты</h2>

          <div className={styles.contactInfo}>
            <p>
              Телефон: <a href="tel:+79969960982">+7 (996) 996-09-82</a>
            </p>

            <p>
              Адрес: 141282, Московская область, г. Ивантеевка, проезд
              Центральный, дом 27, корпус 3, помещение №1.02.
            </p>
            <p>Пишите нам в Telegram или WhatsApp для быстрой связи.</p>
          </div>

          <div className={styles.contactButtons}>
            <a
              href={
                "https://wa.me/79969960982?text=" +
                encodeURIComponent(
                  "Здравствуйте! Хочу получить консультацию по услугам DezPro."
                )
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className={styles.whatsappButton}
            >
              <Image
                src="/whatsapp.svg"
                alt="WhatsApp"
                width={20}
                height={20}
              />
              <span>Написать в WhatsApp</span>
            </a>

            <a
              href={
                "https://t.me/+79969960982" +
                "?text=" +
                encodeURIComponent(
                  "Здравствуйте! Хочу получить консультацию по услугам DezPro."
                )
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в Telegram"
              className={styles.telegramButton}
            >
              <Image
                src="/telegram.svg"
                alt="Telegram"
                width={20}
                height={20}
              />
              <span>Написать в Telegram</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
