import type { KnowledgeFile, KnowledgeMetadata } from "../types/knowledge.js";

/**
 * Type guard to check if an object is KnowledgeMetadata
 */
export function isKnowledgeMetadata(obj: any): obj is KnowledgeMetadata {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  if (obj.version !== undefined && typeof obj.version !== "string") {
    return false;
  }

  if (obj.created !== undefined && typeof obj.created !== "string") {
    return false;
  }

  if (obj.last_updated !== undefined && typeof obj.last_updated !== "string") {
    return false;
  }

  if (obj.tags !== undefined) {
    if (!Array.isArray(obj.tags)) {
      return false;
    }
    if (!obj.tags.every((tag: any) => typeof tag === "string")) {
      return false;
    }
  }

  return true;
}

/**
 * Type guard to check if an object is a KnowledgeFile
 */
export function isKnowledgeFile(obj: any): obj is KnowledgeFile {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.name === "string" &&
    typeof obj.path === "string" &&
    typeof obj.content === "string" &&
    (obj.category === undefined || typeof obj.category === "string") &&
    (obj.description === undefined || typeof obj.description === "string") &&
    (obj.metadata === undefined || isKnowledgeMetadata(obj.metadata))
  );
}

/**
 * Validate a knowledge file
 */
export function validateKnowledge(knowledge: any): knowledge is KnowledgeFile {
  return isKnowledgeFile(knowledge);
}
