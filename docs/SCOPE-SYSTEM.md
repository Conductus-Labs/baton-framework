# Scope System Documentation

## Overview

The Baton Framework uses a **scope-based authorization system** to control which agents can execute which commands and workflows. This replaces the earlier tag-based system with a more explicit and flexible approach.

## Core Concept

**Scope** defines what capabilities an agent has access to. Commands and workflows declare a required scope, and agents must have that scope in their scope list to execute them.

## Scope Matching Rules

### Agent → Command/Workflow Matching

An agent can execute a command or workflow **if and only if**:

- The agent's `scope` array includes the command/workflow's required `scope` value

**Example:**

```yaml
# Agent definition
scope:
  - agent-initialisation
  - context-management
  - project-setup

# Command definition
scope: agent-initialisation

# Result: ✅ Agent CAN execute this command (scope matches)
```

### Workflow → Sub-Flow Matching

A workflow can call a sub-flow **if and only if**:

- The **agent executing the workflow** has the sub-flow's required `scope` in their scope array
- OR the sub-flow has no scope requirement (universal sub-flow)

**Note:** Workflows inherit the agent's scopes when executed. The workflow checks the agent's scopes (not the workflow's own scope) to determine if it can call a sub-flow.

**Example:**

```yaml
# Agent definition
scope:
  - agent-initialisation
  - context-management
  - project-config

# Workflow definition
scope: agent-initialisation

# Sub-flow definition
scope: context-management

# Result: ✅ Workflow CAN call this sub-flow
# The agent has "context-management" scope, so the workflow can call the sub-flow
```

## Scope Values

### Common Scopes

- **`agent-initialisation`** - Initialize agents for new sessions
- **`context-management`** - Manage agent context files (sync, update)
- **`project-setup`** - Initialize and configure projects
- **`project-config`** - Access project configuration files
- **`boundaries`** - Access and manage boundary files
- **`workflow-execution`** - Execute workflows
- **`workflow-management`** - Create and manage workflows
- **`framework-development`** - Framework development and evolution

### Scope Naming Conventions

- Use lowercase with hyphens: `agent-initialisation`, `context-management`
- Be specific: `project-config` not `config`
- Group related capabilities: `context-management` covers sync, update, create
- Use hierarchical scopes when needed: `workflow-management.create`, `workflow-management.execute`

## Implementation

### Agent Definition

```yaml
---
version: 1.0.0
agent_name: baton-framework-agent
agent_short_name: baton-agent
agent_type: meta_framework_expert
scope:
  - agent-initialisation
  - context-management
  - project-setup
  - framework-development
  - workflow-management
---
```

### Command Definition (Markdown)

```yaml
---
description: Initialize the baton-agent for a new session
scope: agent-initialisation # Required scope for agent to execute this command
---
```

### Command Definition (TOML)

```toml
[command]
description = "Initialize the baton-agent for a new session"
name = "init-baton-agent"
scope = "agent-initialisation" # Required scope for agent to execute this command
```

### Workflow Definition

```yaml
version: 1.0.0
workflow_name: agent-initialisation
purpose: Initialize an agent for a new session
associate_command: init-{agent_short_name}
scope: agent-initialisation # Required scope for agent to execute this workflow
created: 2025-11-23
```

### Sub-Flow Definition

```yaml
version: 1.0.0
workflow_name: sub-flow-load-project-config
purpose: Load project configuration file (project.config.yml)
scope: project-config # Required scope for parent workflow to call this sub-flow
created: 2025-11-23
```

## Scope Validation

### Command Execution

When an agent attempts to execute a command:

1. **Load agent definition** - Get agent's scope array
2. **Load command definition** - Get command's required scope
3. **Check scope match** - Verify agent's scope includes command's scope
4. **If match**: Execute command
5. **If no match**: Display error message

**Error Message:**

```text
❌ Error: Insufficient scope

Agent: {agent_name}
Required scope: {command_scope}
Agent scopes: {agent_scopes}

This agent does not have the required scope to execute this command.
```

### Workflow Execution

When a workflow attempts to call a sub-flow:

1. **Load workflow definition** - Get workflow's scope
2. **Load sub-flow definition** - Get sub-flow's required scope
3. **Check scope match** - Verify workflow's scope includes sub-flow's scope
4. **If match**: Execute sub-flow
5. **If no match**: Display error message and skip sub-flow

**Error Message:**

```text
⚠️ Warning: Sub-flow scope mismatch

Workflow: {workflow_name}
Sub-flow: {sub_flow_name}
Required scope: {sub_flow_scope}
Workflow scope: {workflow_scope}

Cannot execute sub-flow - workflow does not have required scope.
```

## Benefits of Scope System

1. **Explicit Authorization** - Clear requirement matching
2. **Sub-Flow Validation** - Prevents workflows from calling unauthorized sub-flows
3. **Flexible** - Can use hierarchical scopes for fine-grained control
4. **Self-Documenting** - Scope values clearly indicate capabilities
5. **Type-Safe** - Scope matching is deterministic and verifiable

## Migration from Tags

The scope system replaces the earlier tag-based system:

**Old (Tags):**

```yaml
agent_tags: [] # Empty array means ALL agents can run this workflow
tags:
  - apm
  - project-management
  - coordination
```

**New (Scope):**

```yaml
scope: agent-initialisation # Explicit scope requirement
scope:
  - agent-initialisation
  - context-management
  - project-setup
```

## Best Practices

1. **Be Specific** - Use specific scope names that clearly indicate capability
2. **Group Related** - Use consistent naming for related capabilities
3. **Document Scopes** - Document what each scope allows in framework documentation
4. **Validate Early** - Check scope matches before executing commands/workflows
5. **Clear Errors** - Provide clear error messages when scope mismatches occur
