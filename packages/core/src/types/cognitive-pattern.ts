export interface CognitivePattern {
  version: string;
  pattern_type: string;
  created: string;
  description: string;
  model_parameters: ModelParameters;
  pattern_metadata: PatternMetadata;
  cognitive_identity: CognitiveIdentity;
  thinking_workflow: ThinkingWorkflow;
  decision_making_framework?: DecisionMakingFramework;
  communication_patterns?: CommunicationPatterns;
  quality_standards?: QualityStandards;
}

export interface ModelParameters {
  temperature: number;
  top_p: number;
  repeat_penalty: number;
}

export interface PatternMetadata {
  reasoning_depth: string;
  context_window: string;
  response_style: string;
}

export interface CognitiveIdentity {
  thinking_pattern: string;
  approach_methodology: string;
  reasoning_style: string;
  problem_solving_approach: string;
}

export interface ThinkingWorkflow {
  [key: string]: string[];
}

export interface DecisionMakingFramework {
  [key: string]: string[];
}

export interface CommunicationPatterns {
  [key: string]: string[];
}

export interface QualityStandards {
  [key: string]: string[];
}
