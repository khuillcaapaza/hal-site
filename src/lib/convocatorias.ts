import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const convocatoriasDirectory = path.join(process.cwd(), "content", "convocatorias");

export interface ConvocatoriaMeta {
  slug: string;
  title: string;
  excerpt: string;
  area: string;
  date: string;
  deadline: string;
  status: string;
  coverColor: string;
}

export interface Convocatoria extends ConvocatoriaMeta {
  contentHtml: string;
}

function readConvocatoriaMeta(fileName: string): ConvocatoriaMeta {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(convocatoriasDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    area: data.area ?? "General",
    date: data.date ?? "",
    deadline: data.deadline ?? "",
    status: data.status ?? "Abierta",
    coverColor: data.coverColor ?? "from-green-100 to-green-200",
  };
}

/** Returns all convocatoria metadata, sorted by date (newest first). */
export function getAllConvocatorias(): ConvocatoriaMeta[] {
  if (!fs.existsSync(convocatoriasDirectory)) return [];

  const fileNames = fs.readdirSync(convocatoriasDirectory).filter((f) => f.endsWith(".md"));

  return fileNames
    .map(readConvocatoriaMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns the slugs for every convocatoria (used by generateStaticParams). */
export function getAllConvocatoriaSlugs(): string[] {
  if (!fs.existsSync(convocatoriasDirectory)) return [];
  return fs
    .readdirSync(convocatoriasDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Reads a single convocatoria and compiles its Markdown body to HTML at build time. */
export async function getConvocatoriaBySlug(slug: string): Promise<Convocatoria | null> {
  const fullPath = path.join(convocatoriasDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    area: data.area ?? "General",
    date: data.date ?? "",
    deadline: data.deadline ?? "",
    status: data.status ?? "Abierta",
    coverColor: data.coverColor ?? "from-green-100 to-green-200",
    contentHtml: processed.toString(),
  };
}
