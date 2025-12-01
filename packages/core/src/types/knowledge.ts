export interface KnowledgeFile {
  name: string;
  path: string;
  category?: string;
  description?: string;
  content: string;
  metadata?: KnowledgeMetadata;
}

export interface KnowledgeMetadata {
  version?: string;
  created?: string;
  last_updated?: string;
  tags?: string[];
}
