const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(
  path.join(__dirname, "../src/app/data/diyArticles.js"),
  "utf8"
);
const body = src.replace(/\s*export\s+default\s+diyArticles\s*;?\s*$/, "");
// eslint-disable-next-line no-new-func
const diyArticles = new Function(`${body}\nreturn diyArticles;`)();

const TARGET_SLUGS = new Set([
  "dezinkseciya",
  "dezinfekciya",
  "deratizaciya",
  "dlya-organizacij",
  "unichtozhenie-zapahov",
  "prochie-uslugi",
]);

const PLACEHOLDER =
  /будет добавлена позже|будет добавлен\b|информация.*будет добавлена/i;

function isFilled(text) {
  if (!text || typeof text !== "string") return false;
  const t = text.trim();
  if (t.length < 80) return false;
  if (PLACEHOLDER.test(t)) return false;
  return true;
}

function formatBody(text) {
  return text
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

const parts = [];

for (const article of diyArticles) {
  if (!TARGET_SLUGS.has(article.slug)) continue;

  const url = `https://dezpro.online/diy/${article.slug}/`;
  parts.push("=".repeat(72));
  parts.push(url);
  parts.push(article.title || article.slug);
  parts.push("=".repeat(72));
  parts.push("");

  for (const section of article.sections || []) {
    const heading = section.heading || section.id || "Без заголовка";
    const text = section.text || "";
    if (!isFilled(text)) continue;

    parts.push("—".repeat(72));
    parts.push(heading);
    parts.push("—".repeat(72));
    parts.push("");
    parts.push(formatBody(text));
    parts.push("");
  }
}

const outPath = path.join(__dirname, "../DIY_STATI_KONTENT.txt");
fs.writeFileSync(outPath, parts.join("\n"), "utf8");
console.log("Written:", outPath);
