import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadAgent } from "../../src/utils/agent-loader.js";
import { loadPattern } from "../../src/utils/pattern-loader.js";
import { loadWorkflow } from "../../src/utils/workflow-loader.js";
import {
  setupTestProject,
  cleanupTestProject,
  createTestAgent,
  createTestPattern,
  createTestWorkflow,
  sampleAgentDefinition,
  samplePatternDefinition,
  sampleWorkflowDefinition,
} from "./helpers.js";
import { join } from "path";
import { tmpdir } from "os";

describe("Cross-Package Integration", () => {
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

  it("should load agent with its cognitive patterns", () => {
    // Create pattern first
    createTestPattern(batonPath, "meta-cognitive", samplePatternDefinition);
    // Create agent that references the pattern
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);

    const agent = loadAgent("test-agent", projectRoot);
    const pattern = loadPattern("meta-cognitive", projectRoot);

    expect(agent).toBeDefined();
    expect(pattern).toBeDefined();
    if (agent) {
      expect(agent.cognitive_patterns.primary[0].name).toBe("meta-cognitive");
    }
  });

  it("should load workflow that references agents", () => {
    // Create agent
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);
    // Create workflow (workflows can reference agents in their steps)
    createTestWorkflow(batonPath, "test-workflow", sampleWorkflowDefinition);

    const agent = loadAgent("test-agent", projectRoot);
    const workflow = loadWorkflow("test-workflow", projectRoot);

    expect(agent).toBeDefined();
    expect(workflow).toBeDefined();
    // Both should load successfully
  });

  it("should verify type compatibility across packages", () => {
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);
    createTestPattern(batonPath, "meta-cognitive", samplePatternDefinition);

    const agent = loadAgent("test-agent", projectRoot);
    const pattern = loadPattern("meta-cognitive", projectRoot);

    // Verify types are compatible
    expect(agent).toBeDefined();
    expect(pattern).toBeDefined();

    // Verify agent references pattern correctly
    expect(agent).toBeDefined();
    expect(pattern).toBeDefined();
    if (agent && pattern) {
      const patternRef = agent.cognitive_patterns.primary[0];
      expect(patternRef.name).toBe("meta-cognitive");
    }
  });

  it("should test end-to-end initialization flow", () => {
    // Simulate initialization: load agent, patterns, and workflow
    createTestPattern(batonPath, "meta-cognitive", samplePatternDefinition);
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);
    createTestWorkflow(batonPath, "test-workflow", sampleWorkflowDefinition);

    // Load all components
    const agent = loadAgent("test-agent", projectRoot);
    const pattern = loadPattern("meta-cognitive", projectRoot);
    const workflow = loadWorkflow("test-workflow", projectRoot);

    // Verify all load successfully
    expect(agent).toBeDefined();
    expect(pattern).toBeDefined();
    expect(workflow).toBeDefined();

    // Verify relationships
    if (agent) {
      expect(agent.cognitive_patterns.primary[0].name).toBe("meta-cognitive");
    }
  });

  it("should handle missing dependencies gracefully", () => {
    // Create agent that references non-existent pattern
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);
    // Don't create the pattern

    const agent = loadAgent("test-agent", projectRoot);
    const pattern = loadPattern("meta-cognitive", projectRoot);

    // Agent should load, but pattern won't exist
    expect(agent).toBeDefined();
    expect(pattern).toBeNull();
    // Agent still has the reference, but pattern doesn't exist
    if (agent) {
      expect(agent.cognitive_patterns.primary[0].name).toBe("meta-cognitive");
    }
  });
});
