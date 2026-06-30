import { describe, it, expect, vi, beforeEach } from "vitest";

const vfs = vi.hoisted(() => ({ dirExists: true, dir: [] as string[] }));

vi.mock("fs", async (importActual) => {
  const actual = (await importActual()) as Record<string, unknown>;
  const m = {
    ...actual,
    existsSync: () => vfs.dirExists,
    readdirSync: () => vfs.dir,
  };
  return { ...m, default: m };
});

vi.mock("@/lib/api", () => ({ getAllCronogramaSlugs: vi.fn() }));

import { getCronogramaSlugsForBuild } from "../src/lib/cronograma-build";
import { getAllCronogramaSlugs } from "@/lib/api";

beforeEach(() => {
  vfs.dirExists = true;
  vfs.dir = [];
  vi.mocked(getAllCronogramaSlugs).mockReset();
});

describe("getCronogramaSlugsForBuild", () => {
  it("une slugs locales y de la API sin duplicados", async () => {
    vfs.dir = ["2026-05.md", "2026-06.md", "nota.txt"];
    vi.mocked(getAllCronogramaSlugs).mockResolvedValue(["2026-06", "2026-07"]);
    const slugs = await getCronogramaSlugsForBuild();
    expect([...slugs].sort()).toEqual(["2026-05", "2026-06", "2026-07"]);
  });

  it("usa solo los de la API si no hay directorio local", async () => {
    vfs.dirExists = false;
    vi.mocked(getAllCronogramaSlugs).mockResolvedValue(["2026-07"]);
    expect(await getCronogramaSlugsForBuild()).toEqual(["2026-07"]);
  });
});
