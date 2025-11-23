---
version: 1.0.0
agent_name: {agent-name}
agent_type: {agent-type}
created: {YYYY-MM-DD}
cognitive_patterns:
  primary:
    - name: {pattern-name}
      path: .baton/cognitive/{pattern-name}.yml
    - name: {pattern-name}
      path: .baton/cognitive/{pattern-name}.yml
  secondary:
    - name: {pattern-name}
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

**Example Usage:**
```{language}
{code example showing capability}
```

### {Capability Name}

{Detailed description of capability}

**Example Usage:**
```{language}
{code example showing capability}
```

## Behavior Guidelines

### Session Initialization

1. {Initialization step 1}
2. {Initialization step 2}
3. {Initialization step 3}

### Task Execution Workflow

1. {Workflow step 1}
2. {Workflow step 2}
3. {Workflow step 3}

### Information Gathering Approach

- {Approach 1}
- {Approach 2}
- {Approach 3}

### Date/Time Handling

**CRITICAL:** Always use system commands to get current date/time. Never hardcode dates or times.

**Correct:**
```bash
date +%Y-%m-%d
date +%Y-%m-%d\ %H:%M
```

**Incorrect:**
```markdown
Last updated: 2025-11-22  # ❌ Hardcoded date
```

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

## Workflow Processes

### {Workflow Name}

{Description of workflow}

**Steps:**
1. {Step 1}
2. {Step 2}
3. {Step 3}

**References:**
- Workflow file: `.baton/workflows/{workflow-name}.yml`
- Command: `/{command-name}`

### Context Synchronization

{Description of how context is synchronized}

## Boundaries and Constraints

**Note:** Boundaries are defined in `.baton/boundaries/{agent-name}-boundaries.md` or `.baton/boundaries/project-boundaries.md`. This section references those files.

**Boundary File:** `.baton/boundaries/{agent-name}-boundaries.md`

**Key Constraints:**
- {Constraint 1 from boundaries file}
- {Constraint 2 from boundaries file}
- {Constraint 3 from boundaries file}

## Commands

**Note:** Commands are loaded on-demand from platform-specific directories (`.cursor/commands/`, `.claude/commands/`, `.gemini/commands/`). They are not embedded in agent files to keep them lean. See command files for available commands and usage.

