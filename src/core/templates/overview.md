# Baton Framework Templates Overview

This directory contains template examples for all Baton Framework file types. These templates define the structure and format for agent definition files, context files, workflows, knowledge files, cognitive patterns, and boundaries.

## Overview

Baton Framework uses a modular architecture separating:

- **Cognitive Patterns** (how agents think)
- **Knowledge Files** (what agents know)
- **Workflow Files** (how agents act)
- **Boundaries** (what agents can/cannot do)

This separation enables:

- Reusability across multiple agents
- Clear separation of concerns
- Pattern-specific optimization
- Progressive disclosure to manage context

## Template Types

### 1. Agent Definition Files

**Location:** `agents/agent-template.md`

**Format:** Frontmatter (YAML frontmatter + Markdown content)

**Purpose:** Define agent identity, capabilities, cognitive patterns, and quality standards.

**Key Sections:**

- Agent Identity & Purpose
- Cognitive Pattern Integration
- Core Capabilities
- Quality Standards
- Boundaries Reference

**Note:**

- Commands are NOT embedded in agent files. They are loaded on-demand from platform-specific directories (`.cursor/commands/`, `.claude/commands/`, `.gemini/commands/`).
- Behavior guidelines are handled by `project.manifest`, `project.config.yml`, boundaries, and workflows.
- Workflow processes are defined in their own workflow files, not in agent files.

**Usage:**

```bash
# Generate new agent file from template
baton generate agent {agent-name}
```

**Example Output:**

```
.baton/agents/{agent-name}.md
```

### 2. Context Files

**Location:** `context/context-template.md`

**Format:** Pure Markdown with frontmatter (exception to frontmatter rule)

**Purpose:** Track agent session activities, decisions, learnings, and repository state.

**Key Sections:**

- Current Status
- Recent Work (session summaries)
- Repository Statistics
- Key Learnings
- Ongoing Projects
- Future Priorities
- Historical Insights

**Usage:**

```bash
# Context files are automatically maintained by agents
# Manual creation not typically required
```

**Example Output:**

```
.baton/context/{agent-name}-context.md
```

### 3. Workflow Files

**Location:** `workflows/workflow-template.yml`

**Format:** Pure YAML (no frontmatter)

**Purpose:** Define step-by-step processes executed by commands.

**Key Sections:**

- Prerequisites
- Workflow Steps
- Error Handling
- Command References
- Examples

**Note:** Workflows must have corresponding command files in platform-specific directories. Command files are out of scope for templates but are required for workflow execution.

**Usage:**

```bash
# Generate new workflow file from template
baton generate workflow {workflow-name}
```

**Example Output:**

```
.baton/workflows/{workflow-name}.yml
```

### 4. Knowledge Files

**Location:** `knowledge/knowledge-file-template.md`

**Format:** Frontmatter (YAML frontmatter + Markdown content)

**Purpose:** Provide slimmed-down, concentrated versions of tool documentation or best practices.

**Key Sections:**

- Quick Reference
- Common Patterns
- Detailed Usage
- Best Practices for AI Agents
- Anti-Patterns

**Usage:**

```bash
# Generate new knowledge file from template
baton install knowledge {tool-name}
```

**Example Output:**

```
.baton/knowledge/{tool-name}.md
```

### 5. Cognitive Pattern Files

**Location:** `cognitive/cognitive-pattern-template.yml`

**Format:** Pure YAML (no frontmatter)

**Purpose:** Define structured thinking patterns for agents (analytical, critical, systems, etc.).

**Key Sections:**

- Model Parameters (sent to LLM)
- Pattern Metadata (NOT sent to LLM)
- Cognitive Identity
- Thinking Workflow
- Decision Making Framework
- Communication Patterns
- Quality Standards

**Usage:**

```bash
# Generate new cognitive pattern from template
baton generate cognitive {pattern-name}
```

**Example Output:**

```
.baton/cognitive/{pattern-name}.yml
```

### 6. Boundaries Files

**Location:** `boundaries/project-boundaries-template.md` and `boundaries/agent-boundaries-template.md`

**Format:** Frontmatter (YAML frontmatter + Markdown content)

**Purpose:** Define three-tier boundary system (Always Do / Ask First / Never Do) for agent constraints.

**Key Sections:**

- Always Do (mandatory actions)
- Ask First (actions requiring approval)
- Never Do (prohibited actions)
- Scope Definitions
- Examples

**Boundary Hierarchy:**

1. `project-boundaries.md` - Base boundaries for all agents
2. `{agent-name}-boundaries.md` - Agent-specific overrides

**Usage:**

```bash
# Generate project boundaries
baton generate boundaries project

# Generate agent-specific boundaries
baton generate boundaries {agent-name}
```

