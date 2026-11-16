// Gebruik: node tools/set-domein.mjs https://www.jouwdomein.be
// Vervangt het huidige webadres overal (canonical, delen op sociale media, sitemap, robots).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nieuw = (process.argv[2] || "").replace(/\/+$/, "");
if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}$/i.test(nieuw)) {
  console.error("Geef een webadres op, bv.: node tools/set-domein.mjs https://www.hetkippenkamp.be");
  process.exit(1);
}
const data = readFileSync(join(root, "data.js"), "utf8");
const oud = (data.match(/url:\s*"(https:\/\/[^"]+)"/) || [])[1];
if (!oud) { console.error("Kon het huidige webadres niet vinden in data.js"); process.exit(1); }
if (oud === nieuw) { console.log("Dit webadres staat er al."); process.exit(0); }

const bestanden = readdirSync(root).filter((f) => /\.(html|xml|txt|js)$/.test(f));
let aantal = 0;
for (const f of bestanden) {
  const p = join(root, f);
  const tekst = readFileSync(p, "utf8");
  if (tekst.includes(oud)) {
    writeFileSync(p, tekst.split(oud).join(nieuw));
    aantal++;
    console.log("aangepast:", f);
  }
}
console.log(`Klaar: ${oud} is vervangen door ${nieuw} in ${aantal} bestand(en).`);
