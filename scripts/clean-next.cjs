const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", ".next");

if (!fs.existsSync(dir)) {
  process.exit(0);
}

try {
  fs.rmSync(dir, {
    recursive: true,
    force: true,
    maxRetries: 8,
    retryDelay: 400,
  });
} catch (e) {
  console.error(
    "\nНе удалось удалить папку .next — скорее всего запущен «npm run dev» или другой процесс держит файлы.\n" +
      "Останови dev-сервер (Ctrl+C в том терминале), закрой лишние вкладки с проектом и снова запусти deploy.\n" +
      `Ошибка: ${e.message}\n`
  );
  process.exit(1);
}
