import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["./tests/setup.tsx"],
    coverage: {
      provider: "istanbul",
      all: false,
      include: ["src/lib/**/*.ts", "src/components/**/*.tsx"],
      reporter: ["text", "text-summary"],
      thresholds: {
        statements: 100,
        lines: 100,
        functions: 100,
      },
    },
  },
});