**Example Output:**

```
.baton/boundaries/project-boundaries.md
.baton/boundaries/{agent-name}-boundaries.md
```

### 7. Command Files

**Location:** `commands/markdown/` (for Cursor/Claude) and `commands/toml/` (for Gemini)

**Format:**

- Markdown with YAML frontmatter (`.md`) for Cursor, Claude, and others
- TOML (`.toml`) for Gemini Desktop

**Purpose:** Define executable commands that agents can invoke to perform specific tasks.

**Key Sections:**

- Command metadata (description, argument hints)
- Step-by-step instructions
- Error handling
- Important notes

**Available Templates:**

- `agent-init-template` - Initialize agent for new session
- `run-workflow-template` - Execute workflow with agent authorization checks
- `sync-context-template` - Update agent context with session summary
- `wrap-up-template` - Sync context, commit, and push changes

**Usage:**

```bash
# Generate Markdown command (Cursor/Claude)
baton generate command markdown {command-name} {agent-name}

# Generate TOML command (Gemini)
baton generate command toml {command-name} {agent-name}
```

**Example Output:**

```
.cursor/commands/baton/{command-name}.md
.claude/commands/baton/{command-name}.md
.gemini/commands/baton/{command-name}.toml
```

### 8. Project Configuration File

**Location:** `config/project.config-template.yml`

**Format:** Pure YAML (no frontmatter)

**Purpose:** Project configuration file that agents use to understand available tools, resources, agents, workflows, and project management settings.

**Key Sections:**

- Version
- Project metadata (name, type, initialized date)
- Source control configuration
- Project management configuration (methodology, location, URL)
- GenAI platform configurations
- Enabled agents (with file paths)
- Installed knowledge files (tools, resources with file paths)
- Enabled workflows (with file paths)
- Agent preferences
- Creation metadata

**Usage:**

```bash
# Generate project configuration
baton init project
```

**Example Output:**

```
.baton/project.config.yml
```

**Note:** This file is loaded during agent initialization and workflow execution to provide project context. File paths are included for agents, knowledge files, and workflows so agents know where to load them.

### 9. Project Manifest File

**Location:** `manifest/project-manifest-template.md`

**Format:** Frontmatter (YAML frontmatter + Markdown content)

**Purpose:** Project Manifest (Project Constitution) - RHYTHM Method artifact containing project information, requirements, and success criteria.

**Key Sections:**

- Project Information (name, description, organization, tech stack)
- Project Requirements (business objectives, technical requirements, non-functional requirements)
- Project Structure (features)
- Decision Log (reference to architecture-decisions.md)
- Project Constraints (reference to boundaries file)
- Success Criteria (project goals)

**Usage:**

```bash
# Generate project manifest
baton init manifest
```

**Example Output:**

```
.baton/project.manifest
```

**Note:** This file is loaded during agent initialization and workflow execution. Architectural decisions are maintained in `knowledge/architecture-decisions.md` to prevent manifest bloat. Technical and regulatory constraints are defined in `.baton/boundaries/project-boundaries.md`.

### 10. Architecture Decisions File

**Location:** `knowledge/architecture-decisions-template.md`

**Format:** Frontmatter (YAML frontmatter + Markdown content)

**Purpose:** Store all architectural decisions and ADRs (Architecture Decision Records) for the project.

**Key Sections:**

- Decision Log (all architectural decisions with status, context, rationale, alternatives, impact)
- Decision Categories (Technology Choices, Architecture Patterns, Infrastructure, Security, Data Management)
- Deprecated Decisions (decisions that are no longer valid)

**Usage:**

```bash
# Generate architecture decisions file
baton generate knowledge architecture-decisions
```

**Example Output:**

```
.baton/knowledge/architecture-decisions.md
```

**Note:** This file prevents the project manifest from becoming bloated with decision history. Only decisions that affect project architecture, technology choices, or significant design patterns should be recorded here.

## Template Hierarchy

```
.baton/
├── agents/
│   └── {agent-name}.md          # References cognitive patterns, boundaries, workflows
├── cognitive/
│   └── {pattern-name}.yml       # Standalone thinking patterns
├── knowledge/
│   └── {tool-name}.md           # Standalone tool documentation
├── workflows/
│   └── {workflow-name}.yml      # Referenced by commands
├── boundaries/
│   ├── project-boundaries.md    # Base boundaries
│   └── {agent-name}-boundaries.md  # Agent-specific overrides
├── context/
│   └── {agent-name}-context.md  # Session tracking
├── project.config.yml           # Project configuration (tools, agents, workflows)
└── project.manifest             # Project constitution (requirements, decisions, constraints)
```

