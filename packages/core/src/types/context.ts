export interface AgentContext {
  version: string;
  agent: string;
  created: string;
  last_updated: string;
  current_status?: string;
  recent_work?: SessionSummary[];
  repository_statistics?: RepositoryStatistics;
  key_learnings?: KeyLearnings;
  ongoing_projects?: OngoingProject[];
  future_priorities?: string[];
  historical_insights?: HistoricalInsight[];
}

export interface SessionSummary {
  session: string;
  summary: string;
  key_actions?: string[];
  decisions_made?: string[];
  learnings?: string[];
  files_created?: string[];
  files_modified?: string[];
}

export interface RepositoryStatistics {
  last_updated?: string;
  [key: string]: any;
}

export interface KeyLearnings {
  [category: string]: string[];
}

export interface OngoingProject {
  name: string;
  status: string;
  description?: string;
}

export interface HistoricalInsight {
  date: string;
  insight: string;
  context?: string;
}
