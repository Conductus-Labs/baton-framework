# Baton CLI

CLI tool for initializing and managing Baton Framework projects.

## Installation

```bash
npm install -g @conductus-labs/baton-cli
```

## Usage

```bash
baton [command] [options]
```

## Commands

- `baton` - Show help
- `baton --version` or `baton -v` - Display version number
- `baton --help` or `baton -h` - Display help

## Development

### Setup

```bash
cd src/cli
npm install
```

### Build

```bash
npm run build
```

### Development (watch mode)

```bash
npm run dev
```

## Project Structure

```
src/cli/
├── bin/              # Executable entry point
├── src/              # TypeScript source files
│   └── index.ts      # Main CLI entry point
├── dist/             # Compiled JavaScript (generated)
├── package.json      # Package configuration
└── tsconfig.json     # TypeScript configuration
```

