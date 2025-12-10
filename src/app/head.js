export default function Head() {
  return (
    <>
      <title>DezPro — профессиональная дезинфекция</title>
      <meta
        name="description"
        content="Услуги по дезинфекции, обработке помещений, борьбе с насекомыми и грызунами"
      />

      {/* 🔹 Preload ключевых ресурсов */}
      <link rel="preload" as="image" href="/hero.webp" />

      {/* 🔹 Оптимизация Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
        rel="stylesheet"
      />

      {/* 🔹 Оптимизация загрузки CSS (не блокирует рендеринг) */}
      <link
        rel="preload"
        href="/_next/static/css/130.ebf2c8e.css"
        as="style"
        onLoad="this.onload=null;this.rel='stylesheet'"
      />
      <noscript>
        <link rel="stylesheet" href="/_next/static/css/130.ebf2c8e.css" />
      </noscript>

      <link
        rel="preload"
        href="/_next/static/css/f25055d8f35513f9.css"
        as="style"
        onLoad="this.onload=null;this.rel='stylesheet'"
      />
      <noscript>
        <link rel="stylesheet" href="/_next/static/css/f25055d8f35513f9.css" />
      </noscript>
    </>
  );
}
