# `baton init` Process Documentation

## Overview

This document provides comprehensive documentation for implementing the `baton init` command. It emulates running `baton init --cursor` on a project and details every step required for a CLI Engineer Agent to replicate this functionality.

## Important Note: Source File Location

**CRITICAL:** When the CLI Engineer Agent implements this, the source files (templates, agents, workflows, commands, cognitive patterns) will be located in the **global npm cache** on the local machine, not in the baton-framework repository. The CLI package (`@conductus-labs/baton-cli`) will be installed via npm, and the framework files will be bundled with the CLI package.

**Source File Path:** Files will be accessible from the npm package installation directory (typically `node_modules/@conductus-labs/baton-cli/` or similar, depending on npm cache structure).

The CLI implementation should:

- Locate source files from the installed npm package
- Copy files from the npm package to the project's `.baton/` directory
- Preserve all file content exactly (including placeholders for template files)

## Manifest File

The `baton init` command uses a manifest file (`core-init.yml`) located at `src/config/core-init.yml` in the npm package to determine which files and directories to create.

**Manifest File Location:** `src/config/core-init.yml` (from npm package root)

The manifest file defines:
- Directory structure to create
- Files to copy (with source and destination paths)
- File types (exact_copy vs template)
- Platform-specific rules (cursor, claude, gemini)

## Process Overview

The `baton init --cursor` command:

1. Reads and parses the `core-init.yml` manifest file from the npm package
2. Creates the `.baton/` directory structure
3. Copies the baton-agent definition file (required for project initialization)
4. Copies all workflow files (main workflows and sub-flows)
5. Copies all command files for the specified GenAI platform (Cursor = Markdown format) into platform-specific `baton/` subdirectories
6. Copies all cognitive pattern files (all 19 patterns)
7. Creates knowledge directory (empty, no files copied yet)
8. Copies template files to create default-state configuration files (with placeholders)
9. These configuration files are in "default/template state" and will later be populated by the `project-init` workflow

## Step-by-Step Process

### Step 1: Read and Parse Manifest File

**Source File:** `src/config/core-init.yml` (from npm package root)

**Location:** In the installed npm package directory

**Action:**

1. Locate the manifest file in the npm package
2. Read and parse the YAML manifest
3. Extract file list, source paths, destination paths, file types, and platform rules

**Manifest File Structure:**

```yaml
version: 1.0.0
description: Files to install during baton init

directories:
  - path: .baton/agents
  - path: .baton/boundaries
  - path: .baton/cognitive
  - path: .baton/context
  - path: .baton/knowledge
  - path: .baton/workflows/sub-flows
  - path: .cursor/commands/baton # Platform-specific (Cursor)
  - path: .claude/commands/baton # Platform-specific (Claude)
  - path: .gemini/commands/baton # Platform-specific (Gemini)

files:
  # Agent files (fully populated)
  - source: src/core/agents/baton-agent.md
    destination: .baton/agents/baton-agent.md
    type: exact_copy

  # Workflow files (fully populated)
  - source: src/core/workflows/agent-initialisation.yml
    destination: .baton/workflows/agent-initialisation.yml
    type: exact_copy
  # ... (all workflows and sub-flows)

  # Command files (platform-specific, fully populated)
  - source: src/core/commands/markdown/baton-agent/init-baton-agent.md
    destination: .cursor/commands/baton/init-baton-agent.md
    type: exact_copy
    platform: cursor
  # ... (all commands for each platform)

  # Cognitive pattern files (fully populated, all 19)
  - source: src/core/cognitive/adaptive-thinking.yml
    destination: .baton/cognitive/adaptive-thinking.yml
    type: exact_copy
  # ... (all 19 patterns)

  # Template files (with placeholders)
  - source: src/core/templates/project-file-templates/project.config-template.yml
    destination: .baton/project.config.yml
    type: template
  # ... (all templates)
```

**Platform-Specific Handling:**

- The manifest includes platform-specific file entries
- CLI filters files based on the platform flag (--cursor, --claude, --gemini)
- Only files matching the platform are copied
- Commands are placed in platform-specific `baton/` subdirectories to distinguish them from other commands

### Step 2: Create Directory Structure

Create the following directory structure in the project root:

