import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

export const metadata = {
  title: "Контакты | DezPro — Москва и МО",
  description:
    "Контакты DezPro. Работаем по Москве и Московской области. Связь: WhatsApp и Telegram.",
  alternates: { canonical: "https://dezpro.online/contacts/" },
};

export default function ContactsPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/contacts/", label: "Контакты" },
          ]}
        />
        <h1 className={styles.title}>Контакты</h1>
        <p className={styles.text}>
          Москва и Московская область. Выезд в день обращения.
        </p>
        <p className={styles.text}>
          Адрес: 141282, Московская область, г. Ивантеевка, проезд Центральный,
          дом 27, корпус 3, помещение №1.02.
        </p>
        <ul className={styles.list}>
          <li>
            Телефон: <a href="tel:+79969960982">+7 (996) 996-09-82</a>
          </li>
          <li>
            WhatsApp: <a href="https://wa.me/79969960982">написать</a>
          </li>
          <li>
            Telegram: <a href="https://t.me/+79969960982">написать</a>
          </li>
        </ul>
      </div>
    </main>
  );
}

