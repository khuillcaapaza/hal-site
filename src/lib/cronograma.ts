import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const cronogramaDirectory = path.join(process.cwd(), "content", "cronograma-citas");

/** Weekday keys used to map areas to columns in the calendar. */
export const WEEKDAYS = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

/** Delivery schedule for a single area within a month. */
export interface AreaSchedule {
  area: string;
  days: Weekday[];
  time?: string;
  location?: string;
  note?: string;
}

export interface CronogramaMeta {
  /** Slug / file name, e.g. "2026-06". */
  slug: string;
  /** ISO-ish month key "YYYY-MM" used for sorting. */
  month: string;
  /** Human label, e.g. "Junio 2026". */
  monthLabel: string;
  title: string;
  excerpt: string;
}

export interface Cronograma extends CronogramaMeta {
  contentHtml: string;
  areas: AreaSchedule[];
}

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

/** Builds a readable "Junio 2026" label from a "YYYY-MM" month key. */
function monthLabelFromKey(month: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(month);
  if (!match) return month;
  const year = match[1];
  const idx = parseInt(match[2], 10) - 1;
  if (idx < 0 || idx > 11) return month;
  return `${monthNames[idx]} ${year}`;
}

/** Normalizes a single weekday string coming from the frontmatter. */
function normalizeWeekday(value: unknown): Weekday | null {
  const raw = String(value ?? "").trim().toLowerCase();
  const map: Record<string, Weekday> = {
    "lunes": "Lunes",
    "martes": "Martes",
    "miercoles": "Miércoles",
    "miércoles": "Miércoles",
    "jueves": "Jueves",
    "viernes": "Viernes",
    "sabado": "Sábado",
    "sábado": "Sábado",
    "domingo": "Domingo",
  };
  return map[raw] ?? null;
}

/** Normalizes the `areas` list coming from the Markdown frontmatter. */
function parseAreas(value: unknown): AreaSchedule[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => {
      const days = Array.isArray(item.days)
        ? item.days.map(normalizeWeekday).filter((d): d is Weekday => d !== null)
        : [];
      return {
        area: String(item.area ?? "Área"),
        days,
        time: item.time ? String(item.time) : undefined,
        location: item.location ? String(item.location) : undefined,
        note: item.note ? String(item.note) : undefined,
      };
    })
    .filter((item) => item.area);
}

function readCronogramaMeta(fileName: string): CronogramaMeta {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(cronogramaDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  const month = String(data.month ?? slug);

  return {
    slug,
    month,
    monthLabel: data.monthLabel ?? monthLabelFromKey(month),
    title: data.title ?? `Cronograma de citas · ${monthLabelFromKey(month)}`,
    excerpt: data.excerpt ?? "",
  };
}

/** Returns all schedules, sorted by month (newest first). */
export function getAllCronogramas(): CronogramaMeta[] {
  if (!fs.existsSync(cronogramaDirectory)) return [];

  const fileNames = fs.readdirSync(cronogramaDirectory).filter((f) => f.endsWith(".md"));

  return fileNames
    .map(readCronogramaMeta)
    .sort((a, b) => (a.month < b.month ? 1 : -1));
}

/** Returns the slugs for every schedule (used by generateStaticParams). */
export function getAllCronogramaSlugs(): string[] {
  if (!fs.existsSync(cronogramaDirectory)) return [];
  return fs
    .readdirSync(cronogramaDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Reads a single schedule and compiles its Markdown body to HTML at build time. */
export async function getCronogramaBySlug(slug: string): Promise<Cronograma | null> {
  const fullPath = path.join(cronogramaDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  const month = String(data.month ?? slug);

  return {
    slug,
    month,
    monthLabel: data.monthLabel ?? monthLabelFromKey(month),
    title: data.title ?? `Cronograma de citas · ${monthLabelFromKey(month)}`,
    excerpt: data.excerpt ?? "",
    contentHtml: processed.toString(),
    areas: parseAreas(data.areas),
  };
}