## File Format Rules

### Pure YAML (`.yml`)

- Cognitive pattern files
- Workflow files
- Project config files (`.baton/project.config.yml`)
- **NO frontmatter** (YAML is the format itself)

### Frontmatter (YAML frontmatter + Markdown)

- Agent definition files (`.md`)
- Boundaries files (`.md`)
- Knowledge files (`.md`)
- Command files (`.md` for Cursor/Claude)
- Project manifest (`.baton/project.manifest`)
- **MUST have YAML frontmatter**

### TOML (Pure TOML)

- Command files (`.toml` for Gemini)
- **NO frontmatter** (TOML is the format itself)

### Pure Markdown (`.md`)

- Context files (`.md`)
- **Exception:** Context files use frontmatter for metadata but content is pure Markdown

## Size Guidelines

**Primary Target:** <500 tokens per file (~100-150 lines)

**Exceptions:**

- Knowledge files: Can be longer if needed, but still aim for concise
- Rules file: Can be longer (comprehensive guide)
- Context files: Variable (session-based), but keep individual entries concise

## Best Practices

1. **Keep Files Lean:** <500 tokens, ~100-150 lines (exceptions noted)
2. **Be Specific:** Not vague, with examples
3. **Code Examples Over Explanations:** One real code snippet beats three paragraphs
4. **Progressive Disclosure:** Load on-demand, don't bloat context
5. **No Hardcoded Dates:** Always use system commands (`date +%Y-%m-%d`)
6. **Reference, Don't Duplicate:** Link to related files instead of copying content
7. **Three-Tier Boundaries:** Always Do / Ask First / Never Do
8. **Specialist Personas:** Focused roles, not general assistants

---

# Baton Framework File Generation Rules

**Purpose:** These rules define what Baton Framework files should and should not contain/do. Agents generating files from templates must follow these rules.

## File Structure Guidelines

### Required Sections

Each file type has required sections that must be included:

**Agent Files (`agent-template.md`):**

- ✅ Frontmatter (version, agent_name, agent_short_name, agent_type, created, last_updated, cognitive_patterns)
- ✅ Agent Identity & Purpose
- ✅ Cognitive Pattern Integration
- ✅ Core Capabilities
- ✅ Quality Standards
- ✅ Boundaries Reference (link to boundaries file, not inline)

**Note:** Behavior guidelines, workflow processes, and commands are NOT included in agent files. They are handled by:

- Behavior guidelines: `project.manifest`, `project.config.yml`, boundaries, and workflows
- Workflow processes: Defined in separate workflow files (`.baton/workflows/`)
- Commands: Loaded on-demand from platform-specific directories

**Context Files (`context-template.md`):**

- ✅ Frontmatter (version, agent, created, last_updated)
- ✅ Current Status
- ✅ Recent Work (session summaries)
- ✅ Repository Statistics
- ✅ Key Learnings

**Workflow Files (`workflow-template.yml`):**

- ✅ Version & metadata
- ✅ Prerequisites
- ✅ Workflow Steps
- ✅ Error Handling
- ✅ Command References

**Knowledge Files (`knowledge-file-template.md`):**

- ✅ Frontmatter (version, tool_name, purpose, official_sources)
- ✅ Quick Reference
- ✅ Common Patterns
- ✅ Detailed Usage
- ✅ Best Practices for AI Agents
- ✅ Anti-Patterns

**Cognitive Pattern Files (`cognitive-pattern-template.yml`):**

- ✅ Version & metadata
- ✅ Model Parameters (sent to LLM)
- ✅ Pattern Metadata (NOT sent to LLM)
- ✅ Cognitive Identity
- ✅ Thinking Workflow
- ✅ Decision Making Framework
- ✅ Communication Patterns
- ✅ Quality Standards

**Boundaries Files (`boundaries-template.md`):**

- ✅ Frontmatter (version, boundary_type, scope, created)
- ✅ Always Do (mandatory actions)
- ✅ Ask First (actions requiring approval)
- ✅ Never Do (prohibited actions)
- ✅ Scope Definitions
- ✅ Examples

**Project Config Files (`project.config-template.yml`):**

- ✅ Version
- ✅ Project metadata (name, type, initialized)
- ✅ Source control configuration
- ✅ Project management configuration (methodology, location, URL)
- ✅ GenAI platform configurations
- ✅ Enabled agents (with file paths)
- ✅ Installed knowledge files (with file paths)
- ✅ Enabled workflows (with file paths)
- ✅ Agent preferences
- ✅ Creation metadata

**Project Manifest Files (`project-manifest-template.md`):**

