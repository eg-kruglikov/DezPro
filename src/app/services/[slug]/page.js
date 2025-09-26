// src/app/services/[slug]/page.js
import { notFound } from "next/navigation";
import services from "@/app/data/services";
import BackButton from "@/app/components/BackButton";

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export default function ServicePage({ params }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return notFound();
  }

  return (
    <section style={{ padding: "60px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Hero блок */}
        <div
          style={{
            // backgroundImage: `url(${service.heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "12px",
            padding: "80px 40px",
            color: "#fff",
            marginBottom: "40px",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            {service.heroTitle}
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px" }}>
            {service.desc}
          </p>
        </div>

        {/* Как мы работаем */}
        <h2>Как мы работаем</h2>
        <p style={{ marginBottom: "20px" }}>{service.howWeWork}</p>

        {/* География */}
        <h3>Где мы работаем?</h3>
        <p>Мы работаем в Москве и области</p>

        {/* Контент */}
        <div
          dangerouslySetInnerHTML={{ __html: service.content }}
          style={{ marginTop: "30px" }}
        />

        {/* Кнопка назад */}
        <BackButton />
      </div>
    </section>
  );
}
