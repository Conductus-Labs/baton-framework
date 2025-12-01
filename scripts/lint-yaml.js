#!/usr/bin/env node

/**
 * YAML Linter Script
 * Lints all YAML files in the repository
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");
const rootDir = resolve(__dirname, "..");

const IGNORE_DIRS = [
  "node_modules",
  "dist",
  ".archive",
  ".baton",
  "baton",
  "coverage",
  ".git",
  ".vite",
];

// const IGNORE_FILES = []; // Reserved for future use

let errors = 0;

function shouldIgnore(path) {
  const relativePath = path.replace(rootDir + "/", "");
  return IGNORE_DIRS.some((dir) => relativePath.includes(dir));
}

function findYamlFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      if (!shouldIgnore(filePath)) {
        findYamlFiles(filePath, fileList);
      }
    } else if (
      (file.endsWith(".yml") || file.endsWith(".yaml")) &&
      !shouldIgnore(filePath)
    ) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function lintYamlFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    yaml.load(content, { schema: yaml.DEFAULT_SCHEMA });
    return null;
  } catch (error) {
    return error;
  }
}

// Find all YAML files
const yamlFiles = findYamlFiles(rootDir);

// Lint each file
for (const file of yamlFiles) {
  const error = lintYamlFile(file);
  if (error) {
    console.error(`❌ ${file.replace(rootDir + "/", "")}`);
    console.error(`   ${error.message}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n✖ Found ${errors} YAML error(s)`);
  process.exit(1);
} else {
  console.log(`✓ All ${yamlFiles.length} YAML file(s) are valid`);
  process.exit(0);
}
