export interface Boundaries {
  version: string;
  boundary_type: "project" | "agent";
  scope: string;
  description?: string;
  created: string;
  always_do?: BoundaryRule[];
  ask_first?: BoundaryRule[];
  never_do?: BoundaryRule[];
}

export interface BoundaryRule {
  category?: string;
  action: string;
  scope?: string;
  trigger?: string;
  condition?: string;
  example?: string;
  consequence?: string;
  override?: string;
}