```
.baton/
├── agents/          # Agent definitions
├── boundaries/      # Boundary files
├── cognitive/       # Cognitive pattern files
├── context/         # Agent context files (empty initially)
├── knowledge/       # Knowledge files (empty initially)
└── workflows/       # Workflow files
    └── sub-flows/   # Sub-workflow files
```

**Platform-Specific Directory (for --cursor flag):**

```
.cursor/
└── commands/        # Cursor command definitions
    └── baton/       # Baton-specific commands (Markdown)
```

**Platform-Specific Directories (for other platforms):**

- **Claude:** `.claude/commands/baton/` (Markdown)
- **Gemini:** `.gemini/commands/baton/` (TOML)

**Implementation Notes:**

- Create directories recursively
- Do not fail if directories already exist (idempotent)
- Ensure proper permissions (read/write for user)
- Create knowledge directory (empty, no subdirectories initially)

### Step 3: Copy Baton Agent Definition

**Source File:** `src/core/agents/baton-agent.md` (from npm package)

**Destination:** `.baton/agents/baton-agent.md`

**Action:** Copy the entire baton-agent definition file exactly as-is.

**Important:** The baton-agent is required for project initialization. Without it, there are no agents available to execute the `project-init` workflow. This file is fully populated (not a template).

### Step 4: Copy All Workflow Files

Copy all workflow files from the npm package to `.baton/workflows/`:

#### 4.1: Main Workflows

**Source Directory:** `src/core/workflows/` (from npm package)

**Destination Directory:** `.baton/workflows/`

**Files to Copy:**

- `agent-initialisation.yml`
- `project-initialisation.yml`

**Action:** Copy these files exactly as-is to `.baton/workflows/`.

#### 4.2: Sub-Flows

**Source Directory:** `src/core/workflows/sub-flows/` (from npm package)

**Destination Directory:** `.baton/workflows/sub-flows/`

**Files to Copy:**

- `sub-flow-create-agent-context.yml`
- `sub-flow-load-agent-boundaries.yml`
- `sub-flow-load-agent-context.yml`
- `sub-flow-load-project-boundaries.yml`
- `sub-flow-load-project-config.yml`
- `sub-flow-load-project-manifest.yml`

**Action:** Copy all sub-flow files exactly as-is to `.baton/workflows/sub-flows/`.

**Important:** All workflows and sub-flows must be copied during init. These are required for agents to function properly. These files are fully populated (not templates).

### Step 5: Copy Command Files for GenAI Platform

**Note:** The `baton init` command must know which GenAI platform is being used. For this example, `baton init --cursor` was executed.

**Important:** Commands are placed in platform-specific `baton/` subdirectories to distinguish Baton commands from other project commands.

#### 5.1: Cursor Commands (Markdown)

**Source Directory:** `src/core/commands/markdown/baton-agent/` (from npm package)

**Destination Directory:** `.cursor/commands/baton/`

**Files to Copy:**

- `init-baton-agent.md`
- `project-init.md`

**Action:** Copy these command files exactly as-is to `.cursor/commands/baton/`.

#### 5.2: Claude Commands (Markdown)

**Source Directory:** `src/core/commands/markdown/baton-agent/` (from npm package)

**Destination Directory:** `.claude/commands/baton/`

**Files to Copy:**

- `init-baton-agent.md`
- `project-init.md`

**Action:** Copy these command files exactly as-is to `.claude/commands/baton/`.

#### 5.3: Gemini Commands (TOML)

**Source Directory:** `src/core/commands/toml/baton-agent/` (from npm package)

**Destination Directory:** `.gemini/commands/baton/`

**Files to Copy:**

- `init-baton-agent.toml`
- `project-init.toml`

**Action:** Copy these command files exactly as-is to `.gemini/commands/baton/`.

**Platform-Specific Notes:**

- For `--cursor`: Copy from `markdown/` directory to `.cursor/commands/baton/`
- For `--claude`: Copy from `markdown/` directory to `.claude/commands/baton/`
- For `--gemini`: Copy from `toml/` directory to `.gemini/commands/baton/` (TOML format, not Markdown)

**Important:** All commands must be copied during init. These are required for agents to execute workflows. These files are fully populated (not templates). Commands are organized in `baton/` subdirectories to keep them distinct from other project commands.

### Step 6: Copy All Cognitive Pattern Files

**Source Directory:** `src/core/cognitive/` (from npm package)

**Destination Directory:** `.baton/cognitive/`

**Files to Copy (all 19 cognitive patterns):**

