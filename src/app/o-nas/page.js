import Link from "next/link";
import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import company from "../data/company";

export const metadata = {
  title: "О компании DezPro | ООО «ДЕЗ ПРО» — Москва и МО",
  description:
    "ООО «ДЕЗ ПРО» (бренд DezPro): лицензированная дезинсекция, дезинфекция и дератизация. ИНН 0800024233, ОГРН 1240800010472. Москва и Московская область.",
  alternates: { canonical: "https://dezpro.online/o-nas/" },
};

export default function AboutPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/o-nas/", label: "О нас" },
          ]}
        />
        <h1 className={styles.title}>О компании DezPro</h1>
        <p className={styles.text}>
          На сайте и в договоре мы выступаем как <strong>{company.shortLegalName}</strong>{" "}
          (бренд <strong>{company.brand}</strong>). Юридический адрес:{" "}
          {company.addressLegal}. Деятельность по обработке объектов ведётся с
          адреса в Московской области: {company.addressActual}.
        </p>
        <p className={styles.text}>
          Специализируемся на санитарной безопасности жилых и коммерческих объектов
          в Москве и Московской области: дезинсекция насекомых, дезинфекция и
          работы по плесени, дератизация грызунов, уничтожение запахов (включая
          озонирование и сухой туман по показаниям). Работаем на основании{" "}
          <Link href="/sertifikaty/">лицензии Роспотребнадзора</Link>.
        </p>
        <h2 className={styles.subtitle}>Как работаем</h2>
        <ul className={styles.list}>
          <li>Сначала уточняем задачу и объект, предлагаем метод и вилку по цене</li>
          <li>Заключаем договор, выезжаем в согласованное время</li>
          <li>Проводим обработку по регламенту и выдаём памятку по проветриванию</li>
          <li>При необходимости планируем контрольный визит или второй этап программы</li>
        </ul>
        <h2 className={styles.subtitle}>География</h2>
        <p className={styles.text}>
          Москва и города Московской области — отдельные страницы под выезд в
          регион: см. <Link href="/moskovskaya-oblast/">список городов</Link>.
        </p>
        <h2 className={styles.subtitle}>Документы</h2>
        <p className={styles.text}>
          Лицензия и сопутствующие материалы — в разделе{" "}
          <Link href="/sertifikaty/">сертификаты и документы</Link>. Для юрлиц —
          акты, договор, закрывающие по запросу.
        </p>
        <p className={styles.text}>
          <Link href="/contacts/">Контакты</Link> ·{" "}
          <Link href="/uslugi/">Услуги</Link> ·{" "}
          <a href="tel:+79969960982">+7 (996) 996-09-82</a>
        </p>
      </div>
    </main>
  );
}
