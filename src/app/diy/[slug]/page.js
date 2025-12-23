// src/app/diy/[slug]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import diyArticles from "@/app/data/diyArticles";
import Link from "next/link";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return diyArticles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const article = diyArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Статья не найдена | DezPro",
      description: "Запрашиваемая статья не найдена",
    };
  }

  const url = `https://dezpro.online/diy/${slug}/`;

  // Уникальные заголовки для каждой статьи (оптимизированы для SEO)
  const titles = {
    dezinkseciya:
      "Дезинсекция своими руками: тараканы, клопы, муравьи, блохи, клещи, осы, комары | DezPro",
    dezinfekciya: "Как провести дезинфекцию помещения своими руками | DezPro",
    deratizaciya:
      "Как избавиться от крыс и мышей самому: все методы борьбы с грызунами | DezPro",
    "dlya-organizacij":
      "Дезинфекция и дезинсекция в офисе своими силами | DezPro",
    "unichtozhenie-zapahov":
      "Как убрать неприятный запах в квартире самому | DezPro",
    "prochie-uslugi": "Обработка автомобиля и участка своими руками | DezPro",
  };

  // Уникальные описания для каждой статьи
  const descriptions = {
    dezinkseciya:
      "Пошаговые инструкции по уничтожению тараканов, клопов, муравьев, блох, клещей, ос, комаров, мух, моли, пауков, сколопендр и других насекомых своими руками. Эффективные методы, народные средства и меры безопасности от профессионалов DezPro.",
    dezinfekciya:
      "Как провести дезинфекцию помещения своими руками. Выбор средств, подготовка, техника безопасности. Когда нужна профессиональная помощь.",
    deratizaciya:
      "Полное руководство по борьбе с крысами и мышами своими руками: отличия крыс от мышей, механические ловушки, клеевые ловушки, народные методы (мята, дёготь, опалённые шкурки), яды и приманки (парафиновые брикеты, зерно, тестово-сырные брикеты), борьба с полевками на огородах, защита дома от грызунов, методы для курятников и полей. Как определить заражение, выбрать метод и когда вызывать специалистов.",
    "dlya-organizacij":
      "Дезинфекция и дезинсекция в офисе своими силами. Требования Роспотребнадзора, ограничения самостоятельной обработки, когда нужны лицензированные специалисты.",
    "unichtozhenie-zapahov":
      "Как убрать неприятный запах в квартире самому: после пожара, затопления, трупный запах. Домашние методы, озонаторы, когда нужны специалисты.",
    "prochie-uslugi":
      "Обработка автомобиля и дачного участка своими руками. Дезинфекция авто, акарицидная обработка от клещей. Ограничения домашних методов.",
  };

  const title =
    titles[slug] || `${article.title} | DezPro — дезинфекция в Москве`;
  const description =
    descriptions[slug] ||
    `Узнайте, как провести ${article.title.toLowerCase()} своими руками. Полезные советы и инструкции от профессионалов DezPro.`;

  return {
    title,
    description,
    keywords: `сделать самому, своими руками, ${article.slug}, дезинфекция Москва`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url: url,
      siteName: "DezPro",
      locale: "ru_RU",
      type: "article",
    },
  };
}

