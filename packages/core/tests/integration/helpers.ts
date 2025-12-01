import { mkdirSync, writeFileSync, existsSync, rmSync } from "fs";
import { join, resolve } from "path";

/**
 * Test helper utilities for integration tests
 */

/**
 * Create a temporary test project structure with baton/ folder
 */
export function setupTestProject(testDir: string): {
  projectRoot: string;
  batonPath: string;
  dotBatonPath: string;
} {
  const projectRoot = resolve(testDir);

  // Create test project structure
  const batonPath = join(projectRoot, "baton");
  const dotBatonPath = join(projectRoot, ".baton");

  // Create directories
  mkdirSync(batonPath, { recursive: true });
  mkdirSync(join(batonPath, "agents"), { recursive: true });
  mkdirSync(join(batonPath, "cognitive"), { recursive: true });
  mkdirSync(join(batonPath, "knowledge"), { recursive: true });
  mkdirSync(join(batonPath, "workflows"), { recursive: true });
  mkdirSync(join(batonPath, "workflows", "sub-flows"), { recursive: true });
  mkdirSync(join(batonPath, "core"), { recursive: true });

  mkdirSync(dotBatonPath, { recursive: true });
  mkdirSync(join(dotBatonPath, "agents"), { recursive: true });

  // Create package.json for test project
  writeFileSync(
    join(projectRoot, "package.json"),
    JSON.stringify({ name: "test-project", version: "1.0.0" }, null, 2)
  );

  return { projectRoot, batonPath, dotBatonPath };
}

/**
 * Clean up test project
 */
export function cleanupTestProject(testDir: string): void {
  const projectRoot = resolve(testDir);
  if (existsSync(projectRoot)) {
    try {
      rmSync(projectRoot, {
        recursive: true,
        force: true,
        maxRetries: 3,
        retryDelay: 100,
      });
    } catch (error) {
      // Ignore cleanup errors on Windows (file locks)
      // Tests will use unique directories anyway
    }
  }
}

/**
 * Create a test agent file in baton/agents/
 */
export function createTestAgent(
  batonPath: string,
  agentName: string,
  content: string
): void {
  const agentPath = join(batonPath, "agents", `${agentName}.md`);
  writeFileSync(agentPath, content);
}

/**
 * Create a test pattern file in baton/cognitive/
 */
export function createTestPattern(
  batonPath: string,
  patternName: string,
  content: string
): void {
  const patternPath = join(batonPath, "cognitive", `${patternName}.yml`);
  writeFileSync(patternPath, content);
}

/**
 * Create a test knowledge file in baton/knowledge/
 */
export function createTestKnowledge(
  batonPath: string,
  knowledgeName: string,
  content: string
): void {
  const knowledgePath = join(batonPath, "knowledge", `${knowledgeName}.md`);
  writeFileSync(knowledgePath, content);
}

/**
 * Create a test workflow file in baton/workflows/
 */
export function createTestWorkflow(
  batonPath: string,
  workflowName: string,
  content: string
): void {
  const workflowPath = join(batonPath, "workflows", `${workflowName}.yml`);
  writeFileSync(workflowPath, content);
}

/**
 * Sample agent definition for testing
 */
export const sampleAgentDefinition = `---
version: "1.0.0"
agent_name: Test Agent
agent_short_name: test-agent
agent_type: test
created: "2025-12-01"
last_updated: "2025-12-01"
cognitive_patterns:
  primary:
    - name: meta-cognitive
      path: baton/cognitive/meta-cognitive.yml
scope:
  - test-scope
---

# Test Agent

This is a test agent definition.
`;

/**
 * Sample pattern definition for testing
 */
export const samplePatternDefinition = `version: "1.0.0"
pattern_type: meta-cognitive
created: "2025-12-01"
description: Test cognitive pattern
model_parameters:
  temperature: 0.7
  top_p: 0.9
  repeat_penalty: 1.1
pattern_metadata:
  reasoning_depth: deep
  context_window: large
  response_style: analytical
cognitive_identity:
  thinking_pattern: meta-cognitive
  approach_methodology: systematic
  reasoning_style: analytical
  problem_solving_approach: structured
thinking_workflow:
  phase_1:
    - Analyze the problem
    - Identify key components
  phase_2:
    - Develop solution approach
    - Evaluate options
`;

/**
 * Sample workflow definition for testing
 */
export const sampleWorkflowDefinition = `version: "1.0.0"
workflow_name: test-workflow
purpose: Test workflow for integration testing
created: "2025-12-01"
workflow_steps:
  - step: 1
    name: Test Step
    description: A test step
    actions:
      - Perform test action
`;