- `adaptive-thinking.yml`
- `agile-thinking.yml`
- `analytical-thinking.yml`
- `collaborative-thinking.yml`
- `computational-thinking.yml`
- `creative-problem-solving.yml`
- `critical-thinking.yml`
- `design-thinking.yml`
- `empathetic-thinking.yml`
- `ethical-thinking.yml`
- `experimental-thinking.yml`
- `growth-mindset.yml`
- `lateral-thinking.yml`
- `lean-thinking.yml`
- `meta-cognitive.yml`
- `resilience-thinking.yml`
- `strategic-thinking.yml`
- `systematic-approach.yml`
- `systems-thinking.yml`

**Action:** Copy all cognitive pattern files exactly as-is to `.baton/cognitive/`.

**Important:** All cognitive patterns must be copied during init. Agents reference these patterns in their definitions, and the patterns must be available locally. These files are fully populated (not templates).

### Step 7: Create Knowledge Directory

**Action:** Create the knowledge directory (but do NOT copy any knowledge files yet).

**Directory to Create:**

- `.baton/knowledge/`

**Important:** Knowledge files are selectively installed via `baton install knowledge <name>` command. Do not copy any knowledge files during `baton init`. Only create the base knowledge directory (no subdirectories initially).

### Step 8: Copy Template Files to Create Default-State Files

Copy template files from npm package to `.baton/` with exact content (placeholders preserved):

#### 8.1: Create `project.config.yml`

**Source Template:** `src/core/templates/project-file-templates/project.config-template.yml` (from npm package)

**Destination:** `.baton/project.config.yml`

**Action:** Copy entire template file content exactly as-is (all placeholders like `{project-name}`, `{YYYY-MM-DDTHH:MM:SSZ}`, etc. must be preserved)

**Key Placeholders:**

- `{project-name}` - Will be populated by project-init workflow
- `{project-type}` - Will be populated by project-init workflow
- `{YYYY-MM-DDTHH:MM:SSZ}` - Will be populated by project-init workflow
- `{provider}` - Source control provider
- `{repository-url}` - Repository URL
- `{branch-name}` - Default branch
- `{methodology}` - Project management methodology
- `{location-type}` - Project management location
- `{optional-url}` - Project management URL
- `{platform-name}`, `{model-name}`, `{provider}`, `{integration-type}` - GenAI platform configs
- `{agent-name-1}`, `{agent-name-2}`, etc. - Agent names
- `{tool-name}`, `{resource-name}` - Knowledge file names
- `{workflow-name-1}`, `{workflow-name-2}` - Workflow names
- `{true/false}` - Boolean values
- `{creator}` - File creator (should be "baton-cli")
- `{version}` - CLI version

**Important:** The file must be copied exactly - do not replace placeholders at this stage.

#### 8.2: Create `project.manifest`

**Source Template:** `src/core/templates/project-file-templates/project-manifest-template.md` (from npm package)

**Destination:** `.baton/project.manifest`

**Action:** Copy entire template file content exactly as-is (all placeholders preserved)

**Key Placeholders:**

- `{ project-name }` - Project name (note: spaces around braces in frontmatter)
- `{ YYYY-MM-DD }` - Creation date
- `{Project Name}` - Project name in markdown
- `{Brief description...}` - Project description
- `{Organization name}` - Organization
- `{Project type...}` - Project type
- `{Primary technologies...}` - Technology stack
- `{Target environment...}` - Target environment
- `{Business objective 1}`, etc. - Business objectives
- `{Frontend technology...}`, etc. - Technical requirements
- `{Performance requirements...}`, etc. - Non-functional requirements
- `{Feature Name}`, `{feature-name}` - Feature references
- `{Success criterion 1}`, etc. - Success criteria

**Important:** The file must be copied exactly - do not replace placeholders at this stage.

#### 8.3: Create `boundaries/project-boundaries.md`

**Source Template:** `src/core/templates/boundaries-templates/project-boundaries-template.md` (from npm package)

**Destination:** `.baton/boundaries/project-boundaries.md`

**Action:** Copy entire template file content exactly as-is (all placeholders preserved)

**Key Placeholders:**

- `{Brief description...}` - Boundary description
- `{YYYY-MM-DD}` - Creation date
- `{Category Name}` - Category names for boundaries
- `{Specific action description}` - Action descriptions
- `{Files, directories...}` - Scope definitions
- `{When this action...}` - Trigger conditions
- `{Brief example...}` - Examples
- `{List of protected...}` - Protected files/directories
- `{Boundaries specific...}` - Environment-specific boundaries
- `{Description of allowed...}` - Example descriptions

