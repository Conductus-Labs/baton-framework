import { existsSync } from "fs";
import { loadYamlFile } from "./file-parser.js";
import { validatePattern } from "../validation/pattern-validator.js";
import { getFrameworkFilePath } from "./path-resolver.js";
import type { CognitivePattern } from "../types/cognitive-pattern.js";

/**
 * Load and parse a cognitive pattern file from baton/ folder
 * @param patternName - Pattern name (e.g., "meta-cognitive")
 * @param startPath - Optional starting path for project root detection
 */
export function loadPattern(
  patternName: string,
  startPath?: string
): CognitivePattern | null {
  const filePath = getFrameworkFilePath(
    "cognitive",
    `${patternName}.yml`,
    startPath
  );
  if (!filePath || !existsSync(filePath)) {
    return null;
  }

  try {
    const pattern = loadYamlFile(filePath);
    if (pattern && validatePattern(pattern)) {
      return pattern;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Load pattern from explicit file path (for backward compatibility)
 */
export function loadPatternFromPath(filePath: string): CognitivePattern | null {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const pattern = loadYamlFile(filePath);
    if (pattern && validatePattern(pattern)) {
      return pattern;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Load cognitive pattern with validation
 * @param patternName - Pattern name (e.g., "meta-cognitive")
 * @param startPath - Optional starting path for project root detection
 * @throws Error if pattern file is invalid
 */
export function loadPatternStrict(
  patternName: string,
  startPath?: string
): CognitivePattern {
  const pattern = loadPattern(patternName, startPath);
  if (!pattern) {
    throw new Error(
      `Invalid or missing pattern file: ${patternName}.yml (checked in baton/cognitive/)`
    );
  }
  return pattern;
}

/**
 * Load pattern from explicit file path with validation (for backward compatibility)
 * @throws Error if pattern file is invalid
 */
export function loadPatternFromPathStrict(filePath: string): CognitivePattern {
  const pattern = loadPatternFromPath(filePath);
  if (!pattern) {
    throw new Error(`Invalid or missing pattern file: ${filePath}`);
  }
  return pattern;
}
