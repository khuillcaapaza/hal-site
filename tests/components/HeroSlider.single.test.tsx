// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// A single slide disables the autoplay timer (total <= 1 early return).
vi.mock("@/lib/site", () => ({
  heroSlides: [
    {
      image: "/x.jpg",
      eyebrow: "Diapositiva única",
      title: "Título",
      highlight: "Destacado",
      text: "Texto",
      primary: { label: "Primario", href: "#p" },
      secondary: { label: "Secundario", href: "#s" },
    },
  ],
}));

import HeroSlider from "@/components/HeroSlider";

describe("HeroSlider (single slide)", () => {
  it("renders the only slide without starting autoplay", () => {
    render(<HeroSlider />);
    expect(screen.getByText("Diapositiva única")).toBeInTheDocument();
  });
});
