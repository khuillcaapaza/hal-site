// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EnlacesInteres from "@/components/EnlacesInteres";
import { enlacesInteres } from "@/lib/site";

describe("EnlacesInteres", () => {
  it("renders every institutional link with its name, full label and href", () => {
    render(<EnlacesInteres />);

    expect(
      screen.getByRole("heading", { name: "Enlaces de interés" }),
    ).toBeInTheDocument();

    for (const link of enlacesInteres) {
      expect(screen.getByText(link.name)).toBeInTheDocument();
      expect(screen.getByText(link.full)).toBeInTheDocument();
      const anchor = screen.getByText(link.name).closest("a");
      expect(anchor).toHaveAttribute("href", link.href);
      expect(anchor).toHaveAttribute("target", "_blank");
    }
  });
});
