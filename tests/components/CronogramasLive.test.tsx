// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { CronogramaMeta } from "@/lib/cronograma";
import CronogramasLive from "@/components/CronogramasLive";

const { getAllCronogramas } = vi.hoisted(() => ({
  getAllCronogramas: vi.fn(),
}));

vi.mock("@/lib/api", () => ({ getAllCronogramas }));

const meta = (over: Partial<CronogramaMeta>): CronogramaMeta => ({
  slug: "2026-06",
  month: "2026-06",
  monthLabel: "Junio 2026",
  title: "Cronograma de junio",
  excerpt: "Resumen de junio",
  ...over,
});

beforeEach(() => {
  getAllCronogramas.mockReset();
});

describe("CronogramasLive", () => {
  it("shows the loading skeleton before data resolves", () => {
    getAllCronogramas.mockReturnValue(new Promise(() => {}));
    const { container } = render(<CronogramasLive />);
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
  });

  it("renders an error message when the request fails", async () => {
    getAllCronogramas.mockRejectedValue(new Error("boom"));
    render(<CronogramasLive />);
    expect(
      await screen.findByText(/No se pudieron cargar los cronogramas/),
    ).toBeInTheDocument();
  });

  it("renders the empty state when there are no cronogramas", async () => {
    getAllCronogramas.mockResolvedValue([]);
    render(<CronogramasLive />);
    expect(
      await screen.findByText(/Por el momento no hay cronogramas publicados/),
    ).toBeInTheDocument();
  });

  it("renders cronograma cards, with and without excerpt", async () => {
    getAllCronogramas.mockResolvedValue([
      meta({ slug: "2026-06", title: "Junio", excerpt: "Con resumen" }),
      meta({ slug: "2026-07", title: "Julio", monthLabel: "Julio 2026", excerpt: "" }),
    ]);
    render(<CronogramasLive />);

    expect(await screen.findByText("Junio")).toBeInTheDocument();
    expect(screen.getByText("Con resumen")).toBeInTheDocument();
    expect(screen.getByText("Julio")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Junio").closest("a")).toHaveAttribute(
        "href",
        "/cronograma-citas/2026-06",
      );
    });
  });

  it("ignores a resolved response that arrives after unmount", async () => {
    let resolve!: (v: CronogramaMeta[]) => void;
    getAllCronogramas.mockReturnValue(
      new Promise((r) => {
        resolve = r;
      }),
    );
    const { unmount } = render(<CronogramasLive />);
    unmount();
    resolve([meta({})]);
    await new Promise((r) => setTimeout(r, 0));
  });

  it("ignores a rejected response that arrives after unmount", async () => {
    let reject!: (e: unknown) => void;
    getAllCronogramas.mockReturnValue(
      new Promise((_, r) => {
        reject = r;
      }),
    );
    const { unmount } = render(<CronogramasLive />);
    unmount();
    reject(new Error("late"));
    await new Promise((r) => setTimeout(r, 0));
  });
});