- ✅ Frontmatter (type, project, version, created, last_updated, status)
- ✅ Project Information
- ✅ Project Requirements (Business Objectives, Technical Requirements, Non-Functional Requirements)
- ✅ Project Structure (Features)
- ✅ Decision Log (reference to architecture-decisions.md)
- ✅ Project Constraints (reference to boundaries file)
- ✅ Success Criteria

**Architecture Decisions Files (`architecture-decisions-template.md`):**

- ✅ Frontmatter (version, type, purpose, created, last_updated)
- ✅ Decision Log (all architectural decisions with status, context, rationale, alternatives, impact)
- ✅ Decision Categories (Technology Choices, Architecture Patterns, Infrastructure, Security, Data Management)
- ✅ Deprecated Decisions (decisions that are no longer valid)

### Optional Sections

Optional sections may be included when relevant:

- Notes
- Additional Examples
- Related Resources
- Troubleshooting

### Section Ordering

Sections must follow the template order. Do not rearrange sections unless the template explicitly allows it.

## Content Guidelines

### What to Include

**✅ DO Include:**

1. **Specific, Actionable Information**

   - Specific commands, not vague descriptions
   - Concrete examples, not abstract concepts
   - Exact syntax, not approximations

2. **Code Examples Over Explanations**

   - One real code snippet beats three paragraphs
   - Show desired output with actual code
   - Include working examples

3. **Specific Tech Stack Information**

   - Include versions: "React 18" not "React"
   - Include key dependencies
   - Specify exact tool versions when relevant

4. **Scope and Context**

   - Define when constraints apply
   - Specify which files/directories/environments
   - Include trigger conditions

5. **Examples of Correct vs. Incorrect**
   - Show what to do and what not to do
   - Explain why anti-patterns are problematic
   - Use ✅ and ❌ markers for clarity

### What to Avoid

**❌ DON'T Include:**

1. **Vague or Abstract Guidance**

   - "Be careful" → ❌
   - "Never commit secrets" → ✅
   - "Be helpful" → ❌
   - "Always run tests before committing" → ✅

2. **Time-Sensitive Information**

   - Dates that will become outdated
   - Version numbers that will change
   - URLs that may break
   - Use placeholders: `{YYYY-MM-DD}` instead of actual dates

3. **Over-Explanation of Basics**

   - Don't explain what LLMs already know
   - Don't include obvious information
   - Focus on what agents need to know

4. **Enforcement Mechanisms**

   - Boundaries files should NOT include code for enforcement
   - Framework handles enforcement
   - Focus on rules/constraints, not implementation

5. **Redundant Information**

   - Don't duplicate content across files
   - Reference other files instead of copying
   - Use links to related resources

6. **Hardcoded Dates/Times**
   - Never hardcode dates or times
   - Always use system commands: `date +%Y-%m-%d`
   - Use placeholders in templates: `{YYYY-MM-DD}`

## Size and Verbosity Limits

### Target Sizes

**Primary Target:** <500 tokens per file (~100-150 lines)

**Exceptions:**

- Knowledge files: Can be longer if needed, but still aim for concise
- Rules file: Can be longer (comprehensive guide)
- Context files: Variable (session-based), but keep individual entries concise

### Size Management Principles

1. **Progressive Disclosure**

   - Start with high-level overview
   - Add details as needed
   - Don't dump all context upfront

2. **Selective Loading**

   - Load only relevant information
   - Reference external files instead of embedding
   - Use links to detailed documentation

3. **Compression Techniques**
   - Summarize rather than quote verbatim
   - Remove redundant information
   - Focus on essential content

### When Files Exceed Limits

If a file exceeds the target size:

1. **Split into Multiple Files**

   - Break large files into smaller, focused files
   - Use references to link related files
   - Maintain clear organization

2. **Move Details to External Files**

   - Put detailed examples in separate files
   - Reference knowledge files for detailed usage
   - Use workflows for complex processes

3. **Prioritize Essential Information**
   - Remove non-essential content
   - Focus on what agents need to know
   - Eliminate redundancy

## Best Practices

### Code Examples

**✅ Good Example:**

````markdown
**Correct:**

```bash
date +%Y-%m-%d
```
````

**Incorrect:**

```markdown
Last updated: 2025-11-22 # ❌ Hardcoded date
```

````

**❌ Bad Example:**
```markdown
Always use system commands to get dates. Don't hardcode them.
````

### Specificity

**✅ Good:**

```markdown
- **Action:** Never commit files containing API keys or passwords
  - **Scope:** All files in repository
  - **Consequence:** Security breach, potential data loss
