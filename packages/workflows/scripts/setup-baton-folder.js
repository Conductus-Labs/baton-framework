#!/usr/bin/env node

/**
 * Post-install script for @conductus-labs/baton-workflows
 * Copies workflow files to baton/workflows/ folder in project root
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
 * Copy directory recursively
 */
function copyDir(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }

  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Only copy if file doesn't exist (preserve user customizations)
      if (!existsSync(destPath)) {
        copyFileSync(srcPath, destPath);
      }
    }
  }
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
    const batonWorkflowsDir = join(batonDir, "workflows");

    // Create baton/workflows directory if it doesn't exist
    if (!existsSync(batonWorkflowsDir)) {
      mkdirSync(batonWorkflowsDir, { recursive: true });
    }

    // Copy workflow files (preserve directory structure including sub-flows)
    const srcWorkflows = join(packageDir, "src", "workflows");
    if (existsSync(srcWorkflows)) {
      copyDir(srcWorkflows, batonWorkflowsDir);
    }

    console.log("✓ baton-workflows: Workflow files copied to baton/workflows/");
  } catch (error) {
    console.warn("Error setting up baton-workflows folder:", error.message);
    // Don't fail installation if setup fails
  }
}

setupBatonFolder();
