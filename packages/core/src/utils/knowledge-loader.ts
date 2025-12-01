import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { parseYamlFrontmatter } from "./file-parser.js";
import { getFrameworkFilePath, getBatonFolderPath } from "./path-resolver.js";
import type { KnowledgeFile } from "../types/knowledge.js";

/**
 * Load and parse a knowledge file from baton/knowledge/ folder
 * @param knowledgeName - Knowledge file name (e.g., "git-cli" or "github/github-api")
 * @param startPath - Optional starting path for project root detection
 */
export function loadKnowledge(
  knowledgeName: string,
  startPath?: string
): KnowledgeFile | null {
  // Handle nested paths (e.g., "github/github-api")
  const parts = knowledgeName.split("/");
  const filename = parts[parts.length - 1];
  const subdir = parts.length > 1 ? parts.slice(0, -1).join("/") : "";

  let filePath: string | null;
  if (subdir) {
    // For nested knowledge files, construct path manually
    const batonPath = getBatonFolderPath(startPath);
    if (!batonPath) {
      return null;
    }
    filePath = join(batonPath, "knowledge", subdir, `${filename}.md`);
  } else {
    filePath = getFrameworkFilePath(
      "knowledge",
      `${knowledgeName}.md`,
      startPath
    );
  }

  if (!filePath || !existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, "utf-8");
    const parsed = parseYamlFrontmatter(content);

    if (!parsed) {
      // If no frontmatter, return as plain knowledge file
      return {
        name: knowledgeName,
        path: filePath,
        content: content.trim(),
      };
    }

    const metadata = parsed.frontmatter as any;
    return {
      name: knowledgeName,
      path: filePath,
      category: metadata.category,
      description: metadata.purpose || metadata.description,
      content: parsed.content.trim(),
      metadata: {
        version: metadata.version,
        created: metadata.created,
        last_updated: metadata.last_updated,
        tags: metadata.tags,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Load knowledge from explicit file path (for backward compatibility)
 */
export function loadKnowledgeFromPath(filePath: string): KnowledgeFile | null {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, "utf-8");
    const parsed = parseYamlFrontmatter(content);

    if (!parsed) {
      return {
        name: filePath.split("/").pop()?.replace(".md", "") || "unknown",
        path: filePath,
        content: content.trim(),
      };
    }

    const metadata = parsed.frontmatter as any;
    return {
      name: filePath.split("/").pop()?.replace(".md", "") || "unknown",
      path: filePath,
      category: metadata.category,
      description: metadata.purpose || metadata.description,
      content: parsed.content.trim(),
      metadata: {
        version: metadata.version,
        created: metadata.created,
        last_updated: metadata.last_updated,
        tags: metadata.tags,
      },
    };
  } catch {
    return null;
  }
}

/**
 * Load knowledge file with validation
 * @param knowledgeName - Knowledge file name (e.g., "git-cli" or "github/github-api")
 * @param startPath - Optional starting path for project root detection
 * @throws Error if knowledge file is invalid
 */
export function loadKnowledgeStrict(
  knowledgeName: string,
  startPath?: string
): KnowledgeFile {
  const knowledge = loadKnowledge(knowledgeName, startPath);
  if (!knowledge) {
    throw new Error(
      `Invalid or missing knowledge file: ${knowledgeName}.md (checked in baton/knowledge/)`
    );
  }
  return knowledge;
}
