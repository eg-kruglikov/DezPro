export const metadata = {
    title: "Контакты — DezPro",
    description: "Свяжитесь с DezPro: телефон, почта, заявки онлайн",
  };
  
  export default function ContactsPage() {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Контакты</h1>
        <p>Телефон: <a href="tel:+79998887766">+7 (999) 888-77-66</a></p>
        <p>Email: <a href="mailto:info@dezpro.ru">info@dezpro.ru</a></p>
        <p>Пишите нам в Telegram или WhatsApp для быстрой связи.</p>
      </main>
    );
  }
  