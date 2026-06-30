import { describe, it, expect } from "vitest";
import * as site from "../src/lib/site";

describe("configuración del sitio", () => {
  it("expone los datos institucionales", () => {
    expect(site.site.shortName).toBe("HAL");
    expect(site.navLinks.length).toBeGreaterThan(0);
    expect(site.nosotros.authorities.length).toBeGreaterThan(0);
    expect(site.heroSlides.length).toBeGreaterThan(0);
    expect(site.citas.steps.length).toBeGreaterThan(0);
    expect(site.stats.length).toBeGreaterThan(0);
    expect(site.services.length).toBeGreaterThan(0);
    expect(site.enlacesInteres.length).toBeGreaterThan(0);
    expect(site.documentosGestion.length).toBeGreaterThan(0);
    expect(site.specialties.length).toBeGreaterThan(0);
    expect(site.onlineServices.length).toBeGreaterThan(0);
    expect(site.insurance.items.length).toBeGreaterThan(0);
  });
});
