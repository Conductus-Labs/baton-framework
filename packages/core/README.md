# @conductus-labs/baton-core

**Core types, utilities, and validation for Baton Framework**

[![npm version](https://img.shields.io/npm/v/@conductus-labs/baton-core.svg)](https://www.npmjs.com/package/@conductus-labs/baton-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@conductus-labs/baton-core` is the foundational package for Baton Framework. It provides:

- **TypeScript type definitions** for all framework components
- **Validation utilities** for agents, patterns, workflows, and knowledge files
- **File parsing utilities** for YAML, Markdown, and frontmatter
- **Path resolution utilities** for framework and project files
- **Version comparison utilities** for semantic versioning

This package has **no dependencies** (except `js-yaml` for YAML parsing) and serves as the base for all other Baton Framework packages.

## Installation

```bash
npm install @conductus-labs/baton-core
```

## Usage

### Type Definitions

Import TypeScript types for framework components:

```typescript
import type {
  AgentDefinition,
  CognitivePattern,
  WorkflowDefinition,
  KnowledgeFile,
  ProjectConfig,
  Boundaries,
  AgentContext,
} from "@conductus-labs/baton-core";
```

### Validation

Validate framework component structures:

```typescript
import {
  validateAgent,
  validatePattern,
  validateWorkflow,
  validateKnowledge,
} from "@conductus-labs/baton-core";

// Validate agent definition
const agentData = {
  /* ... */
};
if (validateAgent(agentData)) {
  // TypeScript knows agentData is AgentDefinition
  console.log(agentData.agent_name);
}

// Validate cognitive pattern
const patternData = {
  /* ... */
};
if (validatePattern(patternData)) {
  // TypeScript knows patternData is CognitivePattern
  console.log(patternData.cognitive_identity.thinking_pattern);
}
```

### File Loading

Load and validate framework components from files:

```typescript
import {
  loadAgent,
  loadAgentStrict,
  loadPattern,
  loadPatternStrict,
  loadWorkflow,
  loadWorkflowStrict,
} from "@conductus-labs/baton-core";

// Safe loading (returns null if invalid)
const agent = loadAgent("baton-agent");
if (agent) {
  console.log(agent.agent_name);
}

// Strict loading (throws if invalid)
try {
  const agent = loadAgentStrict("baton-agent");
  // TypeScript knows agent is AgentDefinition
} catch (error) {
  console.error("Failed to load agent:", error);
}
```

### File Parsing

Parse YAML, Markdown, and frontmatter:

```typescript
import {
  parseYamlFrontmatter,
  loadFileWithFrontmatter,
  loadYamlFile,
  loadMarkdownFile,
} from "@conductus-labs/baton-core";

// Parse YAML frontmatter from markdown
const { frontmatter, content } = parseYamlFrontmatter(markdownContent);

// Load file with frontmatter
const result = loadFileWithFrontmatter("./agent.md");
if (result) {
  console.log(result.frontmatter); // Parsed YAML frontmatter
  console.log(result.content); // Markdown content
}

// Load YAML file
const yamlData = loadYamlFile("./pattern.yml");

// Load markdown file
const markdownContent = loadMarkdownFile("./knowledge.md");
```

### Path Resolution

Resolve paths to framework and project files:

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

// Resolve framework file path
const agentPath = getFrameworkFilePath("agents", "baton-agent.md");
// Returns: {projectRoot}/baton/agents/baton-agent.md

// Resolve project file path
const configPath = getProjectFilePath("project.config.yml");
// Returns: {projectRoot}/.baton/project.config.yml
```

### Version Utilities

Compare semantic versions:

```typescript
import {
  compareVersions,
  isVersionGreater,
  isVersionLess,
  isVersionEqual,
} from "@conductus-labs/baton-core";

// Compare versions
const result = compareVersions("1.2.0", "1.1.0"); // Returns: 1 (greater)

// Check version relationships
if (isVersionGreater("1.2.0", "1.1.0")) {
  console.log("Version is greater");
}

if (isVersionLess("1.0.0", "1.1.0")) {
  console.log("Version is less");
}

if (isVersionEqual("1.0.0", "1.0.0")) {
  console.log("Versions are equal");
}
```

## API Reference

### Types

All types are exported from the main package:

- `AgentDefinition` - Agent definition structure
- `AgentMetadata` - Agent metadata
- `CognitivePattern` - Cognitive pattern structure
- `WorkflowDefinition` - Workflow definition structure
- `KnowledgeFile` - Knowledge file structure
- `ProjectConfig` - Project configuration structure
- `Boundaries` - Boundaries structure
- `AgentContext` - Agent context structure

### Validation Functions

- `validateAgent(data)` - Validate agent definition
- `validatePattern(data)` - Validate cognitive pattern
- `validateWorkflow(data)` - Validate workflow definition
- `validateKnowledge(data)` - Validate knowledge file

All validation functions return TypeScript type guards.

### File Loading Functions

**Safe Loading (returns null if invalid):**

- `loadAgent(name, startPath?)` - Load agent definition
- `loadPattern(name, startPath?)` - Load cognitive pattern
- `loadWorkflow(name, startPath?)` - Load workflow definition

**Strict Loading (throws if invalid):**

- `loadAgentStrict(name, startPath?)` - Load agent definition (strict)
- `loadPatternStrict(name, startPath?)` - Load cognitive pattern (strict)
- `loadWorkflowStrict(name, startPath?)` - Load workflow definition (strict)

### File Parsing Functions

- `parseYamlFrontmatter(content)` - Parse YAML frontmatter from markdown
- `loadFileWithFrontmatter(filePath)` - Load file and parse frontmatter
- `loadYamlFile(filePath)` - Load YAML file
- `loadMarkdownFile(filePath)` - Load markdown file

### Path Resolution Functions

- `findProjectRoot(startPath?)` - Find project root directory
- `getBatonFolderPath()` - Get path to `baton/` folder
- `getDotBatonFolderPath()` - Get path to `.baton/` folder
- `getFrameworkFilePath(type, filename)` - Resolve framework file path
- `getProjectFilePath(filename)` - Resolve project file path

### Version Utilities

- `compareVersions(v1, v2)` - Compare two semantic versions
- `isVersionGreater(v1, v2)` - Check if v1 > v2
- `isVersionLess(v1, v2)` - Check if v1 < v2
- `isVersionEqual(v1, v2)` - Check if v1 === v2

## Package Structure

```
packages/core/
├── src/
│   ├── types/              # TypeScript type definitions
│   │   ├── agent.ts
│   │   ├── cognitive-pattern.ts
│   │   ├── workflow.ts
│   │   ├── knowledge.ts
│   │   ├── project-config.ts
│   │   ├── boundaries.ts
│   │   ├── context.ts
│   │   └── index.ts
│   ├── validation/         # Validation utilities
│   │   ├── agent-validator.ts
│   │   ├── pattern-validator.ts
│   │   ├── workflow-validator.ts
│   │   ├── knowledge-validator.ts
│   │   └── index.ts
│   ├── utils/              # Shared utilities
│   │   ├── file-parser.ts
│   │   ├── version.ts
│   │   ├── path-resolver.ts
│   │   ├── agent-loader.ts
│   │   ├── pattern-loader.ts
│   │   ├── workflow-loader.ts
│   │   └── index.ts
│   ├── manifest/           # Framework manifest
│   │   └── framework-manifest.yml
│   ├── config/             # Core configuration
│   │   └── core-init.json
│   ├── permissions/        # Workflow permissions
│   │   └── workflow-permissions.yml
│   └── index.ts            # Main export
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- `js-yaml` (^4.1.1) - YAML parsing

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

## License

MIT

## Related Packages

- `@conductus-labs/baton-agents` - Agent definitions (depends on this package)
- `@conductus-labs/baton-cognitive-patterns` - Cognitive patterns (depends on this package)
- `@conductus-labs/baton-knowledge` - Knowledge files (depends on this package)
- `@conductus-labs/baton-workflows` - Workflow definitions (depends on this package)
