import styles from "@/app/diy/[slug]/page.module.css";

export default function DiySectionText({ text }) {
  return (
    <div className={styles.textContent}>
      {text.split("\n").map((paragraph, pIndex) => {
        if (paragraph.trim() === "") return <br key={pIndex} />;
        if (paragraph.startsWith("• ")) {
          return (
            <div key={pIndex} className={styles.listItem}>
              {paragraph}
            </div>
          );
        }
        if (/^\d+\./.test(paragraph)) {
          return (
            <h3 key={pIndex} className={styles.stepTitle}>
              {paragraph}
            </h3>
          );
        }
        if (paragraph.includes("📌")) {
          return (
            <div key={pIndex} className={styles.importantNote}>
              {paragraph}
            </div>
          );
        }
        return (
          <p key={pIndex} className={styles.paragraph}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