export default async function DiyArticle({ params }) {
  const slug = (await params).slug;
  const article = diyArticles.find((a) => a.slug === slug);

  if (!article) {
    return notFound();
  }

  // SEO-оптимизированные H1 заголовки
  const h1Titles = {
    dezinkseciya:
      "Дезинсекция своими руками: инструкции по уничтожению насекомых",
    dezinfekciya: "Дезинфекция помещения своими руками: пошаговая инструкция",
    deratizaciya: "Как избавиться от крыс и мышей самому: полное руководство по всем методам",
    "dlya-organizacij": "Дезинфекция и дезинсекция в офисе своими силами",
    "unichtozhenie-zapahov": "Как убрать неприятный запах в квартире самому",
    "prochie-uslugi": "Обработка автомобиля и участка своими руками",
  };

  const h1Title = h1Titles[slug] || article.title;

  return (
    <main className={styles.articlePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>{h1Title}</h1>

        <nav className={styles.navigation}>
          <h2 className={styles.navTitle}>Содержание</h2>
          <div className={styles.navLinks}>
            {article.slug === "dezinkseciya" ? (
              <>
                <div className={styles.categoryGroup}>
                  <h3 className={styles.categoryTitle}>Квартира / дом:</h3>
                  <a href="#tarakany" className={styles.navLink}>
                    Тараканы
                  </a>
                  <a href="#klopy" className={styles.navLink}>
                    Клопы (постельные)
                  </a>
                  <a href="#muravi" className={styles.navLink}>
                    Муравьи (домовые, фараоновы)
                  </a>
                  <a href="#blohi" className={styles.navLink}>
                    Блохи
                  </a>
                  <a href="#mol" className={styles.navLink}>
                    Моль (пищевая, платяная)
                  </a>
                  <a href="#cheshuynicy" className={styles.navLink}>
                    Чешуйницы
                  </a>
                  <a href="#mokricy" className={styles.navLink}>
                    Мокрицы
                  </a>
                  <a href="#kozheedy" className={styles.navLink}>
                    Кожееды
                  </a>
                </div>
                <div className={styles.categoryGroup}>
                  <h3 className={styles.categoryTitle}>Летающие:</h3>
                  <a href="#komary" className={styles.navLink}>
                    Комары
                  </a>
                  <a href="#muhi" className={styles.navLink}>
                    Мухи (комнатные, мясные)
                  </a>
                  <a href="#osy" className={styles.navLink}>
                    Осы
                  </a>
                  <a href="#shersheni" className={styles.navLink}>
                    Шершни
                  </a>
                  <a href="#ovody" className={styles.navLink}>
                    Оводы
                  </a>
                </div>
                <div className={styles.categoryGroup}>
                  <h3 className={styles.categoryTitle}>Опасные и паразиты:</h3>
                  <a href="#kleshchi" className={styles.navLink}>
                    Клещи (в т.ч. иксодовые)
                  </a>
                  <a href="#pauki" className={styles.navLink}>
                    Пауки
                  </a>
                  <a href="#skolopendry" className={styles.navLink}>
                    Сколопендры
                  </a>
                </div>
                <div className={styles.categoryGroup}>
                  <h3 className={styles.categoryTitle}>Дерево/сад/огород:</h3>
                  <a href="#koroedy" className={styles.navLink}>
                    Короеды
                  </a>
                  <a href="#tlya" className={styles.navLink}>
                    Тля
                  </a>
                  <a href="#slizni-ulitki" className={styles.navLink}>
                    Слизни и улитки
                  </a>
                </div>
              </>
            ) : (
              article.sections.map((section, index) => (
                <a
                  key={index}
                  href={`#${section.id}`}
                  className={styles.navLink}
                >
                  {section.heading}
                </a>
              ))
            )}
          </div>
        </nav>

        {article.sections.map((section, index) => (
          <section key={index} id={section.id} className={styles.section}>
            <h2>{section.heading}</h2>
            <div className={styles.textContent}>
              {section.text.split("\n").map((paragraph, pIndex) => {
                if (paragraph.trim() === "") return <br key={pIndex} />;
                if (paragraph.startsWith("• ")) {
                  return (
                    <div key={pIndex} className={styles.listItem}>
                      {paragraph}
                    </div>
                  );
                }
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <h3 key={pIndex} className={styles.stepTitle}>
                      {paragraph}
                    </h3>
                  );
                }
                if (paragraph.includes("📌")) {
                  return (
                    <div key={pIndex} className={styles.importantNote}>
                      {paragraph}
                    </div>
                  );
                }
                return (
                  <p key={pIndex} className={styles.paragraph}>
                    {paragraph}
                  </p>
                );
              })}
            </div>
            {section.img && (
              <Image
                src={section.img}
                alt={section.heading}
                className={styles.image}
                width={600}
                height={400}
              />
            )}
            {typeof section.heading === "string" &&
              section.heading.toLowerCase().includes("сколько это стоит") &&
              null}
          </section>
        ))}

        <div className={styles.ctaBlock}>
          <p>
            🚨 Но помните: даже самые лучшие домашние методы дают лишь временный
            результат. Для гарантии безопасности лучше доверить работу
            профессионалам.
          </p>
          <div className={styles.buttons}>
            <Link href={article.serviceLink} className={styles.backBtn}>
              Получить услугу
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
