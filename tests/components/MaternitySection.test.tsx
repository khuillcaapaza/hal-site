// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MaternitySection from "@/components/MaternitySection";

describe("MaternitySection", () => {
  it("renders the history heading, milestones and the historical photo", () => {
    render(<MaternitySection />);

    expect(
      screen.getByRole("heading", {
        name: /Más de 90 años al servicio de la salud en el Cusco/,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Fundado en 1933 como Hospital Mixto del Cusco"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Hospital de referencia del sur del país"),
    ).toBeInTheDocument();
    expect(screen.getByText("Desde 1933")).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/images/FOTO-ANTIGUA-4-1024x648.png");

    const link = screen.getByRole("link", {
      name: /Conoce más sobre nosotros/,
    });
    expect(link).toHaveAttribute("href", "/blog");
  });
});
