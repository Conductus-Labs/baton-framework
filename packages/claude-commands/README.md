# @conductus-labs/baton-claude-commands

**Baton Framework Claude-specific command implementations**

[![npm version](https://img.shields.io/npm/v/@conductus-labs/baton-claude-commands.svg)](https://www.npmjs.com/package/@conductus-labs/baton-claude-commands)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@conductus-labs/baton-claude-commands` provides Claude-specific command implementations for the Baton Framework. This package extends the agent definitions with Claude-specific functionality.

## Installation

```bash
npm install @conductus-labs/baton-claude-commands
```

**Note:** This package depends on `@conductus-labs/baton-agents`. Install it first:

```bash
npm install @conductus-labs/baton-agents @conductus-labs/baton-claude-commands
```

## Usage

```typescript
import /* Claude command exports */ "@conductus-labs/baton-claude-commands";
```

## Package Structure

```
packages/claude-commands/
├── src/
│   └── index.ts          # Main exports
├── package.json
├── tsconfig.json
└── README.md
```

## Dependencies

- `@conductus-labs/baton-agents` - Agent definitions

## Development

```bash
# Build
npm run build

# Test
npm test

# Watch mode
npm run test:watch
```

## License

MIT
