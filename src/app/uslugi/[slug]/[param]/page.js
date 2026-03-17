import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../info-page.module.css";
import services from "../../../data/services";
import cities from "../../../data/cities";
import pestsByService from "../../../data/pests";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

function getCity(param) {
  return cities.find((c) => c.slug === param) || null;
}

function getPest(serviceSlug, param) {
  const pests = pestsByService[serviceSlug] || [];
  return pests.find((p) => p.slug === param) || null;
}

export async function generateStaticParams() {
  const params = [];

  for (const s of services) {
    for (const c of cities) {
      params.push({ slug: s.slug, param: c.slug });
    }
    const pests = pestsByService[s.slug] || [];
    for (const p of pests) {
      params.push({ slug: s.slug, param: p.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { slug, param } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const city = getCity(param);
  const pest = getPest(slug, param);
  if (!city && !pest) return {};

  const url = `https://dezpro.online/uslugi/${slug}/${param}/`;

  if (city) {
    const title = `${service.name} в ${city.name} (МО) | DezPro`;
    const description = `${service.name} в ${city.name} и Московской области. Выезд в день обращения.`;
    return { title, description, alternates: { canonical: url } };
  }

  const title = `${service.name} ${pest.slug.startsWith("ot-") ? "от" : ""} ${pest.name.toLowerCase()} — Москва и МО | DezPro`;
  const description = `Страница под запрос «${service.name} ${pest.name.toLowerCase()}»: Москва и Московская область.`;
  return { title, description, alternates: { canonical: url } };
}

export default async function UslugaParamPage({ params }) {
  const { slug, param } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();

  const city = getCity(param);
  const pest = getPest(slug, param);
  if (!city && !pest) return notFound();

  const crumbLabel = city ? city.name : pest ? pest.name : param;

  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/uslugi/", label: "Услуги" },
            { href: `/uslugi/${slug}/`, label: service.name },
            { href: `/uslugi/${slug}/${param}/`, label: crumbLabel },
          ]}
        />
        {city && (
          <>
            <h1 className={styles.title}>
              {service.name} в {city.name} (Московская область)
            </h1>
            <p className={styles.text}>
              Работаем в {city.prep}. Выезд в день обращения по Московской
              области. Базовая услуга:{" "}
              <Link href={`/uslugi/${slug}`}>{service.name}</Link>.
            </p>
          </>
        )}

        {pest && (
          <>
            <h1 className={styles.title}>
              {service.name} {pest.slug.startsWith("ot-") ? "от" : ""}{" "}
              {pest.name.toLowerCase()} в Москве и Московской области
            </h1>
            <p className={styles.text}>
              Это посадочная страница под запросы вида «{pest.name.toLowerCase()}
              ». Базовая услуга:{" "}
              <Link href={`/uslugi/${slug}`}>{service.name}</Link>.
            </p>
          </>
        )}

        <h2 className={styles.subtitle}>Куда дальше</h2>
        <ul className={styles.list}>
          <li>
            <Link href="/tseny">Посмотреть цены</Link>
          </li>
          <li>
            <Link href="/moskovskaya-oblast">Список городов МО</Link>
          </li>
          <li>
            <Link href="/contacts">Связаться и заказать выезд</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

