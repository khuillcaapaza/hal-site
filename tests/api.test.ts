import { describe, it, expect, vi, beforeEach } from "vitest";
import { monthLabelFromKey } from "../src/lib/cronograma";

const mocks = vi.hoisted(() => {
  const instance = { get: vi.fn() };
  const axiosDefault = {
    create: vi.fn(() => instance),
    isAxiosError: (e: { isAxiosError?: boolean } | null | undefined) =>
      Boolean(e && e.isAxiosError),
  };
  return { instance, axiosDefault };
});

vi.mock("axios", () => ({ default: mocks.axiosDefault }));

import {
  getAllCronogramas,
  getAllCronogramaSlugs,
  getCronogramaBySlug,
} from "../src/lib/api";

beforeEach(() => {
  mocks.instance.get.mockReset();
});

describe("getAllCronogramas", () => {
  it("mapea y ordena descendente, con fallbacks", async () => {
    mocks.instance.get.mockResolvedValueOnce({
      data: {
        cronogramas: [
          { mes: "2026-05", monthLabel: "Mayo 2026", titulo: "T", excerpt: "E" },
          { mes: "2026-06" },
        ],
      },
    });
    const list = await getAllCronogramas();
    expect(list).toHaveLength(2);
    expect(list[0].slug).toBe("2026-06");
    expect(list[0].monthLabel).toBe(monthLabelFromKey("2026-06"));
    expect(list[0].title).toContain("Cronograma de citas");
    expect(list[1].monthLabel).toBe("Mayo 2026");
  });

  it("devuelve [] si la API no envía un array", async () => {
    mocks.instance.get.mockResolvedValueOnce({ data: {} });
    expect(await getAllCronogramas()).toEqual([]);
  });
});

describe("getAllCronogramaSlugs", () => {
  it("devuelve los slugs", async () => {
    mocks.instance.get.mockResolvedValueOnce({ data: { cronogramas: [{ mes: "2026-05" }] } });
    expect(await getAllCronogramaSlugs()).toEqual(["2026-05"]);
  });

  it("devuelve [] si falla la petición", async () => {
    mocks.instance.get.mockRejectedValueOnce(new Error("x"));
    expect(await getAllCronogramaSlugs()).toEqual([]);
  });
});

describe("getCronogramaBySlug", () => {
  it("mapea cuerpo markdown y áreas", async () => {
    mocks.instance.get.mockResolvedValueOnce({
      data: {
        cronograma: {
          mes: "2026-05",
          titulo: "T",
          indicaciones: "# Hola\n\n- a\n- b",
          areas: [
            { area: "Cardio", days: ["lunes", "xxx", "martes"], time: "08:00", location: "P1", note: "n" },
            { area: "Lab", days: "no-array" },
            { days: ["lunes"] },
          ],
        },
      },
    });
    const c = await getCronogramaBySlug("2026-05");
    expect(c?.contentHtml).toContain("<");
    expect(c?.areas[0].days).toEqual(["Lunes", "Martes"]);
    expect(c?.areas[0].time).toBe("08:00");
    expect(c?.areas[1].days).toEqual([]);
    expect(c?.areas[1].time).toBeUndefined();
    expect(c?.areas[2].area).toBe("Área");
  });

  it("mapea sin indicaciones ni áreas", async () => {
    mocks.instance.get.mockResolvedValueOnce({ data: { cronograma: { mes: "2026-07" } } });
    const c = await getCronogramaBySlug("2026-07");
    expect(c?.contentHtml).toBe("");
    expect(c?.areas).toEqual([]);
  });

  it("devuelve null si no hay cronograma", async () => {
    mocks.instance.get.mockResolvedValueOnce({ data: {} });
    expect(await getCronogramaBySlug("x")).toBeNull();
  });

  it("devuelve null ante un 404 de axios", async () => {
    mocks.instance.get.mockRejectedValueOnce({ isAxiosError: true, response: { status: 404 } });
    expect(await getCronogramaBySlug("x")).toBeNull();
  });

  it("relanza ante errores axios distintos de 404", async () => {
    mocks.instance.get.mockRejectedValueOnce({ isAxiosError: true, response: { status: 500 } });
    await expect(getCronogramaBySlug("x")).rejects.toBeDefined();
  });

  it("relanza ante errores que no son de axios", async () => {
    mocks.instance.get.mockRejectedValueOnce(new Error("net"));
    await expect(getCronogramaBySlug("x")).rejects.toThrow("net");
  });
});
