import Link from "next/link";
import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import FAQ from "../components/FAQ/FAQ";
import company from "../data/company";

export const metadata = {
  title: "Дезинсекция и дезинфекция для юрлиц | ООО «ДЕЗ ПРО» (DezPro)",
  description:
    "ООО «ДЕЗ ПРО»: договор, акты, лицензия. ИНН 0800024233. Офисы, общепит, склады в Москве и Московской области.",
  alternates: { canonical: "https://dezpro.online/dlya-yuridicheskih-lic/" },
};

const bizFaq = [
  {
    question: "Какие документы выдаёте?",
    answer:
      "Договор, акт выполненных работ, по запросу — журналы учёта, копии сертификатов на применённые средства, рекомендации по регламенту Роспотребнадзора для вашей отрасли.",
  },
  {
    question: "Можно ли ночной выезд?",
    answer:
      "Да, для общепита и офисов согласуем окно так, чтобы не мешать работе. Стоимость считаем от площади и сложности доступа.",
  },
  {
    question: "Работаете ли по подписке?",
    answer:
      "Да — квартальный или годовой абонемент с фиксированным перечнем работ и количеством выездов. Альтернатива — разовые акты по заявкам.",
  },
];

export default function BusinessPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/dlya-yuridicheskih-lic/", label: "Для организаций" },
          ]}
        />
        <h1 className={styles.title}>Для юридических лиц</h1>
        <p className={styles.text}>
          Исполнитель по договору: <strong>{company.fullLegalName}</strong> (
          {company.brand}). ИНН {company.inn}, ОГРН {company.ogrn}. Лицензия и
          выписка: <Link href="/sertifikaty/">документы</Link>.
        </p>
        <p className={styles.text}>
          Обслуживаем офисы, точки общепита, гостиницы, склады и производственные
          зоны в Москве и Московской области. Готовим договор под ваш шаблон или
          используем стандарт DezPro — с приложением о гарантийных случаях и
          графике контрольных визитов.
        </p>
        <h2 className={styles.subtitle}>Что входит в типовой пакет</h2>
        <ul className={styles.list}>
          <li>Единый телефон/мессенджер для заявок на объекте</li>
          <li>Согласование СМР и времени доступа к зонам кухни, складу, мусорокам</li>
          <li>Акты и закрывающие в электронном виде</li>
          <li>Фотоотчёт по запросу</li>
        </ul>
        <h2 className={styles.subtitle}>Услуги</h2>
        <p className={styles.text}>
          Полный каталог: <Link href="/uslugi/">все услуги</Link>. Часто заказывают:{" "}
          <Link href="/uslugi/dezinsekciya/">дезинсекция</Link>,{" "}
          <Link href="/uslugi/dezinfekciya/">дезинфекция</Link>,{" "}
          <Link href="/uslugi/deratizaciya/">дератизация</Link>,{" "}
          <Link href="/uslugi/unichtozhenie-zapahov/">запахи и озонирование</Link>.
        </p>
        <p className={styles.text}>
          Полные реквизиты для счёта и актов — на странице{" "}
          <Link href="/contacts/">контакты</Link> или по запросу менеджеру.
        </p>
        <FAQ items={bizFaq} />
      </div>
    </main>
  );
}
