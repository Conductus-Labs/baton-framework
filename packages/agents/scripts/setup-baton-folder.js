#!/usr/bin/env node

/**
 * Post-install script for @conductus-labs/baton-agents
 * Copies agent definition files to baton/agents/ folder in project root
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
    const batonAgentsDir = join(batonDir, "agents");

    // Create baton/agents directory if it doesn't exist
    if (!existsSync(batonAgentsDir)) {
      mkdirSync(batonAgentsDir, { recursive: true });
    }

    // Copy agent files
    const srcAgents = join(packageDir, "src", "agents");
    if (existsSync(srcAgents)) {
      const files = readdirSync(srcAgents);
      for (const file of files) {
        if (file.endsWith(".md")) {
          const srcPath = join(srcAgents, file);
          const destPath = join(batonAgentsDir, file);
          // Only copy if file doesn't exist (preserve user customizations)
          if (!existsSync(destPath)) {
            copyFileSync(srcPath, destPath);
          }
        }
      }
    }

    console.log("✓ baton-agents: Agent files copied to baton/agents/");
  } catch (error) {
    console.warn("Error setting up baton-agents folder:", error.message);
    // Don't fail installation if setup fails
  }
}

setupBatonFolder();
