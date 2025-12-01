export interface AgentDefinition {
  version: string;
  agent_name: string;
  agent_short_name: string;
  agent_type: string;
  created: string;
  last_updated: string;
  cognitive_patterns: {
    primary: CognitivePatternReference[];
    secondary?: CognitivePatternReference[];
  };
  scope?: string[];
}

export interface CognitivePatternReference {
  name: string;
  path: string;
}

export interface AgentMetadata {
  version: string;
  agent_name: string;
  agent_short_name: string;
  agent_type: string;
  created: string;
  last_updated: string;
}
