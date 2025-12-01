# Baton Framework Integration Guide

**Version:** 1.0.0  
**Last Updated:** 2025-12-01  
**Status:** Ready for Integration

## Overview

This guide explains how to integrate Baton Framework npm packages into your application (e.g., RHYTHM Board). The framework provides modular packages for agents, cognitive patterns, knowledge files, and workflows.

## Package Structure

### Available Packages

1. **`@conductus-labs/baton-core`** - Core types, utilities, and validation
2. **`@conductus-labs/baton-agents`** - Agent definitions (25 agents)
3. **`@conductus-labs/baton-cognitive-patterns`** - Cognitive thinking patterns (19 patterns)
4. **`@conductus-labs/baton-knowledge`** - Knowledge files (3 files)
5. **`@conductus-labs/baton-workflows`** - Workflow definitions (4 main + 10 sub-flows)

### Package Dependencies

```text
@conductus-labs/baton-core (no dependencies)
  ├── @conductus-labs/baton-agents
  ├── @conductus-labs/baton-cognitive-patterns
  ├── @conductus-labs/baton-knowledge
  └── @conductus-labs/baton-workflows (also depends on baton-agents)
```

## Installation

### Install All Packages

```bash
npm install @conductus-labs/baton-core \
            @conductus-labs/baton-agents \
            @conductus-labs/baton-cognitive-patterns \
            @conductus-labs/baton-knowledge \
            @conductus-labs/baton-workflows
```

### Install Specific Packages

```bash
# Only core (if you just need types/utilities)
npm install @conductus-labs/baton-core

# Core + Agents
npm install @conductus-labs/baton-core @conductus-labs/baton-agents

# Core + Workflows (includes agents dependency)
npm install @conductus-labs/baton-core @conductus-labs/baton-workflows
```

## Post-Installation

After installation, packages automatically create a `baton/` folder in your project root containing framework files:

```text
your-project/
├── baton/                    # Framework files (created by postinstall)
│   ├── agents/              # Agent definitions
│   ├── cognitive/           # Cognitive patterns
│   ├── knowledge/           # Knowledge files
│   ├── workflows/           # Workflow definitions
│   └── core/                # Core framework files
├── .baton/                  # Project configuration (created by init)
│   ├── project.config.yml
│   ├── agents/              # Project-specific agent instances
│   └── ...
└── node_modules/
    └── @conductus-labs/
        ├── baton-core/
        ├── baton-agents/
        └── ...
```

## Folder Structure

### `baton/` Folder (Framework Files)

- **Location:** Project root
- **Created by:** npm postinstall scripts
- **Purpose:** Framework source files (read-only from project perspective)
- **Contents:**
  - `agents/` - All agent definition files
  - `cognitive/` - All cognitive pattern files
  - `knowledge/` - All knowledge files
  - `workflows/` - All workflow files
  - `core/` - Core framework files (manifest, config, permissions)

### `.baton/` Folder (Project Configuration)

- **Location:** Project root
- **Created by:** Framework initialization
- **Purpose:** Project-specific configuration and instances
- **Contents:**
  - `project.config.yml` - Project configuration
  - `project.manifest.md` - Project manifest
  - `agents/` - Project-specific agent instances
  - `workflows/` - Project-specific workflow instances
  - `boundaries/` - Project boundaries
  - `context/` - Agent context files
  - `knowledge/` - Project-specific knowledge

## Usage Examples

### Loading Agents

```typescript
import { loadAgent, loadAgentStrict } from "@conductus-labs/baton-core";

// Load agent (returns null if not found)
const agent = loadAgent("baton-agent");
if (agent) {
  console.log(agent.agent_name);
  console.log(agent.cognitive_patterns.primary);
}

// Load with strict validation (throws if not found/invalid)
try {
  const agent = loadAgentStrict("baton-agent");
  // Use agent...
} catch (error) {
  console.error("Failed to load agent:", error.message);
}
```

### Loading Cognitive Patterns

```typescript
import { loadPattern, loadPatternStrict } from "@conductus-labs/baton-core";

// Load pattern
const pattern = loadPattern("meta-cognitive");
if (pattern) {
  console.log(pattern.pattern_type);
  console.log(pattern.model_parameters);
  console.log(pattern.thinking_workflow);
}
```

### Loading Knowledge Files

