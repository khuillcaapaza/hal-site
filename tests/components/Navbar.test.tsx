// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  it("renders top bar, logo and desktop nav with a dropdown group", () => {
    render(<Navbar />);

    expect(screen.getByAltText("Hospital Antonio Lorena")).toHaveAttribute(
      "src",
      "/images/logo.png",
    );
    // Simple link and dropdown parent both present.
    expect(screen.getAllByText("Inicio").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Nosotros").length).toBeGreaterThan(0);
    // Dropdown child rendered (desktop dropdown).
    expect(screen.getAllByText("Historia").length).toBeGreaterThan(0);
  });

  it("toggles the mobile menu and closes it when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const burger = screen.getByLabelText("Abrir menú");

    // Closed: only the desktop CTA exists.
    expect(screen.getAllByText("Contáctanos")).toHaveLength(1);

    // Open the mobile menu.
    await user.click(burger);
    expect(screen.getAllByText("Contáctanos")).toHaveLength(2);

    // Clicking a mobile dropdown child closes the menu.
    const historias = screen.getAllByText("Historia");
    await user.click(historias[historias.length - 1]);
    expect(screen.getAllByText("Contáctanos")).toHaveLength(1);

    // Re-open and close via a simple mobile link.
    await user.click(burger);
    expect(screen.getAllByText("Contáctanos")).toHaveLength(2);
    const inicios = screen.getAllByText("Inicio");
    await user.click(inicios[inicios.length - 1]);
    expect(screen.getAllByText("Contáctanos")).toHaveLength(1);
  });
});
