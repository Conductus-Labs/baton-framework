import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadAgent, loadAgentStrict } from "../../src/utils/agent-loader.js";
import {
  setupTestProject,
  cleanupTestProject,
  createTestAgent,
  sampleAgentDefinition,
} from "./helpers.js";
import { join } from "path";
import { tmpdir } from "os";

describe("Agent Loading Integration", () => {
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

  it("should load agent from baton/agents/ folder", () => {
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);

    // Pass projectRoot as startPath to findProjectRoot
    const agent = loadAgent("test-agent", projectRoot);

    expect(agent).toBeDefined();
    if (agent) {
      expect(agent.agent_name).toBe("Test Agent");
      expect(agent.agent_short_name).toBe("test-agent");
      expect(agent.version).toBe("1.0.0");
    }
  });

  it("should return null for non-existent agent", () => {
    const agent = loadAgent("non-existent-agent", projectRoot);
    expect(agent).toBeNull();
  });

  it("should load agent with strict validation", () => {
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);

    const agent = loadAgentStrict("test-agent", projectRoot);

    expect(agent).toBeDefined();
    expect(agent.agent_name).toBe("Test Agent");
  });

  it("should throw error for invalid agent with strict loading", () => {
    // Create invalid agent (missing required fields)
    const invalidAgent = `---
version: "1.0.0"
---
Invalid agent`;
    createTestAgent(batonPath, "invalid-agent", invalidAgent);

    expect(() => {
      loadAgentStrict("invalid-agent", projectRoot);
    }).toThrow();
  });

  it("should validate agent structure", () => {
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);

    const agent = loadAgent("test-agent", projectRoot);

    expect(agent).toBeDefined();
    // Verify required fields
    expect(agent?.version).toBeDefined();
    expect(agent?.agent_name).toBeDefined();
    expect(agent?.agent_short_name).toBeDefined();
    expect(agent?.agent_type).toBeDefined();
    expect(agent?.created).toBeDefined();
    expect(agent?.last_updated).toBeDefined();
    expect(agent?.cognitive_patterns).toBeDefined();
  });

  it("should resolve cognitive pattern references", () => {
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);

    const agent = loadAgent("test-agent", projectRoot);

    expect(agent).toBeDefined();
    expect(agent?.cognitive_patterns.primary).toBeDefined();
    expect(agent?.cognitive_patterns.primary.length).toBeGreaterThan(0);
    expect(agent?.cognitive_patterns.primary[0].name).toBe("meta-cognitive");
  });
});
