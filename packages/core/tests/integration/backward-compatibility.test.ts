import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadAgent, loadAgentFromPath } from "../../src/utils/agent-loader.js";
import {
  setupTestProject,
  cleanupTestProject,
  createTestAgent,
  sampleAgentDefinition,
} from "./helpers.js";
import { join } from "path";
import { tmpdir } from "os";
import { writeFileSync } from "fs";

describe("Backward Compatibility", () => {
  const testDir = join(tmpdir(), `baton-test-${Date.now()}`);
  let projectRoot: string;
  let batonPath: string;
  let dotBatonPath: string;

  beforeEach(() => {
    const setup = setupTestProject(testDir);
    projectRoot = setup.projectRoot;
    batonPath = setup.batonPath;
    dotBatonPath = setup.dotBatonPath;
  });

  afterEach(() => {
    cleanupTestProject(testDir);
  });

  it("should load agent from .baton/agents/ (project override)", () => {
    // Create agent in both locations
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);

    // Create project-specific version in .baton/
    const projectAgent = sampleAgentDefinition.replace(
      "agent_name: Test Agent",
      "agent_name: Project Test Agent"
    );
    writeFileSync(join(dotBatonPath, "agents", "test-agent.md"), projectAgent);

    // loadAgent should load from baton/ (framework files)
    const frameworkAgent = loadAgent("test-agent", projectRoot);
    expect(frameworkAgent).toBeDefined();
    if (frameworkAgent) {
      expect(frameworkAgent.agent_name).toBe("Test Agent");
    }

    // loadAgentFromPath can load from .baton/ (project files)
    const projectAgentLoaded = loadAgentFromPath(
      join(dotBatonPath, "agents", "test-agent.md")
    );
    expect(projectAgentLoaded).toBeDefined();
    if (projectAgentLoaded) {
      expect(projectAgentLoaded.agent_name).toBe("Project Test Agent");
    }
  });

  it("should load agent from baton/agents/ (framework default)", () => {
    // Only create in baton/ (framework location)
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);

    const agent = loadAgent("test-agent", projectRoot);

    expect(agent).toBeDefined();
    expect(agent?.agent_name).toBe("Test Agent");
  });

  it("should verify path resolution prioritizes correctly", () => {
    // Create in both locations
    createTestAgent(batonPath, "test-agent", sampleAgentDefinition);

    const projectAgent = sampleAgentDefinition.replace(
      "agent_name: Test Agent",
      "agent_name: Project Override"
    );
    writeFileSync(join(dotBatonPath, "agents", "test-agent.md"), projectAgent);

    // loadAgent uses baton/ (framework)
    const frameworkAgent = loadAgent("test-agent", projectRoot);
    expect(frameworkAgent).toBeDefined();
    if (frameworkAgent) {
      expect(frameworkAgent.agent_name).toBe("Test Agent");
    }

    // Explicit path can access .baton/ (project)
    const projectAgentLoaded = loadAgentFromPath(
      join(dotBatonPath, "agents", "test-agent.md")
    );
    expect(projectAgentLoaded).toBeDefined();
    if (projectAgentLoaded) {
      expect(projectAgentLoaded.agent_name).toBe("Project Override");
    }
  });

  it("should support loading from explicit paths (backward compatibility)", () => {
    // Create agent in .baton/ (old structure)
    writeFileSync(
      join(dotBatonPath, "agents", "old-agent.md"),
      sampleAgentDefinition.replace(
        "agent_short_name: test-agent",
        "agent_short_name: old-agent"
      )
    );

    // Should be able to load using explicit path
    const agent = loadAgentFromPath(
      join(dotBatonPath, "agents", "old-agent.md")
    );

    expect(agent).toBeDefined();
    if (agent) {
      expect(agent.agent_short_name).toBe("old-agent");
    }
  });

  it("should handle migration scenario", () => {
    // Simulate migration: files exist in both locations
    createTestAgent(batonPath, "migrated-agent", sampleAgentDefinition);
    writeFileSync(
      join(dotBatonPath, "agents", "migrated-agent.md"),
      sampleAgentDefinition.replace(
        "agent_short_name: test-agent",
        "agent_short_name: migrated-agent"
      )
    );

    // Framework version should be accessible
    const frameworkAgent = loadAgent("migrated-agent", projectRoot);
    expect(frameworkAgent).toBeDefined();

    // Project version should be accessible via explicit path
    const projectAgent = loadAgentFromPath(
      join(dotBatonPath, "agents", "migrated-agent.md")
    );
    expect(projectAgent).toBeDefined();
  });
});
