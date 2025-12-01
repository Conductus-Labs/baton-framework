# @conductus-labs/baton-cursor-commands-core

**Baton Framework Cursor-specific command implementations**

[![npm version](https://img.shields.io/npm/v/@conductus-labs/baton-cursor-commands-core.svg)](https://www.npmjs.com/package/@conductus-labs/baton-cursor-commands-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

`@conductus-labs/baton-cursor-commands-core` provides Cursor-specific command implementations for the Baton Framework. This package extends the agent definitions with Cursor-specific functionality.

## Installation

```bash
npm install @conductus-labs/baton-cursor-commands-core
```

**Note:** This package depends on `@conductus-labs/baton-agents`. Install it first:

```bash
npm install @conductus-labs/baton-agents @conductus-labs/baton-cursor-commands-core
```

## Usage

```typescript
import /* Cursor command exports */ "@conductus-labs/baton-cursor-commands-core";
```

## Package Structure

```
packages/cursor-commands-core/
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
