export const metadata = {
  title: "Контакты — DezPro",
  description: "Свяжитесь с DezPro: телефон, почта, заявки онлайн",
};

export default function ContactsPage() {
  return (
    <main
      style={{
        background: "#ffffff",
        color: "#000000",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          fontSize: "18px",
          lineHeight: 1.7,
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>Контакты</h1>
        <p>
          Телефон: <a href="tel:+79998887766">+7 (999) 888-77-66</a>
        </p>
        <p>
          Email: <a href="mailto:info@dezpro.ru">info@dezpro.ru</a>
        </p>
        <p>
          Адрес: 141282, Московская область, г. Ивантеевка, проезд Центральный,
          дом 27, корпус 3, помещение №1.02.
        </p>
        <p>Пишите нам в Telegram или WhatsApp для быстрой связи.</p>
      </div>
    </main>
  );
}
