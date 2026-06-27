// Tipos y utilidades puras de cronogramas. Los datos se obtienen en vivo desde
// la API (ver `src/lib/api.ts`); este módulo no toca el sistema de archivos, por
// lo que es seguro importarlo desde componentes de servidor y de cliente.

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
export function monthLabelFromKey(month: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(month);
  if (!match) return month;
  const year = match[1];
  const idx = parseInt(match[2], 10) - 1;
  if (idx < 0 || idx > 11) return month;
  return `${monthNames[idx]} ${year}`;
}

/** Normalizes a single weekday string coming from the API. */
export function normalizeWeekday(value: unknown): Weekday | null {
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
