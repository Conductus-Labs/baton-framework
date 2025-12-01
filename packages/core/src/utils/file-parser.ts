import { readFileSync, existsSync } from "fs";
import yaml from "js-yaml";

/**
 * Parse YAML frontmatter from markdown file
 */
export function parseYamlFrontmatter(content: string): {
  frontmatter: Record<string, any>;
  content: string;
} | null {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return null;
  }

  try {
    const frontmatter = yaml.load(frontmatterMatch[1]) as Record<string, any>;
    const markdownContent = content.slice(frontmatterMatch[0].length).trim();
    return { frontmatter, content: markdownContent };
  } catch {
    return null;
  }
}

/**
 * Load and parse a file with YAML frontmatter
 */
export function loadFileWithFrontmatter(filePath: string): {
  frontmatter: Record<string, any>;
  content: string;
} | null {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, "utf-8");
    return parseYamlFrontmatter(content);
  } catch {
    return null;
  }
}

/**
 * Load YAML file
 */
export function loadYamlFile(filePath: string): any {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, "utf-8");
    return yaml.load(content);
  } catch {
    return null;
  }
}

/**
 * Load markdown file (without frontmatter parsing)
 */
export function loadMarkdownFile(filePath: string): string | null {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    return readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}
