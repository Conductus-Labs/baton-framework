#!/usr/bin/env node

/**
 * Post-install script for @conductus-labs/baton-cognitive-patterns
 * Copies cognitive pattern files to baton/cognitive/ folder in project root
 */

import { existsSync, mkdirSync, copyFileSync, readdirSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Find project root by walking up from a starting path
 * Skips node_modules directories to find the actual project root
 */
function findProjectRoot(startPath) {
  let current = resolve(startPath);
  while (current !== dirname(current)) {
    // Skip if we're in node_modules
    if (current.includes("node_modules")) {
      current = dirname(current);
      continue;
    }

    if (existsSync(join(current, "package.json"))) {
      // Accept if it's not in node_modules
      if (!current.includes("node_modules")) {
        return current;
      }
    }
    current = dirname(current);
  }
  return null;
}

/**
 * Main setup function
 */
function setupBatonFolder() {
  try {
    // Find project root
    // When installed via file: protocol, the package might be symlinked
    // npm sets INIT_CWD to the directory where npm install was run
    const packageDir = resolve(__dirname, "..");
    let projectRoot = null;

    // Strategy 1: Use INIT_CWD if available (set by npm during install)
    // This works for both normal installs and file: protocol installs
    if (process.env.INIT_CWD) {
      projectRoot = findProjectRoot(process.env.INIT_CWD);
    }

    // Strategy 2: Walk up from node_modules location (for normal installs)
    // This handles cases where INIT_CWD might not be set
    if (!projectRoot) {
      // Check if we're in node_modules (normal install)
      if (__dirname.includes("node_modules")) {
        // Walk up from node_modules to find project root
        const nodeModulesIndex = __dirname.indexOf("node_modules");
        const nodeModulesPath = __dirname.substring(0, nodeModulesIndex);
        projectRoot = findProjectRoot(nodeModulesPath);
      } else {
        // We're in a file: protocol install, try walking up from package directory
        // Skip the package directory itself and its parent (packages/)
        const packageParent = resolve(packageDir, "..", "..");
        projectRoot = findProjectRoot(packageParent);
      }
    }

    if (!projectRoot) {
      console.warn(
        "Could not find project root. Skipping baton/ folder setup."
      );
      return;
    }

    const batonDir = join(projectRoot, "baton");
    const batonCognitiveDir = join(batonDir, "cognitive");

    // Create baton/cognitive directory if it doesn't exist
    if (!existsSync(batonCognitiveDir)) {
      mkdirSync(batonCognitiveDir, { recursive: true });
    }

    // Copy pattern files
    const srcPatterns = join(packageDir, "src", "patterns");
    if (existsSync(srcPatterns)) {
      const files = readdirSync(srcPatterns);
      for (const file of files) {
        if (file.endsWith(".yml")) {
          const srcPath = join(srcPatterns, file);
          const destPath = join(batonCognitiveDir, file);
          // Only copy if file doesn't exist (preserve user customizations)
          if (!existsSync(destPath)) {
            copyFileSync(srcPath, destPath);
          }
        }
      }
    }

    console.log(
      "✓ baton-cognitive-patterns: Pattern files copied to baton/cognitive/"
    );
  } catch (error) {
    console.warn(
      "Error setting up baton-cognitive-patterns folder:",
      error.message
    );
    // Don't fail installation if setup fails
  }
}

setupBatonFolder();