```

**❌ Bad:**

```markdown
- Be careful with sensitive data
```

### Tech Stack Information

**✅ Good:**

```markdown
**Tech Stack:** React 18 with TypeScript, Vite, and Tailwind CSS
```

**❌ Bad:**

```markdown
**Tech Stack:** React project
```

### Progressive Disclosure

**✅ Good:**

```markdown
## Quick Reference

{Common commands and patterns}

## Detailed Usage

{Comprehensive guide with examples}
```

**❌ Bad:**

```markdown
## Everything You Need to Know

{All information dumped in one section}
```

## Anti-Patterns

### Anti-Pattern 1: Vague Boundaries

**❌ Don't:**

```markdown
## Boundaries

- Be careful
- Don't break things
- Ask if unsure
```

**✅ Do:**

```markdown
## Boundaries

### Never Do

- **Action:** Never commit secrets or API keys
  - **Scope:** All commits
  - **Consequence:** Security breach
```

### Anti-Pattern 2: Hardcoded Dates

**❌ Don't:**

```markdown
Last updated: 2025-11-22
Created: 2025-01-15
```

**✅ Do:**

```markdown
Last updated: {YYYY-MM-DD} # Use date command
Created: {YYYY-MM-DD} # Use date command
```

### Anti-Pattern 3: Over-Explanation

**❌ Don't:**

```markdown
JavaScript is a programming language that runs in browsers. It was created in 1995...
```

**✅ Do:**

```markdown
## JavaScript Best Practices

{Agent-specific guidance only}
```

### Anti-Pattern 4: Duplication

**❌ Don't:**

```markdown
# Agent File

## Boundaries

{Full boundaries content}

# Boundaries File

{Same boundaries content}
```

**✅ Do:**

```markdown
# Agent File

## Boundaries

See `.baton/boundaries/{agent-name}-boundaries.md`
```

### Anti-Pattern 5: Missing Examples

**❌ Don't:**

```markdown
## Usage

Use this command to do things.
```

**✅ Do:**

````markdown
## Usage

```bash
{command} {arguments}
```
````

**Example:**

```bash
{command} {example-arguments}
```

`````

## Format Specifications

### File Format Requirements

**Pure YAML (`.yml`):**
- Cognitive pattern files
- Workflow files
- Project config files (`.baton/project.config.yml`)
- **NO frontmatter** (YAML is the format itself)

**Frontmatter (YAML frontmatter + Markdown content):**
- Agent definition files (`.md`)
- Boundaries files (`.md`)
- Knowledge files (`.md`)
- Command files (`.md` for Cursor/Claude)
- Project manifest (`.baton/project.manifest`)
- **MUST have YAML frontmatter**

**Pure Markdown (`.md`):**
- Context files (`.md`)
- **Exception:** Context files use frontmatter for metadata but content is pure Markdown

### Frontmatter Requirements

**Required Fields (varies by file type):**

**Agent Files:**
```yaml
---
version: {semantic version}
agent_name: {name}
agent_short_name: {short-name}
agent_type: {type}
created: {YYYY-MM-DD}
last_updated: {YYYY-MM-DD}
cognitive_patterns:
  primary: [...]
  secondary: [...]
---
```

**Context Files:**

```yaml
---
version: { semantic version }
agent: { agent-name }
created: { YYYY-MM-DD }
last_updated: { YYYY-MM-DD HH:MM }
---
```

**Boundaries Files:**

```yaml
---
version: { semantic version }
boundary_type: { default|agent }
scope: { project|agent }
created: { YYYY-MM-DD }
---
```

**Knowledge Files:**

```yaml
---
version: { semantic version }
tool_name: { tool-name }
purpose: { description }
created: { YYYY-MM-DD }
official_sources: [...]
---
```

**Project Manifest Files:**

```yaml
---
type: project-manifest
project: { project-name }
version: { semantic version }
created: { YYYY-MM-DD }
last_updated: { YYYY-MM-DD }
status: active
---
```

### Versioning

**Semantic Versioning:**

- Format: `Major.Minor.Patch` (e.g., `1.0.0`)
- Major: Breaking changes
- Minor: New features, backward-compatible
- Patch: Bug fixes, corrections

## File Type-Specific Rules

### Agent Files

**Must:**

- Reference cognitive patterns by path, don't embed
- Link to boundaries file, don't duplicate
- Use specialist persona (not general assistant)
- Include `agent_short_name` and `last_updated` in frontmatter
- Keep files lean and focused on identity, capabilities, and quality standards

**Must Not:**

- Include behavior guidelines (handled by project.manifest, project.config.yml, boundaries, workflows)
- Include workflow processes (defined in separate workflow files)
- Include commands (loaded on-demand from platform-specific directories)
- Include enforcement code
- Hardcode dates or times
- Duplicate boundary definitions
- Use vague role descriptions

