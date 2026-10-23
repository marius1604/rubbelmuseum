// Baut die fertige Seite nach _site/:
//  • liest alle Fundstücke aus fundstuecke/*.json und schreibt katalog.json
//  • vergibt fehlende Inventarnummern in der Reihenfolge, in der die Stücke angelegt wurden
//  • kopiert App, Bilder und Icons
// Aufruf: node scripts/build.mjs   (läuft automatisch bei jeder Änderung über GitHub Actions)
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, basename } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "_site");
const ITEMS_DIR = join(ROOT, "fundstuecke");
// Häufigkeit innerhalb der Seltenheit (Feld „haeufigkeit“ in der Eingabemaske)
const WEIGHT = { "": 1, normal: 1, seltener: 0.5, "deutlich-seltener": 0.25, "sehr-selten": 0.1 };
const RARITY = { gewoehnlich: "gewoehnlich", "gewöhnlich": "gewoehnlich", ungewoehnlich: "ungewoehnlich", "ungewöhnlich": "ungewoehnlich",
  selten: "selten", episch: "episch", legendaer: "legendaer", "legendär": "legendaer", mythisch: "mythisch" };

function addedAt(file) {
  try {
    const out = execFileSync("git", ["log", "--diff-filter=A", "--follow", "--format=%ct", "--", file], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim().split("\n").filter(Boolean);
    if (out.length) return Number(out[out.length - 1]) * 1000;
  } catch (e) {}
  return statSync(file).mtimeMs;
}

const problems = [];
const items = [];
for (const f of existsSync(ITEMS_DIR) ? readdirSync(ITEMS_DIR).filter(n => n.endsWith(".json")).sort() : []) {
  const path = join(ITEMS_DIR, f);
  let d;
  try { d = JSON.parse(readFileSync(path, "utf8")); } catch (e) { problems.push(`${f}: keine gültige JSON-Datei`); continue; }
  const rarity = RARITY[String(d.rarity || "").trim().toLowerCase()];
  let image = Array.isArray(d.image) ? d.image[0] : d.image;
  image = typeof image === "string" ? image.trim().replace(/^\/+/, "") : "";
  const name = String(d.name || "").trim();
  if (!name) { problems.push(`${f}: Name fehlt`); continue; }
  if (!rarity) { problems.push(`${f}: unbekannte Seltenheit „${d.rarity}“`); continue; }
  if (!image) { problems.push(`${f}: Bild fehlt`); continue; }
  if (!/^https?:/.test(image) && !existsSync(join(ROOT, image))) problems.push(`${f}: Bild ${image} nicht gefunden`);
  items.push({
    id: basename(f, ".json"), name, rarity, image,
    value: Math.max(0, Math.round(Number(d.value) || 0)),
    text: String(d.text || "").trim(),
    weight: WEIGHT[String(d.haeufigkeit ?? "").trim().toLowerCase()] ?? (Number(d.haeufigkeit) > 0 ? Math.min(1, Number(d.haeufigkeit)) : 1),
    nr: Number.isFinite(Number(d.nr)) && Number(d.nr) > 0 ? Math.floor(Number(d.nr)) : 0,
    _added: addedAt(path)
  });
}
// Inventarnummern: feste Nummern bleiben, alle anderen der Reihe nach dahinter
let next = items.reduce((m, it) => Math.max(m, it.nr), 0);
for (const it of items.filter(it => !it.nr).sort((a, b) => a._added - b._added || a.id.localeCompare(b.id))) it.nr = ++next;
items.sort((a, b) => a.nr - b.nr);
items.forEach(it => delete it._added);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const f of ["index.html", "manifest.webmanifest"]) cpSync(join(ROOT, f), join(OUT, f));
for (const d of ["icons", "bilder"]) if (existsSync(join(ROOT, d))) cpSync(join(ROOT, d), join(OUT, d), { recursive: true });
const version = (process.env.GITHUB_SHA || String(Date.now())).slice(0, 12);
writeFileSync(join(OUT, "sw.js"), readFileSync(join(ROOT, "sw.js"), "utf8").replace("__BUILD__", version));
writeFileSync(join(OUT, "katalog.json"), JSON.stringify({ version, items }, null, 1));

console.log(`${items.length} Fundstücke in katalog.json · Version ${version}`);
if (problems.length) { console.log("Hinweise:\n  " + problems.join("\n  ")); }
