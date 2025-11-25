# Baton CLI Structure

## Overview

This is a standard npm package structure for a TypeScript CLI tool that will be published as `@conductus-labs/baton-cli`.

## Directory Structure

```
src/cli/
├── bin/
│   └── baton.js          # Executable entry point (shebang for Node.js)
├── src/
│   └── index.ts          # Main CLI application (TypeScript source)
├── dist/                 # Compiled JavaScript output (generated, gitignored)
├── package.json          # npm package configuration
├── tsconfig.json         # TypeScript compiler configuration
├── .npmignore           # Files to exclude from npm package
└── README.md            # Package documentation
```

## Key Files

### `package.json`
- Defines the package name: `@conductus-labs/baton-cli`
- Sets the binary command: `baton` → `./bin/baton.js`
- Configures build scripts and dependencies
- Specifies files to include in npm package

### `bin/baton.js`
- Entry point that Node.js executes when `baton` command is run
- Imports the compiled TypeScript from `dist/src/index.js`
- Includes shebang (`#!/usr/bin/env node`) for direct execution

### `src/index.ts`
- Main CLI application using commander.js
- Handles `--version`, `--help`, and default help display
- Will be extended with `init` and other commands

### `tsconfig.json`
- TypeScript configuration
- Compiles to ES2022 modules
- Outputs to `dist/` directory
- Source maps enabled for debugging

## Build Process

1. **Development**: `npm run dev` - Watch mode, recompiles on changes
2. **Build**: `npm run build` - Compiles TypeScript to JavaScript
3. **Publish**: `npm publish` - Automatically runs build via `prepublishOnly`

## Installation Flow

When a user runs `npm install -g @conductus-labs/baton-cli`:

1. npm installs the package globally
2. npm creates a symlink: `baton` → `node_modules/@conductus-labs/baton-cli/bin/baton.js`
3. User can run `baton` from anywhere
4. `baton.js` loads the compiled code from `dist/index.js`

## Entry Point Explanation

**Question**: What does "entry point" mean?

**Answer**: The entry point is the file that gets executed when someone runs your command. In this case:
- `bin/baton.js` is the **executable entry point** (what Node.js runs)
- `src/index.ts` is the **source entry point** (what you write code in)
- `dist/index.js` is the **compiled entry point** (what gets executed after compilation)

The `bin` field in `package.json` tells npm: "When someone types `baton`, run this file."

## Next Steps

1. Add `init` command implementation
2. Add file copying logic using `core-init.json` manifest
3. Add platform detection (--cursor, --claude, --gemini)
4. Add error handling and user feedback