### Context Files

**Must:**

- Use `date` command for timestamps
- Append-only for session summaries
- Preserve all existing content
- Separate current vs. historical context

**Must Not:**

- Hardcode dates or times
- Delete historical context
- Mix instructions with data
- Include time-sensitive information

### Workflow Files

**Must:**

- Use pure YAML format
- Include error handling
- Reference commands, don't duplicate
- Be modular (one workflow per file)

**Must Not:**

- Use frontmatter (YAML is the format)
- Duplicate command definitions
- Mix multiple workflows in one file
- Skip error handling

### Knowledge Files

**Must:**

- Include quick reference at top
- Provide code examples
- Focus on one tool/technology
- Include anti-patterns

**Must Not:**

- Include full documentation (slimmed-down only)
- Mix multiple tools in one file
- Skip examples
- Use vague descriptions

### Cognitive Pattern Files

**Must:**

- Use pure YAML format
- Include pattern-specific temperature
- Define thinking workflow phases
- Specify quality standards

**Must Not:**

- Use frontmatter (YAML is the format)
- Use generic temperature settings
- Skip workflow phases
- Omit quality criteria

### Boundaries Files

**Must:**

- Use three-tier system (Always Do / Ask First / Never Do)
- Include scope definitions
- Provide examples
- Be highly specific

**Must Not:**

- Include enforcement mechanisms
- Use vague constraints
- Skip scope definitions
- Omit examples

### Project Config Files

**Must:**

- Use pure YAML format (no frontmatter)
- Include all required sections (version, project, source_control, project_management, gen_ai, agents, knowledge, workflows, preferences, metadata)
- Use ISO 8601 format for dates: `YYYY-MM-DDTHH:MM:SSZ`
- Use `date` command to generate timestamps (never hardcode)
- List enabled agents and workflows with file paths
- Specify tool integrations and resources with file paths
- Include project management methodology and location

**Must Not:**

- Use frontmatter (YAML is the format)
- Hardcode dates or times
- Skip required sections
- Use vague tool/resource descriptions
- Include IDE-specific configurations (Baton is IDE agnostic)
- Omit file paths for agents, knowledge files, or workflows

### Project Manifest Files

**Must:**

