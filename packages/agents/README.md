# @conductus-labs/baton-agents

**Baton Framework agent definitions**

[![npm version](https://img.shields.io/npm/v/@conductus-labs/baton-agents.svg)](https://www.npmjs.com/package/@conductus-labs/baton-agents)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@conductus-labs/baton-agents` provides 25 pre-defined agent definitions covering various domains and specializations. Each agent definition includes:

- Agent identity and purpose
- Cognitive pattern assignments (primary and secondary)
- Core capabilities and responsibilities
- Quality standards and boundaries
- Domain-specific expertise

## Installation

```bash
npm install @conductus-labs/baton-agents
```

**Note:** This package depends on `@conductus-labs/baton-core` and `@conductus-labs/baton-cognitive-patterns`. Install them first:

```bash
npm install @conductus-labs/baton-core @conductus-labs/baton-cognitive-patterns @conductus-labs/baton-agents
```

## Available Agents

### Engineering Agents

- **baton-agent** - Baton Framework specialist and agent designer
- **backend-engineer-agent** - Backend engineering specialist
- **frontend-engineer-agent** - Frontend engineering specialist
- **cli-engineer-agent** - CLI engineering specialist
- **devops-engineer-agent** - DevOps engineering specialist
- **database-engineer-agent** - Database engineering specialist
- **data-science-engineer-agent** - Data science engineering specialist
- **automated-test-engineer-agent** - Automated testing specialist

### Design & Content Agents

- **ui-ux-design-agent** - UI/UX design specialist
- **content-strategist-agent** - Content strategy specialist
- **technical-writer-agent** - Technical documentation specialist

### Management & Analysis Agents

- **project-manager-agent** - Project management specialist
- **business-analyst-agent** - Business analysis specialist
- **business-advisor-agent** - Business advisory specialist

### Specialist Agents

- **security-engineer-agent** - Security engineering specialist
- **quality-assurance-agent** - Quality assurance specialist
- **code-review-agent** - Code review specialist
- **research-assistant-agent** - Research and analysis specialist
- **software-architect-agent** - Software architecture specialist

### Framework-Specific Agents

- **rhythm-expert-agent** - RHYTHM Method specialist
- **knowledge-designer-agent** - Knowledge file design specialist
- **workflow-designer-agent** - Workflow design specialist

### Other Agents

- **marketing-expert-agent** - Marketing specialist
- **seo-expert-agent** - SEO specialist
- **test-agent** - Testing agent

## Usage

### Accessing Agent Files

After installation, agent files are available in the `baton/agents/` folder:

```text
your-project/
└── baton/
    └── agents/
        ├── baton-agent.md
        ├── backend-engineer-agent.md
        ├── frontend-engineer-agent.md
        └── ... (all 25 agents)
```

### Loading Agent Definitions

Use `@conductus-labs/baton-core` utilities to load agent definitions:

```typescript
import { loadAgent, loadAgentStrict } from "@conductus-labs/baton-core";
import type { AgentDefinition } from "@conductus-labs/baton-agents";

// Safe loading (returns null if invalid)
const agent = loadAgent("baton-agent");
if (agent) {
  console.log(agent.agent_name);
  console.log(agent.cognitive_patterns.primary);
}

// Strict loading (throws if invalid)
try {
  const agent = loadAgentStrict("baton-agent");
  // TypeScript knows agent is AgentDefinition
} catch (error) {
  console.error("Failed to load agent:", error);
}
```

### Using Agent Types

Import TypeScript types for type safety:

```typescript
import type {
  AgentDefinition,
  AgentMetadata,
  CognitivePatternReference,
} from "@conductus-labs/baton-agents";

function processAgent(agent: AgentDefinition) {
  console.log(`Agent: ${agent.agent_name}`);
  console.log(`Type: ${agent.agent_type}`);
  console.log(`Primary Patterns: ${agent.cognitive_patterns.primary.length}`);
}
```

### Reading Agent Files Directly

You can also read agent files directly from the file system:

```typescript
import { readFileSync } from "fs";
import { join } from "path";
import { parseYamlFrontmatter } from "@conductus-labs/baton-core";

const agentPath = join(process.cwd(), "baton", "agents", "baton-agent.md");
const content = readFileSync(agentPath, "utf-8");
const { frontmatter, content: markdown } = parseYamlFrontmatter(content);

console.log(frontmatter.agent_name);
console.log(frontmatter.cognitive_patterns);
```

## Agent Definition Structure

Each agent definition file follows this structure:

```yaml
---
version: 1.0.0
agent_name: baton-framework-agent
agent_short_name: baton-agent
agent_type: meta_framework_expert
created: 2025-11-23
last_updated: 2025-11-23
cognitive_patterns:
  primary:
    - name: meta-cognitive
      path: .baton/cognitive/meta-cognitive.yml
    - name: systems-thinking
      path: .baton/cognitive/systems-thinking.yml
  secondary:
    - name: analytical-thinking
      path: .baton/cognitive/analytical-thinking.yml
scope:
  - agent-initialisation
  - project-setup
---

# Agent Name

## Agent Identity & Purpose

**Role:** [Agent role description]

**Primary Focus:**
- [Capability 1]
- [Capability 2]

## Cognitive Pattern Integration

[Description of how cognitive patterns are used]

## Core Capabilities

[Detailed capabilities]

## Quality Standards

[Quality criteria and standards]

## Boundaries

[Agent-specific boundaries]
```

## API Reference

### Types

Re-exported from `@conductus-labs/baton-core`:

- `AgentDefinition` - Complete agent definition structure
- `AgentMetadata` - Agent metadata (frontmatter)
- `CognitivePatternReference` - Reference to a cognitive pattern

### Agent Files

Agent definition files are included in the package and available at:

- Package location: `node_modules/@conductus-labs/baton-agents/src/agents/*.md`
- Project location (after install): `baton/agents/*.md`

## Package Structure

```text
packages/agents/
├── src/
│   ├── agents/              # 25 agent definition files
│   │   ├── baton-agent.md
│   │   ├── backend-engineer-agent.md
│   │   └── ... (all agents)
│   ├── types.ts             # Type re-exports
│   └── index.ts             # Main export
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- `@conductus-labs/baton-core` - Core types and utilities

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

## Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **Major** (1.0.0 → 2.0.0): Breaking changes to agent structure
- **Minor** (1.0.0 → 1.1.0): New agents added
- **Patch** (1.0.0 → 1.0.1): Updates to existing agents, bug fixes

## License

MIT

## Related Packages

- `@conductus-labs/baton-core` - Core types and utilities (required)
- `@conductus-labs/baton-cognitive-patterns` - Cognitive patterns referenced by agents
- `@conductus-labs/baton-workflows` - Workflows that use agents
