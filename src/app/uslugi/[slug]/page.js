import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../info-page.module.css";
import services from "../../data/services";
import pestsByService from "../../data/pests";
import { getServiceExtras } from "../../data/serviceExtras";
import { serviceHubCopy } from "../../data/serviceLandingCopy";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import FAQ from "../../components/FAQ/FAQ";
import StructuredData from "../../components/StructuredData";
import {
  serviceJsonLd,
  offerJsonLd,
  breadcrumbJsonLd,
} from "../../lib/jsonld";

const SITE = "https://dezpro.online";

const SERVICE_PRICE_HINTS = {
  dezinsekciya: { lowPrice: 2500, highPrice: 9000 },
  dezinfekciya: { lowPrice: 2000, highPrice: 8000 },
  deratizaciya: { lowPrice: 3000, highPrice: 9000 },
  "unichtozhenie-zapahov": { lowPrice: 3500, highPrice: 12000 },
  "dlya-organizacij": { lowPrice: 5000, highPrice: 30000 },
  "prochie-uslugi": { lowPrice: 2500, highPrice: 8000 },
};

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.name} в Москве и Московской области`,
    description: `${service.name} — ${service.short}. Работаем по Москве и Московской области, договор и понятный регламент.`,
    alternates: { canonical: `https://dezpro.online/uslugi/${slug}/` },
  };
}

export default async function UslugaPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();

  const pests = pestsByService[slug] || [];
  const extras = getServiceExtras(slug);
  const hub = serviceHubCopy[slug];

  const url = `${SITE}/uslugi/${slug}/`;
  const priceHint = SERVICE_PRICE_HINTS[slug];
  const serviceLd = serviceJsonLd({
    name: `${service.name} в Москве и Московской области`,
    description: `${service.name} — ${service.short}. Работаем по Москве и Московской области, договор и понятный регламент.`,
    url,
    offers: priceHint
      ? offerJsonLd({
          name: `${service.name} — ориентир по цене`,
          url,
          lowPrice: priceHint.lowPrice,
          highPrice: priceHint.highPrice,
        })
      : undefined,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Главная", url: `${SITE}/` },
    { name: "Услуги", url: `${SITE}/uslugi/` },
    { name: service.name, url },
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
          ]}
        />
        <h1 className={styles.title}>
          {service.name} в Москве и Московской области
        </h1>
        <p className={styles.text}>{service.short}.</p>

        {hub && (
          <>
            {hub.intro.map((p, i) => (
              <p key={`hub-${i}`} className={styles.text}>
                {p}
              </p>
            ))}
            {hub.bullets?.length > 0 && (
              <>
                <h2 className={styles.subtitle}>Почему обращаются к DezPro</h2>
                <ul className={styles.list}>
                  {hub.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </>
            )}
            {hub.faq?.length > 0 && <FAQ items={hub.faq} />}
          </>
        )}

        {extras.length > 0 && (
          <>
            <h2 className={styles.subtitle}>Методы и спецпрограммы</h2>
            <ul className={styles.list}>
              {extras.map((e) => (
                <li key={e.slug}>
                  <Link href={`/uslugi/${slug}/${e.slug}/`}>{e.listLabel}</Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {pests.length > 0 && (
          <>
            <h2 className={styles.subtitle}>По типу вредителя или задачи</h2>
            <ul className={styles.list}>
              {pests.map((p) => (
                <li key={p.slug}>
                  <Link href={`/uslugi/${slug}/${p.slug}/`}>
                    {service.name}{" "}
                    {p.slug.startsWith("ot-") ? "от " : "для "}
                    {p.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 className={styles.subtitle}>География и цены</h2>
        <p className={styles.text}>
          Отдельные страницы по городам Московской области — в разделе{" "}
          <Link href="/moskovskaya-oblast/">Московская область</Link>. Ориентиры
          по стоимости — на странице{" "}
          <Link href="/tseny/">цены</Link>, заявка — через{" "}
          <Link href="/contacts/">контакты</Link>. Полезные материалы — в{" "}
          <Link href="/spravochnik/">справочнике</Link> и разделе{" "}
          <Link href="/diy/dezinsekciya/">сделать самому</Link> (обзорно, без
          замены профессиональной обработки).
        </p>
      </div>
    </main>
  );
}
