/**
 * Дополнительные посадочные внутри услуги (те же URL /uslugi/[slug]/[param]).
 * Не «вредители» — методы и спецтемы с высоким спросом в органике.
 */
export const serviceExtrasByService = {
  dezinsekciya: [
    {
      slug: "holodnyj-tuman",
      navLabel: "Холодный туман",
      listLabel: "Обработка холодным туманом",
    },
    {
      slug: "suhoj-tuman",
      navLabel: "Сухой туман",
      listLabel: "Обработка сухим туманом",
    },
  ],
  "unichtozhenie-zapahov": [
    {
      slug: "ozonirovanie",
      navLabel: "Озонирование",
      listLabel: "Озонирование помещений",
    },
  ],
};

export function getServiceExtras(serviceSlug) {
  return serviceExtrasByService[serviceSlug] || [];
}

export function findServiceExtra(serviceSlug, param) {
  const list = getServiceExtras(serviceSlug);
  return list.find((e) => e.slug === param) || null;
}

export default serviceExtrasByService;
