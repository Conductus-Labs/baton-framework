export interface WorkflowDefinition {
  version: string;
  workflow_name: string;
  purpose: string;
  associate_command?: string;
  requires_permission_check?: boolean;
  scope?: string;
  created: string;
  prerequisites?: Prerequisite[];
  parameters?: Parameters;
  workflow_steps: WorkflowStep[];
  error_handling?: ErrorHandling;
  command_references?: CommandReference[];
  notes?: string[];
}

export interface Prerequisite {
  description: string;
}

export interface Parameters {
  [key: string]: any;
}

export interface WorkflowStep {
  step: number;
  name: string;
  description: string;
  actions: string[];
  dependencies?: Dependency[];
  decision_points?: DecisionPoint[];
  sub_flows?: SubFlow[];
  error_handling?: StepErrorHandling;
}

export interface Dependency {
  step: number;
  required: boolean;
}

export interface SubFlow {
  name: string;
  file: string;
  when?: string;
  parameters?: Record<string, any>;
}

export interface DecisionPoint {
  condition: string;
  if_true: string;
  if_false: string;
}

export interface StepErrorHandling {
  retry?: boolean;
  error_messages?: ErrorMessage[];
  warning_messages?: WarningMessage[];
}

export interface ErrorMessage {
  type: string;
  message_template: string;
  action: string;
  note?: string;
}

export interface WarningMessage {
  type: string;
  message_template: string;
  action: string;
}

export interface ErrorHandling {
  global_retry?: GlobalRetry;
  error_types?: ErrorType[];
}

export interface GlobalRetry {
  enabled: boolean;
  max_retries: number;
}

export interface ErrorType {
  type: string;
  handling: string;
  recovery: string;
}

export interface CommandReference {
  command: string;
  description: string;
  when_to_use?: string;
  example?: string;
}
