import Image from "next/image";
import Link from "next/link";
import styles from "./homepage.module.css";
import services from "./data/services";
import pestsByService from "./data/pests";
import company from "./data/company";
import infoArticles from "./data/infoArticles";

export default function HomePage() {
  return (
    <main>
      <div className={styles.page}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.kicker}>
              <span className={styles.kickerDot} />
              Москва + Московская область · Выезд в день обращения
            </div>

            <h1 className={styles.h1}>
              Дезинфекция, дезинсекция и дератизация в Москве и МО — с гарантией
              по договору
            </h1>
            <p className={styles.lead}>
              Уничтожаем тараканов, клопов, муравьёв, грызунов, плесень и
              неприятные запахи. Подбираем метод под объект, работаем безопасно
              и даём рекомендации по профилактике.
            </p>

            <div className={styles.actions}>
              <Link className={styles.btnPrimary} href="/uslugi">
                Выбрать услугу
              </Link>
              <Link className={styles.btnGhost} href="/tseny">
                Узнать цены
              </Link>
              <a className={styles.btnGhost} href="tel:+79969960982">
                Позвонить: +7 (996) 996-09-82
              </a>
            </div>

            <div className={styles.trust}>
              <div className={styles.trustItem}>
                <p className={styles.trustTitle}>Безопасно</p>
                <p className={styles.trustText}>
                  Используем сертифицированные средства, работаем по регламенту.
                </p>
              </div>
              <div className={styles.trustItem}>
                <p className={styles.trustTitle}>Гарантия</p>
                <p className={styles.trustText}>
                  Фиксируем условия в договоре и контролируем результат.
                </p>
              </div>
              <div className={styles.trustItem}>
                <p className={styles.trustTitle}>Удобная навигация</p>
                <p className={styles.trustText}>
                  Отдельные страницы по услугам, городам области и типичным
                  задачам — без лишней воды, с нужными деталями.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Услуги</h2>
            <p className={styles.muted}>
              Дезинсекция, дезинфекция и остальные работы — у каждого направления
              свои страницы. Можно перейти сразу к вашей задаче (например, от
              клопов) или открыть раздел для города в Московской области.
            </p>

            <div className={styles.cards}>
              {services.map((s) => (
                <div key={s.slug} className={styles.card}>
                  <div className={styles.cardHead}>
                    <h3 className={styles.cardTitle}>{s.name}</h3>
                  </div>
                  <p className={styles.cardDesc}>{s.short}</p>
                  <Link className={styles.btnPrimary} href={`/uslugi/${s.slug}`}>
                    Открыть страницу услуги
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Популярные запросы</h2>
            <p className={styles.muted}>
              Частые темы по Москве и области: клопы, тараканы, муравьи и
              другие. На страницах — как работаем, как подготовить помещение и
              ответы на типичные вопросы.
            </p>

            <div className={styles.linksGrid}>
              {(pestsByService.dezinsekciya || []).slice(0, 10).map((p) => (
                <Link
                  key={p.slug}
                  className={styles.pill}
                  href={`/uslugi/dezinsekciya/${p.slug}/`}
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>География работ</h2>
            <div className={styles.split}>
              <div className={styles.box}>
                <p className={styles.muted} style={{ marginBottom: 10 }}>
                  В Москве работаем по всем округам — выезд в день обращения, у
                  каждой услуги свой раздел на сайте. По городам Московской
                  области тоже есть отдельные страницы — можно сразу открыть
                  информацию для вашего населённого пункта.
                </p>
                <div className={styles.actions} style={{ marginTop: 0 }}>
                  <Link
                    className={styles.btnPrimary}
                    href="/uslugi/dezinsekciya/moskva/"
                  >
                    Дезинсекция в Москве
                  </Link>
                  <Link className={styles.btnGhost} href="/moskovskaya-oblast">
                    Города Московской области
                  </Link>
                </div>
              </div>

              <div className={styles.box}>
                <p className={styles.trustTitle} style={{ margin: 0 }}>
                  Для организаций
                </p>
                <p className={styles.trustText} style={{ marginTop: 6 }}>
                  Договор, акты, удобный график. Подходит для офисов, кафе,
                  гостиниц и т.д.
                </p>
                <div style={{ marginTop: 10 }}>
                  <Link className={styles.btnGhost} href="/dlya-yuridicheskih-lic">
                    Юрлицам
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Как мы работаем</h2>
            <div className={styles.split}>
              <div className={styles.box}>
                <ol className={styles.steps}>
                  <li>Уточняем задачу и объект (квартира/дом/офис/участок)</li>
                  <li>Подбираем метод и согласовываем стоимость</li>
                  <li>Проводим обработку и даём рекомендации</li>
                  <li>Контролируем результат (при необходимости повтор)</li>
                </ol>
              </div>
              <div className={styles.box}>
                <p className={styles.trustTitle} style={{ margin: 0 }}>
                  Нужен расчёт?
                </p>
                <p className={styles.trustText} style={{ marginTop: 6 }}>
                  Оставь заявку или позвони — подскажем подготовку и цену.
                </p>
                <div className={styles.actions} style={{ marginTop: 10 }}>
                  <Link className={styles.btnPrimary} href="/contacts">
                    Контакты
                  </Link>
                  <a className={styles.btnGhost} href="tel:+79969960982">
                    Позвонить
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Полезное о вредителях</h2>
            <p className={styles.muted} style={{ marginBottom: 16 }}>
              Развёрнутые материалы по самым частым вопросам: как выглядят
              клопы, при какой температуре погибают, как избавиться от
              тараканов, признаки заражения и сравнение средств.
            </p>
            <div className={styles.split}>
              {infoArticles.slice(0, 4).map((a) => (
                <div key={a.slug} className={styles.box}>
                  <p className={styles.trustTitle} style={{ margin: 0 }}>
                    <Link href={`/info/${a.slug}/`}>{a.title}</Link>
                  </p>
                  <p
                    className={styles.trustText}
                    style={{ marginTop: 6 }}
                  >
                    {a.metaDescription}
                  </p>
                </div>
              ))}
            </div>
            <div className={styles.actions} style={{ marginTop: 16 }}>
              <Link className={styles.btnGhost} href="/info/">
                Все материалы
              </Link>
              <Link className={styles.btnGhost} href="/spravochnik/">
                Справочник своими руками
              </Link>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>FAQ</h2>
            <div className={styles.faq}>
              <div className={styles.faqItem}>
                <p className={styles.faqQ}>Сколько длится обработка?</p>
                <p className={styles.faqA}>
                  В среднем 15–40 минут, зависит от площади и задачи. После —
                  проветривание по инструкции.
                </p>
              </div>
              <div className={styles.faqItem}>
                <p className={styles.faqQ}>Это безопасно для людей и животных?</p>
                <p className={styles.faqA}>
                  Да, при соблюдении рекомендаций. Используем сертифицированные
                  средства и даём инструкцию по входу/уборке.
                </p>
              </div>
              <div className={styles.faqItem}>
                <p className={styles.faqQ}>Есть ли гарантия?</p>
                <p className={styles.faqA}>
                  Гарантия фиксируется по договору и зависит от услуги и объекта.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Лицензия и документы</h2>
            <div className={styles.license}>
              <Image
                className={styles.licenseImg}
                src="/license-preview.webp"
                alt="Лицензия (превью)"
                width={700}
                height={900}
              />
              <div className={styles.box}>
                <p className={styles.muted} style={{ marginBottom: 12 }}>
                  <strong>{company.shortLegalName}</strong> работает по лицензии
                  Роспотребнадзора № {company.license.number} (действующая, выписка от{" "}
                  {company.license.issued}). ИНН {company.inn}. Для организаций —
                  договор и закрывающие документы.
                </p>
                <div className={styles.actions} style={{ marginTop: 0 }}>
                  <a
                    className={styles.btnPrimary}
                    href={company.licensePdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Скачать лицензию (PDF)
                  </a>
                  <Link className={styles.btnGhost} href="/sertifikaty/">
                    Выписка и реквизиты
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <p className={styles.footerNote}>
            <Link href="/spravochnik/">Тематический справочник</Link> — короткие
            отдельные страницы по разделам, если удобнее читать не всю статью
            целиком.
          </p>
        </div>
      </div>
    </main>
  );
}
