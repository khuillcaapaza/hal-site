// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DoctorFinder from "@/components/DoctorFinder";

describe("DoctorFinder", () => {
  it("filters specialties as the user types and shows an empty state", async () => {
    const user = userEvent.setup();
    render(<DoctorFinder />);

    // Initially all specialties are shown.
    expect(screen.getByText("Cardiología")).toBeInTheDocument();
    expect(screen.getByText("Pediatría")).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Buscar especialidad...");

    // Matching query narrows the list.
    await user.type(input, "cardio");
    expect(screen.getByText("Cardiología")).toBeInTheDocument();
    expect(screen.queryByText("Pediatría")).not.toBeInTheDocument();

    // Non-matching query shows the empty message.
    await user.clear(input);
    await user.type(input, "zzz");
    expect(
      screen.getByText("No se encontró esa especialidad."),
    ).toBeInTheDocument();
  });
});
