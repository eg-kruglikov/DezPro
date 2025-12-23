// src/app/services/[slug]/[city]/page.js
import { notFound } from "next/navigation";
import Image from "next/image";
import services from "@/app/data/services";
import cities from "@/app/data/cities";
import BackButton from "@/app/components/BackButton";
import StructuredData from "@/app/components/StructuredData";
import styles from "../page.module.css";

export async function generateStaticParams() {
  const params = [];
  services.forEach((service) => {
    cities.forEach((city) => {
      params.push({
        slug: service.slug,
        city: city.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, city: citySlug } = await params;
  const service = services.find((s) => s.slug === slug);
  const city = cities.find((c) => c.slug === citySlug);

  if (!service || !service.meta || !city) {
    return {
      title: "Услуга не найдена | DezPro",
      description: "Запрашиваемая услуга не найдена",
    };
  }

  const url = `https://dezpro.online/services/${slug}/${citySlug}/`;

  // Уникальные метаданные с городом
  // Для "Прочие услуги" используем более SEO-оптимизированный title
  let title;
  if (slug === "prochie-uslugi") {
    title = `Дезинфекция автомобиля и обработка участка от клещей в ${city.name} | DezPro`;
  } else {
    title = `${service.heroTitle} в ${city.name} | DezPro`;
  }
  
  // Формируем description с учетом города
  let description;
  if (service.meta.description.includes("в Москве и области")) {
    description = `${service.meta.description.replace(
      "в Москве и области",
      `в ${city.name}`
    )} Выезд в день обращения.`;
  } else if (slug === "prochie-uslugi") {
    // Для "Прочие услуги" создаем description с городом
    description = `Профессиональная дезинфекция автомобиля, обработка салона авто, акарицидная обработка дачного участка от клещей в ${city.name}. Обработка участка от клещей цена, дезинфекция авто цена. Гарантия результата, выезд в день обращения.`;
  } else {
    // Для остальных услуг просто добавляем город
    description = `${service.meta.description} в ${city.name}. Выезд в день обращения.`;
  }

  // Улучшенные keywords для страниц с городами
  let keywords = `${service.meta.keywords}, ${city.name}`;
  if (slug === "prochie-uslugi") {
    keywords = `${service.meta.keywords}, дезинфекция автомобиля ${city.name}, обработка участка от клещей ${city.name}, дезинфекция авто ${city.name}, акарицидная обработка ${city.name}, дезинфекция ${city.name}`;
  } else {
    keywords = `${service.meta.keywords}, ${city.name}, дезинфекция ${city.name}`;
  }

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url: url,
      siteName: "DezPro",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: `https://dezpro.online${service.heroImg}`,
          width: 1200,
          height: 630,
          alt: `${service.heroTitle} в ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServiceCityPage({ params }) {
  const { slug, city: citySlug } = await params;
  const service = services.find((s) => s.slug === slug);
  const city = cities.find((c) => c.slug === citySlug);

  if (!service || !city) {
    return notFound();
  }

  // Структурированные данные с указанием города
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.heroTitle} в ${city.name}`,
    description: `${service.desc} в ${city.name}`,
    provider: {
      "@type": "LocalBusiness",
      name: "DezPro",
      telephone: "+79969960982",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ивантеевка",
        addressRegion: "Московская область",
        addressCountry: "RU",
      },
      areaServed: [
        {
          "@type": "City",
          name: city.name,
        },
        {
          "@type": "State",
          name: "Московская область",
        },
      ],
    },
    areaServed: [
      {
        "@type": "City",
        name: city.name,
      },
    ],
    offers: service.pricing?.map((item) => ({
      "@type": "Offer",
      name: item.title,
      price: item.price,
      priceCurrency: "RUB",
    })),
  };

  return (
    <main className={styles.servicePage}>
      <StructuredData data={serviceSchema} />
      <div className={styles.container}>
        {/* Hero блок с городом */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>
              {service.heroTitle} в {city.name}
            </h1>
            <p>
              {service.desc} Работаем в {city.namePrepositional} и прилегающих
              районах. Выезд в день обращения.
            </p>
            <Image
              src={service.heroImg}
              alt={`${service.heroTitle} в ${city.name}`}
              className={styles.heroImage}
              width={800}
              height={450}
              priority
            />
          </div>
        </section>

        {/* Сколько это стоит */}
        <section className={styles.pricing}>
          <h2>Сколько это стоит?</h2>
          <div className={styles.priceCards}>
            {service.pricing.map((item, index) => (
              <div key={index} className={styles.priceCard}>
                <h3>{item.title}</h3>
                <div className={styles.price}>{item.price}</div>
              </div>
            ))}
          </div>
          <div className={styles.ctaWrap}>
            <a href="/contacts" className={styles.primaryCta}>
              Вызвать специалиста
            </a>
          </div>
        </section>

        {/* Как проходит процедура */}
        <section className={styles.procedure}>
          <h2>Как проходит процедура?</h2>
          <div className={styles.steps}>
            {service.procedure.steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepIcon}>{index + 1}</div>
                <div className={styles.stepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Как мы работаем */}
        <section className={styles.workProcess}>
          <h2>Как мы работаем?</h2>
          <div className={styles.workContent}>
            <div className={styles.workText}>
              <p>
                {service.workProcess.description} Работаем в {city.name} и
                прилегающих районах Московской области. Выезд специалиста в
                день обращения.
              </p>
            </div>
            <div className={styles.gallery}>
              {service.workProcess.gallery.map((item, index) => (
                <div key={index} className={styles.galleryItem}>
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={styles.galleryVideo}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    >
                      Ваш браузер не поддерживает видео.
                    </video>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className={styles.galleryImage}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Можно ли сделать самому */}
        <section className={styles.diy}>
          <h2>Можно ли сделать самому?</h2>
          <div className={styles.diyContent}>
            <p>{service.diy.description}</p>
            <a href={service.diy.articleLink} className={styles.articleBtn}>
              Читать статьи
            </a>
          </div>
        </section>

        {/* Кнопка назад */}
        <div className={styles.backButtonContainer}>
          <BackButton />
        </div>

        {/* SEO заголовки */}
        {service.seoHeadings && service.seoHeadings.length > 0 && (
          <section className={styles.seoHeadings}>
            {service.seoHeadings.map((group, index) => (
              <div key={index} className={styles.seoGroup}>
                <h3 className={styles.seoMainTitle}>{group.mainTitle}</h3>
                <ul className={styles.seoList}>
                  {group.subTitles.map((subTitle, subIndex) => (
                    <li key={subIndex} className={styles.seoItem}>
                      {subTitle}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

