"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      style={{
        marginTop: "40px",
        padding: "12px 24px",
        background: "#f2cb05",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1rem",
      }}
    >
      ← Назад
    </button>
  );
}
