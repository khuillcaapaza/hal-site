import fs from "fs";
import path from "path";
import { getAllCronogramaSlugs } from "@/lib/api";

const cronogramaDirectory = path.join(process.cwd(), "content", "cronograma-citas");

/** Slugs derivados de los archivos Markdown locales (fallback de build). */
function fileSlugs(): string[] {
  if (!fs.existsSync(cronogramaDirectory)) return [];
  return fs
    .readdirSync(cronogramaDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/**
 * Slugs para pre-generar páginas y el sitemap en tiempo de build. Une los meses
 * publicados en la API con los archivos Markdown locales, de modo que el build
 * nunca se quede sin rutas (y no falle con `output: export`) aunque la API esté
 * temporalmente caída. El contenido de cada página se obtiene en vivo.
 *
 * Solo debe importarse desde componentes de servidor (usa `fs`).
 */
export async function getCronogramaSlugsForBuild(): Promise<string[]> {
  const apiSlugs = await getAllCronogramaSlugs();
  return Array.from(new Set([...fileSlugs(), ...apiSlugs]));
}
