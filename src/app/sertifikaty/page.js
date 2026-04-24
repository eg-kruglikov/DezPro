import Image from "next/image";
import Link from "next/link";
import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import company from "../data/company";

export const metadata = {
  title: "Лицензия и документы | ООО «ДЕЗ ПРО» (DezPro)",
  description:
    "Лицензия Роспотребнадзора: дезинсекция, дезинфекция, дератизация. ООО «ДЕЗ ПРО», ИНН 0800024233. Выписка из реестра лицензий.",
  alternates: { canonical: "https://dezpro.online/sertifikaty/" },
};

export default function DocsPage() {
  const L = company.license;
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/sertifikaty/", label: "Документы" },
          ]}
        />
        <h1 className={styles.title}>Лицензия и документы</h1>
        <p className={styles.text}>
          <strong>{company.shortLegalName}</strong> осуществляет деятельность на
          основании <strong>лицензии</strong>, выданной {L.authority}. Статус
          лицензии в реестре: <strong>{L.status}</strong>.
        </p>

        <h2 className={styles.subtitle}>Реквизиты лицензии</h2>
        <ul className={styles.list}>
          <li>Номер лицензии: {L.number}</li>
          <li>Номер в ЕРУЛ: {L.erul}</li>
          <li>Дата предоставления сведений в реестр (выписка): {L.issued}</li>
          <li>ИНН: {company.inn}</li>
          <li>ОГРН: {company.ogrn}</li>
        </ul>

        <h2 className={styles.subtitle}>Лицензируемые работы</h2>
        <ul className={styles.list}>
          {L.registryLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className={styles.text}>{L.activities[0]}</p>

        <h2 className={styles.subtitle}>Выписка из реестра лицензий</h2>
        <p className={styles.text}>
          Ниже — скан выписки. Дополнительно можно открыть PDF, если он размещён
          на сайте:
        </p>
        <p className={styles.text}>
          <a href={company.licensePdfPath} target="_blank" rel="noopener noreferrer">
            Скачать license.pdf
          </a>
        </p>
        <div style={{ position: "relative", maxWidth: 900, marginTop: 16 }}>
          <Image
            src={company.licenseImagePath}
            alt={`Выписка из реестра лицензий ${company.shortLegalName}, лицензия ${L.number}`}
            width={1200}
            height={1700}
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
            sizes="(max-width: 900px) 100vw, 900px"
            priority
          />
        </div>

        <h2 className={styles.subtitle}>Препараты и СИЗ</h2>
        <p className={styles.text}>
          Используем средства, зарегистрированные для применения в РФ. По запросу
          предоставляем копии сертификатов и паспортов безопасности на конкретные
          препараты и СИЗ, применённые на вашем объекте.
        </p>

        <h2 className={styles.subtitle}>Договор и акты</h2>
        <ul className={styles.list}>
          <li>Договор и акт выполненных работ (физлица и юрлица)</li>
          <li>Рекомендации по проветриванию и уборке после обработки</li>
          <li>Журналы учёта для организаций — по шаблону заказчика</li>
        </ul>
        <p className={styles.text}>
          Для юрлиц: <Link href="/dlya-yuridicheskih-lic/">раздел для организаций</Link>
          . Контакты: <Link href="/contacts/">связаться</Link>.
        </p>
      </div>
    </main>
  );
}
