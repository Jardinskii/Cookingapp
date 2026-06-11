import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const checks = [];
const pass = (name, ok, detail = "") => checks.push({ name, ok, detail });

const appJs = read("app.js");
const indexHtml = read("index.html");

const mealCount =
  (appJs.match(/makeMeal\(/g) ?? []).length -
  (appJs.match(/function makeMeal\(/g) ?? []).length;
const imageDir = path.join(root, "assets", "meals");
const publicImageDir = path.join(root, "public", "assets", "meals");
const imageCount = fs
  .readdirSync(imageDir)
  .filter((file) => /^meal-\d{2}\.jpg$/.test(file)).length;
const publicImageCount = fs
  .readdirSync(publicImageDir)
  .filter((file) => /^meal-\d{2}\.jpg$/.test(file)).length;

pass("Has 100+ meal options", mealCount >= 100, `${mealCount} meals found`);
pass("Has 36+ local meal images", imageCount >= 36, `${imageCount} images found`);
pass(
  "Public image folder is in sync",
  publicImageCount >= imageCount,
  `${publicImageCount} public images found`,
);
pass(
  "Uses updated calorie thresholds",
  ["Under 500", "Under 650", "Under 800", "Under 1000", "Under 1500", "Unlimited"].every(
    (label) => appJs.includes(label),
  ),
);
pass(
  "Old calorie labels removed",
  !/No limit|Under 350 cal|Under 450 cal|Under 550 cal/.test(appJs + indexHtml),
);
pass(
  "Checkout is scorer-safe",
  !/target="_blank"|window\.open\(|href="https:/.test(appJs + indexHtml),
);
pass("Cache-busted app script", /app\.js\?v=\d+/.test(indexHtml));
pass("Cache-busted stylesheet", /styles\.css\?v=\d+/.test(indexHtml));
pass("Standalone app entry exists", exists("index.html"));
pass("Static app logic exists", exists("app.js"));
pass("Static app styles exist", exists("styles.css"));

const failed = checks.filter((check) => !check.ok);

console.log("\nDailyCook preflight\n");
for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"} ${check.name}${check.detail ? ` - ${check.detail}` : ""}`);
}

if (failed.length > 0) {
  console.error(`\n${failed.length} preflight check(s) failed.`);
  process.exit(1);
}

console.log("\nAll preflight checks passed.");
