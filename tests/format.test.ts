import { describe, it, expect } from "vitest";
import { formatDate } from "../src/lib/format";

describe("formatDate", () => {
  it("devuelve cadena vacía si no hay fecha", () => {
    expect(formatDate("")).toBe("");
  });

  it("devuelve la entrada si la fecha es inválida", () => {
    expect(formatDate("no-es-fecha")).toBe("no-es-fecha");
  });

  it("formatea una fecha ISO válida", () => {
    const out = formatDate("2026-05-15");
    expect(out).toContain("2026");
    expect(out).not.toBe("2026-05-15");
  });
});
