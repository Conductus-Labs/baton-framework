import { readFileSync, existsSync } from 'fs';

// Utility function to extract version from agent file (YAML frontmatter)
export function getAgentVersion(filePath: string): string | null {
  try {
    if (!existsSync(filePath)) {
      return null;
    }
    const content = readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const versionMatch = frontmatter.match(/^version:\s*(.+)$/m);
      if (versionMatch) {
        return versionMatch[1].trim();
      }
    }
    return null;
  } catch {
    return null;
  }
}

// Utility function to compare semantic versions
export function compareVersions(version1: string, version2: string): number {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;
    if (v1Part > v2Part) return 1;
    if (v1Part < v2Part) return -1;
  }
  return 0;
}

// Get version from file (supports YAML frontmatter and JSON)
export function getFileVersion(filePath: string, fileType: string): string | null {
  if (!existsSync(filePath)) {
    return null;
  }
  
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Try YAML frontmatter first
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const versionMatch = frontmatter.match(/^version:\s*(.+)$/m);
      if (versionMatch) {
        return versionMatch[1].trim();
      }
    }
    
    // Try JSON
    if (filePath.endsWith('.json') || fileType.includes('.json')) {
      try {
        const json = JSON.parse(content);
        if (json.version) {
          return json.version;
        }
      } catch {
        // Not valid JSON or no version
      }
    }
    
    // Try YAML (for .yml files)
    if (filePath.endsWith('.yml') || filePath.endsWith('.yaml')) {
      const versionMatch = content.match(/^version:\s*(.+)$/m);
      if (versionMatch) {
        return versionMatch[1].trim();
      }
    }
  } catch {
    // Error reading file
  }
  
  return null;
}

