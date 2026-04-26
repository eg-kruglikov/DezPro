import company from "../data/company";

const SITE = "https://dezpro.online";

/**
 * Общие поля провайдера услуги — переиспользуем в Service и LocalBusiness.
 */
const provider = {
  "@type": "Organization",
  name: company.shortLegalName,
  url: company.site,
  telephone: company.phoneTel,
  taxID: company.inn,
};

/**
 * LocalBusiness — для главной страницы и контактов.
 * Включает часы работы, регионы, геокоординаты, телефон.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE}/#localbusiness`,
    name: company.brand,
    legalName: company.fullLegalName,
    description:
      "Лицензированная дезинсекция, дезинфекция и дератизация в Москве и Московской области. Лицензия Роспотребнадзора, выезд в день обращения.",
    url: company.site,
    telephone: company.phoneTel,
    image: `${company.site}/logo.png`,
    priceRange: "₽₽",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RU",
      addressRegion: "Московская область",
      addressLocality: "Ивантеевка",
      streetAddress: "Центральный проезд, д. 27, корп. 3, пом. 1.02",
      postalCode: "141282",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    areaServed: company.areaServed,
    openingHoursSpecification: company.openingHoursSpec,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Лицензия Роспотребнадзора",
      identifier: company.license.number,
      validFrom: "2025-01-13",
    },
  };
}

/**
 * FAQPage — для блоков FAQ. items: [{question, answer}]
 */
export function faqJsonLd(items) {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

/**
 * Service + AggregateOffer для страниц услуг.
 * options: { name, description, url, areaServed, offers? }
 */
export function serviceJsonLd({
  name,
  description,
  url,
  areaServed,
  category = "Pest control",
  offers,
}) {
  const node = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    category,
    provider,
    areaServed: areaServed || company.areaServed,
    url,
  };
  if (offers) node.offers = offers;
  return node;
}

/**
 * Создать Offer / AggregateOffer.
 * priceSpec: { lowPrice, highPrice?, price?, priceCurrency = 'RUB' }
 */
export function offerJsonLd({
  name,
  url,
  lowPrice,
  highPrice,
  price,
  priceCurrency = "RUB",
}) {
  if (price !== undefined) {
    return {
      "@type": "Offer",
      name,
      url,
      price: String(price),
      priceCurrency,
      availability: "https://schema.org/InStock",
      seller: provider,
    };
  }
  return {
    "@type": "AggregateOffer",
    name,
    url,
    lowPrice: String(lowPrice),
    ...(highPrice !== undefined ? { highPrice: String(highPrice) } : {}),
    priceCurrency,
    availability: "https://schema.org/InStock",
    offerCount: highPrice !== undefined ? 3 : 1,
  };
}

/**
 * Article (NewsArticle/Article/HowTo) для DIY и spravochnik.
 */
export function articleJsonLd({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
  type = "Article",
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    description,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: company.brand,
      url: company.site,
    },
    publisher: {
      "@type": "Organization",
      name: company.brand,
      url: company.site,
      logo: {
        "@type": "ImageObject",
        url: `${company.site}/logo.png`,
      },
    },
    image: imageUrl ? [imageUrl] : [`${company.site}/logo.png`],
    datePublished: datePublished || "2025-01-15",
    dateModified: dateModified || datePublished || "2025-01-15",
    inLanguage: "ru-RU",
  };
}

/**
 * BreadcrumbList — берёт массив [{name,url}] и формирует JSON-LD.
 */
export function breadcrumbJsonLd(items) {
  if (!items || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
