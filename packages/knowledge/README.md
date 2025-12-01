# @conductus-labs/baton-knowledge

**Baton Framework knowledge files**

[![npm version](https://img.shields.io/npm/v/@conductus-labs/baton-knowledge.svg)](https://www.npmjs.com/package/@conductus-labs/baton-knowledge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@conductus-labs/baton-knowledge` provides knowledge files and best practices for agent operations. These files contain domain-specific knowledge that agents can reference when performing tasks.

## Installation

```bash
npm install @conductus-labs/baton-knowledge
```

**Note:** This package depends on `@conductus-labs/baton-core` and `@conductus-labs/baton-agents`. Install them first:

```bash
npm install @conductus-labs/baton-core @conductus-labs/baton-agents @conductus-labs/baton-knowledge
```

## Available Knowledge Files

### Git & Version Control

- **git-cli.md** - Git command-line interface knowledge and best practices

### GitHub Integration

- **github/github-api.md** - GitHub REST API knowledge and usage patterns
- **github/github-cli.md** - GitHub CLI (gh) knowledge and usage patterns

## Usage

### Accessing Knowledge Files

After installation, knowledge files are available in the `baton/knowledge/` folder:

```text
your-project/
└── baton/
    └── knowledge/
        ├── git-cli.md
        └── github/
            ├── github-api.md
            └── github-cli.md
```

### Reading Knowledge Files

Read knowledge files directly from the file system:

```typescript
import { readFileSync } from "fs";
import { join } from "path";
import {
  loadMarkdownFile,
  parseYamlFrontmatter,
} from "@conductus-labs/baton-core";

// Load knowledge file
const knowledgePath = join(process.cwd(), "baton", "knowledge", "git-cli.md");
const content = loadMarkdownFile(knowledgePath);

// If file has frontmatter
const { frontmatter, content: markdown } = parseYamlFrontmatter(content);
console.log(frontmatter); // Metadata if present
console.log(markdown); // Knowledge content
```

### Using Knowledge Types

Import TypeScript types for type safety:

```typescript
import type {
  KnowledgeFile,
  KnowledgeMetadata,
} from "@conductus-labs/baton-knowledge";

function processKnowledge(knowledge: KnowledgeFile) {
  console.log(`Knowledge: ${knowledge.name}`);
  console.log(`Category: ${knowledge.category}`);
  console.log(`Description: ${knowledge.description}`);
}
```

### Validating Knowledge Files

Use validation utilities from `@conductus-labs/baton-core`:

```typescript
import { validateKnowledge } from "@conductus-labs/baton-core";

const knowledgeData = {
  /* ... */
};
if (validateKnowledge(knowledgeData)) {
  // TypeScript knows knowledgeData is KnowledgeFile
  console.log(knowledgeData.name);
}
```

## Knowledge File Structure

Knowledge files are markdown documents that may include YAML frontmatter:

```markdown
---
version: 1.0.0
name: git-cli
category: version-control
description: Git command-line interface knowledge
created: 2025-11-23
last_updated: 2025-11-23
tags:
  - git
  - version-control
  - cli
---

# Git CLI Knowledge

## Overview

[Knowledge content...]

## Common Commands

[Command documentation...]

## Best Practices

[Best practices...]
```

## API Reference

### Types

Re-exported from `@conductus-labs/baton-core`:

- `KnowledgeFile` - Knowledge file structure
- `KnowledgeMetadata` - Knowledge file metadata

### Knowledge Files

Knowledge files are included in the package and available at:

- Package location: `node_modules/@conductus-labs/baton-knowledge/src/knowledge/**/*.md`
- Project location (after install): `baton/knowledge/**/*.md`

## Package Structure

```text
packages/knowledge/
├── src/
│   ├── knowledge/           # Knowledge files
│   │   ├── git-cli.md
│   │   └── github/
│   │       ├── github-api.md
│   │       └── github-cli.md
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

- **Major** (1.0.0 → 2.0.0): Breaking changes to knowledge file structure
- **Minor** (1.0.0 → 1.1.0): New knowledge files added
- **Patch** (1.0.0 → 1.0.1): Updates to existing knowledge files, bug fixes

## License

MIT

## Related Packages

- `@conductus-labs/baton-core` - Core types and utilities (required)
- `@conductus-labs/baton-agents` - Agents that reference knowledge files
- `@conductus-labs/baton-workflows` - Workflows that may use knowledge files

## Future Knowledge Files

Additional knowledge files may be added in future releases:

- API documentation patterns
- Database management knowledge
- Cloud platform knowledge
- Security best practices
- Testing methodologies
