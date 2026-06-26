// Generates src/lib/convocatorias-files.json by scanning public/convocatorias.
// Run locally (where the PDF/image files exist) whenever convocatoria files
// change, then commit the manifest. The CI build reads the manifest instead of
// the filesystem, so the large PDFs no longer need to live in Git.
//
//   node scripts/gen-convocatorias-manifest.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const convDir = path.join(root, "public", "convocatorias");
const outFile = path.join(root, "src", "lib", "convocatorias-files.json");

const ALLOWED = /\.(pdf|jpe?g|png|docx?)$/i;

const manifest = {};
for (const slug of fs.readdirSync(convDir)) {
  const dir = path.join(convDir, slug);
  if (!fs.statSync(dir).isDirectory()) continue;
  const files = fs
    .readdirSync(dir)
    .filter((f) => ALLOWED.test(f))
    .sort((a, b) => a.localeCompare(b, "es"));
  manifest[slug] = files;
}

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n");

const total = Object.values(manifest).reduce((n, a) => n + a.length, 0);
console.log(
  `Manifiesto generado: ${Object.keys(manifest).length} convocatorias, ${total} archivos -> ${path.relative(root, outFile)}`
);
