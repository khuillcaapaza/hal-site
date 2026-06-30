// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Convocatoria } from "@/lib/convocatorias";
import ConvocatoriaDetail from "@/components/ConvocatoriaDetail";

const { getConvocatoriaBySlug } = vi.hoisted(() => ({
  getConvocatoriaBySlug: vi.fn(),
}));

vi.mock("@/lib/convocatorias", () => ({ getConvocatoriaBySlug }));

const conv = (over: Partial<Convocatoria>): Convocatoria => ({
  slug: "conv-1",
  title: "Convocatoria CAS 001",
  area: "CAS",
  date: "2026-01-10",
  year: 2026,
  month: 1,
  day: 10,
  status: "Abierta",
  description: "Descripción de la convocatoria",
  fileCount: 0,
  cuerpo: "",
  files: [],
  ...over,
});

beforeEach(() => {
  getConvocatoriaBySlug.mockReset();
});

describe("ConvocatoriaDetail", () => {
  it("shows the loading state first", () => {
    getConvocatoriaBySlug.mockReturnValue(new Promise(() => {}));
    render(<ConvocatoriaDetail slug="conv-1" />);
    expect(screen.getByText("Cargando convocatoria…")).toBeInTheDocument();
  });

  it("shows a not-found state when the convocatoria is null", async () => {
    getConvocatoriaBySlug.mockResolvedValue(null);
    render(<ConvocatoriaDetail slug="missing" />);
    expect(
      await screen.findByText("Convocatoria no encontrada"),
    ).toBeInTheDocument();
  });

  it("renders the detail with documents (image and non-image) when open and dated", async () => {
    getConvocatoriaBySlug.mockResolvedValue(
      conv({
        status: "Abierta",
        date: "2026-01-10",
        files: [
          { name: "bases", label: "Bases del proceso", href: "/x/bases.pdf", ext: "pdf" },
          { name: "foto", label: "Cartel", href: "/x/foto.jpg", ext: "jpg" },
        ],
      }),
    );
    render(<ConvocatoriaDetail slug="conv-1" />);

    expect(
      await screen.findByRole("heading", { name: "Convocatoria CAS 001" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Publicada:/)).toBeInTheDocument();
    expect(screen.getByText("Bases del proceso")).toBeInTheDocument();
    expect(screen.getByText("Cartel")).toBeInTheDocument();
    expect(screen.getAllByText("Ver").length).toBe(2);
    expect(screen.getAllByText("Descargar").length).toBe(2);
  });

  it("renders the empty-documents state for a closed, undated convocatoria", async () => {
    getConvocatoriaBySlug.mockResolvedValue(
      conv({ status: "Cerrada", date: "", files: [] }),
    );
    render(<ConvocatoriaDetail slug="conv-1" />);

    expect(
      await screen.findByText(/Aún no hay documentos publicados/),
    ).toBeInTheDocument();
    expect(screen.getByText("Cerrada")).toBeInTheDocument();
    expect(screen.queryByText(/Publicada:/)).not.toBeInTheDocument();
  });
});
