// Re-export types from core
export type {
  KnowledgeFile,
  KnowledgeMetadata,
} from "@conductus-labs/baton-core";

// Note: Knowledge files are included in package but not directly exported
// Consumers access them via file system or loading utilities
