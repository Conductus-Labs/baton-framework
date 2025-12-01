# Baton Framework

**The foundational instruction architecture for AI agent orchestration**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Baton Framework is an open-source framework that provides the foundational instruction architecture for building, configuring, and orchestrating AI agents. It combines **19 cognitive thinking patterns** with **domain specialist templates** to enable the creation of specialized agents with specific capabilities.

The framework is organized as a **monorepo** containing npm packages that can be consumed independently or together:

- **@conductus-labs/baton-core** - Core types, utilities, and validation
- **@conductus-labs/baton-agents** - 25 pre-defined agent definitions
- **@conductus-labs/baton-cognitive-patterns** - 19 cognitive thinking patterns
- **@conductus-labs/baton-knowledge** - Knowledge files and best practices
- **@conductus-labs/baton-workflows** - Workflow definitions for common tasks

## What is Baton Framework?

Baton Framework provides the building blocks for creating AI agents that can:

- **Think strategically** using cognitive patterns (strategic, critical, analytical, systems thinking, etc.)
- **Work collaboratively** with humans through structured workflows
- **Manage projects** using the RHYTHM Method (designed for agents with human integration)
- **Execute tasks** through reusable workflows and templates

### Key Components

#### 1. Cognitive Patterns (19 Patterns)

Cognitive patterns define **how agents think**. Each pattern provides:

- Thinking workflows and decision-making frameworks
- Communication patterns and quality standards
- Optimized LLM parameters for that thinking style

**Patterns include:**

- Analytical, Critical, Strategic, Systems Thinking
- Creative Problem Solving, Experimental Thinking
- Meta-Cognitive, Adaptive Thinking
- And 11 more specialized patterns

📖 **[Read the Cognitive Patterns Documentation](docs/cognitive-patterns/0-overview.md)**

#### 2. RHYTHM Method

**R**apid, **H**igh-**Y**ield, **T**oken-based, **H**uman-in-loop, **M**anagement

A project management methodology specifically designed for agents with human integration. RHYTHM Method is the **default methodology** for Baton Framework projects.

**Key Features:**

- **TEMPO**: Agents operate at fast computational speeds (hours, not weeks)
- **Flow**: Continuous execution with dependency-driven prioritization
- **Control**: Human-in-the-Loop checkpoints at critical decision points
- **Precision**: Token-based estimation replaces abstract story points

📖 **[Read the RHYTHM Method Documentation](docs/rhythm/0-overview.md)**

#### 3. Agent Definitions

25 pre-defined agent definitions covering various domains:

- Engineering agents (backend, frontend, DevOps, database, etc.)
- Design agents (UI/UX, content strategist)
- Management agents (project manager, business analyst, business advisor)
- Specialist agents (security, quality assurance, research, technical writer, etc.)

## Installation

### Install All Packages

To install all Baton Framework packages:

```bash
npm install @conductus-labs/baton-core \
            @conductus-labs/baton-agents \
            @conductus-labs/baton-cognitive-patterns \
            @conductus-labs/baton-knowledge \
            @conductus-labs/baton-workflows
```

### Install Individual Packages

You can install only the packages you need:

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

### Package Installation Behavior

When you install Baton Framework packages, they automatically:

