// src/app/services/[slug]/page.js
import { notFound } from "next/navigation";
import services from "@/app/data/services";
import BackButton from "@/app/components/BackButton";
import styles from "./page.module.css";

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export default async function ServicePage({ params }) {
  const slug = (await params).slug;
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return notFound();
  }

  return (
    <main className={styles.servicePage}>
      <div className={styles.container}>
        {/* Hero блок */}
        <section className={styles.hero}>
          <div
            className={styles.heroContent}
            style={{
              backgroundImage: `url(${service.heroImg})`,
            }}
          >
            <h1>{service.heroTitle}</h1>
            <p>{service.desc}</p>
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
        </section>

        {/* Как мы работаем */}
        <section className={styles.workProcess}>
          <h2>Как мы работаем?</h2>
          <div className={styles.workContent}>
            <div className={styles.workText}>
              <p>{service.workProcess.description}</p>
            </div>
            <div className={styles.gallery}>
              {service.workProcess.gallery.map((item, index) => (
                <div key={index} className={styles.galleryItem}>
                  <div className={styles.galleryPlaceholder}>{item}</div>
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
              Читать статью
            </a>
          </div>
        </section>

        {/* Кнопка назад */}
        <BackButton />
      </div>
    </main>
  );
}
