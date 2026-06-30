// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

describe("Footer", () => {
  it("renders brand, contact info, link columns and social links", () => {
    render(<Footer />);

    expect(screen.getByText("Hospital Antonio Lorena")).toBeInTheDocument();
    expect(screen.getByText(site.tagline)).toBeInTheDocument();
    expect(screen.getByText(site.contact.phone)).toBeInTheDocument();
    expect(screen.getByText(site.contact.address)).toBeInTheDocument();
    expect(screen.getByText(site.contact.consultas)).toBeInTheDocument();

    // Column items
    expect(screen.getByText("Emergencias 24 horas")).toBeInTheDocument();
    expect(screen.getByText("Nuestra Historia")).toBeInTheDocument();
    expect(screen.getByText("Reporte Epidemiológico")).toBeInTheDocument();

    // Logo image
    const logo = screen.getByAltText("Hospital Antonio Lorena");
    expect(logo).toHaveAttribute("src", "/images/logo.png");

    // Socials
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();

    // Webmail link (the label also appears in the "Enlaces" column).
    const correoLinks = screen.getAllByRole("link", {
      name: "Correo Institucional",
    });
    expect(
      correoLinks.some(
        (a) => a.getAttribute("href") === site.contact.webmail,
      ),
    ).toBe(true);
  });
});
