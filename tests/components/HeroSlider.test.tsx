// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import HeroSlider from "@/components/HeroSlider";
import { heroSlides } from "@/lib/site";

afterEach(() => {
  vi.useRealTimers();
});

describe("HeroSlider", () => {
  it("starts on the first slide and advances/rewinds with the controls", () => {
    render(<HeroSlider />);

    expect(screen.getByText(heroSlides[0].eyebrow)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Siguiente"));
    expect(screen.getByText(heroSlides[1].eyebrow)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Anterior"));
    expect(screen.getByText(heroSlides[0].eyebrow)).toBeInTheDocument();
  });

  it("wraps around when going before the first slide", () => {
    render(<HeroSlider />);
    fireEvent.click(screen.getByLabelText("Anterior"));
    expect(
      screen.getByText(heroSlides[heroSlides.length - 1].eyebrow),
    ).toBeInTheDocument();
  });

  it("jumps to a slide when a dot is clicked", () => {
    render(<HeroSlider />);
    fireEvent.click(screen.getByLabelText("Ir a la diapositiva 3"));
    expect(screen.getByText(heroSlides[2].eyebrow)).toBeInTheDocument();
  });

  it("auto-advances slides on a timer", () => {
    vi.useFakeTimers();
    render(<HeroSlider />);
    expect(screen.getByText(heroSlides[0].eyebrow)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(screen.getByText(heroSlides[1].eyebrow)).toBeInTheDocument();
  });
});
