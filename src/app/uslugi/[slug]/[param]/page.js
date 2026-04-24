import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../../info-page.module.css";
import services from "../../../data/services";
import cities from "../../../data/cities";
import pestsByService from "../../../data/pests";
import { findServiceExtra, getServiceExtras } from "../../../data/serviceExtras";
import {
  getCityLandingBundle,
  getMethodLandingBundle,
  resolvePestLanding,
} from "../../../data/serviceLandingCopy";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import FAQ from "../../../components/FAQ/FAQ";

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
    for (const e of getServiceExtras(s.slug)) {
      params.push({ slug: s.slug, param: e.slug });
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
  const extra = findServiceExtra(slug, param);
  if (!city && !pest && !extra) return {};

  const url = `https://dezpro.online/uslugi/${slug}/${param}/`;

  if (city) {
    const bundle = getCityLandingBundle(service, city);
    const title = `${service.name} в ${city.name} (МО) | DezPro`;
    return {
      title,
      description: bundle.metaDescription,
      alternates: { canonical: url },
    };
  }

  if (extra) {
    const bundle = getMethodLandingBundle(slug, extra.slug);
    const title = `${extra.listLabel} — Москва и МО | DezPro`;
    const description =
      bundle?.metaDescription ||
      `${extra.listLabel}. ${service.short} Москва и Московская область.`;
    return { title, description, alternates: { canonical: url } };
  }

  const bundle = resolvePestLanding(service, pest);
  const title = `${service.name} ${pest.slug.startsWith("ot-") ? "от" : ""} ${pest.name.toLowerCase()} — Москва и МО | DezPro`;
  return {
    title,
    description: bundle.metaDescription,
    alternates: { canonical: url },
  };
}

function RelatedPestsFixed({ service, currentSlug }) {
  const pests = pestsByService[service.slug] || [];
  const others = pests.filter((p) => p.slug !== currentSlug);
  if (!others.length) return null;
  return (
    <>
      <h2 className={styles.subtitle}>Другие страницы услуги</h2>
      <ul className={styles.list}>
        {others.map((p) => (
          <li key={p.slug}>
            <Link href={`/uslugi/${service.slug}/${p.slug}/`}>
              {service.name}{" "}
              {p.slug.startsWith("ot-") ? "от " : ""}
              {p.name.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function LandingBody({ bundle }) {
  if (!bundle) return null;
  return (
    <>
      {bundle.intro.map((paragraph, i) => (
        <p key={`intro-${i}`} className={styles.text}>
          {paragraph}
        </p>
      ))}
      {bundle.sections.map((sec) => (
        <section key={sec.title}>
          <h2 className={styles.subtitle}>{sec.title}</h2>
          {sec.body.map((line, j) => (
            <p key={`${sec.title}-${j}`} className={styles.text}>
              {line}
            </p>
          ))}
        </section>
      ))}
      {bundle.faq?.length > 0 && <FAQ items={bundle.faq} />}
    </>
  );
}

export default async function UslugaParamPage({ params }) {
  const { slug, param } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();

  const city = getCity(param);
  const pest = getPest(slug, param);
  const extra = findServiceExtra(slug, param);
  if (!city && !pest && !extra) return notFound();

  const crumbLabel = city
    ? city.name
    : extra
      ? extra.navLabel
      : pest.name;

  const extras = getServiceExtras(slug);

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
            <LandingBody bundle={getCityLandingBundle(service, city)} />
            <h2 className={styles.subtitle}>Рядом по услуге</h2>
            <p className={styles.text}>
              Общая страница услуги:{" "}
              <Link href={`/uslugi/${slug}/`}>{service.name}</Link>.{" "}
              {pestsByService[slug]?.length ? (
                <>
                  Запросы «от вредителя»:{" "}
                  {pestsByService[slug].slice(0, 5).map((p, idx) => (
                    <span key={p.slug}>
                      {idx > 0 ? ", " : ""}
                      <Link href={`/uslugi/${slug}/${p.slug}/`}>
                        {p.name.toLowerCase()}
                      </Link>
                    </span>
                  ))}
                  {pestsByService[slug].length > 5 ? "…" : ""}
                </>
              ) : null}
            </p>
          </>
        )}

        {pest && (
          <>
            <h1 className={styles.title}>
              {service.name} {pest.slug.startsWith("ot-") ? "от" : ""}{" "}
              {pest.name.toLowerCase()} в Москве и Московской области
            </h1>
            <LandingBody bundle={resolvePestLanding(service, pest)} />
            <RelatedPestsFixed service={service} currentSlug={pest.slug} />
            {extras.length > 0 && (
              <>
                <h2 className={styles.subtitle}>Методы обработки</h2>
                <ul className={styles.list}>
                  {extras.map((e) => (
                    <li key={e.slug}>
                      <Link href={`/uslugi/${slug}/${e.slug}/`}>{e.listLabel}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {extra && (
          <>
            <h1 className={styles.title}>
              {extra.listLabel} в Москве и Московской области
            </h1>
            <p className={styles.text}>
              Услуга:{" "}
              <Link href={`/uslugi/${slug}/`}>{service.name}</Link>. Работаем по
              Москве и Московской области, фиксируем условия в договоре.
            </p>
            <LandingBody
              bundle={
                getMethodLandingBundle(slug, extra.slug) || {
                  intro: [
                    `${extra.listLabel}: подберём режим после короткого уточнения объекта и согласуем сроки выезда.`,
                  ],
                  sections: [],
                  faq: [],
                }
              }
            />
            <RelatedPestsFixed service={service} currentSlug={extra.slug} />
          </>
        )}

        <h2 className={styles.subtitle}>Следующий шаг</h2>
        <ul className={styles.list}>
          <li>
            <Link href="/tseny/">Ориентиры по ценам</Link>
          </li>
          <li>
            <Link href="/moskovskaya-oblast/">Города Московской области</Link>
          </li>
          <li>
            <Link href="/contacts/">Заказать выезд</Link>
          </li>
          <li>
            <Link href="/spravochnik/">Справочник по вредителям</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
