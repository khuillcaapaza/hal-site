import filesManifest from "./convocatorias-files.json";

/** A downloadable file that belongs to a convocatoria. */
export interface ConvocatoriaFile {
  name: string;
  label: string;
  href: string;
  ext: string;
}

export interface ConvocatoriaMeta {
  slug: string;
  title: string;
  area: string;
  /** ISO date `yyyy-mm-dd`. */
  date: string;
  year: number;
  month: number;
  day: number;
  status: string;
  description: string;
}

export interface Convocatoria extends ConvocatoriaMeta {
  files: ConvocatoriaFile[];
}

/**
 * File listing per convocatoria. Generated from `public/convocatorias` by
 * `scripts/gen-convocatorias-manifest.mjs`. Using a committed manifest lets the
 * large PDFs be served from the server (not stored in Git) while the build
 * still produces the correct download links.
 */
const manifest: Record<string, string[]> = filesManifest;

/**
 * Convocatoria metadata. All processes are classified as closed ("Cerrada").
 * Dates are organized by year / month / day for grouping and filtering.
 */
const convocatoriasMeta: Omit<ConvocatoriaMeta, "year" | "month" | "day" | "status">[] = [
  // 2026
  {
    slug: "reemplazo-suplencia-01-2026",
    title: "Contratación por Reemplazo y Suplencia N° 01-2026 (D.L. 276)",
    area: "Reemplazo",
    date: "2026-02-24",
    description:
      "Proceso de contratación temporal de personal por reemplazo y suplencia bajo el régimen del Decreto Legislativo N° 276.",
  },
  {
    slug: "cas-001-2026",
    title: "Proceso CAS N° 001-2026",
    area: "CAS",
    date: "2026-01-15",
    description:
      "Convocatoria del Proceso de Contratación Administrativa de Servicios (CAS) N° 001-2026 del Hospital Antonio Lorena.",
  },
  // 2025
  {
    slug: "cas-004-2025",
    title: "Convocatoria CAS N° 004-2025",
    area: "CAS",
    date: "2025-11-01",
    description:
      "Proceso de Contratación Administrativa de Servicios (CAS) N° 004-2025, con bases, comunicados, fe de erratas y resultados.",
  },
  {
    slug: "lineamientos-ascenso-2025",
    title: "Lineamientos del Proceso de Ascenso 2025",
    area: "Ascenso",
    date: "2025-10-01",
    description:
      "Lineamientos y publicación oficial del proceso de ascenso del personal asistencial (D.S. N° 013-2025-SA).",
  },
  {
    slug: "cas-003-2025",
    title: "Convocatoria CAS N° 003-2025",
    area: "CAS",
    date: "2025-09-01",
    description:
      "Proceso de Contratación Administrativa de Servicios (CAS) N° 003-2025, con bases, fe de erratas y resultados.",
  },
  {
    slug: "nombramiento-salud-2025",
    title: "Nombramiento del Personal de la Salud 2025",
    area: "Nombramiento",
    date: "2025-08-01",
    description:
      "Proceso de nombramiento del personal asistencial de la salud conforme a la Ley N° 32185.",
  },
  {
    slug: "reemplazo-01-2025",
    title: "Contratación Temporal por Reemplazo N° 01-2025 (D.L. 276)",
    area: "Reemplazo",
    date: "2025-07-04",
    description:
      "Proceso de selección para la contratación temporal de personal por reemplazo bajo el Decreto Legislativo N° 276.",
  },
  {
    slug: "cas-002-2025-cancer",
    title: "Convocatoria CAS N° 002-2025 — Programa Cáncer",
    area: "CAS",
    date: "2025-06-26",
    description:
      "Proceso CAS N° 002-2025 para el Programa Presupuestal de Prevención y Control del Cáncer.",
  },
  {
    slug: "cambio-grupo-ocupacional-2025",
    title: "Cambio de Grupo Ocupacional y Cambio de Línea de Carrera",
    area: "General",
    date: "2025-05-19",
    description:
      "Proceso de Cambio de Grupo Ocupacional y Cambio de Línea de Carrera (D.S. N° 003-2025-SA), con reglamento, cronogramas, comunicados y resultados.",
  },
  {
    slug: "cas-02-2025",
    title: "Contratación Administrativa de Servicios — CAS N° 02-2025",
    area: "CAS",
    date: "2025-03-04",
    description:
      "Segunda convocatoria de Contratación Administrativa de Servicios (CAS) N° 02-2025-UGRH-HAL.",
  },
  {
    slug: "cas-01-2025",
    title: "Convocatoria CAS N° 01-2025",
    area: "CAS",
    date: "2025-01-15",
    description:
      "Primera convocatoria de Contratación Administrativa de Servicios (CAS) N° 01-2025-UGRH-HAL.",
  },
  // 2024
  {
    slug: "cas-excepcional-cancer-2024",
    title: "Concurso CAS Excepcional — Programa Cáncer",
    area: "CAS",
    date: "2024-12-20",
    description:
      "Concurso CAS de selección de personal (excepcional) para el Programa de Cáncer, con fe de erratas y resultados finales.",
  },
  {
    slug: "reemplazo-02-2024",
    title: "Contratación Temporal por Reemplazo N° 02-2024 (D.L. 276)",
    area: "Reemplazo",
    date: "2024-12-14",
    description:
      "Proceso de contratación temporal de personal por reemplazo N° 02-2024 bajo el Decreto Legislativo N° 276.",
  },
  {
    slug: "reemplazo-01-2024",
    title: "Contratación Temporal por Reemplazo N° 01-2024 (D.L. 276)",
    area: "Reemplazo",
    date: "2024-11-15",
    description:
      "Proceso de contratación temporal de personal por reemplazo N° 01-2024 bajo el Decreto Legislativo N° 276.",
  },
  {
    slug: "cas-003-2024",
    title: "Convocatoria CAS N° 003-2024",
    area: "CAS",
    date: "2024-10-01",
    description:
      "Proceso de Contratación Administrativa de Servicios (CAS) N° 003-2024, con bases, fe de erratas y resultados.",
  },
  {
    slug: "cas-002-2024",
    title: "Convocatoria CAS N° 002-2024",
    area: "CAS",
    date: "2024-08-15",
    description:
      "Proceso de Contratación Administrativa de Servicios (CAS) N° 002-2024, con bases, fe de erratas y resultados.",
  },
];

