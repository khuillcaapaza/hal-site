import { describe, it, expect, vi, beforeEach } from "vitest";

const vfs = vi.hoisted(() => ({
  dirExists: true,
  dir: [] as string[],
  files: {} as Record<string, string>,
}));

vi.mock("fs", async (importActual) => {
  const actual = (await importActual()) as Record<string, unknown>;
  const base = (p: unknown) => String(p).split(/[\\/]/).pop() as string;
  const m = {
    ...actual,
    existsSync: (p: unknown) => {
      const s = String(p);
      if (s.endsWith(".md")) return base(s) in vfs.files;
      return vfs.dirExists;
    },
    readdirSync: () => vfs.dir,
    readFileSync: (p: unknown) => vfs.files[base(p)] ?? "",
  };
  return { ...m, default: m };
});

import { getAllPosts, getAllPostSlugs, getPostBySlug, formatDate } from "../src/lib/posts";

const full = `---
title: Post A
excerpt: Resumen
category: Salud
date: 2026-05-05
author: Autor
coverColor: from-a
---
Cuerpo **md**.
`;

const empty = `---
---
Solo cuerpo.
`;

beforeEach(() => {
  vfs.dirExists = true;
  vfs.dir = [];
  vfs.files = {};
});

describe("getAllPosts", () => {
  it("lee y ordena por fecha descendente", () => {
    vfs.dir = ["a.md", "empty.md", "nota.txt"];
    vfs.files = { "a.md": full, "empty.md": empty };
    const posts = getAllPosts();
    expect(posts).toHaveLength(2);
    expect(posts[0].slug).toBe("a");
    expect(posts[1].title).toBe("empty");
  });

  it("devuelve [] si no existe el directorio", () => {
    vfs.dirExists = false;
    expect(getAllPosts()).toEqual([]);
  });
});

describe("getAllPostSlugs", () => {
  it("devuelve los slugs de los .md", () => {
    vfs.dir = ["a.md", "nota.txt"];
    expect(getAllPostSlugs()).toEqual(["a"]);
  });

  it("devuelve [] si no existe el directorio", () => {
    vfs.dirExists = false;
    expect(getAllPostSlugs()).toEqual([]);
  });
});

describe("getPostBySlug", () => {
  it("compila el markdown con frontmatter completo", async () => {
    vfs.files = { "post-a.md": full };
    const post = await getPostBySlug("post-a");
    expect(post?.title).toBe("Post A");
    expect(post?.contentHtml).toContain("<");
  });

  it("aplica valores por defecto con frontmatter vacío", async () => {
    vfs.files = { "vacio.md": empty };
    const post = await getPostBySlug("vacio");
    expect(post?.title).toBe("vacio");
    expect(post?.author).toContain("Hospital");
  });

  it("devuelve null si el archivo no existe", async () => {
    expect(await getPostBySlug("no-existe")).toBeNull();
  });
});

describe("re-exporta formatDate", () => {
  it("está disponible desde posts", () => {
    expect(formatDate("")).toBe("");
  });
});