- Use frontmatter with required fields (type, project, version, created, last_updated, status)
- Include project information (name, description, organization, tech stack)
- Document project requirements (business objectives, technical requirements, non-functional requirements)
- Reference architecture-decisions.md for decision log (don't embed decisions)
- Link to feature files (don't embed feature details)
- Reference boundaries file for constraints (don't embed constraints)
- Document success criteria

**Must Not:**

- Embed ADRs (Architecture Decision Records) - use `knowledge/architecture-decisions.md` instead
- Include budget, timeline, or team size constraints (these are human project management concerns)
- Embed technical or regulatory constraints - use boundaries file instead
- Hardcode dates or times (use `date` command)
- Include time-sensitive information
- Duplicate feature file content (link instead)

### Architecture Decisions Files

**Must:**

- Use frontmatter with required fields (version, type, purpose, created, last_updated)
- Include decision status (Accepted, Proposed, Deprecated)
- Document context, rationale, alternatives, and impact for each decision
- Organize decisions by categories (Technology Choices, Architecture Patterns, Infrastructure, Security, Data Management)
- Include deprecated decisions section with migration notes

**Must Not:**

- Include minor implementation decisions (use code comments instead)
- Hardcode dates or times (use `date` command)
- Mix decision categories without organization
- Omit rationale or alternatives for decisions

## Validation Checklist

Before generating a file from a template, verify:

- [ ] File format matches template (YAML vs. Frontmatter)
- [ ] All required sections are present
- [ ] Frontmatter includes all required fields
- [ ] Size is within target limits (<500 tokens, ~100-150 lines)
- [ ] No hardcoded dates or times
- [ ] Code examples are included where needed
- [ ] Specificity is maintained (no vague guidance)
- [ ] No time-sensitive information
- [ ] No enforcement mechanisms (for boundaries)
- [ ] References are used instead of duplication
- [ ] Examples show correct vs. incorrect patterns
- [ ] Tech stack information is specific (with versions)
- [ ] Project config includes all required sections
- [ ] Project manifest links to features (doesn't embed)
- [ ] Project manifest decision log includes rationale

## Summary

**Key Principles:**

1. **Lean Files:** <500 tokens, ~100-150 lines (exceptions noted)
2. **Specific & Actionable:** Not vague, with examples
3. **Format Split:** YAML for cognitive/workflows, Frontmatter for agents/boundaries/knowledge
4. **Progressive Disclosure:** Load on-demand, don't bloat context
5. **Code Examples:** Over explanations where applicable
6. **No Hardcoded Dates:** Always use system commands
7. **No Enforcement:** Boundaries define rules, framework enforces
8. **Reference, Don't Duplicate:** Link to related files

**Remember:** These templates are used by agents to generate actual files. Keep them clear, specific, and actionable.

---

# Command File Creation Rules

**Purpose:** These rules define what Baton Framework command files should and should not contain/do. Agents generating command files from templates must follow these rules.

## File Format Requirements

### Markdown Format (Cursor, Claude, and others)

**File Extension:** `.md`

**Location:**

- Cursor: `.cursor/commands/{category}/{command-name}.md`
- Claude: `.claude/commands/{category}/{command-name}.md`
- Others: `{platform}/commands/{category}/{command-name}.md`

**Structure:**

- **YAML Frontmatter** (required):
  ```yaml
  ---
  description: { Brief description of what the command does }
  argument-hint: { optional: <argument-description> }
  ---
  ```
- **Markdown Content** with step-by-step instructions

### TOML Format (Gemini)

**File Extension:** `.toml`

**Location:** `.gemini/commands/{category}/{command-name}.toml`

**Structure:**

- **TOML sections** with `[command]` root section
- **Metadata** in `[command.metadata]`
- **Instructions** in `[command.instructions]`
- **Steps** in `[command.steps.step{N}]` sections
- **Important notes** in `[command.important_notes]`

## Required Sections

### All Command Files Must Include:

1. **Command Metadata**

   - Description (what the command does)
   - Argument hints (if command accepts arguments)
   - Version information (for TOML)

2. **Instructions Section**

   - Purpose statement
   - Step-by-step execution guide
   - Clear action items for each step

3. **Error Handling**

   - What to do if steps fail
   - How to report errors to users
   - Recovery strategies

4. **Important Notes**
   - Critical reminders
   - Common pitfalls to avoid
   - Best practices

## Content Guidelines

### What to Include

**✅ DO Include:**

1. **Clear Step-by-Step Instructions**

   - Numbered steps in execution order
   - Specific actions for each step
   - Expected outcomes

2. **Specific File Paths**

   - Use exact paths: `.baton/agents/{agent-name}.md`
   - Include placeholders for variables: `{agent-name}`, `{workflow-name}`
   - Reference actual file locations

3. **Bash Commands When Needed**

   - Use actual bash commands: `date +"%Y-%m-%d"`
   - Include command examples
   - Show expected output formats

4. **Error Handling Instructions**

   - What to check before proceeding
   - How to handle failures
   - User notification requirements

5. **Validation Steps**
   - How to verify prerequisites
   - How to confirm completion
   - What to check after execution

### What to Avoid

**❌ DON'T Include:**

1. **Hardcoded Dates or Times**

   - ❌ `Last updated: 2025-11-22`
   - ✅ `Use: date +"%Y-%m-%d"` command

2. **Vague Instructions**

   - ❌ "Do something with the file"
   - ✅ "Read the file at `.baton/agents/{agent-name}.md` and extract the cognitive_patterns section"

3. **Platform-Specific Assumptions**

   - ❌ "Use Cursor's file picker"
   - ✅ "Read the file using available file reading tools"

4. **Missing Error Handling**

   - ❌ Steps without failure scenarios
   - ✅ Include error handling for each critical step

5. **Incomplete Paths**
   - ❌ `agents/{name}.md`
   - ✅ `.baton/agents/{agent-name}.md`

## Command-Specific Rules

### Agent Init Commands

**Must:**

- Support both per-agent and single-with-short-name approaches
- Load agent definition file
- Load all referenced cognitive pattern files
- Load agent context (create if missing)
- Load boundaries (project and agent-specific)
- Load project.config.yml and project.manifest
- Provide initialization confirmation

**Must Not:**

- Hardcode agent names
- Skip cognitive pattern loading
- Assume context file exists
- Skip loading project files

### Run Workflow Commands

**Must:**

- Verify agent authorization before execution
- Check prerequisites from workflow file
- Load project.config.yml and project.manifest
- Execute workflow steps in order
- Handle errors according to workflow definition
- Support parallel execution when specified
- Provide completion summary

**Must Not:**

- Execute without authorization check
- Skip prerequisite verification
- Ignore error handling strategies
- Execute steps out of order
- Skip loading project files

### Sync Context Commands

**Must:**

- Use `date` command for timestamps (never hardcode)
- Preserve ALL existing context file content
- Append-only (never delete or modify existing entries)
- Include specific file changes in summary
- Update frontmatter `last_updated` field

**Must Not:**

- Hardcode dates or times
- Delete or modify existing context entries
- Skip file change details
- Use placeholder dates

### Wrap Up Commands

**Must:**

- Execute sync-context workflow first
- Check git status before staging
- Generate meaningful commit messages
- Verify push success
- Provide comprehensive summary

**Must Not:**

- Skip context sync
- Use generic commit messages
- Push without verification
- Hardcode branch names

## Naming Conventions

### Command File Names

**Format:** `{command-name}-template.md` or `{command-name}-template.toml`

**Examples:**

- `agent-init-template.md`
- `run-workflow-template.toml`
- `sync-context-template.md`
- `wrap-up-template.toml`

### Command Names in Frontmatter/Metadata

**Format:** Use kebab-case

**Examples:**

- `agent-init`
- `run-workflow`
- `sync-context`
- `wrap-up`

## Argument Handling

### Argument Hints

**Markdown Format:**

```yaml
argument-hint: <required-arg> <optional: optional-arg>
```

**TOML Format:**

```toml
argument_hint = "<required-arg> <optional: optional-arg>"
```

### Argument Parsing

**Must:**

- Extract arguments in order
- Validate required arguments
- Set defaults for optional arguments
- Provide clear error messages for missing required arguments

**Must Not:**

- Assume arguments are always provided
- Skip validation
- Use unclear error messages

## Error Handling Requirements

### All Commands Must:

1. **Check Prerequisites**

   - Verify files exist before reading
   - Check agent authorization before execution
   - Validate arguments before use

2. **Handle Failures Gracefully**

   - Report specific error messages
   - Suggest resolutions when possible
   - Stop execution on critical failures

3. **Provide User Feedback**
   - Inform users of progress
   - Report errors clearly
   - Confirm successful completion

## Best Practices

### Command Structure

1. **Start with Purpose**

   - Clear description of what command does
   - When to use the command

2. **Number Steps Sequentially**

   - Steps must be executed in order
   - Each step should have clear actions

3. **Include Examples**

   - Show expected command usage
   - Provide example outputs
   - Demonstrate error scenarios

4. **Reference Related Files**
   - Link to workflow files when applicable
   - Reference agent definitions
   - Point to boundary files

### Code Examples

**✅ Good:**

````markdown
**Execute:**

```bash
date +"%A, %d %B %Y - %H:%M"
```
`````

This will provide the date/time in the format: "Monday, 15 January 2024 - 14:30"

````

**❌ Bad:**
```markdown
Get the current date and time.
````

## Anti-Patterns

### Anti-Pattern 1: Hardcoded Values

**❌ Don't:**

```markdown
Read the file: .baton/agents/research-assistant-agent.md
```

**✅ Do:**

```markdown
Read the file: .baton/agents/{agent-name}.md
```

### Anti-Pattern 2: Missing Error Handling

**❌ Don't:**

```markdown
Execute the workflow.
```

**✅ Do:**

```markdown
Execute the workflow steps in order.

**If workflow fails:**

- Check error message from workflow file
- Follow error handling strategy
- Report error to user with suggested resolution
```

### Anti-Pattern 3: Vague Instructions

**❌ Don't:**

```markdown
Update the context file.
```

**✅ Do:**

```markdown
Append a new session summary to `.baton/context/{agent-name}-context.md`:

1. Get current date/time using: `date +"%A, %d %B %Y - %H:%M"`
2. Read existing context file to preserve all content
3. Append new session summary at the end
4. Update `last_updated` field in frontmatter
```

## Validation Checklist

Before generating a command file from a template, verify:

- [ ] File format matches platform (Markdown for Cursor/Claude, TOML for Gemini)
- [ ] Frontmatter/metadata includes description and argument hints
- [ ] All steps are numbered and in execution order
- [ ] No hardcoded dates, times, or agent names
- [ ] Error handling included for critical steps
- [ ] File paths use placeholders for variables
- [ ] Bash commands are actual commands (not descriptions)
- [ ] Prerequisites are checked before execution
- [ ] User feedback/confirmation is provided
- [ ] Important notes section included

## Summary

**Key Principles:**

1. **Be Specific:** Use exact file paths, actual bash commands, clear instructions
2. **Handle Errors:** Check prerequisites, validate inputs, report failures clearly
3. **Use Placeholders:** Never hardcode agent names, dates, or other variables
4. **Preserve Data:** Never delete or modify existing content without explicit instruction
5. **Provide Feedback:** Always inform users of progress, errors, and completion
6. **Follow Format:** Use correct format (Markdown or TOML) for target platform

**Remember:** Commands are executed by agents. Keep instructions clear, specific, and actionable.
