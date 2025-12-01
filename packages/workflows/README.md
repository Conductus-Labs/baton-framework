# @conductus-labs/baton-workflows

**Baton Framework workflow definitions**

[![npm version](https://img.shields.io/npm/v/@conductus-labs/baton-workflows.svg)](https://www.npmjs.com/package/@conductus-labs/baton-workflows)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@conductus-labs/baton-workflows` provides workflow definitions for common agent tasks and project management. Workflows define structured processes that agents can execute, including:

- Step-by-step instructions
- Decision points and branching logic
- Error handling strategies
- Sub-flow composition
- Human-in-the-loop checkpoints

## Installation

```bash
npm install @conductus-labs/baton-workflows
```

**Note:** This package depends on `@conductus-labs/baton-core` and `@conductus-labs/baton-agents`. Install them first:

```bash
npm install @conductus-labs/baton-core \
            @conductus-labs/baton-agents \
            @conductus-labs/baton-workflows
```

## Available Workflows

### Main Workflows

1. **agent-initialisation.yml** - Initialize an agent for a new session
2. **context-synchronisation.yml** - Synchronize agent context with repository state
3. **manage-boundary-rule.yml** - Manage project and agent boundary rules
4. **project-initialisation.yml** - Initialize a new project with Baton Framework

### Sub-Flows

Sub-flows are reusable workflow components that can be called from main workflows:

1. **sub-flow-create-agent-boundaries.yml** - Create agent boundary file
2. **sub-flow-create-agent-context.yml** - Create agent context file
3. **sub-flow-load-agent-boundaries.yml** - Load agent boundary file
4. **sub-flow-load-agent-context.yml** - Load agent context file
5. **sub-flow-load-all-boundaries.yml** - Load all boundary files
6. **sub-flow-load-project-boundaries.yml** - Load project boundary file
7. **sub-flow-load-project-config.yml** - Load project configuration
8. **sub-flow-load-project-manifest.yml** - Load project manifest
9. **sub-flow-validate-scope.yml** - Validate agent scope for command/workflow
10. **sub-flow-validate-workflow-permission.yml** - Validate workflow permissions

## Usage

### Accessing Workflow Files

After installation, workflow files are available in the `baton/workflows/` folder:

```text
your-project/
└── baton/
    └── workflows/
        ├── agent-initialisation.yml
        ├── context-synchronisation.yml
        ├── manage-boundary-rule.yml
        ├── project-initialisation.yml
        └── sub-flows/
            ├── sub-flow-create-agent-boundaries.yml
            ├── sub-flow-create-agent-context.yml
            └── ... (all sub-flows)
```

### Loading Workflow Definitions

Use `@conductus-labs/baton-core` utilities to load workflow definitions:

```typescript
import { loadWorkflow, loadWorkflowStrict } from "@conductus-labs/baton-core";
import type { WorkflowDefinition } from "@conductus-labs/baton-workflows";

// Safe loading (returns null if invalid)
const workflow = loadWorkflow("agent-initialisation");
if (workflow) {
  console.log(workflow.workflow_name);
  console.log(workflow.workflow_steps.length);
}

// Strict loading (throws if invalid)
try {
  const workflow = loadWorkflowStrict("agent-initialisation");
  // TypeScript knows workflow is WorkflowDefinition
} catch (error) {
  console.error("Failed to load workflow:", error);
}
```

### Loading Sub-Flows

```typescript
import { loadSubFlow, loadSubFlowStrict } from "@conductus-labs/baton-core";

// Load sub-flow
const subFlow = loadSubFlow("sub-flow-load-project-config");
if (subFlow) {
  console.log(subFlow.workflow_name);
}
```

### Using Workflow Types

Import TypeScript types for type safety:

```typescript
import type {
  WorkflowDefinition,
  WorkflowStep,
  SubFlow,
  DecisionPoint,
  Prerequisite,
} from "@conductus-labs/baton-workflows";

function processWorkflow(workflow: WorkflowDefinition) {
  console.log(`Workflow: ${workflow.workflow_name}`);
  console.log(`Purpose: ${workflow.purpose}`);
  console.log(`Steps: ${workflow.workflow_steps.length}`);

  workflow.workflow_steps.forEach((step: WorkflowStep) => {
    console.log(`  Step ${step.step}: ${step.name}`);
  });
}
```

### Reading Workflow Files Directly

You can also read workflow files directly from the file system:

```typescript
import { readFileSync } from "fs";
import { join } from "path";
import { loadYamlFile } from "@conductus-labs/baton-core";

const workflowPath = join(
  process.cwd(),
  "baton",
  "workflows",
  "agent-initialisation.yml"
);
const workflow = loadYamlFile(workflowPath);

console.log(workflow.workflow_name);
console.log(workflow.workflow_steps);
```

## Workflow Structure

Each workflow file follows this structure:

```yaml
version: 1.0.0
workflow_name: agent-initialisation
purpose: Initialize an agent for a new session
associate_command: init-{agent_short_name}
requires_permission_check: false
created: 2025-11-23

prerequisites:
  - Agent short-name parameter must be provided
  - Write access to `.baton/` directory

parameters:
  agent_short_name: { Required - Agent short-name to initialize }

workflow_steps:
  - step: 1
    name: Check Project Configuration Files
    description: Verify project.config.yml exists
    actions:
      - Check if `.baton/project.config.yml` exists
    decision_points:
      - condition: File exists
        if_true: Continue to step 2
        if_false: Display error and stop
    error_handling:
      retry: false
      error_messages:
        - type: File Not Found
          message_template: user-messages/workflows/agent-initialisation/step-1-error.md
          action: Stop execution

error_handling:
  global_retry:
    enabled: false
    max_retries: 0

command_references:
  - command: /init-baton-agent
    description: Initialize baton-agent
    when_to_use: At the start of a new session
```

## Workflow Execution

Workflows are executed by agents following the step-by-step instructions. Each step includes:

- **Actions**: Specific tasks to perform
- **Decision Points**: Conditional logic for branching
- **Dependencies**: Steps that must complete before this step
- **Sub-Flows**: Reusable workflow components
- **Error Handling**: How to handle errors at each step

## API Reference

### Types

Re-exported from `@conductus-labs/baton-core`:

- `WorkflowDefinition` - Complete workflow definition structure
- `WorkflowStep` - Individual workflow step
- `SubFlow` - Sub-flow definition
- `DecisionPoint` - Decision point for branching
- `Prerequisite` - Workflow prerequisite
- `ErrorHandling` - Error handling configuration
- `CommandReference` - Command reference

### Workflow Files

Workflow definition files are included in the package and available at:

- Package location: `node_modules/@conductus-labs/baton-workflows/src/workflows/**/*.yml`
- Project location (after install): `baton/workflows/**/*.yml`

## Package Structure

```text
packages/workflows/
├── src/
│   ├── workflows/           # Workflow definition files
│   │   ├── agent-initialisation.yml
│   │   ├── context-synchronisation.yml
│   │   ├── manage-boundary-rule.yml
│   │   ├── project-initialisation.yml
│   │   └── sub-flows/
│   │       ├── sub-flow-create-agent-boundaries.yml
│   │       ├── sub-flow-create-agent-context.yml
│   │       └── ... (all sub-flows)
│   ├── types.ts             # Type re-exports
│   └── index.ts             # Main export
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- `@conductus-labs/baton-core` - Core types and utilities (required)
- `@conductus-labs/baton-agents` - Agent definitions referenced by workflows (required)

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0 → 2.0.0): Breaking changes to workflow structure
- **Minor** (1.0.0 → 1.1.0): New workflows added
- **Patch** (1.0.0 → 1.0.1): Updates to existing workflows, bug fixes

## License

MIT

## Related Packages

- `@conductus-labs/baton-core` - Core types and utilities (required)
- `@conductus-labs/baton-agents` - Agents that execute workflows (required)

## Workflow Documentation

For more information about workflows:

- **[RHYTHM Method Workflows](../../docs/rhythm/4-workflows.md)** - RHYTHM Method workflow patterns
- **[Scope System Documentation](../../docs/SCOPE-SYSTEM.md)** - Understanding scope-based authorization for workflows
