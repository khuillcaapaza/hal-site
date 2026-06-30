// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Cronograma } from "@/lib/cronograma";
import CronogramaDetailLive from "@/components/CronogramaDetailLive";

const { getCronogramaBySlug } = vi.hoisted(() => ({
  getCronogramaBySlug: vi.fn(),
}));

vi.mock("@/lib/api", () => ({ getCronogramaBySlug }));

const cronograma = (over: Partial<Cronograma>): Cronograma => ({
  slug: "2026-07",
  month: "2026-07",
  monthLabel: "Julio 2026",
  title: "Rol de Julio",
  excerpt: "",
  contentHtml: "",
  areas: [],
  ...over,
});

beforeEach(() => {
  getCronogramaBySlug.mockReset();
});

describe("CronogramaDetailLive", () => {
  it("shows the loading skeleton first", () => {
    getCronogramaBySlug.mockReturnValue(new Promise(() => {}));
    const { container } = render(<CronogramaDetailLive slug="2026-07" />);
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
  });

  it("shows a not-found message", async () => {
    getCronogramaBySlug.mockResolvedValue(null);
    render(<CronogramaDetailLive slug="x" />);
    expect(
      await screen.findByText("Cronograma no encontrado"),
    ).toBeInTheDocument();
  });

  it("shows an error message when the request throws", async () => {
    getCronogramaBySlug.mockRejectedValue(new Error("boom"));
    render(<CronogramaDetailLive slug="x" />);
    expect(
      await screen.findByText("No se pudo cargar el cronograma"),
    ).toBeInTheDocument();
  });

  it("renders the full schedule, calendar and markdown body", async () => {
    getCronogramaBySlug.mockResolvedValue(
      cronograma({
        month: "2026-07",
        monthLabel: "Julio 2026",
        excerpt: "Resumen del mes",
        contentHtml: "<p>Cuerpo del cronograma</p>",
        areas: [
          {
            area: "Cardiología",
            days: ["Lunes", "Martes"],
            time: "08:00",
            location: "Piso 2",
            note: "Nota importante",
          },
          { area: "Pediatría", days: [] },
        ],
      }),
    );
    render(<CronogramaDetailLive slug="2026-07" />);

    expect(
      await screen.findByRole("heading", { name: "Rol de Julio" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Resumen del mes")).toBeInTheDocument();
    expect(screen.getByText("Rol por área")).toBeInTheDocument();
    expect(screen.getAllByText("Cardiología").length).toBeGreaterThan(0);
    expect(screen.getByText("Pediatría")).toBeInTheDocument();
    expect(screen.getByText("Nota importante")).toBeInTheDocument();
    expect(screen.getByText("Lunes")).toBeInTheDocument();
    expect(screen.getByText("08:00")).toBeInTheDocument();
    expect(screen.getByText("Piso 2")).toBeInTheDocument();
    // Pediatría has no days/time/location -> three "—" placeholders.
    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(3);
    // Calendar weekday header + markdown body.
    expect(screen.getByText("Lun")).toBeInTheDocument();
    expect(screen.getByText("Cuerpo del cronograma")).toBeInTheDocument();
    expect(screen.getAllByText("Julio 2026").length).toBeGreaterThan(0);
  });

  it("handles an empty schedule and an invalid month key", async () => {
    getCronogramaBySlug.mockResolvedValue(
      cronograma({
        month: "bad-key",
        monthLabel: "Mes",
        excerpt: "",
        contentHtml: "   ",
        areas: [],
      }),
    );
    render(<CronogramaDetailLive slug="bad" />);

    expect(
      await screen.findByRole("heading", { name: "Rol de Julio" }),
    ).toBeInTheDocument();
    // No schedule table is rendered for an empty area list.
    expect(screen.queryByText("Rol por área")).not.toBeInTheDocument();
  });

  it("ignores a resolved response that arrives after unmount", async () => {
    let resolve!: (v: Cronograma | null) => void;
    getCronogramaBySlug.mockReturnValue(
      new Promise((r) => {
        resolve = r;
      }),
    );
    const { unmount } = render(<CronogramaDetailLive slug="x" />);
    unmount();
    resolve(cronograma({}));
    await new Promise((r) => setTimeout(r, 0));
  });

  it("ignores a rejected response that arrives after unmount", async () => {
    let reject!: (e: unknown) => void;
    getCronogramaBySlug.mockReturnValue(
      new Promise((_, r) => {
        reject = r;
      }),
    );
    const { unmount } = render(<CronogramaDetailLive slug="x" />);
    unmount();
    reject(new Error("late"));
    await new Promise((r) => setTimeout(r, 0));
  });
});
