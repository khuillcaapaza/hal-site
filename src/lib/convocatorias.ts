/**
 * Capa de datos de convocatorias.
 *
 * El sitio público lee las convocatorias EN VIVO desde la API de convocatorias
 * (hal-convocatorias-api). Las páginas de listado hacen `fetch` en el navegador,
 * por lo que los cambios hechos en el panel aparecen sin volver a desplegar.
 *
 * Los ayudantes de build (generateStaticParams / sitemap / generateMetadata)
 * hacen `fetch` en el servidor y fallan en silencio (devuelven vacío) para que
 * una API caída nunca rompa la construcción estática.
 */

/** URL pública del servicio de convocatorias (sin barra final). */
const API_BASE = (
  process.env.NEXT_PUBLIC_CONVOCATORIAS_API ??
  "https://convocatorias.hospitalantoniolorena.gob.pe"
).replace(/\/+$/, "");

/** Un archivo descargable que pertenece a una convocatoria. */
export interface ConvocatoriaFile {
  name: string;
  label: string;
  href: string;
  ext: string;
}

/** Metadatos de una convocatoria (forma de listado). */
export interface ConvocatoriaMeta {
  slug: string;
  title: string;
  area: string;
  /** Fecha ISO `yyyy-mm-dd`. */
  date: string;
  year: number;
  month: number;
  day: number;
  status: string;
  description: string;
  /** Número de documentos adjuntos. */
  fileCount: number;
}

/** Convocatoria completa (forma de detalle). */
export interface Convocatoria extends ConvocatoriaMeta {
  cuerpo: string;
  files: ConvocatoriaFile[];
}

// ── Formas que devuelve la API ────────────────────────────────────────

interface ApiMeta {
  slug: string;
  title: string;
  area: string;
  date: string;
  status: string;
  description: string;
  publicado?: boolean;
  archivos?: number;
}

interface ApiFile {
  id?: number;
  name: string;
  label: string;
  ext: string;
  size?: number;
  href: string;
}

interface ApiDetail extends ApiMeta {
  cuerpo?: string;
  files?: ApiFile[];
}

// ── Mapeo API → modelo del sitio ──────────────────────────────────────

function dateParts(date: string): { year: number; month: number; day: number } {
  const [year, month, day] = (date ?? "").split("-").map((n) => parseInt(n, 10));
  return { year: year || 0, month: month || 0, day: day || 0 };
}

function mapMeta(api: ApiMeta): ConvocatoriaMeta {
  return {
    slug: api.slug,
    title: api.title,
    area: api.area,
    date: api.date,
    ...dateParts(api.date),
    status: api.status,
    description: api.description,
    fileCount: api.archivos ?? 0,
  };
}

function mapFile(f: ApiFile): ConvocatoriaFile {
  return {
    name: f.name,
    label: f.label,
    href: f.href,
    ext: (f.ext ?? "").toLowerCase(),
  };
}

function mapDetail(api: ApiDetail): Convocatoria {
  const files = (api.files ?? []).map(mapFile);
  return { ...mapMeta(api), fileCount: files.length, cuerpo: api.cuerpo ?? "", files };
}

// ── Lectura desde la API ──────────────────────────────────────────────

/** Filtros admitidos por el listado público. */
export interface ConvocatoriasQuery {
  q?: string;
  area?: string;
  year?: number | string;
  month?: number | string;
  page?: number;
  perPage?: number;
  signal?: AbortSignal;
}

/** Página de resultados del listado público (con metadatos de paginación). */
export interface ConvocatoriasPage {
  items: ConvocatoriaMeta[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  /** Años disponibles (para el filtro), de mayor a menor. */
  years: number[];
}

interface ApiPageMeta {
  total?: number;
  page?: number;
  per_page?: number;
  total_pages?: number;
  years?: number[];
}

/**
 * Listado de convocatorias publicadas con búsqueda (`q`, `area`, `year`,
 * `month`) y paginación (`page`, `perPage`). Devuelve una página vacía si la
 * API no responde.
 */
export async function fetchConvocatorias(query: ConvocatoriasQuery = {}): Promise<ConvocatoriasPage> {
  const { signal, q, area, year, month, page, perPage } = query;
  const empty: ConvocatoriasPage = {
    items: [],
    total: 0,
    page: page ?? 1,
    perPage: perPage ?? 12,
    totalPages: 1,
    years: [],
  };

  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (area) sp.set("area", String(area));
  if (year) sp.set("year", String(year));
  if (month) sp.set("month", String(month));
  if (page) sp.set("page", String(page));
  if (perPage) sp.set("per_page", String(perPage));
  const qs = sp.toString();

  try {
    const res = await fetch(`${API_BASE}/convocatorias${qs ? `?${qs}` : ""}`, {
      signal,
      cache: "no-store",
    });
    if (!res.ok) return empty;
    const data = (await res.json()) as { convocatorias?: ApiMeta[]; meta?: ApiPageMeta };
    const list = Array.isArray(data?.convocatorias) ? data.convocatorias : [];
    const meta = data?.meta ?? {};
    return {
      items: list.map(mapMeta),
      total: meta.total ?? list.length,
      page: meta.page ?? empty.page,
      perPage: meta.per_page ?? empty.perPage,
      totalPages: meta.total_pages ?? 1,
      years: Array.isArray(meta.years) ? meta.years : [],
    };
  } catch {
    return empty;
  }
}

/**
 * Todas las convocatorias publicadas (sin paginar). Útil para build-time
 * (sitemap / generateStaticParams). Devuelve `[]` si la API no responde.
 */
export async function getAllConvocatorias(signal?: AbortSignal): Promise<ConvocatoriaMeta[]> {
  const page = await fetchConvocatorias({ perPage: 1000, signal });
  return page.items;
}

/** Una convocatoria publicada con sus archivos, o `null` si no existe. */
export async function getConvocatoriaBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<Convocatoria | null> {
  try {
    const res = await fetch(`${API_BASE}/convocatorias/${encodeURIComponent(slug)}`, {
      signal,
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { convocatoria?: ApiDetail };
    if (!data?.convocatoria) return null;
    return mapDetail(data.convocatoria);
  } catch {
    return null;
  }
}

/** Slugs de todas las convocatorias (para `generateStaticParams`). Falla a `[]`. */
export async function getAllConvocatoriaSlugs(): Promise<string[]> {
  const all = await getAllConvocatorias();
  return all.map((c) => c.slug);
}
