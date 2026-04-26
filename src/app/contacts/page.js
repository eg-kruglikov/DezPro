import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import company from "../data/company";

export const metadata = {
  title: "Контакты — Москва и МО",
  description:
    "ООО «ДЕЗ ПРО» (DezPro): контакты, адрес в Ивантеевке, ИНН 0800024233. Дезинсекция, дезинфекция и дератизация по Москве и Московской области.",
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
          <strong>{company.shortLegalName}</strong> (бренд на сайте —{" "}
          {company.brand}). Работаем по Москве и Московской области, выезд в день
          обращения при возможности.
        </p>

        <h2 className={styles.subtitle}>Реквизиты</h2>
        <ul className={styles.list}>
          <li>Полное наименование: {company.fullLegalName}</li>
          <li>ИНН {company.inn}</li>
          <li>ОГРН {company.ogrn}</li>
          <li>Юридический адрес: {company.addressLegal}</li>
          <li>Адрес места осуществления деятельности: {company.addressActual}</li>
        </ul>

        <h2 className={styles.subtitle}>Связь</h2>
        <ul className={styles.list}>
          <li>
            Телефон:{" "}
            <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
          </li>
          <li>
            WhatsApp:{" "}
            <a href={`https://wa.me/${company.phoneTel.replace(/\D/g, "")}`}>
              написать
            </a>
          </li>
          <li>
            Telegram:{" "}
            <a href="https://t.me/+79969960982">написать</a>
          </li>
        </ul>

        <p className={styles.text}>
          Лицензия и выписка из реестра: раздел{" "}
          <a href="/sertifikaty/">«Сертификаты и документы»</a>.
        </p>
      </div>
    </main>
  );
}
