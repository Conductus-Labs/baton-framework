/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    // Don't set root - let Vitest use the config file's directory as base
    // This ensures node_modules resolution works correctly
    include: ["tests/**/*.test.ts", "tests/**/*.test.js"],
    // Old CLI tests have been moved to .archive/ directory
    coverage: {
      provider: "v8",
      enabled: true,
      reporter: ["text", "json", "html"],
      reportsDirectory: resolve(__dirname, "./coverage"),
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.config.*",
        "**/bin/**",
        "tests/**",
        "**/*.test.ts",
        "**/*.spec.ts",
      ],
      include: ["src/**/*.ts", "!src/**/*.test.ts", "!src/**/*.spec.ts"],
      all: true, // Include all files, even if not imported
      // This helps track coverage even when code runs in external processes
      // Note: Still limited for execSync-based tests, but better than nothing
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    target: "node18",
  },
});
