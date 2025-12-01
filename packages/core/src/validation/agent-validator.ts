import type {
  AgentDefinition,
  AgentMetadata,
  CognitivePatternReference,
} from "../types/agent.js";

/**
 * Type guard to check if an object is a CognitivePatternReference
 */
export function isCognitivePatternReference(
  obj: any
): obj is CognitivePatternReference {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.name === "string" &&
    typeof obj.path === "string"
  );
}

/**
 * Validate cognitive patterns structure
 */
export function validateCognitivePatterns(patterns: any): patterns is {
  primary: CognitivePatternReference[];
  secondary?: CognitivePatternReference[];
} {
  if (!patterns || typeof patterns !== "object") {
    return false;
  }

  if (!Array.isArray(patterns.primary)) {
    return false;
  }

  if (!patterns.primary.every((p: any) => isCognitivePatternReference(p))) {
    return false;
  }

  if (patterns.secondary !== undefined) {
    if (!Array.isArray(patterns.secondary)) {
      return false;
    }
    if (!patterns.secondary.every((p: any) => isCognitivePatternReference(p))) {
      return false;
    }
  }

  return true;
}

/**
 * Type guard to check if an object is an AgentMetadata
 */
export function isAgentMetadata(obj: any): obj is AgentMetadata {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.version === "string" &&
    typeof obj.agent_name === "string" &&
    typeof obj.agent_short_name === "string" &&
    typeof obj.agent_type === "string" &&
    typeof obj.created === "string" &&
    typeof obj.last_updated === "string"
  );
}

/**
 * Type guard to check if an object is an AgentDefinition
 */
export function isAgentDefinition(obj: any): obj is AgentDefinition {
  // Check basic metadata fields
  if (
    typeof obj !== "object" ||
    obj === null ||
    typeof obj.version !== "string" ||
    typeof obj.agent_name !== "string" ||
    typeof obj.agent_short_name !== "string" ||
    typeof obj.agent_type !== "string" ||
    typeof obj.created !== "string" ||
    typeof obj.last_updated !== "string"
  ) {
    return false;
  }

  // Check cognitive patterns
  if (!validateCognitivePatterns(obj.cognitive_patterns)) {
    return false;
  }

  // Check optional scope field
  if (obj.scope !== undefined) {
    if (!Array.isArray(obj.scope)) {
      return false;
    }
    if (!obj.scope.every((s: any) => typeof s === "string")) {
      return false;
    }
  }

  return true;
}

/**
 * Validate an agent definition
 */
export function validateAgent(agent: any): agent is AgentDefinition {
  return isAgentDefinition(agent);
}
