# Baton Framework v1.0.0 - Initial Release

**Release Date:** 2025-12-01  
**Version:** 1.0.0  
**Status:** Initial Release

## Overview

Baton Framework v1.0.0 is the initial release of the framework as npm packages. This release provides the foundational instruction architecture for building, configuring, and orchestrating AI agents.

## What's New

### Package Structure

Baton Framework is now organized as a **monorepo** containing 5 npm packages:

1. **@conductus-labs/baton-core** - Core types, utilities, and validation
2. **@conductus-labs/baton-agents** - 25 pre-defined agent definitions
3. **@conductus-labs/baton-cognitive-patterns** - 19 cognitive thinking patterns
4. **@conductus-labs/baton-knowledge** - Knowledge files and best practices
5. **@conductus-labs/baton-workflows** - Workflow definitions (4 main + 10 sub-flows)

### Key Features

- **Modular Architecture:** Install only the packages you need
- **TypeScript Support:** Full type definitions for all components
- **Semantic Versioning:** All packages follow SemVer
- **Post-Install Setup:** Automatic `baton/` folder creation
- **Comprehensive Documentation:** Integration guide, examples, and checklists

## Installation

### Install All Packages

```bash
npm install @conductus-labs/baton-core \
            @conductus-labs/baton-agents \
            @conductus-labs/baton-cognitive-patterns \
            @conductus-labs/baton-knowledge \
            @conductus-labs/baton-workflows
```

### Install Individual Packages

```bash
# Core package (required by others)
npm install @conductus-labs/baton-core

# Agent definitions
npm install @conductus-labs/baton-agents

# Cognitive patterns
npm install @conductus-labs/baton-cognitive-patterns

# Knowledge files
npm install @conductus-labs/baton-knowledge

# Workflow definitions
npm install @conductus-labs/baton-workflows
```

## Getting Started

After installation, packages automatically create a `baton/` folder in your project root containing framework files.

### Basic Usage

```typescript
import { loadAgent, loadPattern } from "@conductus-labs/baton-core";

// Load an agent
const agent = loadAgent("baton-agent");
if (agent) {
  console.log(agent.agent_name);
}

// Load a cognitive pattern
const pattern = loadPattern("meta-cognitive");
if (pattern) {
  console.log(pattern.pattern_type);
}
```

### Documentation

- **Integration Guide:** `docs/integration-guide.md` - Comprehensive integration guide
- **Integration Checklist:** `docs/integration-checklist.md` - Step-by-step integration
- **Integration Examples:** `docs/integration-examples/` - Code examples
- **Package READMEs:** See `packages/*/README.md` for package-specific documentation

## Package Details

### @conductus-labs/baton-core

**Version:** 1.0.0  
**Description:** Core types, utilities, and validation

**Exports:**

- Types: `AgentDefinition`, `CognitivePattern`, `WorkflowDefinition`, `KnowledgeFile`
- Utilities: `loadAgent()`, `loadPattern()`, `loadWorkflow()`, `loadKnowledge()`
- Validation: `validateAgent()`, `validatePattern()`, `validateWorkflow()`
- Path Resolution: `findProjectRoot()`, `getBatonFolderPath()`

### @conductus-labs/baton-agents

**Version:** 1.0.0  
**Description:** 25 pre-defined agent definitions

**Contents:**

- 25 agent definition files (`.md` format)
- Agent types and interfaces (re-exported from core)

### @conductus-labs/baton-cognitive-patterns

**Version:** 1.0.0  
**Description:** 19 cognitive thinking patterns

**Contents:**

- 19 cognitive pattern files (`.yml` format)
- Pattern types and interfaces (re-exported from core)

### @conductus-labs/baton-knowledge

**Version:** 1.0.0  
**Description:** Knowledge files and best practices

**Contents:**

- 3 knowledge files (git-cli, github-api, github-cli)
- Knowledge types and interfaces (re-exported from core)

### @conductus-labs/baton-workflows

**Version:** 1.0.0  
**Description:** Workflow definitions for common tasks

**Contents:**

- 4 main workflows
- 10 sub-flows
- Workflow types and interfaces (re-exported from core)

## Dependencies

### Package Dependencies

```
@conductus-labs/baton-core (no dependencies)
  ├── @conductus-labs/baton-agents
  ├── @conductus-labs/baton-cognitive-patterns
  ├── @conductus-labs/baton-knowledge
  └── @conductus-labs/baton-workflows (also depends on baton-agents)
```

### Runtime Dependencies

- **Node.js:** >= 18.0.0
- **npm:** >= 9.0.0

## Versioning

All packages use **semantic versioning** (SemVer):

- **Major (2.0.0):** Breaking changes
- **Minor (1.1.0):** New features (backward compatible)
- **Patch (1.0.1):** Bug fixes (backward compatible)

All packages in `1.x` are compatible with each other.

## Testing

Comprehensive test suite included:

- **Integration Tests:** 51 tests covering all package components
- **Package Installation Tests:** Verify installation and setup
- **Package Consumption Tests:** Verify consumption patterns

## Documentation

- **README.md** - Main project documentation
- **docs/integration-guide.md** - Comprehensive integration guide
- **docs/integration-checklist.md** - Integration checklist
- **docs/integration-examples/** - Code examples
- **docs/cognitive-patterns/** - Cognitive patterns documentation
- **docs/rhythm/** - RHYTHM Method documentation
- **docs/SCOPE-SYSTEM.md** - Scope system documentation
- **packages/\*/README.md** - Package-specific documentation

## Repository

- **GitHub:** https://github.com/Conductus-Labs/baton-framework
- **License:** MIT
- **Monorepo:** npm workspaces

## Support

For issues or questions:

- Check integration guide: `docs/integration-guide.md`
- Check examples: `docs/integration-examples/`
- Review package READMEs
- Open issue on GitHub

## What's Next

- **RHYTHM Board Integration:** Framework ready for RHYTHM Board integration
- **Baton Platform:** Foundation for future SaaS platform
- **Community Contributions:** Framework ready for community contributions

---

**Created:** 2025-12-01  
**Version:** 1.0.0  
**Status:** Initial Release
