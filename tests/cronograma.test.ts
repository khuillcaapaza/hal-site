import { describe, it, expect } from "vitest";
import { monthLabelFromKey, normalizeWeekday, WEEKDAYS } from "../src/lib/cronograma";

describe("monthLabelFromKey", () => {
  it("convierte YYYY-MM en etiqueta legible", () => {
    expect(monthLabelFromKey("2026-06")).toBe("Junio 2026");
  });

  it("devuelve la entrada si no cumple el formato", () => {
    expect(monthLabelFromKey("bad")).toBe("bad");
  });

  it("devuelve la entrada si el mes está fuera de rango", () => {
    expect(monthLabelFromKey("2026-13")).toBe("2026-13");
  });
});

describe("normalizeWeekday", () => {
  it("normaliza variantes con y sin tilde", () => {
    expect(normalizeWeekday("lunes")).toBe("Lunes");
    expect(normalizeWeekday("MARTES")).toBe("Martes");
    expect(normalizeWeekday("miercoles")).toBe("Miércoles");
    expect(normalizeWeekday("miércoles")).toBe("Miércoles");
    expect(normalizeWeekday("sabado")).toBe("Sábado");
    expect(normalizeWeekday("Sábado")).toBe("Sábado");
  });

  it("devuelve null para valores desconocidos o vacíos", () => {
    expect(normalizeWeekday("xyz")).toBeNull();
    expect(normalizeWeekday(null)).toBeNull();
    expect(normalizeWeekday(undefined)).toBeNull();
  });

  it("expone las claves de días", () => {
    expect(WEEKDAYS).toContain("Domingo");
  });
});
