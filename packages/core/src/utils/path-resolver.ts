import { join, resolve, dirname } from "path";
import { existsSync } from "fs";

/**
 * Find project root by walking up from current directory
 */
export function findProjectRoot(startPath?: string): string | null {
  const start = startPath ? resolve(startPath) : process.cwd();
  let current = resolve(start);

  while (current !== dirname(current)) {
    if (existsSync(join(current, "package.json"))) {
      return current;
    }
    current = dirname(current);
  }
  return null;
}

/**
 * Get path to baton/ folder in project root
 */
export function getBatonFolderPath(startPath?: string): string | null {
  const projectRoot = findProjectRoot(startPath);
  if (!projectRoot) {
    return null;
  }
  return join(projectRoot, "baton");
}

/**
 * Get path to .baton/ folder in project root
 */
export function getDotBatonFolderPath(startPath?: string): string | null {
  const projectRoot = findProjectRoot(startPath);
  if (!projectRoot) {
    return null;
  }
  return join(projectRoot, ".baton");
}

/**
 * Resolve path to framework file in baton/ folder
 */
export function getFrameworkFilePath(
  type: "agents" | "cognitive" | "knowledge" | "workflows" | "core",
  filename: string,
  startPath?: string
): string | null {
  const batonPath = getBatonFolderPath(startPath);
  if (!batonPath) {
    return null;
  }

  if (type === "core") {
    return join(batonPath, "core", filename);
  }

  return join(batonPath, type, filename);
}

/**
 * Resolve path to project file in .baton/ folder
 */
export function getProjectFilePath(
  type:
    | "agents"
    | "workflows"
    | "boundaries"
    | "context"
    | "knowledge"
    | "cognitive",
  filename: string,
  startPath?: string
): string | null {
  const dotBatonPath = getDotBatonFolderPath(startPath);
  if (!dotBatonPath) {
    return null;
  }

  return join(dotBatonPath, type, filename);
}

/**
 * Resolve path relative to package root
 */
export function resolvePackagePath(
  packageRoot: string,
  relativePath: string
): string {
  return resolve(packageRoot, relativePath);
}

/**
 * Check if file exists at path
 */
export function fileExists(filePath: string): boolean {
  return existsSync(filePath);
}

/**
 * Get directory path from file path
 */
export function getDirectoryPath(filePath: string): string {
  return dirname(filePath);
}

/**
 * Join path segments
 */
export function joinPaths(...segments: string[]): string {
  return join(...segments);
}
