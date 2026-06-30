// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Services from "@/components/Services";
import { services } from "@/lib/site";

describe("Services", () => {
  it("renders every service card with the right link target per `external` flag", () => {
    render(<Services />);

    expect(
      screen.getByRole("heading", { name: "Servicios en línea" }),
    ).toBeInTheDocument();

    for (const svc of services) {
      const heading = screen.getByRole("heading", { name: new RegExp(svc.title) });
      const anchor = heading.closest("a")!;
      expect(anchor).toHaveAttribute("href", svc.href);
      if (svc.external) {
        expect(anchor).toHaveAttribute("target", "_blank");
        expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      } else {
        expect(anchor).not.toHaveAttribute("target");
      }
    }

    // At least one external and one internal service exist (covers both branches).
    expect(services.some((s) => s.external)).toBe(true);
    expect(services.some((s) => !s.external)).toBe(true);
  });
});
