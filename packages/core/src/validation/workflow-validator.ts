import type {
  WorkflowDefinition,
  WorkflowStep,
  SubFlow,
  DecisionPoint,
  Prerequisite,
} from "../types/workflow.js";

/**
 * Type guard to check if an object is a Prerequisite
 */
export function isPrerequisite(obj: any): obj is Prerequisite {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.description === "string"
  );
}

/**
 * Type guard to check if an object is a DecisionPoint
 */
export function isDecisionPoint(obj: any): obj is DecisionPoint {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.condition === "string" &&
    typeof obj.if_true === "string" &&
    typeof obj.if_false === "string"
  );
}

/**
 * Type guard to check if an object is a SubFlow
 */
export function isSubFlow(obj: any): obj is SubFlow {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.name === "string" &&
    typeof obj.file === "string" &&
    (obj.when === undefined || typeof obj.when === "string") &&
    (obj.parameters === undefined || typeof obj.parameters === "object")
  );
}

/**
 * Type guard to check if an object is a WorkflowStep
 */
export function isWorkflowStep(obj: any): obj is WorkflowStep {
  if (
    typeof obj !== "object" ||
    obj === null ||
    typeof obj.step !== "number" ||
    typeof obj.name !== "string" ||
    typeof obj.description !== "string" ||
    !Array.isArray(obj.actions) ||
    !obj.actions.every((a: any) => typeof a === "string")
  ) {
    return false;
  }

  if (obj.dependencies !== undefined) {
    if (!Array.isArray(obj.dependencies)) {
      return false;
    }
    if (
      !obj.dependencies.every(
        (d: any) =>
          typeof d === "object" &&
          d !== null &&
          typeof d.step === "number" &&
          typeof d.required === "boolean"
      )
    ) {
      return false;
    }
  }

  if (obj.decision_points !== undefined) {
    if (!Array.isArray(obj.decision_points)) {
      return false;
    }
    if (!obj.decision_points.every((dp: any) => isDecisionPoint(dp))) {
      return false;
    }
  }

  if (obj.sub_flows !== undefined) {
    if (!Array.isArray(obj.sub_flows)) {
      return false;
    }
    if (!obj.sub_flows.every((sf: any) => isSubFlow(sf))) {
      return false;
    }
  }

  return true;
}

/**
 * Type guard to check if an object is a WorkflowDefinition
 */
export function isWorkflowDefinition(obj: any): obj is WorkflowDefinition {
  if (
    typeof obj !== "object" ||
    obj === null ||
    typeof obj.version !== "string" ||
    typeof obj.workflow_name !== "string" ||
    typeof obj.purpose !== "string" ||
    typeof obj.created !== "string" ||
    !Array.isArray(obj.workflow_steps) ||
    !obj.workflow_steps.every((step: any) => isWorkflowStep(step))
  ) {
    return false;
  }

  if (obj.prerequisites !== undefined) {
    if (!Array.isArray(obj.prerequisites)) {
      return false;
    }
    if (!obj.prerequisites.every((p: any) => isPrerequisite(p))) {
      return false;
    }
  }

  return true;
}

/**
 * Validate a workflow definition
 */
export function validateWorkflow(
  workflow: any
): workflow is WorkflowDefinition {
  return isWorkflowDefinition(workflow);
}