**Important:** The file must be copied exactly - do not replace placeholders at this stage.

### Step 9: Verify File Creation

After copying all files, verify:

1. Baton agent file exists: `.baton/agents/baton-agent.md`
2. All workflow files exist in `.baton/workflows/` and `.baton/workflows/sub-flows/` (8 files total)
3. All command files exist in platform-specific `baton/` subdirectory (`.cursor/commands/baton/` for --cursor, 2 files)
4. All cognitive pattern files exist in `.baton/cognitive/` (19 files)
5. Knowledge directory exists (empty, no subdirectories)
6. All three template files exist in correct locations:
   - `.baton/project.config.yml`
   - `.baton/project.manifest`
   - `.baton/boundaries/project-boundaries.md`
7. Files contain template content (placeholders preserved for configuration files only)
8. Files are readable and writable
9. Directory structure is complete

### Step 10: Handle .gitignore (Already Done)

**Note:** The `.gitignore` file should contain `.baton/` entry. If not present, add it. For this implementation, assume it's already handled.

## File State After `baton init --cursor`

After `baton init --cursor` completes:

- **Agent file:** `baton-agent.md` is ready to use (fully populated, not a template)
- **Workflow files:** All workflows and sub-flows are ready to use (fully populated, 8 files)
- **Command files:** All commands are ready to use (fully populated, 2 files for Cursor in `.cursor/commands/baton/`)
- **Cognitive patterns:** All 19 cognitive patterns are available locally (fully populated)
- **Knowledge directory:** Base directory created but empty (files installed later via `baton install knowledge`)
- **Configuration files:** `project.config.yml`, `project.manifest`, and `project-boundaries.md` are in "default/template state" (placeholders not replaced)
- **Configuration files are ready** for the `project-init` workflow to scan project and populate values
- The `project-init` workflow will:
  1. Scan the project to estimate values
  2. Present estimated values to user via HITL checkpoints
  3. Update configuration files with validated values

## Source File Locations (from npm package)

**Manifest File:**

- `src/config/core-init.yml` → (read only, not copied)

**Agent Files:**

- `src/core/agents/baton-agent.md` → `.baton/agents/baton-agent.md`

**Workflow Files:**

- `src/core/workflows/agent-initialisation.yml` → `.baton/workflows/agent-initialisation.yml`
- `src/core/workflows/project-initialisation.yml` → `.baton/workflows/project-initialisation.yml`
- `src/core/workflows/sub-flows/*.yml` → `.baton/workflows/sub-flows/*.yml` (6 files)

**Command Files (for --cursor):**

- `src/core/commands/markdown/baton-agent/init-baton-agent.md` → `.cursor/commands/baton/init-baton-agent.md`
- `src/core/commands/markdown/baton-agent/project-init.md` → `.cursor/commands/baton/project-init.md`

**Command Files (for --claude):**

- `src/core/commands/markdown/baton-agent/init-baton-agent.md` → `.claude/commands/baton/init-baton-agent.md`
- `src/core/commands/markdown/baton-agent/project-init.md` → `.claude/commands/baton/project-init.md`

**Command Files (for --gemini):**

- `src/core/commands/toml/baton-agent/init-baton-agent.toml` → `.gemini/commands/baton/init-baton-agent.toml`
- `src/core/commands/toml/baton-agent/project-init.toml` → `.gemini/commands/baton/project-init.toml`

**Cognitive Pattern Files:**

- `src/core/cognitive/*.yml` → `.baton/cognitive/*.yml` (all 19 files)

**Template Files:**

- `src/core/templates/project-file-templates/project.config-template.yml` → `.baton/project.config.yml`
- `src/core/templates/project-file-templates/project-manifest-template.md` → `.baton/project.manifest`
- `src/core/templates/boundaries-templates/project-boundaries-template.md` → `.baton/boundaries/project-boundaries.md`

**Note:** All source paths are relative to the npm package installation directory (global npm cache).

## Complete File List After `baton init --cursor`

**Agent Files (1 file):**

- `.baton/agents/baton-agent.md`

**Workflow Files (8 files):**