```typescript
import { loadKnowledge, loadKnowledgeStrict } from "@conductus-labs/baton-core";

// Load knowledge file (returns null if not found)
const knowledge = loadKnowledge("git-cli");
if (knowledge) {
  console.log(knowledge.name);
  console.log(knowledge.content);
}

// Load nested knowledge file
const githubApi = loadKnowledge("github/github-api");
if (githubApi) {
  console.log(githubApi.name);
  console.log(githubApi.content);
}

// Load with strict validation (throws if not found)
try {
  const knowledge = loadKnowledgeStrict("git-cli");
  // Knowledge is guaranteed to exist
} catch (error) {
  console.error("Failed to load knowledge:", error.message);
}
```

### Loading Workflows

```typescript
import { loadWorkflow, loadSubFlow } from "@conductus-labs/baton-core";

// Load main workflow
const workflow = loadWorkflow("agent-initialisation");
if (workflow) {
  console.log(workflow.workflow_name);
  console.log(workflow.workflow_steps);
}

// Load sub-flow
const subFlow = loadSubFlow("sub-flow-load-project-config");
```

### Using Types

```typescript
import type {
  AgentDefinition,
  CognitivePattern,
  WorkflowDefinition,
  KnowledgeFile,
} from "@conductus-labs/baton-core";

function processAgent(agent: AgentDefinition) {
  // Type-safe agent processing
  console.log(agent.agent_name);
  console.log(agent.scope);
}
```

## Path Resolution

The framework uses smart path resolution:

1. **Framework Files:** Read from `baton/` folder
2. **Project Files:** Read from `.baton/` folder
3. **Priority:** Project files (`.baton/`) take precedence when both exist

### Path Resolution Functions

```typescript
import {
  findProjectRoot,
  getBatonFolderPath,
  getDotBatonFolderPath,
  getFrameworkFilePath,
  getProjectFilePath,
} from "@conductus-labs/baton-core";

// Find project root
const projectRoot = findProjectRoot();

// Get baton/ folder path
const batonPath = getBatonFolderPath();

// Get .baton/ folder path
const dotBatonPath = getDotBatonFolderPath();

// Get framework file path
const agentPath = getFrameworkFilePath("agents", "baton-agent.md");

// Get project file path
const projectAgentPath = getProjectFilePath("agents", "baton-agent.md");
```

## Validation

All components include validation:

```typescript
import {
  validateAgent,
  validatePattern,
  validateWorkflow,
} from "@conductus-labs/baton-core";

// Validate agent
if (validateAgent(agentData)) {
  // Agent is valid
}

// Validate pattern
if (validatePattern(patternData)) {
  // Pattern is valid
}
```

## Version Compatibility

### Semantic Versioning

All packages use semantic versioning (`MAJOR.MINOR.PATCH`):

- **Major (2.0.0):** Breaking changes
- **Minor (1.1.0):** New features (backward compatible)
- **Patch (1.0.1):** Bug fixes (backward compatible)

### Dependency Ranges

Packages use caret ranges (`^1.0.0`) for dependencies:

```json
{
  "dependencies": {
    "@conductus-labs/baton-core": "^1.0.0"
  }
}
```

This allows automatic minor and patch updates while preventing breaking changes.

### Compatibility Matrix

- `baton-agents@1.x` requires `baton-core@1.x`
- `baton-workflows@1.x` requires `baton-core@1.x` and `baton-agents@1.x`
- All packages in `1.x` are compatible with each other

## Integration Patterns

### Pattern 1: Basic Component Loading

```typescript
import { loadAgent } from "@conductus-labs/baton-core";

// Load and use agent
const agent = loadAgent("baton-agent");
if (agent) {
  // Use agent definition
  console.log(`Agent: ${agent.agent_name}`);
  console.log(`Patterns: ${agent.cognitive_patterns.primary.length}`);
}
```

### Pattern 2: Component with Dependencies

```typescript
import { loadAgent, loadPattern } from "@conductus-labs/baton-core";

// Load agent and its referenced patterns
const agent = loadAgent("baton-agent");
if (agent) {
  for (const patternRef of agent.cognitive_patterns.primary) {
    const pattern = loadPattern(patternRef.name);
    if (pattern) {
      // Use pattern
      console.log(`Pattern: ${pattern.pattern_type}`);
    }
  }
}
```

### Pattern 3: Workflow Execution

```typescript
import { loadWorkflow, loadAgent } from "@conductus-labs/baton-core";

// Load workflow and referenced agents
const workflow = loadWorkflow("agent-initialisation");
if (workflow) {
  for (const step of workflow.workflow_steps) {
    // Execute workflow step
    // Steps may reference agents, which can be loaded as needed
  }
}
```

