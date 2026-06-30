// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { ConvocatoriaMeta, ConvocatoriasPage } from "@/lib/convocatorias";
import ConvocatoriasList from "@/components/ConvocatoriasList";

const { fetchConvocatorias } = vi.hoisted(() => ({
  fetchConvocatorias: vi.fn(),
}));

vi.mock("@/lib/convocatorias", () => ({ fetchConvocatorias }));

const item = (over: Partial<ConvocatoriaMeta>): ConvocatoriaMeta => ({
  slug: "c",
  title: "Convocatoria",
  area: "CAS",
  date: "2026-07-05",
  year: 2026,
  month: 7,
  day: 5,
  status: "Abierta",
  description: "Descripción",
  fileCount: 2,
  ...over,
});

const pageResult = (over: Partial<ConvocatoriasPage>): ConvocatoriasPage => ({
  items: [],
  total: 0,
  page: 1,
  perPage: 6,
  totalPages: 1,
  years: [],
  ...over,
});

beforeEach(() => {
  fetchConvocatorias.mockReset();
});

describe("ConvocatoriasList", () => {
  it("groups results by year/month and paginates", async () => {
    const page1 = pageResult({
      items: [
        item({ slug: "p1a", title: "Conv P1A", area: "CAS", status: "Abierta", year: 2026, month: 7 }),
        item({ slug: "p1b", title: "Conv P1B", area: "Rara", status: "Cerrada", year: 2026, month: 6, fileCount: 1 }),
        item({ slug: "p1c", title: "Conv P1C", area: "Nombramiento", status: "Abierta", year: 2025, month: 12, fileCount: 0 }),
      ],
      total: 10,
      totalPages: 2,
      years: [2026, 2025],
    });
    const page2 = pageResult({
      items: [item({ slug: "p2a", title: "Conv P2A", year: 2026, month: 7 })],
      total: 10,
      totalPages: 2,
      years: [],
    });
    fetchConvocatorias.mockImplementation((q: { page?: number }) =>
      Promise.resolve(q.page === 2 ? page2 : page1),
    );

    render(<ConvocatoriasList />);

    // Loading branch shown before data resolves.
    expect(screen.getByText("Cargando convocatorias…")).toBeInTheDocument();

    expect(await screen.findByText("Conv P1A")).toBeInTheDocument();
    expect(screen.getByText("10 convocatorias encontradas")).toBeInTheDocument();
    // Year and month group headings.
    expect(screen.getByRole("heading", { name: "2026" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2025" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Julio" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Diciembre" })).toBeInTheDocument();

    // Pagination: page 1 active, Anterior disabled.
    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeEnabled();

    // Go to page 2.
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(await screen.findByText("Conv P2A")).toBeInTheDocument();
    expect(screen.queryByText("Conv P1A")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Anterior" })).toBeEnabled();

    // Back to page 1 via the numbered button.
    fireEvent.click(screen.getByRole("button", { name: "1" }));
    expect(await screen.findByText("Conv P1A")).toBeInTheDocument();

    // Previous button works too.
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    await screen.findByText("Conv P2A");
    fireEvent.click(screen.getByRole("button", { name: "Anterior" }));
    expect(await screen.findByText("Conv P1A")).toBeInTheDocument();
  });

  it("debounces search, resets the page and shows the empty state; filters by year/month", async () => {
    fetchConvocatorias.mockImplementation((q: { q?: string }) =>
      Promise.resolve(
        q.q
          ? pageResult({ items: [], total: 0, years: [] })
          : pageResult({
              items: [item({ slug: "only", title: "Conv Única", year: 2026, month: 7 })],
              total: 1,
              years: [2026],
            }),
      ),
    );

    render(<ConvocatoriasList />);

    expect(await screen.findByText("Conv Única")).toBeInTheDocument();
    // Singular count.
    expect(screen.getByText("1 convocatoria encontrada")).toBeInTheDocument();

    // Type in the search box -> debounced fetch -> empty state.
    fireEvent.change(screen.getByPlaceholderText("Buscar convocatoria..."), {
      target: { value: "zzz" },
    });
    expect(
      await screen.findByText(
        "No se encontraron convocatorias con los filtros seleccionados.",
      ),
    ).toBeInTheDocument();

    // Change year and month filters.
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "2026" } });
    fireEvent.change(selects[1], { target: { value: "3" } });

    await waitFor(() => {
      const calls = fetchConvocatorias.mock.calls.map((c) => c[0]);
      expect(calls.some((c) => c.year === "2026")).toBe(true);
      expect(calls.some((c) => c.month === "3")).toBe(true);
    });
  });

  it("swallows fetch errors and shows no results", async () => {
    fetchConvocatorias.mockRejectedValue(new Error("network"));
    render(<ConvocatoriasList />);
    expect(
      await screen.findByText(
        "No se encontraron convocatorias con los filtros seleccionados.",
      ),
    ).toBeInTheDocument();
  });
});
