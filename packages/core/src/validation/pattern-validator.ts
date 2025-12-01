import type {
  CognitivePattern,
  ModelParameters,
  PatternMetadata,
  CognitiveIdentity,
  ThinkingWorkflow,
} from "../types/cognitive-pattern.js";

/**
 * Type guard to check if an object is ModelParameters
 */
export function isModelParameters(obj: any): obj is ModelParameters {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.temperature === "number" &&
    typeof obj.top_p === "number" &&
    typeof obj.repeat_penalty === "number"
  );
}

/**
 * Type guard to check if an object is PatternMetadata
 */
export function isPatternMetadata(obj: any): obj is PatternMetadata {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.reasoning_depth === "string" &&
    typeof obj.context_window === "string" &&
    typeof obj.response_style === "string"
  );
}

/**
 * Type guard to check if an object is CognitiveIdentity
 */
export function isCognitiveIdentity(obj: any): obj is CognitiveIdentity {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.thinking_pattern === "string" &&
    typeof obj.approach_methodology === "string" &&
    typeof obj.reasoning_style === "string" &&
    typeof obj.problem_solving_approach === "string"
  );
}

/**
 * Type guard to check if an object is ThinkingWorkflow
 */
export function isThinkingWorkflow(obj: any): obj is ThinkingWorkflow {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  return Object.values(obj).every(
    (value) =>
      Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

/**
 * Type guard to check if an object is a CognitivePattern
 */
export function isCognitivePattern(obj: any): obj is CognitivePattern {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.version === "string" &&
    typeof obj.pattern_type === "string" &&
    typeof obj.created === "string" &&
    typeof obj.description === "string" &&
    isModelParameters(obj.model_parameters) &&
    isPatternMetadata(obj.pattern_metadata) &&
    isCognitiveIdentity(obj.cognitive_identity) &&
    isThinkingWorkflow(obj.thinking_workflow)
  );
}

/**
 * Validate a cognitive pattern
 */
export function validatePattern(pattern: any): pattern is CognitivePattern {
  return isCognitivePattern(pattern);
}