- `.baton/workflows/agent-initialisation.yml`
- `.baton/workflows/project-initialisation.yml`
- `.baton/workflows/sub-flows/sub-flow-create-agent-context.yml`
- `.baton/workflows/sub-flows/sub-flow-load-agent-boundaries.yml`
- `.baton/workflows/sub-flows/sub-flow-load-agent-context.yml`
- `.baton/workflows/sub-flows/sub-flow-load-project-boundaries.yml`
- `.baton/workflows/sub-flows/sub-flow-load-project-config.yml`
- `.baton/workflows/sub-flows/sub-flow-load-project-manifest.yml`

**Command Files (2 files for --cursor):**

- `.cursor/commands/baton/init-baton-agent.md`
- `.cursor/commands/baton/project-init.md`

**Cognitive Pattern Files (19 files):**

- `.baton/cognitive/adaptive-thinking.yml`
- `.baton/cognitive/agile-thinking.yml`
- `.baton/cognitive/analytical-thinking.yml`
- `.baton/cognitive/collaborative-thinking.yml`
- `.baton/cognitive/computational-thinking.yml`
- `.baton/cognitive/creative-problem-solving.yml`
- `.baton/cognitive/critical-thinking.yml`
- `.baton/cognitive/design-thinking.yml`
- `.baton/cognitive/empathetic-thinking.yml`
- `.baton/cognitive/ethical-thinking.yml`
- `.baton/cognitive/experimental-thinking.yml`
- `.baton/cognitive/growth-mindset.yml`
- `.baton/cognitive/lateral-thinking.yml`
- `.baton/cognitive/lean-thinking.yml`
- `.baton/cognitive/meta-cognitive.yml`
- `.baton/cognitive/resilience-thinking.yml`
- `.baton/cognitive/strategic-thinking.yml`
- `.baton/cognitive/systematic-approach.yml`
- `.baton/cognitive/systems-thinking.yml`

**Configuration Template Files (3 files - with placeholders):**

- `.baton/project.config.yml` (template with placeholders)
- `.baton/project.manifest` (template with placeholders)
- `.baton/boundaries/project-boundaries.md` (template with placeholders)

**Knowledge Directory (empty, base directory only):**

- `.baton/knowledge/` (empty, no subdirectories initially)

**Total:** 33 files created (1 agent + 8 workflows + 2 commands + 19 cognitive + 3 config templates)

## Implementation Requirements

1. **Idempotent:** Running `baton init` multiple times should not fail (check if files exist, optionally prompt to overwrite)
2. **Template Preservation:** All placeholders in configuration files must be preserved exactly as in templates
3. **Full File Copy:** Agent, workflow, command, and cognitive pattern files must be copied exactly (these are not templates)
4. **Directory Creation:** Create all required directories recursively
5. **Platform Detection:** Detect or require GenAI platform flag (--cursor, --claude, --gemini) to determine command file format and destination
6. **Command Organization:** Place commands in platform-specific `baton/` subdirectories to distinguish them from other project commands
7. **Error Handling:** Handle file system errors gracefully
8. **User Feedback:** Provide clear feedback about what was created
9. **NPM Package Access:** Locate source files from installed npm package (not from repository)
10. **Manifest-Driven:** Use `core-init.yml` manifest file to drive the installation process

## Documentation Structure

This documentation includes:

1. Overview of `baton init` purpose
2. Important note about npm package source file location
3. Manifest file explanation
4. Complete directory structure diagram (before and after)
5. Step-by-step process with exact file paths
6. Source file locations (from npm package)
7. Template source locations
8. Placeholder reference (list of all placeholders for configuration files only)
9. File state explanation (which files are templates vs fully populated)
10. Platform-specific considerations (--cursor, --claude, --gemini)
11. Command organization in `baton/` subdirectories
12. Integration with `project-init` workflow
13. Implementation requirements
14. Complete file list with counts
15. Example file contents (showing placeholders for configuration files)

## Validation

After implementation, verify:

- Directory structure matches specification
- All 33 files exist in correct locations
- Agent, workflow, command, and cognitive files are fully populated (not templates)
- Configuration files contain exact template content with placeholders preserved
- Placeholders are preserved in configuration files only
- Files are in correct locations
- Commands are in platform-specific `baton/` subdirectories
- No placeholder replacement occurred in configuration files
- Knowledge directory exists but is empty (no subdirectories initially)
- Manifest file is correctly parsed and used to drive installation

