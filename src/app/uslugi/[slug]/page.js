import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../info-page.module.css";
import services from "../../data/services";
import pestsByService from "../../data/pests";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.name} в Москве и Московской области | DezPro`,
    description: `${service.name} — ${service.short}. Работаем по Москве и Московской области.`,
    alternates: { canonical: `https://dezpro.online/uslugi/${slug}/` },
  };
}

export default async function UslugaPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return notFound();

  const pests = pestsByService[slug] || [];

  return (
    <main>
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

        {pests.length > 0 && (
          <>
            <h2 className={styles.subtitle}>Страницы по запросам</h2>
            <ul className={styles.list}>
              {pests.map((p) => (
                <li key={p.slug}>
                  <Link href={`/uslugi/${slug}/${p.slug}`}>
                    {service.name} {p.slug.startsWith("ot-") ? "от" : "для"}{" "}
                    {p.name.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <p className={styles.text}>
          Также смотри: <Link href="/moskovskaya-oblast">города МО</Link>,{" "}
          <Link href="/tseny">цены</Link>, <Link href="/contacts">контакты</Link>.
        </p>
      </div>
    </main>
  );
}

