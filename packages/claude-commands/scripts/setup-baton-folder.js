#!/usr/bin/env node

/**
 * Post-install script for @conductus-labs/baton-claude-commands
 * Sets up Claude-specific command files in baton/ folder
 */

import { existsSync, mkdirSync } from "fs";
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
    const packageDir = resolve(__dirname, "..");
    let projectRoot = null;

    if (process.env.INIT_CWD) {
      projectRoot = findProjectRoot(process.env.INIT_CWD);
    }

    if (!projectRoot) {
      if (__dirname.includes("node_modules")) {
        const nodeModulesIndex = __dirname.indexOf("node_modules");
        const nodeModulesPath = __dirname.substring(0, nodeModulesIndex);
        projectRoot = findProjectRoot(nodeModulesPath);
      } else {
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
    const batonClaudeDir = join(batonDir, "claude-commands");

    // Create baton/claude-commands directory if it doesn't exist
    if (!existsSync(batonClaudeDir)) {
      mkdirSync(batonClaudeDir, { recursive: true });
    }

    // TODO: Copy Claude-specific command files when implemented

    console.log("✓ baton-claude-commands: Framework files setup complete");
  } catch (error) {
    console.warn(
      "Error setting up baton-claude-commands folder:",
      error.message
    );
  }
}

setupBatonFolder();
