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

import { getAllOficinas, getAllOficinaSlugs, getOficinaBySlug } from "../src/lib/oficinas";

const full = `---
title: Oficina A
excerpt: Desc A
category: Apoyo
order: 1
authorities:
  - role: Jefe
    name: Juan
  - "solo-texto"
links:
  - title: Portal
    url: https://x
  - title: SinUrl
resources:
  - title: Doc
    description: d
    file: f.pdf
    size: 1MB
  - title: SinFile
contact:
  phone: "084"
  email: a@b.pe
  schedule: 9-5
location:
  building: B
  floor: "2"
  reference: ref
  mapUrl: https://map
---
Cuerpo A.
`;

const minimal = `---
title: Oficina B
---
Cuerpo B.
`;

beforeEach(() => {
  vfs.dirExists = true;
  vfs.dir = [];
  vfs.files = {};
});

describe("getAllOficinas", () => {
  it("lee metadatos y ordena por orden y título", () => {
    vfs.dir = ["a.md", "b.md", "nota.txt"];
    vfs.files = { "a.md": full, "b.md": minimal };
    const list = getAllOficinas();
    expect(list).toHaveLength(2);
    expect(list[0].order).toBe(1);
    expect(list[1].order).toBe(999);
    expect(list[1].category).toBe("Oficina");
  });

  it("devuelve [] si no existe el directorio", () => {
    vfs.dirExists = false;
    expect(getAllOficinas()).toEqual([]);
  });
});

describe("getAllOficinaSlugs", () => {
  it("devuelve los slugs de los .md", () => {
    vfs.dir = ["a.md", "nota.txt"];
    expect(getAllOficinaSlugs()).toEqual(["a"]);
  });

  it("devuelve [] si no existe el directorio", () => {
    vfs.dirExists = false;
    expect(getAllOficinaSlugs()).toEqual([]);
  });
});

describe("getOficinaBySlug", () => {
  it("parsea listas y objetos del frontmatter", async () => {
    vfs.files = { "oficina-a.md": full };
    const of = await getOficinaBySlug("oficina-a");
    expect(of?.authorities).toHaveLength(1);
    expect(of?.links).toHaveLength(1);
    expect(of?.resources).toHaveLength(1);
    expect(of?.resources[0].size).toBe("1MB");
    expect(of?.contact.phone).toBe("084");
    expect(of?.location.building).toBe("B");
    expect(of?.contentHtml).toContain("<");
  });

  it("aplica valores vacíos cuando faltan secciones", async () => {
    vfs.files = { "oficina-b.md": minimal };
    const of = await getOficinaBySlug("oficina-b");
    expect(of?.authorities).toEqual([]);
    expect(of?.links).toEqual([]);
    expect(of?.resources).toEqual([]);
    expect(of?.contact.phone).toBeUndefined();
    expect(of?.location.building).toBeUndefined();
  });

  it("devuelve null si no existe el archivo", async () => {
    expect(await getOficinaBySlug("no-existe")).toBeNull();
  });
});
