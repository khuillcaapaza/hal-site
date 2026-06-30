// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HealthPlan from "@/components/HealthPlan";
import { insurance } from "@/lib/site";

describe("HealthPlan", () => {
  it("renders the insurance title, intro and every item", () => {
    render(<HealthPlan />);

    expect(
      screen.getByRole("heading", { name: insurance.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(insurance.intro)).toBeInTheDocument();

    for (const item of insurance.items) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });
});
