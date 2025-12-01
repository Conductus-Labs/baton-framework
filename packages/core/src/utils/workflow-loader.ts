import { existsSync } from "fs";
import { loadYamlFile } from "./file-parser.js";
import { validateWorkflow } from "../validation/workflow-validator.js";
import { getFrameworkFilePath, getBatonFolderPath } from "./path-resolver.js";
import { join } from "path";
import type { WorkflowDefinition } from "../types/workflow.js";

/**
 * Load and parse a workflow definition file from baton/ folder
 * @param workflowName - Workflow name (e.g., "agent-initialisation")
 * @param startPath - Optional starting path for project root detection
 */
export function loadWorkflow(
  workflowName: string,
  startPath?: string
): WorkflowDefinition | null {
  const filePath = getFrameworkFilePath(
    "workflows",
    `${workflowName}.yml`,
    startPath
  );
  if (!filePath || !existsSync(filePath)) {
    return null;
  }

  try {
    const workflow = loadYamlFile(filePath);
    if (workflow && validateWorkflow(workflow)) {
      return workflow;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Load sub-flow from baton/ folder
 * @param subFlowName - Sub-flow name (e.g., "sub-flow-load-project-config")
 * @param startPath - Optional starting path for project root detection
 */
export function loadSubFlow(
  subFlowName: string,
  startPath?: string
): WorkflowDefinition | null {
  const batonPath = getBatonFolderPath(startPath);
  if (!batonPath) {
    return null;
  }

  const filePath = join(
    batonPath,
    "workflows",
    "sub-flows",
    `${subFlowName}.yml`
  );
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const workflow = loadYamlFile(filePath);
    if (workflow && validateWorkflow(workflow)) {
      return workflow;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Load workflow from explicit file path (for backward compatibility)
 */
export function loadWorkflowFromPath(
  filePath: string
): WorkflowDefinition | null {
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const workflow = loadYamlFile(filePath);
    if (workflow && validateWorkflow(workflow)) {
      return workflow;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Load workflow definition with validation
 * @param workflowName - Workflow name (e.g., "agent-initialisation")
 * @param startPath - Optional starting path for project root detection
 * @throws Error if workflow file is invalid
 */
export function loadWorkflowStrict(
  workflowName: string,
  startPath?: string
): WorkflowDefinition {
  const workflow = loadWorkflow(workflowName, startPath);
  if (!workflow) {
    throw new Error(
      `Invalid or missing workflow file: ${workflowName}.yml (checked in baton/workflows/)`
    );
  }
  return workflow;
}

/**
 * Load workflow from explicit file path with validation (for backward compatibility)
 * @throws Error if workflow file is invalid
 */
export function loadWorkflowFromPathStrict(
  filePath: string
): WorkflowDefinition {
  const workflow = loadWorkflowFromPath(filePath);
  if (!workflow) {
    throw new Error(`Invalid or missing workflow file: ${filePath}`);
  }
  return workflow;
}
