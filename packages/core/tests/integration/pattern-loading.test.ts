import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  loadPattern,
  loadPatternStrict,
} from "../../src/utils/pattern-loader.js";
import {
  setupTestProject,
  cleanupTestProject,
  createTestPattern,
  samplePatternDefinition,
} from "./helpers.js";
import { join } from "path";
import { tmpdir } from "os";

describe("Cognitive Pattern Loading Integration", () => {
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

  it("should load pattern from baton/cognitive/ folder", () => {
    createTestPattern(batonPath, "meta-cognitive", samplePatternDefinition);

    const pattern = loadPattern("meta-cognitive", projectRoot);

    expect(pattern).toBeDefined();
    if (pattern) {
      expect(pattern.pattern_type).toBe("meta-cognitive");
      expect(pattern.version).toBe("1.0.0");
    }
  });

  it("should return null for non-existent pattern", () => {
    const pattern = loadPattern("non-existent-pattern", projectRoot);
    expect(pattern).toBeNull();
  });

  it("should load pattern with strict validation", () => {
    createTestPattern(batonPath, "meta-cognitive", samplePatternDefinition);

    const pattern = loadPatternStrict("meta-cognitive", projectRoot);

    expect(pattern).toBeDefined();
    expect(pattern.pattern_type).toBe("meta-cognitive");
  });

  it("should throw error for invalid pattern with strict loading", () => {
    // Create invalid pattern (missing required fields)
    const invalidPattern = `version: "1.0.0"`;
    createTestPattern(batonPath, "invalid-pattern", invalidPattern);

    expect(() => {
      loadPatternStrict("invalid-pattern", projectRoot);
    }).toThrow();
  });

  it("should validate pattern structure", () => {
    createTestPattern(batonPath, "meta-cognitive", samplePatternDefinition);

    const pattern = loadPattern("meta-cognitive", projectRoot);

    expect(pattern).toBeDefined();
    // Verify required fields
    expect(pattern?.version).toBeDefined();
    expect(pattern?.pattern_type).toBeDefined();
    expect(pattern?.created).toBeDefined();
    expect(pattern?.description).toBeDefined();
    expect(pattern?.model_parameters).toBeDefined();
    expect(pattern?.pattern_metadata).toBeDefined();
    expect(pattern?.cognitive_identity).toBeDefined();
    expect(pattern?.thinking_workflow).toBeDefined();
  });

  it("should validate model parameters", () => {
    createTestPattern(batonPath, "meta-cognitive", samplePatternDefinition);

    const pattern = loadPattern("meta-cognitive", projectRoot);

    expect(pattern).toBeDefined();
    expect(pattern?.model_parameters.temperature).toBe(0.7);
    expect(pattern?.model_parameters.top_p).toBe(0.9);
    expect(pattern?.model_parameters.repeat_penalty).toBe(1.1);
  });

  it("should validate thinking workflow structure", () => {
    createTestPattern(batonPath, "meta-cognitive", samplePatternDefinition);

    const pattern = loadPattern("meta-cognitive", projectRoot);

    expect(pattern).toBeDefined();
    expect(pattern?.thinking_workflow).toBeDefined();
    expect(pattern?.thinking_workflow.phase_1).toBeDefined();
    expect(Array.isArray(pattern?.thinking_workflow.phase_1)).toBe(true);
  });
});
