---
version: 1.0.0
boundary_type: project
scope: project
description: {Brief description of project-wide boundaries}
created: {YYYY-MM-DD}
---

# Project Boundaries

**⚠️ IMPORTANT:** ONLY the Baton Agent is allowed to create new files from these templates. This restriction must be hardcoded into all versions of this file.

**Scope:** These boundaries apply to all agents in this project unless overridden by agent-specific boundaries.

**Boundary Hierarchy:**
1. `project-boundaries.md` (this file) - Base boundaries for all agents
2. `{agent-name}-boundaries.md` - Agent-specific overrides

**Precedence Rules:**
- Agent-specific boundaries override project boundaries for that agent
- If an agent boundary conflicts with a project boundary, the agent boundary takes precedence
- Example: If project boundary says "Ask before modifying production configs" and agent boundary says "Never modify production configs", the agent boundary (more restrictive) applies

## Always Do

**Mandatory actions that must be performed:**

### {Category Name}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Trigger:** {When this action must be performed}
  - **Example:** {Brief example of correct behavior}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Trigger:** {When this action must be performed}

### {Category Name}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Trigger:** {When this action must be performed}

## Ask First

**Actions requiring human approval before execution:**

### {Category Name}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Condition:** {Conditions that require asking}
  - **Example:** {Brief example of when to ask}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Condition:** {Conditions that require asking}

### {Category Name}

- **Action:** {Specific action description}
  - **Scope:** {Files, directories, environments where this applies}
  - **Condition:** {Conditions that require asking}

## Never Do

**Prohibited actions with clear consequences:**

### Technical Constraints

- **Action:** {Violate technical constraint - e.g., "Use unsupported technology versions"}
  - **Scope:** {Where this applies - e.g., "All code, dependencies, infrastructure"}
  - **Consequence:** {What happens if violated - e.g., "Compatibility issues, security vulnerabilities"}
  - **Example:** {Example of violation - e.g., "Using Node.js 14 when project requires Node.js 20+"}

- **Action:** {Violate technical constraint - e.g., "Bypass infrastructure requirements"}
  - **Scope:** {Where this applies}
  - **Consequence:** {What happens if violated}
  - **Example:** {Example of violation}

### Regulatory Constraints

- **Action:** {Violate regulatory requirement - e.g., "Store PII without encryption"}
  - **Scope:** {Where this applies - e.g., "All data storage, API endpoints, user data"}
  - **Consequence:** {What happens if violated - e.g., "Compliance violations, legal liability"}
  - **Example:** {Example of violation - e.g., "Storing user passwords in plain text"}

- **Action:** {Violate regulatory requirement - e.g., "Process data without consent"}
  - **Scope:** {Where this applies}
  - **Consequence:** {What happens if violated}
  - **Example:** {Example of violation}

### {Category Name}

- **Action:** {Specific prohibited action}
  - **Scope:** {Files, directories, environments where this applies}
  - **Consequence:** {What happens if this is violated}
  - **Example:** {Brief example of prohibited behavior}

## Scope Definitions

### Files and Directories

- **Protected:** {List of protected files/directories}
- **Modifiable:** {List of modifiable files/directories}
- **Restricted:** {List of restricted files/directories}

### Environments

- **Development:** {Boundaries specific to development environment}
- **Staging:** {Boundaries specific to staging environment}
- **Production:** {Boundaries specific to production environment}

## Examples

### Allowed Actions

**✅ Example 1:**
{Description of allowed action}

**✅ Example 2:**
{Description of allowed action}

### Blocked Actions

**❌ Example 1:**
{Description of blocked action}

**❌ Example 2:**
{Description of blocked action}

