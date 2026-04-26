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
import StructuredData from "../../../components/StructuredData";
import {
  serviceJsonLd,
  offerJsonLd,
  breadcrumbJsonLd,
} from "../../../lib/jsonld";

const SITE = "https://dezpro.online";

const SERVICE_PRICE_HINTS = {
  dezinsekciya: { lowPrice: 2500, highPrice: 9000 },
  dezinfekciya: { lowPrice: 2000, highPrice: 8000 },
  deratizaciya: { lowPrice: 3000, highPrice: 9000 },
  "unichtozhenie-zapahov": { lowPrice: 3500, highPrice: 12000 },
  "dlya-organizacij": { lowPrice: 5000, highPrice: 30000 },
  "prochie-uslugi": { lowPrice: 2500, highPrice: 8000 },
};

/**
 * Информационные статьи под каждый pest-слаг — для контекстной перелинковки
 * с посадочной "от вредителя" в раздел /info/.
 */
const PEST_INFO_LINKS = {
  "ot-klopov": [
    { label: "Укусы клопов на коже: как выглядят и что делать", href: "/info/ukusy-klopov-na-kozhe/" },
    { label: "Как выглядят постельные клопы", href: "/info/kak-vyglyadyat-klopy/" },
    { label: "Признаки клопов в квартире", href: "/info/priznaki-klopov-v-kvartire/" },
    { label: "Сколько живут клопы", href: "/info/skolko-zhivut-klopy/" },
    { label: "При какой температуре погибают клопы", href: "/info/pri-kakoj-temperature-pogibajut-klopy/" },
  ],
  "ot-tarakanov": [
    { label: "Как избавиться от тараканов в квартире", href: "/info/kak-izbavitsya-ot-tarakanov-v-kvartire/" },
    { label: "Эффективные средства от тараканов", href: "/info/sredstva-ot-tarakanov/" },
  ],
};

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
    const title = city.isMoscow
      ? `${service.name} в Москве`
      : `${service.name} в ${city.name} (МО)`;
    return {
      title,
      description: bundle.metaDescription,
      alternates: { canonical: url },
    };
  }

  if (extra) {
    const bundle = getMethodLandingBundle(slug, extra.slug);
    const title = `${extra.listLabel} — Москва и МО`;
    const description =
      bundle?.metaDescription ||
      `${extra.listLabel}. ${service.short} Москва и Московская область.`;
    return { title, description, alternates: { canonical: url } };
  }

  const bundle = resolvePestLanding(service, pest);
  const title = `${service.name} ${pest.slug.startsWith("ot-") ? "от" : ""} ${pest.name.toLowerCase()} — Москва и МО`;
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

  const url = `${SITE}/uslugi/${slug}/${param}/`;
  const priceHint = SERVICE_PRICE_HINTS[slug];
  let h1ForSchema;
  let descForSchema;
  let areaForSchema;

  if (city) {
    h1ForSchema = city.isMoscow
      ? `${service.name} в Москве`
      : `${service.name} в ${city.name} (Московская область)`;
    descForSchema = getCityLandingBundle(service, city).metaDescription;
    areaForSchema = [{ "@type": "City", name: city.name }];
  } else if (extra) {
    const bundle = getMethodLandingBundle(slug, extra.slug);
    h1ForSchema = `${extra.listLabel} в Москве и Московской области`;
    descForSchema =
      bundle?.metaDescription ||
      `${extra.listLabel}. ${service.short}. Москва и Московская область.`;
  } else {
    h1ForSchema = `${service.name} ${pest.slug.startsWith("ot-") ? "от" : ""} ${pest.name.toLowerCase()} — Москва и МО`;
    descForSchema = resolvePestLanding(service, pest).metaDescription;
  }

  const serviceLd = serviceJsonLd({
    name: h1ForSchema,
    description: descForSchema,
    url,
    areaServed: areaForSchema,
    offers: priceHint
      ? offerJsonLd({
          name: h1ForSchema,
          url,
          lowPrice: priceHint.lowPrice,
          highPrice: priceHint.highPrice,
        })
      : undefined,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Главная", url: `${SITE}/` },
    { name: "Услуги", url: `${SITE}/uslugi/` },
    { name: service.name, url: `${SITE}/uslugi/${slug}/` },
    { name: crumbLabel, url },
  ]);

  return (
    <main>
      <StructuredData data={[serviceLd, breadcrumbLd]} />
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
              {city.isMoscow
                ? `${service.name} в Москве`
                : `${service.name} в ${city.name} (Московская область)`}
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
            {PEST_INFO_LINKS[pest.slug]?.length > 0 && (
              <>
                <h2 className={styles.subtitle}>Полезное по теме</h2>
                <ul className={styles.list}>
                  {PEST_INFO_LINKS[pest.slug].map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
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
