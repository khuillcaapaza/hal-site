import { describe, it, expect, vi, beforeEach } from "vitest";
import filesJson from "../src/lib/convocatorias-files.json";
import {
  fetchConvocatorias,
  getAllConvocatorias,
  getConvocatoriaBySlug,
  getAllConvocatoriaSlugs,
} from "../src/lib/convocatorias";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

const ok = (body: unknown) => ({ ok: true, json: async () => body });
const notOk = { ok: false, json: async () => ({}) };

beforeEach(() => {
  fetchMock.mockReset();
});

describe("fetchConvocatorias", () => {
  it("mapea respuesta y paginación con todos los filtros", async () => {
    fetchMock.mockResolvedValueOnce(
      ok({
        convocatorias: [
          { slug: "a", title: "A", area: "RH", date: "2026-06-15", status: "abierta", description: "d", archivos: 3 },
          { slug: "b", title: "B", area: "", date: "", status: "", description: "" },
        ],
        meta: { total: 2, page: 1, per_page: 12, total_pages: 1, years: [2026] },
      }),
    );
    const page = await fetchConvocatorias({ q: "x", area: "RH", year: 2026, month: 6, page: 1, perPage: 12 });
    expect(page.items).toHaveLength(2);
    expect(page.items[0].year).toBe(2026);
    expect(page.items[1].year).toBe(0);
    expect(page.items[0].fileCount).toBe(3);
    expect(page.items[1].fileCount).toBe(0);
    expect(page.years).toEqual([2026]);
    expect(String(fetchMock.mock.calls[0][0])).toContain("?");
  });

  it("usa valores por defecto cuando faltan datos y meta", async () => {
    fetchMock.mockResolvedValueOnce(ok({}));
    const page = await fetchConvocatorias();
    expect(page.items).toEqual([]);
    expect(page.total).toBe(0);
    expect(page.years).toEqual([]);
    expect(String(fetchMock.mock.calls[0][0])).not.toContain("?");
  });

  it("devuelve página vacía si la respuesta no es OK", async () => {
    fetchMock.mockResolvedValueOnce(notOk);
    expect((await fetchConvocatorias()).items).toEqual([]);
  });

  it("devuelve página vacía si fetch lanza", async () => {
    fetchMock.mockRejectedValueOnce(new Error("net"));
    expect((await fetchConvocatorias()).items).toEqual([]);
  });
});

describe("getAllConvocatorias", () => {
  it("devuelve los items de la primera página", async () => {
    fetchMock.mockResolvedValueOnce(ok({ convocatorias: [{ slug: "a", date: "2026-06-15" }], meta: {} }));
    expect(await getAllConvocatorias()).toHaveLength(1);
  });
});

describe("getConvocatoriaBySlug", () => {
  it("mapea el detalle con archivos y cuerpo", async () => {
    fetchMock.mockResolvedValueOnce(
      ok({
        convocatoria: {
          slug: "a", title: "A", area: "RH", date: "2026-06-15", status: "abierta", description: "d", archivos: 2,
          cuerpo: "texto",
          files: [
            { name: "f", label: "L", ext: "PDF", href: "/h" },
            { name: "g", label: "G", href: "/g" },
          ],
        },
      }),
    );
    const c = await getConvocatoriaBySlug("a");
    expect(c?.files[0].ext).toBe("pdf");
    expect(c?.files[1].ext).toBe("");
    expect(c?.cuerpo).toBe("texto");
    expect(c?.fileCount).toBe(2);
  });

  it("usa valores por defecto cuando faltan archivos y cuerpo", async () => {
    fetchMock.mockResolvedValueOnce(ok({ convocatoria: { slug: "b", date: "" } }));
    const c = await getConvocatoriaBySlug("b");
    expect(c?.files).toEqual([]);
    expect(c?.cuerpo).toBe("");
  });

  it("devuelve null si no hay convocatoria en la respuesta", async () => {
    fetchMock.mockResolvedValueOnce(ok({}));
    expect(await getConvocatoriaBySlug("x")).toBeNull();
  });

  it("devuelve null si la respuesta no es OK", async () => {
    fetchMock.mockResolvedValueOnce(notOk);
    expect(await getConvocatoriaBySlug("x")).toBeNull();
  });

  it("devuelve null si fetch lanza", async () => {
    fetchMock.mockRejectedValueOnce(new Error("net"));
    expect(await getConvocatoriaBySlug("x")).toBeNull();
  });
});

describe("getAllConvocatoriaSlugs", () => {
  it("devuelve los slugs de la API cuando existen", async () => {
    fetchMock.mockResolvedValueOnce(
      ok({ convocatorias: [{ slug: "a", date: "" }, { slug: "b", date: "" }], meta: {} }),
    );
    expect(await getAllConvocatoriaSlugs()).toEqual(["a", "b"]);
  });

  it("recurre a los slugs estáticos si la API no responde", async () => {
    fetchMock.mockResolvedValueOnce(ok({ convocatorias: [], meta: {} }));
    expect(await getAllConvocatoriaSlugs()).toEqual(Object.keys(filesJson));
  });
});