/** Builds a readable label from a raw file name. */
function labelFromFilename(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, "");
  if (/^(SKM[_-]|img\d|DOC-?\d|CamScanner|WhatsApp|SCAN|ilovepdf|\d{6,})/i.test(base)) {
    return "Documento adjunto";
  }
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s*\(\d+\)\s*$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Reads the files of a convocatoria from the manifest. */
function listFiles(slug: string): ConvocatoriaFile[] {
  return (manifest[slug] ?? []).map((name) => ({
    name,
    label: labelFromFilename(name),
    href: `/convocatorias/${slug}/${encodeURIComponent(name)}`,
    ext: (name.split(".").pop() ?? "").toLowerCase(),
  }));
}

function withDateParts(meta: (typeof convocatoriasMeta)[number]): ConvocatoriaMeta {
  const [year, month, day] = meta.date.split("-").map((n) => parseInt(n, 10));
  return { ...meta, year, month, day, status: "Cerrada" };
}

/** Returns all convocatorias with their files, sorted newest first. */
export function getAllConvocatorias(): Convocatoria[] {
  return convocatoriasMeta
    .map((meta) => ({ ...withDateParts(meta), files: listFiles(meta.slug) }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Returns the slugs for every convocatoria (used by generateStaticParams). */
export function getAllConvocatoriaSlugs(): string[] {
  return convocatoriasMeta.map((c) => c.slug);
}

/** Returns a single convocatoria with its files. */
export function getConvocatoriaBySlug(slug: string): Convocatoria | null {
  const meta = convocatoriasMeta.find((c) => c.slug === slug);
  if (!meta) return null;
  return { ...withDateParts(meta), files: listFiles(slug) };
}
