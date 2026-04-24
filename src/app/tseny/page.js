import Link from "next/link";
import styles from "../info-page.module.css";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import FAQ from "../components/FAQ/FAQ";

export const metadata = {
  title: "Цены на дезинсекцию, дезинфекцию и дератизацию | DezPro — Москва и МО",
  description:
    "Ориентиры по стоимости дезинсекции, дезинфекции и дератизации в Москве и Московской области. От чего зависит цена, выезд в день обращения.",
  alternates: { canonical: "https://dezpro.online/tseny/" },
};

const priceFaq = [
  {
    question: "От чего зависит итоговая сумма?",
    answer:
      "От площади и типа объекта (квартира, дом, офис), вида вредителя, степени заражения, выбранного метода (гель, туман, барьер), удалённости по Московской области и срочности выезда.",
  },
  {
    question: "Можно ли назвать цену по телефону?",
    answer:
      "Да — дадим вилку после коротких вопросов (площадь, что заметили, когда нужен визит). Точную сумму фиксируем после осмотра или по фото/видео, если этого достаточно.",
  },
  {
    question: "Есть ли наценка за МКАД?",
    answer:
      "Считаем выезд из Москвы и по области в составе сметы — без скрытых строк. Удалённость влияет на логистику, поэтому честно заложим её в цену заранее.",
  },
  {
    question: "Что входит в выезд?",
    answer:
      "Осмотр, согласование программы, обработка по регламенту, памятка по проветриванию и уборке. Повторный визит по гарантии или второму этапу программы — по условиям договора.",
  },
];

export default function PricesPage() {
  return (
    <main>
      <div className={styles.wrap}>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/tseny/", label: "Цены" },
          ]}
        />
        <h1 className={styles.title}>Цены на дезинсекцию, дезинфекцию и дератизацию</h1>
        <p className={styles.text}>
          Ниже — ориентиры для Москвы и Московской области. Точную сумму согласуем
          после уточнения объекта; условия фиксируем в договоре.
        </p>

        <h2 className={styles.subtitle}>Дезинсекция (квартира)</h2>
        <ul className={styles.list}>
          <li>1-комнатная — от 2 500 ₽</li>
          <li>2-комнатная — от 3 000 ₽</li>
          <li>3-комнатная — от 3 500 ₽</li>
        </ul>
        <p className={styles.text}>
          Сильное заражение клопами или тараканами, холодный туман, срочный выезд
          или большая площадь — отдельная оценка. Смотрите также{" "}
          <Link href="/uslugi/dezinsekciya/">страницу услуги</Link> и методы:{" "}
          <Link href="/uslugi/dezinsekciya/holodnyj-tuman/">холодный туман</Link>,{" "}
          <Link href="/uslugi/dezinsekciya/suhoj-tuman/">сухой туман</Link>.
        </p>

        <h2 className={styles.subtitle}>Дезинфекция</h2>
        <ul className={styles.list}>
          <li>Квартира (профилактика / локальная задача) — от 2 000 ₽</li>
          <li>Офис небольшой площади — от 2 500 ₽</li>
          <li>Плесень и подготовка под ремонт — по осмотру (от 4 000 ₽ ориентир)</li>
        </ul>
        <p className={styles.text}>
          Подробнее:{" "}
          <Link href="/uslugi/dezinfekciya/">дезинфекция</Link>,{" "}
          <Link href="/uslugi/dezinfekciya/ot-pleseni/">от плесени</Link>.
        </p>

        <h2 className={styles.subtitle}>Дератизация</h2>
        <ul className={styles.list}>
          <li>Квартира (мыши) — от 3 000 ₽</li>
          <li>Частный дом / участок — от 4 500 ₽</li>
          <li>Объекты с приманочными станциями и журналом — по смете</li>
        </ul>
        <p className={styles.text}>
          Каталог:{" "}
          <Link href="/uslugi/deratizaciya/">дератизация</Link>.
        </p>

        <h2 className={styles.subtitle}>Уничтожение запахов и озонирование</h2>
        <ul className={styles.list}>
          <li>Озонирование квартиры — от 3 500 ₽ (зависит от объёма и времени экспозиции)</li>
          <li>Комплекс «запах + обработка» — по осмотру</li>
        </ul>
        <p className={styles.text}>
          <Link href="/uslugi/unichtozhenie-zapahov/">Уничтожение запахов</Link>,{" "}
          <Link href="/uslugi/unichtozhenie-zapahov/ozonirovanie/">озонирование</Link>.
        </p>

        <h2 className={styles.subtitle}>Для организаций</h2>
        <p className={styles.text}>
          Абонемент или разовый выезд — по графику и требованиям к документам.
          Ориентир после краткого брифа. Раздел{" "}
          <Link href="/dlya-yuridicheskih-lic/">для юрлиц</Link>.
        </p>

        <p className={styles.text}>
          <Link href="/contacts/">Связаться для расчёта</Link> или позвонить:{" "}
          <a href="tel:+79969960982">+7 (996) 996-09-82</a>.
        </p>

        <FAQ items={priceFaq} />
      </div>
    </main>
  );
}
