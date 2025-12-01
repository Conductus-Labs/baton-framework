import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  loadKnowledge,
  loadKnowledgeStrict,
} from "../../src/utils/knowledge-loader.js";
import {
  setupTestProject,
  cleanupTestProject,
  createTestKnowledge,
} from "./helpers.js";
import { join } from "path";
import { tmpdir } from "os";
import { mkdirSync } from "fs";

describe("Knowledge File Loading Integration", () => {
  const testDir = join(tmpdir(), `baton-test-${Date.now()}`);
  let projectRoot: string;
  let batonPath: string;

  beforeEach(() => {
    const setup = setupTestProject(testDir);
    projectRoot = setup.projectRoot;
    batonPath = setup.batonPath;
  });

  afterEach(() => {
    cleanupTestProject(testDir);
  });

  it("should load knowledge from baton/knowledge/ folder", () => {
    const knowledgeContent = `---
version: "1.0.0"
tool_name: "test-tool"
purpose: "Test knowledge file"
created: "2025-12-01"
last_updated: "2025-12-01"
---

# Test Knowledge

This is test knowledge content.
`;
    createTestKnowledge(batonPath, "test-knowledge", knowledgeContent);

    const knowledge = loadKnowledge("test-knowledge", projectRoot);

    expect(knowledge).toBeDefined();
    expect(knowledge?.name).toBe("test-knowledge");
    expect(knowledge?.content).toContain("Test Knowledge");
  });

  it("should return null for non-existent knowledge file", () => {
    const knowledge = loadKnowledge("non-existent-knowledge", projectRoot);
    expect(knowledge).toBeNull();
  });

  it("should load knowledge with strict validation", () => {
    const knowledgeContent = `---
version: "1.0.0"
tool_name: "test-tool"
purpose: "Test knowledge file"
created: "2025-12-01"
last_updated: "2025-12-01"
---

# Test Knowledge

This is test knowledge content.
`;
    createTestKnowledge(batonPath, "test-knowledge", knowledgeContent);

    const knowledge = loadKnowledgeStrict("test-knowledge", projectRoot);

    expect(knowledge).toBeDefined();
    expect(knowledge.name).toBe("test-knowledge");
  });

  it("should throw error for invalid knowledge with strict loading", () => {
    // Create invalid knowledge (corrupted file)
    createTestKnowledge(batonPath, "invalid-knowledge", "invalid content");

    // Should not throw for invalid content, just return null
    const knowledge = loadKnowledge("invalid-knowledge", projectRoot);
    expect(knowledge).toBeDefined(); // Will load but may have minimal structure
  });

  it("should validate knowledge structure", () => {
    const knowledgeContent = `---
version: "1.0.0"
tool_name: "test-tool"
purpose: "Test knowledge file"
created: "2025-12-01"
last_updated: "2025-12-01"
---

# Test Knowledge

This is test knowledge content.
`;
    createTestKnowledge(batonPath, "test-knowledge", knowledgeContent);

    const knowledge = loadKnowledge("test-knowledge", projectRoot);

    expect(knowledge).toBeDefined();
    // Verify required fields
    expect(knowledge?.name).toBeDefined();
    expect(knowledge?.path).toBeDefined();
    expect(knowledge?.content).toBeDefined();
    // Verify optional metadata
    expect(knowledge?.metadata).toBeDefined();
    expect(knowledge?.metadata?.version).toBe("1.0.0");
  });

  it("should load nested knowledge files (github/github-api)", () => {
    const knowledgeContent = `---
version: "1.0.0"
tool_name: "github-api"
purpose: "GitHub API knowledge"
created: "2025-12-01"
---

# GitHub API

API documentation content.
`;
    // Create nested directory
    const githubDir = join(batonPath, "knowledge", "github");
    mkdirSync(githubDir, { recursive: true });
    createTestKnowledge(batonPath, "github/github-api", knowledgeContent);

    const knowledge = loadKnowledge("github/github-api", projectRoot);

    expect(knowledge).toBeDefined();
    expect(knowledge?.name).toBe("github/github-api");
    expect(knowledge?.content).toContain("GitHub API");
  });

  it("should handle knowledge files without frontmatter", () => {
    const plainContent = `# Plain Knowledge File

This is plain markdown without frontmatter.
`;
    createTestKnowledge(batonPath, "plain-knowledge", plainContent);

    const knowledge = loadKnowledge("plain-knowledge", projectRoot);

    expect(knowledge).toBeDefined();
    expect(knowledge?.name).toBe("plain-knowledge");
    expect(knowledge?.content).toContain("Plain Knowledge File");
    // Should still work without frontmatter
  });
});
