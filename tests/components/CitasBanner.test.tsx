// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { WEEKDAYS, type Cronograma } from "@/lib/cronograma";
import CitasBanner from "@/components/CitasBanner";

const { getCronogramaBySlug } = vi.hoisted(() => ({
  getCronogramaBySlug: vi.fn(),
}));

vi.mock("@/lib/api", () => ({ getCronogramaBySlug }));

const cronograma = (over: Partial<Cronograma>): Cronograma => ({
  slug: "2026-06",
  month: "2026-06",
  monthLabel: "Junio 2026",
  title: "Cronograma",
  excerpt: "",
  contentHtml: "",
  areas: [],
  ...over,
});

beforeEach(() => {
  getCronogramaBySlug.mockReset();
});

describe("CitasBanner", () => {
  it("shows the loading placeholder before the cronograma resolves", () => {
    getCronogramaBySlug.mockReturnValue(new Promise(() => {}));
    render(<CitasBanner />);
    expect(screen.getAllByText("Programación mensual").length).toBeGreaterThan(0);
    expect(screen.getByText("Hoy")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("lists the areas available today, including with and without time/location", async () => {
    getCronogramaBySlug.mockResolvedValue(
      cronograma({
        areas: [
          { area: "Cardiología", days: [...WEEKDAYS], time: "08:00", location: "Piso 2" },
          { area: "Pediatría", days: [...WEEKDAYS] },
        ],
      }),
    );
    render(<CitasBanner />);

    expect(await screen.findByText("Cardiología")).toBeInTheDocument();
    expect(screen.getByText("Pediatría")).toBeInTheDocument();
    expect(screen.getByText("Piso 2")).toBeInTheDocument();
    expect(screen.getByText("08:00")).toBeInTheDocument();
  });

  it("shows the no-delivery message when the cronograma exists but nothing matches today", async () => {
    getCronogramaBySlug.mockResolvedValue(
      cronograma({ areas: [{ area: "Nada", days: [] }] }),
    );
    render(<CitasBanner />);
    expect(
      await screen.findByText("Hoy no hay entrega de citas en Consulta Externa."),
    ).toBeInTheDocument();
  });

  it("shows the not-published message when there is no cronograma", async () => {
    getCronogramaBySlug.mockResolvedValue(null);
    render(<CitasBanner />);
    expect(
      await screen.findByText("Aún no se ha publicado el cronograma de este mes."),
    ).toBeInTheDocument();
  });

  it("falls back to the not-published message when the request throws", async () => {
    getCronogramaBySlug.mockRejectedValue(new Error("network"));
    render(<CitasBanner />);
    expect(
      await screen.findByText("Aún no se ha publicado el cronograma de este mes."),
    ).toBeInTheDocument();
  });

  it("ignores a resolved response that arrives after unmount", async () => {
    let resolve!: (v: Cronograma | null) => void;
    getCronogramaBySlug.mockReturnValue(
      new Promise((r) => {
        resolve = r;
      }),
    );
    const { unmount } = render(<CitasBanner />);
    unmount();
    resolve(cronograma({ areas: [] }));
    await new Promise((r) => setTimeout(r, 0));
  });

  it("ignores a rejected response that arrives after unmount", async () => {
    let reject!: (e: unknown) => void;
    getCronogramaBySlug.mockReturnValue(
      new Promise((_, r) => {
        reject = r;
      }),
    );
    const { unmount } = render(<CitasBanner />);
    unmount();
    reject(new Error("late"));
    await new Promise((r) => setTimeout(r, 0));
  });
});
