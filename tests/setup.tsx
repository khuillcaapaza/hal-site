import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// React Testing Library's automatic cleanup only runs when Vitest globals are
// enabled; register it explicitly so renders don't leak across tests.
afterEach(() => {
  cleanup();
});

// Mock next/link so it renders a plain anchor in tests.
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
  } & Record<string, unknown>) =>
    React.createElement(
      "a",
      { href: typeof href === "string" ? href : "#", ...rest },
      children,
    ),
}));

// Mock next/image so it renders a plain <img> and drops Next-only props.
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill: _fill,
    priority: _priority,
    sizes: _sizes,
    ...rest
  }: {
    src: string | { src: string };
    alt?: string;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
  } & Record<string, unknown>) =>
    React.createElement("img", {
      src: typeof src === "string" ? src : (src as { src: string }).src,
      alt: alt ?? "",
      ...rest,
    }),
}));
