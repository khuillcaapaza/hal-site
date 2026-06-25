import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const oficinasDirectory = path.join(process.cwd(), "content", "oficinas");

export interface OficinaAuthority {
  role: string;
  name: string;
}

export interface OficinaLink {
  title: string;
  url: string;
}

export interface OficinaResource {
  title: string;
  description: string;
  file: string;
  size?: string;
}

export interface OficinaContact {
  phone?: string;
  email?: string;
  schedule?: string;
}

export interface OficinaLocation {
  building?: string;
  floor?: string;
  reference?: string;
  mapUrl?: string;
}

export interface OficinaMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  order: number;
}

export interface Oficina extends OficinaMeta {
  contentHtml: string;
  authorities: OficinaAuthority[];
  links: OficinaLink[];
  resources: OficinaResource[];
  contact: OficinaContact;
  location: OficinaLocation;
}

function asString(value: unknown, fallback = ""): string {
  return value === undefined || value === null ? fallback : String(value);
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function parseAuthorities(value: unknown): OficinaAuthority[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => ({
      role: asString(item.role, "Cargo"),
      name: asString(item.name, "Nombre por asignar"),
    }))
    .filter((item) => item.role);
}

function parseLinks(value: unknown): OficinaLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => ({
      title: asString(item.title, "Enlace"),
      url: asString(item.url),
    }))
    .filter((item) => item.url);
}

function parseResources(value: unknown): OficinaResource[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => ({
      title: asString(item.title, "Documento"),
      description: asString(item.description),
      file: asString(item.file),
      size: item.size ? asString(item.size) : undefined,
    }))
    .filter((item) => item.file);
}

function parseContact(value: unknown): OficinaContact {
  const data = asObject(value);
  return {
    phone: data.phone ? asString(data.phone) : undefined,
    email: data.email ? asString(data.email) : undefined,
    schedule: data.schedule ? asString(data.schedule) : undefined,
  };
}

function parseLocation(value: unknown): OficinaLocation {
  const data = asObject(value);
  return {
    building: data.building ? asString(data.building) : undefined,
    floor: data.floor ? asString(data.floor) : undefined,
    reference: data.reference ? asString(data.reference) : undefined,
    mapUrl: data.mapUrl ? asString(data.mapUrl) : undefined,
  };
}

function readOficinaMeta(fileName: string): OficinaMeta {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(oficinasDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: asString(data.title, slug),
    excerpt: asString(data.excerpt),
    category: asString(data.category, "Oficina"),
    order: typeof data.order === "number" ? data.order : 999,
  };
}

/** Returns all office metadata, sorted by `order` and then title. */
export function getAllOficinas(): OficinaMeta[] {
  if (!fs.existsSync(oficinasDirectory)) return [];

  const fileNames = fs.readdirSync(oficinasDirectory).filter((f) => f.endsWith(".md"));

  return fileNames
    .map(readOficinaMeta)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/** Returns the slugs for every office (used by generateStaticParams). */
export function getAllOficinaSlugs(): string[] {
  if (!fs.existsSync(oficinasDirectory)) return [];
  return fs
    .readdirSync(oficinasDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Reads a single office and compiles its Markdown body to HTML at build time. */
export async function getOficinaBySlug(slug: string): Promise<Oficina | null> {
  const fullPath = path.join(oficinasDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    slug,
    title: asString(data.title, slug),
    excerpt: asString(data.excerpt),
    category: asString(data.category, "Oficina"),
    order: typeof data.order === "number" ? data.order : 999,
    contentHtml: processed.toString(),
    authorities: parseAuthorities(data.authorities),
    links: parseLinks(data.links),
    resources: parseResources(data.resources),
    contact: parseContact(data.contact),
    location: parseLocation(data.location),
  };
}
