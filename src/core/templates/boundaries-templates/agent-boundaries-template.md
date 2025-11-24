---
version: 1.0.0
boundary_type: agent
agent_name: {agent-name}
scope: agent
description: {Brief description of agent-specific boundaries}
created: {YYYY-MM-DD}
---

# {Agent Name} - Boundaries

**Scope:** These boundaries apply specifically to the {agent-name} agent and override project boundaries where specified.

**Boundary Hierarchy:**
1. `project-boundaries.md` - Base boundaries (applies unless overridden)
2. `{agent-name}-boundaries.md` (this file) - Agent-specific overrides

## Always Do

**Mandatory actions specific to this agent:**

### {Category Name}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Trigger:** {When this action must be performed}
  - **Override:** {If this overrides a default boundary, note it here}
  - **Example:** {Brief example of correct behavior}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Trigger:** {When this action must be performed}

### {Category Name}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Trigger:** {When this action must be performed}

## Ask First

**Actions requiring human approval specific to this agent:**

### {Category Name}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Condition:** {Conditions that require asking}
  - **Override:** {If this overrides a default boundary, note it here}
  - **Example:** {Brief example of when to ask}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Condition:** {Conditions that require asking}

## Never Do

**Prohibited actions specific to this agent:**

### {Category Name}

- **Action:** {Specific prohibited action}
  - **Scope:** {Files, directories, environments where this applies}
  - **Consequence:** {What happens if this is violated}
  - **Override:** {If this overrides a default boundary, note it here}
  - **Example:** {Brief example of prohibited behavior}

- **Action:** {Specific prohibited action}
  - **Scope:** {Files, directories, environments where this applies}
  - **Consequence:** {What happens if this is violated}

### Agent-Specific Restrictions

**This agent must NOT:**

- {Restriction 1 specific to this agent's role}
- {Restriction 2 specific to this agent's role}
- {Restriction 3 specific to this agent's role}

## Scope Definitions

### Agent-Specific Files and Directories

- **Primary Focus:** {Files/directories this agent primarily works with}
- **Prohibited:** {Files/directories this agent must not modify}
- **Requires Approval:** {Files/directories requiring approval to modify}

### Agent-Specific Environments

- **Development:** {Boundaries specific to this agent in development}
- **Staging:** {Boundaries specific to this agent in staging}
- **Production:** {Boundaries specific to this agent in production}

## Examples

### Allowed Actions (Agent-Specific)

**✅ Example 1:**
{Description of allowed action specific to this agent}

**✅ Example 2:**
{Description of allowed action specific to this agent}

### Blocked Actions (Agent-Specific)

**❌ Example 1:**
{Description of blocked action specific to this agent}

**❌ Example 2:**
{Description of blocked action specific to this agent}

