// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { ConvocatoriaMeta, ConvocatoriasPage } from "@/lib/convocatorias";
import ConvocatoriasSection from "@/components/ConvocatoriasSection";

const { fetchConvocatorias } = vi.hoisted(() => ({
  fetchConvocatorias: vi.fn(),
}));

vi.mock("@/lib/convocatorias", () => ({ fetchConvocatorias }));

const item = (over: Partial<ConvocatoriaMeta>): ConvocatoriaMeta => ({
  slug: "c-1",
  title: "Convocatoria 1",
  area: "CAS",
  date: "2026-01-10",
  year: 2026,
  month: 1,
  day: 10,
  status: "Abierta",
  description: "Descripción",
  fileCount: 2,
  ...over,
});

const page = (items: ConvocatoriaMeta[]): ConvocatoriasPage => ({
  items,
  total: items.length,
  page: 1,
  perPage: 8,
  totalPages: 1,
  years: [2026],
});

let scrollBySpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchConvocatorias.mockReset();
  scrollBySpy = vi.fn();
  // jsdom does not implement Element.scrollBy.
  (Element.prototype as unknown as { scrollBy: unknown }).scrollBy = scrollBySpy;
});

afterEach(() => {
  delete (Element.prototype as unknown as { scrollBy?: unknown }).scrollBy;
});

describe("ConvocatoriasSection", () => {
  it("renders nothing when there are no convocatorias", async () => {
    fetchConvocatorias.mockResolvedValue(page([]));
    const { container } = render(<ConvocatoriasSection />);
    await waitFor(() => expect(fetchConvocatorias).toHaveBeenCalled());
    expect(container.firstChild).toBeNull();
  });

  it("renders cards and scrolls the track with the controls", async () => {
    fetchConvocatorias.mockResolvedValue(
      page([
        item({ slug: "a", title: "CAS Abierta", area: "CAS", status: "Abierta", fileCount: 2 }),
        item({ slug: "b", title: "Otra Cerrada", area: "Otra", status: "Cerrada", fileCount: 1 }),
      ]),
    );
    render(<ConvocatoriasSection />);

    expect(await screen.findByText("CAS Abierta")).toBeInTheDocument();
    expect(screen.getByText("Otra Cerrada")).toBeInTheDocument();
    // Plural and singular document counts.
    expect(screen.getByText("2 documentos")).toBeInTheDocument();
    expect(screen.getByText("1 documento")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Siguiente"));
    fireEvent.click(screen.getByLabelText("Anterior"));

    expect(scrollBySpy).toHaveBeenCalledTimes(2);
    expect(scrollBySpy.mock.calls[0][0]).toMatchObject({ behavior: "smooth" });
    expect(scrollBySpy.mock.calls[0][0].left).toBeGreaterThan(0);
    expect(scrollBySpy.mock.calls[1][0].left).toBeLessThan(0);
  });
});