1. **Create `baton/` folder** in your project root (if it doesn't exist)
2. **Copy framework files** from `node_modules/` to `baton/` folder:
   - `baton/agents/` - Agent definition files
   - `baton/cognitive/` - Cognitive pattern files
   - `baton/knowledge/` - Knowledge files
   - `baton/workflows/` - Workflow files
   - `baton/core/` - Core framework files

This makes framework files easily accessible in your project without navigating `node_modules/`.

## Quick Start

### 1. Install Packages

```bash
npm install @conductus-labs/baton-core \
            @conductus-labs/baton-agents \
            @conductus-labs/baton-cognitive-patterns \
            @conductus-labs/baton-workflows
```

### 2. Initialize Your Project

After installation, framework files are automatically available in the `baton/` folder. For project-specific configuration:

**Option 1: Use Platform Tools (Recommended)**

- Use RHYTHM Board or Baton Platform for project initialization and management

**Option 2: Manual Setup**

- Create `.baton/` folder manually
- Copy framework files from `baton/` to `.baton/` as needed
- Create `project.config.yml` and `project.manifest.md` manually

**Note:** Programmatic initialization utilities may be added in future releases.

### 3. Use Framework Components

```typescript
import { loadAgent, validateAgent } from "@conductus-labs/baton-core";
import type { AgentDefinition } from "@conductus-labs/baton-core";

// Load an agent definition
const agent = loadAgent("baton-agent");

// Validate agent structure
if (validateAgent(agent)) {
  console.log(`Agent: ${agent.agent_name}`);
  console.log(`Patterns: ${agent.cognitive_patterns.primary.length}`);
}
```

## Package Details

### @conductus-labs/baton-core

**Core types, utilities, and validation for Baton Framework.**

```bash
npm install @conductus-labs/baton-core
```

**Exports:**

- TypeScript type definitions for all framework components
- Validation utilities for agents, patterns, workflows, and knowledge files
- File parsing utilities (YAML, Markdown, frontmatter)
- Path resolution utilities
- Version comparison utilities

**Usage:**

```typescript
import {
  AgentDefinition,
  validateAgent,
  loadAgent,
  parseYamlFrontmatter,
} from "@conductus-labs/baton-core";
```

📖 **[Core Package README](packages/core/README.md)**

### @conductus-labs/baton-agents

**25 pre-defined agent definitions for various domains.**

```bash
npm install @conductus-labs/baton-agents
```

**Contents:**

- 25 agent definition files (`.md` format)
- Agent types and interfaces (re-exported from core)

**Usage:**

```typescript
import type { AgentDefinition } from "@conductus-labs/baton-agents";

// Agent files are available in baton/agents/ after installation
// Use loadAgent() from baton-core to load them
```

📖 **[Agents Package README](packages/agents/README.md)**

### @conductus-labs/baton-cognitive-patterns

**19 cognitive thinking patterns that define how agents think.**

```bash
npm install @conductus-labs/baton-cognitive-patterns
```

**Contents:**

- 19 cognitive pattern files (`.yml` format)
- Pattern types and interfaces (re-exported from core)

**Usage:**

```typescript
import type { CognitivePattern } from "@conductus-labs/baton-cognitive-patterns";

// Pattern files are available in baton/cognitive/ after installation
// Use loadPattern() from baton-core to load them
```

📖 **[Cognitive Patterns Package README](packages/cognitive-patterns/README.md)**

### @conductus-labs/baton-knowledge

**Knowledge files and best practices for agent operations.**

```bash
npm install @conductus-labs/baton-knowledge
```

**Contents:**

- Knowledge files for Git CLI, GitHub API, GitHub CLI
- Knowledge types and interfaces (re-exported from core)

**Usage:**

```typescript
import type { KnowledgeFile } from "@conductus-labs/baton-knowledge";

// Knowledge files are available in baton/knowledge/ after installation
```

📖 **[Knowledge Package README](packages/knowledge/README.md)**

### @conductus-labs/baton-workflows

**Workflow definitions for common agent tasks and project management.**

```bash
npm install @conductus-labs/baton-workflows
```

**Contents:**

- 4 main workflows (agent initialization, context sync, boundary management, project initialization)
- 10 sub-flows for workflow composition
- Workflow types and interfaces (re-exported from core)

**Usage:**

```typescript
import type { WorkflowDefinition } from "@conductus-labs/baton-workflows";

// Workflow files are available in baton/workflows/ after installation
// Use loadWorkflow() from baton-core to load them
```

📖 **[Workflows Package README](packages/workflows/README.md)**

## Repository Structure

```text
baton-framework/
├── packages/                    # npm packages (monorepo)
│   ├── core/                    # @conductus-labs/baton-core
│   │   ├── src/
│   │   │   ├── types/           # TypeScript type definitions
│   │   │   ├── validation/      # Validation utilities
│   │   │   ├── utils/           # Shared utilities
│   │   │   ├── manifest/        # Framework manifest
│   │   │   ├── config/          # Core configuration
│   │   │   └── permissions/     # Workflow permissions
│   │   └── package.json
│   ├── agents/                  # @conductus-labs/baton-agents
│   │   ├── src/
│   │   │   └── agents/          # 25 agent definition files
│   │   └── package.json
│   ├── cognitive-patterns/      # @conductus-labs/baton-cognitive-patterns
│   │   ├── src/
│   │   │   └── patterns/         # 19 cognitive pattern files
│   │   └── package.json
│   ├── knowledge/               # @conductus-labs/baton-knowledge
│   │   ├── src/
│   │   │   └── knowledge/       # Knowledge files
│   │   └── package.json
│   └── workflows/               # @conductus-labs/baton-workflows
│       ├── src/
│       │   └── workflows/       # 4 main workflows + 10 sub-flows
│       └── package.json
│
├── docs/                         # Framework documentation
│   ├── cognitive-patterns/       # Cognitive pattern documentation
│   ├── rhythm/                   # RHYTHM Method documentation
│   └── workflows/                # Workflow documentation
│
├── .github/                      # GitHub Actions workflows
│   └── workflows/                # CI/CD workflows
│
├── package.json                  # Root workspace configuration
├── tsconfig.json                 # Root TypeScript configuration
└── README.md                     # This file
```

## Folder Structure After Installation

When you install Baton Framework packages in your project:

```text
your-project/
├── baton/                        # Framework files (from npm packages)
│   ├── agents/                   # Agent definition files
│   ├── cognitive/                # Cognitive pattern files
│   ├── knowledge/                # Knowledge files
│   ├── workflows/                # Workflow files
│   └── core/                     # Core framework files
│
├── .baton/                       # Project configuration (created by init)
│   ├── project.config.yml        # Project configuration
│   ├── project.manifest.md       # Project manifest
│   ├── agents/                   # Project-specific agent instances
│   ├── workflows/                # Project-specific workflow instances
│   ├── boundaries/               # Project boundaries
│   ├── context/                  # Agent context files
│   └── knowledge/                # Project-specific knowledge
│
├── node_modules/                 # npm packages
│   └── @conductus-labs/
│       ├── baton-core/
│       ├── baton-agents/
│       └── ...
│
└── package.json
```

**Key Points:**

- **`baton/`** (no dot) = Framework files from npm packages (read-only, managed by npm)
- **`.baton/`** (with dot) = Project configuration (read-write, project-specific)

## Documentation

### Getting Started

- **[Cognitive Patterns Overview](docs/cognitive-patterns/0-overview.md)** - Learn about the 19 thinking patterns
- **[RHYTHM Method Overview](docs/rhythm/0-overview.md)** - Understand the project management methodology
- **[Migration Guide](docs/migration-guide.md)** - Migrate from CLI to packages

### Cognitive Patterns

- **[Patterns List](docs/cognitive-patterns/1-patterns-list.md)** - Detailed descriptions of all 19 patterns
- **[Using Patterns](docs/cognitive-patterns/2-using-patterns.md)** - How to select and configure patterns
- **[Pattern Combinations](docs/cognitive-patterns/3-pattern-combinations.md)** - Best practices for combining patterns

### RHYTHM Method

- **[Dictionary](docs/rhythm/1-dictionary.md)** - Key terms and concepts
- **[Principles](docs/rhythm/2-principles.md)** - Core principles of RHYTHM Method
- **[TEMPO](docs/rhythm/3-tempo.md)** - Understanding TEMPO: the speed/pace at which agents operate
- **[Workflows](docs/rhythm/4-workflows.md)** - RHYTHM Method workflows and processes

### Package Documentation

- **[Core Package](packages/core/README.md)** - Core types, utilities, and validation
- **[Agents Package](packages/agents/README.md)** - Agent definitions
- **[Cognitive Patterns Package](packages/cognitive-patterns/README.md)** - Cognitive thinking patterns
- **[Knowledge Package](packages/knowledge/README.md)** - Knowledge files
- **[Workflows Package](packages/workflows/README.md)** - Workflow definitions

## Philosophy

Baton Framework is designed with these principles:

1. **Agent-First Design**: Built for agents with human integration, not the other way around
2. **Reusable Patterns**: Cognitive patterns and workflows can be combined and reused
3. **Open and Extensible**: Framework components can be customized and extended
4. **Documentation-Driven**: Comprehensive documentation for both humans and agents
5. **Package-Based**: Modular packages allow consumers to install only what they need

## Development

### Building the Framework

```bash
# Build all packages
npm run build

# Build specific package
cd packages/core && npm run build
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for specific package
cd packages/core && npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Monorepo Structure

This repository uses npm workspaces to manage multiple packages. All packages are located in the `packages/` directory and share common tooling (TypeScript, Vitest, etc.) configured at the root level.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- How to contribute to the framework
- Package contribution process
- Adding new components (agents, patterns, workflows, knowledge)
- Versioning process
- Code of conduct

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About Conductus Labs

Baton Framework is developed by **Conductus Labs Ltd**, a UK-based AI application layer company.

- **Website**: [conductuslabs.com](https://conductuslabs.com)
- **Product**: [Baton Platform](https://baton.conductuslabs.com) - AI Orchestration Platform (SaaS)

## Related Projects

- **Baton Platform**: The commercial SaaS platform built on Baton Framework
- **RHYTHM Board**: Project management tool that consumes Baton Framework packages

---

**Built with ❤️ in the UK**
