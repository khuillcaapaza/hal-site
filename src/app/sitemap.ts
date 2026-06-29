import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllConvocatorias } from "@/lib/convocatorias";
import { getCronogramaSlugsForBuild } from "@/lib/cronograma-build";
import { getAllOficinaSlugs } from "@/lib/oficinas";

const BASE_URL = "https://hospitalantoniolorena.gob.pe";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const toDate = (value?: string): Date => {
    if (!value) return now;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? now : parsed;
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/convocatorias/`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/cronograma-citas/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/citas/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/oficinas/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/documentos-gestion/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/nosotros/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE_URL}/nosotros/autoridades/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/nosotros/historia/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const convocatorias: MetadataRoute.Sitemap = (await getAllConvocatorias()).map((c) => ({
    url: `${BASE_URL}/convocatorias/${c.slug}/`,
    lastModified: toDate(c.date),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}/`,
    lastModified: toDate(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const cronogramas: MetadataRoute.Sitemap = (await getCronogramaSlugsForBuild()).map((slug) => ({
    url: `${BASE_URL}/cronograma-citas/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const oficinas: MetadataRoute.Sitemap = getAllOficinaSlugs().map((slug) => ({
    url: `${BASE_URL}/oficinas/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...convocatorias, ...posts, ...cronogramas, ...oficinas];
}
