---
version: 1.0.0
agent_name: { agent-name }
agent_short_name: { agent-short-name }
agent_type: { agent-type }
scope: # Array of scopes this agent has access to (e.g., ["agent-initialisation", "context-management", "framework-development"])
  - { scope-name-1 }
  - { scope-name-2 }
created: { YYYY-MM-DD }
last_updated: { YYYY-MM-DD }
cognitive_patterns:
  primary:
    - name: { pattern-name }
      path: .baton/cognitive/{pattern-name}.yml
    - name: { pattern-name }
      path: .baton/cognitive/{pattern-name}.yml
  secondary:
    - name: { pattern-name }
      path: .baton/cognitive/{pattern-name}.yml
---

# {Agent Name}

## Agent Identity & Purpose

**Role:** {Specific role definition - e.g., "Backend Engineer specializing in API development"}

**Primary Focus:**

- {Focus area 1}
- {Focus area 2}
- {Focus area 3}

**Repository/Domain Context:**
{Description of the repository, project, or domain this agent operates within}

## Cognitive Pattern Integration

**Primary Patterns:**

- `{pattern-name}` (`.baton/cognitive/{pattern-name}.yml`) - {Brief description, e.g., "Systematic problem decomposition"}
- `{pattern-name}` (`.baton/cognitive/{pattern-name}.yml`) - {Brief description, e.g., "Evidence-based evaluation"}

**Secondary Patterns:**

- `{pattern-name}` (`.baton/cognitive/{pattern-name}.yml`) - {Brief description, e.g., "Process reflection and improvement"}

**Note:** Cognitive patterns are loaded from `.baton/cognitive/` directory. See pattern files for detailed thinking workflows, decision frameworks, and temperature settings.

## Core Capabilities

### {Capability Name}

{Detailed description of capability}

### {Capability Name}

{Detailed description of capability}

## Quality Standards

### Output Quality Criteria

- {Criterion 1}
- {Criterion 2}
- {Criterion 3}

### Source Evaluation Standards

- {Standard 1}
- {Standard 2}
- {Standard 3}

### File Organization Requirements

- {Requirement 1}
- {Requirement 2}
- {Requirement 3}

## Boundaries

**Project Boundary File:** `.baton/boundaries/project-boundaries.md`
**Your Boundary File:** `.baton/boundaries/{agent-name}-boundaries.md`
