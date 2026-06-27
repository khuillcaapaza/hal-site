import axios from "axios";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import {
  monthLabelFromKey,
  normalizeWeekday,
  type AreaSchedule,
  type Cronograma,
  type CronogramaMeta,
  type Weekday,
} from "@/lib/cronograma";

/**
 * Base de la API de citas. En producción y local se inyecta vía
 * `NEXT_PUBLIC_API_BASE`; si falta, se usa el dominio público por defecto.
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") ||
  "https://citas.hospitalantoniolorena.gob.pe/api";

const http = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { Accept: "application/json" },
});

// ── Formas crudas que devuelve la API ────────────────────────────────

interface RawMeta {
  mes: string;
  monthLabel?: string;
  titulo: string;
  excerpt?: string;
  publicado?: boolean;
}

interface RawArea {
  area?: string;
  days?: unknown;
  time?: string;
  location?: string;
  note?: string;
}

interface RawCronograma extends RawMeta {
  indicaciones?: string;
  areas?: RawArea[];
}

// ── Mapeo a los tipos del sitio ──────────────────────────────────────

function mapMeta(raw: RawMeta): CronogramaMeta {
  return {
    slug: raw.mes,
    month: raw.mes,
    monthLabel: raw.monthLabel ?? monthLabelFromKey(raw.mes),
    title: raw.titulo ?? `Cronograma de citas · ${monthLabelFromKey(raw.mes)}`,
    excerpt: raw.excerpt ?? "",
  };
}

function mapAreas(raw: RawArea[] | undefined): AreaSchedule[] {
  if (!Array.isArray(raw)) return [];
  return raw
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

/** Convierte el Markdown de `indicaciones` a HTML (síncrono). */
function markdownToHtml(markdown: string): string {
  if (!markdown.trim()) return "";
  return remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .processSync(markdown)
    .toString();
}

function mapCronograma(raw: RawCronograma): Cronograma {
  return {
    ...mapMeta(raw),
    contentHtml: markdownToHtml(raw.indicaciones ?? ""),
    areas: mapAreas(raw.areas),
  };
}

// ── Lectura pública ──────────────────────────────────────────────────

/** Lista de cronogramas publicados, ordenados por mes (más reciente primero). */
export async function getAllCronogramas(): Promise<CronogramaMeta[]> {
  const { data } = await http.get<{ cronogramas: RawMeta[] }>("/cronogramas");
  const items = Array.isArray(data?.cronogramas) ? data.cronogramas : [];
  return items
    .map(mapMeta)
    .sort((a, b) => (a.month < b.month ? 1 : -1));
}

/** Slugs (meses) publicados; usado por generateStaticParams y el sitemap. */
export async function getAllCronogramaSlugs(): Promise<string[]> {
  try {
    const cronogramas = await getAllCronogramas();
    return cronogramas.map((c) => c.slug);
  } catch {
    return [];
  }
}

/** Un cronograma publicado completo; null si no existe. */
export async function getCronogramaBySlug(slug: string): Promise<Cronograma | null> {
  try {
    const { data } = await http.get<{ cronograma: RawCronograma }>(
      `/cronogramas/${encodeURIComponent(slug)}`,
    );
    return data?.cronograma ? mapCronograma(data.cronograma) : null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
}

export default http;
