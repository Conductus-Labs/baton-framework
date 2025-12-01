#!/usr/bin/env node
/**
 * Build script that handles TypeScript project references correctly
 * Ensures dependencies are built before dependents
 */
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packages = [
  "packages/core",
  "packages/cognitive-patterns",
  "packages/agents",
  "packages/knowledge",
  "packages/workflows",
  "packages/claude-commands",
  "packages/cursor-commands-core",
];

// Check if any dist folder is missing (clean build scenario)
const hasCleanBuild = packages.some((pkg) => {
  const distPath = join(process.cwd(), pkg, "dist");
  return !existsSync(distPath);
});

// If clean build, use --force to ensure all projects build
const forceFlag = hasCleanBuild ? "--force" : "";

try {
  console.log("Building TypeScript projects...");
  execSync(`npx tsc --build ${forceFlag}`.trim(), {
    stdio: "inherit",
    cwd: process.cwd(),
  });
  console.log("Build completed successfully!");
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
}
