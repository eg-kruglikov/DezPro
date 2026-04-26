/**
 * Печатает один или несколько JSON-LD блоков.
 * Принимает либо один объект, либо массив объектов (null/undefined в массиве пропускаются).
 */
export default function StructuredData({ data }) {
  if (!data) return null;
  const items = Array.isArray(data) ? data.filter(Boolean) : [data];
  if (items.length === 0) return null;
  return (
    <>
      {items.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