### Pattern 4: Project Initialization

```typescript
import {
  loadAgent,
  loadWorkflow,
  getBatonFolderPath,
} from "@conductus-labs/baton-core";
import { readFileSync } from "fs";
import { join } from "path";

// Initialize project with framework components
function initializeProject() {
  // Check if baton/ folder exists
  const batonPath = getBatonFolderPath();
  if (!batonPath) {
    throw new Error(
      "Framework files not found. Run: npm install @conductus-labs/baton-core ..."
    );
  }

  // Load required agent
  const agent = loadAgentStrict("baton-agent");

  // Load initialization workflow
  const workflow = loadWorkflowStrict("project-initialisation");

  // Execute initialization...
}
```

## Error Handling

### File Not Found

```typescript
import { loadAgent } from "@conductus-labs/baton-core";

const agent = loadAgent("non-existent-agent");
if (!agent) {
  console.error("Agent not found");
  // Handle gracefully
}
```

### Validation Errors

```typescript
import { loadAgentStrict } from "@conductus-labs/baton-core";

try {
  const agent = loadAgentStrict("invalid-agent");
} catch (error) {
  console.error("Failed to load agent:", error.message);
  // Handle error
}
```

### Missing Framework Files

```typescript
import { getBatonFolderPath } from "@conductus-labs/baton-core";

const batonPath = getBatonFolderPath();
if (!batonPath) {
  console.error(
    "Framework files not found. Please run: npm install @conductus-labs/baton-core ..."
  );
  // Guide user to install packages
}
```

## Best Practices

### 1. Always Check for Null

```typescript
const agent = loadAgent("baton-agent");
if (!agent) {
  // Handle missing agent
  return;
}
// Use agent...
```

### 2. Use Strict Loading for Required Components

```typescript
// For required components, use strict loading
try {
  const agent = loadAgentStrict("baton-agent");
  // Agent is guaranteed to exist and be valid
} catch (error) {
  // Handle error appropriately
}
```

### 3. Cache Loaded Components

```typescript
const agentCache = new Map<string, AgentDefinition>();

function getAgent(name: string): AgentDefinition | null {
  if (agentCache.has(name)) {
    return agentCache.get(name)!;
  }
  const agent = loadAgent(name);
  if (agent) {
    agentCache.set(name, agent);
  }
  return agent;
}
```

### 4. Handle Version Updates

```typescript
// Check package versions
import { readFileSync } from "fs";
import { join } from "path";

function checkFrameworkVersion(): string | null {
  const batonPath = getBatonFolderPath();
  if (!batonPath) return null;

  const manifestPath = join(
    batonPath,
    "core",
    "manifest",
    "framework-manifest.yml"
  );
  // Load and parse manifest to get version
  // ...
}
```

## Troubleshooting

### Framework Files Not Found

**Problem:** `baton/` folder doesn't exist after installation.

**Solution:**

1. Verify packages are installed: `npm list @conductus-labs/baton-core`
2. Check postinstall scripts ran: Look for `baton/` folder in project root
3. Manually run postinstall: `npm run postinstall` in each package
4. Reinstall packages: `npm install`

### Type Errors

**Problem:** TypeScript can't find types.

**Solution:**

1. Verify `@types/node` is installed
2. Check `tsconfig.json` includes `node_modules/@conductus-labs/`
3. Restart TypeScript server
4. Verify package has `types` field in `package.json`

### Path Resolution Issues

**Problem:** Files not found even though they exist.

**Solution:**

1. Verify `baton/` folder exists in project root
2. Check file paths are correct
3. Use `findProjectRoot()` to verify project root detection
4. Check file permissions

## Next Steps

1. **Install Packages:** Run `npm install` for required packages
2. **Verify Installation:** Check `baton/` folder is created
3. **Load Components:** Use loading utilities to access framework components
4. **Initialize Project:** Create `.baton/` folder and project configuration
5. **Integrate:** Use components in your application

## Additional Resources

- **Package READMEs:** See `packages/*/README.md` for package-specific documentation
- **Examples:** See `docs/integration-examples/` for code examples
- **Integration Checklist:** See `docs/integration-checklist.md` for step-by-step integration
- **RHYTHM Method:** See `docs/rhythm/0-overview.md` for project management methodology
- **Cognitive Patterns:** See `docs/cognitive-patterns/0-overview.md` for thinking patterns

---

**Created:** 2025-12-01  
**Last Updated:** 2025-12-01  
**Status:** Ready for Integration
