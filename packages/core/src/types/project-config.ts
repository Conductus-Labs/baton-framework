export interface ProjectConfig {
  version: string;
  project: ProjectMetadata;
  source_control?: SourceControl;
  project_management?: ProjectManagement;
  gen_ai?: GenAIConfig[];
  agents: AgentsConfig;
  knowledge?: KnowledgeConfig;
  workflows?: WorkflowsConfig;
  preferences?: Preferences;
  metadata?: ConfigMetadata;
}

export interface ProjectMetadata {
  name: string;
  type: string;
  initialized: string;
}

export interface SourceControl {
  provider: string;
  repository_url?: string;
  default_branch?: string;
}

export interface ProjectManagement {
  type: string;
  location: string;
  url?: string;
}

export interface GenAIConfig {
  name: string;
  model: string;
  provider: string;
  integration_type: string;
  primary?: boolean;
}

export interface AgentsConfig {
  enabled: AgentEntry[];
}

export interface AgentEntry {
  name: string;
  path: string;
}

export interface KnowledgeConfig {
  enabled: KnowledgeEntry[];
}

export interface KnowledgeEntry {
  name: string;
  path: string;
}

export interface WorkflowsConfig {
  enabled: WorkflowEntry[];
}

export interface WorkflowEntry {
  name: string;
  path: string;
}

export interface Preferences {
  auto_save_context?: boolean;
  verbose_logging?: boolean;
  check_for_updates?: boolean;
  send_feedback?: boolean;
}

export interface ConfigMetadata {
  created_by?: string;
  cli_version?: string;
  last_updated?: string;
}
