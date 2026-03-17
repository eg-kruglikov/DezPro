"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

export default function FAQ({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="faq-section" className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <h2 className={styles.faqTitle}>Часто задаваемые вопросы</h2>
        <div className={styles.faqList}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                activeIndex === index ? styles.active : ""
              }`}
            >
              <div
                className={styles.faqQuestion}
                onClick={() => toggleItem(index)}
              >
                <span>{item.question}</span>
              </div>
              <div className={styles.faqAnswer}>
                <div className={styles.faqAnswerContent}>
                  {item.answer.split("\n").map((line, lIndex) => {
                    const trimmedLine = line.trim();
                    if (trimmedLine === "") return <br key={lIndex} />;
                    
                    // Заголовки (начинаются с текста, заканчиваются двоеточием)
                    if (trimmedLine.match(/^[^•\d].+:$/)) {
                      return (
                        <p key={lIndex} style={{ fontWeight: 600, marginTop: "12px", marginBottom: "8px" }}>
                          {trimmedLine}
                        </p>
                      );
                    }
                    
                    // Списки с маркерами
                    if (trimmedLine.startsWith("• ")) {
                      return (
                        <div key={lIndex} style={{ marginLeft: "16px", marginBottom: "6px" }}>
                          {trimmedLine}
                        </div>
                      );
                    }
                    
                    // Обычные параграфы
                    return <p key={lIndex}>{trimmedLine}</p>;
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

