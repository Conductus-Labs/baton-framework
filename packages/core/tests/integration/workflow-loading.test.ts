import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  loadWorkflow,
  loadWorkflowStrict,
  loadSubFlow,
} from "../../src/utils/workflow-loader.js";
import {
  setupTestProject,
  cleanupTestProject,
  createTestWorkflow,
  sampleWorkflowDefinition,
} from "./helpers.js";
import { join } from "path";
import { tmpdir } from "os";
import { writeFileSync } from "fs";

describe("Workflow Loading Integration", () => {
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

  it("should load workflow from baton/workflows/ folder", () => {
    createTestWorkflow(batonPath, "test-workflow", sampleWorkflowDefinition);

    const workflow = loadWorkflow("test-workflow", projectRoot);

    expect(workflow).toBeDefined();
    if (workflow) {
      expect(workflow.workflow_name).toBe("test-workflow");
      expect(workflow.version).toBe("1.0.0");
    }
  });

  it("should return null for non-existent workflow", () => {
    const workflow = loadWorkflow("non-existent-workflow", projectRoot);
    expect(workflow).toBeNull();
  });

  it("should load workflow with strict validation", () => {
    createTestWorkflow(batonPath, "test-workflow", sampleWorkflowDefinition);

    const workflow = loadWorkflowStrict("test-workflow", projectRoot);

    expect(workflow).toBeDefined();
    expect(workflow.workflow_name).toBe("test-workflow");
  });

  it("should throw error for invalid workflow with strict loading", () => {
    // Create invalid workflow (missing required fields)
    const invalidWorkflow = `version: "1.0.0"`;
    createTestWorkflow(batonPath, "invalid-workflow", invalidWorkflow);

    expect(() => {
      loadWorkflowStrict("invalid-workflow", projectRoot);
    }).toThrow();
  });

  it("should validate workflow structure", () => {
    createTestWorkflow(batonPath, "test-workflow", sampleWorkflowDefinition);

    const workflow = loadWorkflow("test-workflow", projectRoot);

    expect(workflow).toBeDefined();
    // Verify required fields
    expect(workflow?.version).toBeDefined();
    expect(workflow?.workflow_name).toBeDefined();
    expect(workflow?.purpose).toBeDefined();
    expect(workflow?.created).toBeDefined();
    expect(workflow?.workflow_steps).toBeDefined();
    expect(Array.isArray(workflow?.workflow_steps)).toBe(true);
  });

  it("should validate workflow steps", () => {
    createTestWorkflow(batonPath, "test-workflow", sampleWorkflowDefinition);

    const workflow = loadWorkflow("test-workflow", projectRoot);

    expect(workflow).toBeDefined();
    if (workflow) {
      expect(workflow.workflow_steps.length).toBeGreaterThan(0);
      const step = workflow.workflow_steps[0];
      expect(step.step).toBeDefined();
      expect(step.name).toBeDefined();
      expect(step.description).toBeDefined();
      expect(step.actions).toBeDefined();
      expect(Array.isArray(step.actions)).toBe(true);
    }
  });

  it("should load sub-flow from baton/workflows/sub-flows/", () => {
    const subFlowContent = sampleWorkflowDefinition.replace(
      "test-workflow",
      "sub-flow-test"
    );
    const subFlowPath = join(
      batonPath,
      "workflows",
      "sub-flows",
      "sub-flow-test.yml"
    );
    writeFileSync(subFlowPath, subFlowContent);

    const subFlow = loadSubFlow("sub-flow-test", projectRoot);

    expect(subFlow).toBeDefined();
    expect(subFlow?.workflow_name).toBe("sub-flow-test");
  });

  it("should return null for non-existent sub-flow", () => {
    const subFlow = loadSubFlow("non-existent-sub-flow", projectRoot);
    expect(subFlow).toBeNull();
  });
});
